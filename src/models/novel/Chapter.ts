/**
 * @internal
 * @module nd.novel
 */

import { Moment } from "moment";
import { render } from "mustache";
import { join } from "path";
import { log } from "winston";

import { NOVEL_ERR } from "../../constants/error.const";
import { CheckIsNumber, RevertTimestamp, Timestamp } from "../../helpers/helper";
import { GetChapterFile, GetLinkWithChapter } from "../../helpers/novel";
import Config from "../command/Config";
import { Historian } from "../history/Historian";
import { HistoryNode } from "../history/HistoryNode";
import { WrapTMC } from "../output/LoggerWrapper";

/**
 * The status of novel chapter
 */
export enum NovelStatus {
  /**
   * Unknown will be the default status of novel chapter
   */
  UNKNOWN = "unknown",

  /**
   * Completed will set when the network downloaded the chapter and save completely
   */
  COMPLETED = "completed",

  /**
   * Closed will set if the auto detect, have detected the close chapter
   */
  CLOSED = "closed",

  /**
   * Sold will set if the autodetect, have detected the sold chapter
   */
  SOLD = "sold",
}

export class NovelChapter extends Historian {
  get id() {
    return this._nid;
  }

  get name() {
    return this._name || "";
  }

  set name(n: string) {
    this.notify(HistoryNode.CreateByChange("Chapter name", { before: this._name, after: n }));
    this._name = n;
  }

  get location() {
    return this._location || "";
  }

  set location(loc: string) {
    this.notify(HistoryNode.CreateByChange("Chapter location", { before: this._location, after: loc }));
    this._location = loc;
  }

  get number() {
    return this._chapterNumber;
  }

  get date() {
    return (this._date && this._date.format("d MMM YYYY")) || "";
  }

  get timestamp() {
    return Timestamp(this._date) || "";
  }

  set date(date: string | Moment) {
    if (typeof date === "string") {
      this.notify(HistoryNode.CreateByChange("Chapter date", { before: Timestamp(this._date), after: date }));
      this._date = RevertTimestamp(date);
    } else {
      this.notify(
        HistoryNode.CreateByChange("Chapter date", { before: Timestamp(this._date), after: Timestamp(date) }),
      );
      this._date = date;
    }
  }

  get status() {
    return this._status;
  }

  set status(status: NovelStatus) {
    this.notify(HistoryNode.CreateByChange("Chapter status", { before: this._status, after: status }));
    this._status = status;
  }

  private _status: NovelStatus = NovelStatus.UNKNOWN;

  protected _nid: string;
  protected _name?: string;
  protected _chapterNumber: string = "0";
  protected _location: string;

  protected _date?: Moment;

  constructor(id: string, chapter?: string, name?: string, location?: string, date?: Moment) {
    super();

    this.notify(HistoryNode.CreateByChange("Chapter ID", { before: undefined, after: id }));
    this._nid = id;
    if (name) this.name = name;

    if (date) this.date = date;

    if (!location) location = Config.Load({ quiet: true }).getNovelLocation();
    this.notify(HistoryNode.CreateByChange("Chapter location", { before: undefined, after: location }));
    this._location = location;

    if (chapter) {
      if (CheckIsNumber(chapter)) {
        this.notify(HistoryNode.CreateByChange("Chapter number", { before: undefined, after: chapter }));
        this._chapterNumber = chapter;
      } else {
        log(WrapTMC("warn", "Novel creator", `Chapter is not number (${chapter})`));
      }
    }
  }

  public link() {
    const link = GetLinkWithChapter(this.id, this.number);
    if (link) {
      return link;
    }
    throw NOVEL_ERR.clone().loadString("cannot generate download link");
  }

  public file() {
    return join(this._location, GetChapterFile(this.number));
  }

  public format(format: string) {
    return render(format, this);
  }

  public head() {
    if (this.number === "0") return "Zero chapter";
    else return `Chapter: ${this.number}`;
  }

  public buildJSON() {
    return {
      name: this.name,
      number: this.number,
      date: this.timestamp,
      status: this.status,
    };
  }

  public isCompleted() {
    return this._status === NovelStatus.COMPLETED;
  }

  public isSold() {
    return this._status === NovelStatus.SOLD;
  }

  public isClosed() {
    return this._status === NovelStatus.CLOSED;
  }

  public isUnknown() {
    return this._status === NovelStatus.UNKNOWN;
  }

  public markSell() {
    this.status = NovelStatus.SOLD;
  }

  public markClose() {
    this.status = NovelStatus.CLOSED;
  }

  public markComplete() {
    this.status = NovelStatus.COMPLETED;
  }
}