/**
 * @internal
 * @module nd.exception
 */

import { log } from "winston";

import { ExceptionStorage } from "./ExceptionStorage";
import { WrapTMC } from "./LoggerWrapper";

/**
 * This is the throwable interface, which use to contain more helper method than Error interface
 *
 * @author Kamontat Chantrachirathumrong
 * @version 1.0.0
 * @since Obtober 22, 2018
 */
export default interface Throwable extends Error {
  /**
   * Print the result and call {@link exit} method
   */
  printAndExit(): void;

  /**
   * This will exit the process (using {@link process.exit(code)}), if and only if the error isn't warning exception
   */
  exit(): void;

  /**
   * To check is the error is a warning error
   */
  warn(): boolean;

  /**
   * This will load cause error from parameter
   * @param e cause error
   */
  loadError(e: Error): Exception;
  /**
   * This will load cause message from parameter
   * @param e cause message
   */
  loadString(e: string): Exception;

  /**
   * Clone the exception, if the error may cause more than 1 place
   */
  clone(): Exception;

  /**
   * This will check is input error is same as current throwable
   * @param e another object
   */
  equal(e: any | undefined): boolean;
}

export class Exception extends Error implements Throwable {
  get call() {
    return this.called;
  }

  protected called: boolean = false;
  protected _warn: boolean = false;

  constructor(title: string, code?: number, shift?: number) {
    super(title);
    Error.captureStackTrace(this, this.constructor);

    this.description = title;

    if (code) {
      this.code = code;
    }
    if (shift) {
      this.code += shift;
    }

    ExceptionStorage.CONST.add(this);
  }
  public code: number = 1;
  public description: string = "";

  public warn = () => {
    return this._warn;
  };

  public save = () => {
    this.called = true;
  };

  public reset = () => {
    this.called = false;
  };

  public printAndExit = () => {
    this.save();

    if (this.warn()) {
      log(WrapTMC("warn", "Warning", this.stack ? this.stack : this.message));
    } else {
      log(WrapTMC("error", "Error", this.stack ? this.stack : this.message));
    }
    this.exit();
  };

  public exit = () => {
    if (!this.warn()) {
      process.exit(this.code);
    }
  };

  public loadError = (e: Error) => {
    this.message = `${this.description} cause by "${e.message}"`;
    return this;
  };

  public loadString = (message: string) => {
    this.message = `${this.description} cause by "${message}"`;
    return this;
  };

  public clone = (): Exception => {
    return this;
  };

  public equal = (e: any | undefined): boolean => {
    if (!e) {
      return false;
    }
    return e.code === this.code;
  };
}

/**
 * NFError is not found error
 */
export class NFError extends Exception {
  constructor(title: string, shift?: number) {
    super(title, 10, shift);
  }

  public clone = (): Exception => {
    const n = new NFError(this.message);
    n.code = this.code;
    n.description = this.description;
    n.warn = this.warn;
    return n;
  };
}

/**
 * EError is error or wrong input
 */
export class EError extends Exception {
  constructor(title: string, shift?: number) {
    super(title, 30, shift);
  }

  public clone = (): Exception => {
    const n = new EError(this.message);
    n.code = this.code;
    n.description = this.description;
    n.warn = this.warn;
    return n;
  };
}

/**
 * FError is fail to do something
 */
export class FError extends Exception {
  constructor(title: string, shift?: number) {
    super(title, 50, shift);
  }

  public clone = (): Exception => {
    const n = new FError(this.message);
    n.code = this.code;
    n.description = this.description;
    n.warn = this.warn;
    return n;
  };
}

export class Warning extends Exception {
  constructor(title: string, shift?: number) {
    super(title, 100, shift);
  }
  public _warn = true;

  public clone = (): Exception => {
    const n = new Warning(this.message);
    n.code = this.code;
    n.description = this.description;
    n._warn = this.warn();
    return n;
  };
}
