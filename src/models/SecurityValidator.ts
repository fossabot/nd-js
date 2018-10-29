/**
 * @internal
 * @module nd.security
 */

import { VerifyToken } from "../apis/token";
import { CheckIsExist } from "../helpers/helper";

import { TokenValidator } from "./SecurityTokenValidator";
import { UsernameValidator } from "./SecurityUsernameValidator";

export interface Validator {
  /**
   * @throws ValidateError
   */
  isValid(): boolean;
}

export class NDValidator implements Validator {
  constructor(token: TokenValidator, username: UsernameValidator) {
    this.token = token;
    this.username = username;
  }
  public token: TokenValidator;
  public username: UsernameValidator;

  public isValid() {
    const result = this.token.isValid() && this.username.isValid();
    const decode = VerifyToken(this.token, this.username);
    return result && CheckIsExist(decode && decode.toString());
  }
}
