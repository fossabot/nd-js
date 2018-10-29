/**
 * @external
 * @module listr.helper
 */

import Bluebird from "bluebird";
import Listr, { ListrOptions, ListrTask } from "listr";
import { Observable } from "rxjs";

import { ListrApi } from "../apis/listr";
import { NovelChapter } from "../models/Chapter";
import { Novel } from "../models/Novel";

import { ThrowIf } from "./action";

export class ListrHelper {
  private list: Listr;
  constructor(options?: ListrOptions) {
    this.list = new Listr(undefined, options);
  }

  public add(task: ListrTask) {
    this.list.add(task);
    return this;
  }

  public adds(tasks: ReadonlyArray<ListrTask>) {
    this.list.add(tasks);
    return this;
  }

  public addByHelper(title: string, promise: Bluebird<any>, contextKey = "result") {
    this.list.add(ListrApi.create(title, promise, contextKey));
    return this;
  }

  public addFnByHelper(title: string, fn: (ctx: any) => Bluebird<any> | Observable<any>, contextKey = "result") {
    this.list.add(ListrApi.createFn(title, fn, contextKey));
    return this;
  }

  public addLoadChapterList(title: string, { force = false, contextKey = "result", overrideNovel = (_: Novel) => {} }) {
    return this.addFnByHelper(title, ctx => {
      const novel: Novel = ctx[contextKey];
      overrideNovel(novel);
      return new Observable(observer => {
        novel
          .saveAll({
            force,
            completeFn: (chap: NovelChapter) => {
              observer.next(`Chapter ${chap.number}`);
            },
          })
          .then(res => {
            ctx.novel = res;
            observer.complete();
          })
          .catch(e => observer.error(e));
      });
    });
  }

  public run(ctx?: any) {
    return this.list.run(ctx);
  }

  public runNovel({ withChapter = false, ctx = {}, contextKey = "novel" }) {
    return this.list
      .run(ctx)
      .then(context => {
        (context[contextKey] as Novel).print({ withChapter });
      })
      .catch(ThrowIf);
  }
}
