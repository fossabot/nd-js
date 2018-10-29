/**
 * @internal
 * @module nd.color
 */

import chalk from "chalk";
import moment, { isDate, isMoment, Moment } from "moment";
import { URL } from "url";

import {
  noValidator,
  TransferAsDate,
  TransferAsDateTime,
  TransferNothing,
  TransferReadableList,
} from "../helpers/color";
import { CheckIsBoolean, CheckIsEmail, CheckIsExist, CheckIsNumber, CheckIsPathExist } from "../helpers/helper";
import { ColorType } from "../models/Color";

export const TITLE_COLOR = chalk.blueBright;

export const TOKEN_COLOR = chalk.blue.underline;
export const NAME_COLOR = chalk.greenBright;
export const EMAIL_COLOR = chalk.blueBright;

export const CHAPTER_NAME_COLOR = chalk.magentaBright;
export const NUMBER_COLOR = chalk.yellow;
export const CHAPTER_NUMBER_COLOR = chalk.magentaBright;
export const CHAPTER_NUMBERS_COLOR = chalk.magenta;

export const DATE_COLOR = chalk.blue;
export const DATE_TODAY_COLOR = chalk.blueBright.underline.bold;

export const LOCATION_COLOR = chalk.cyan;
export const LINK_COLOR = chalk.blueBright;

export const BOOLEAN_TRUE_COLOR = chalk.greenBright;
export const BOOLEAN_FALSE_COLOR = chalk.redBright;

export const IMPORTANT_COLOR = chalk.red.bold.underline;

export const STRING_COLOR = chalk.reset;
export const UNDEFINED_COLOR = chalk.reset;

export const OPTION_COLOR = chalk.blueBright; // cmd --option
export const ARGUMENT_COLOR = chalk.greenBright; // cmd argument
export const PARAMETER_COLOR = chalk.cyanBright; // cmd -p <parameter>

export const COLORS = {
  Title: new ColorType("title", noValidator, TITLE_COLOR, TransferNothing),
  Token: new ColorType("token", noValidator, TOKEN_COLOR, TransferNothing),
  Name: new ColorType("name", noValidator, NAME_COLOR, TransferNothing),
  Email: new ColorType("email", CheckIsEmail, EMAIL_COLOR, TransferNothing),
  ChapterName: new ColorType("chapter name", noValidator, CHAPTER_NAME_COLOR, TransferNothing),
  ChapterNumber: new ColorType("chapter number", noValidator, CHAPTER_NUMBER_COLOR, TransferNothing),
  ChapterList: new ColorType("chapter list", (obj) => obj instanceof Array, CHAPTER_NUMBERS_COLOR, TransferReadableList),
  Date: new ColorType(
    "date",
    (obj) => isMoment(obj) || isDate(obj),
    DATE_COLOR,
    TransferAsDate,
    DATE_TODAY_COLOR,
    (v: Moment) => v.isSame(moment(), "day"),
  ),
  DateTime: new ColorType(
    "datetime",
    (obj) => isMoment(obj) || isDate(obj),
    DATE_COLOR,
    TransferAsDateTime,
    DATE_TODAY_COLOR,
    (v: Moment) => v.isSame(moment(), "day"),
  ),
  Location: new ColorType("location", CheckIsPathExist, LOCATION_COLOR, TransferNothing),
  Link: new ColorType("link", (obj) => obj instanceof URL, LINK_COLOR, TransferNothing),
  Boolean: new ColorType(
    "boolean",
    (obj) => CheckIsBoolean(obj),
    BOOLEAN_TRUE_COLOR,
    TransferNothing,
    BOOLEAN_FALSE_COLOR,
    (v) => v === false,
  ),
  Number: new ColorType("number", CheckIsNumber, NUMBER_COLOR, TransferNothing),
  String: new ColorType("string", noValidator, STRING_COLOR, TransferNothing),
  Undefined: new ColorType("undefined", (obj) => !CheckIsExist(obj), UNDEFINED_COLOR, TransferNothing),
  Important: new ColorType("important", noValidator, IMPORTANT_COLOR, TransferNothing),
};
