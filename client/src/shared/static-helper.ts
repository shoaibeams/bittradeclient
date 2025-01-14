import { Constants } from "./constants";
import * as uuid from "uuid";
import history from "../shared/history";
import moment from "moment";
import { mdKeyValue } from "../models/key-value";
import { mdUserPhoneNumber } from "../models/user-phone-number";

export class StaticHelper {
  static navigateToLogin() {
    let cons = Constants.Instance;
    let redirectURI = encodeURIComponent(window.location.href);
    if (window.location.href.indexOf(cons.RoutePaths.Login) > -1) {
      redirectURI = "";
      return;
    }
    window.location.href = this.getLink(
      cons.RoutePaths.Login +
        "?" +
        cons.QueryParams.redirectURI +
        "=" +
        redirectURI
    );
  }

  static getLink(path: string) {
    if (!this.isNullOrEmpty(path)) {
      if (path[0] != "/") {
        path = "/" + path;
      }
    } else {
      path = "/";
    }
    let langPart = "";
    if (global.langKey != Constants.Instance.DefaultLangKey) {
      if (!this.isNullOrEmpty(global.langKey)) {
        langPart = "/" + global.langKey;
      }
    }
    return langPart + path;
  }

  static roundNumber(num: number, scale: number): number {
    if (scale > 0) {
      let numS: string = StaticHelper.toFixedNSN(num).toString();
      let splittedNumber = numS.split(".");
      if (splittedNumber.length > 1) {
        if (splittedNumber[1].length > scale) {
          let toRoundArray = splittedNumber[1].substr(0, scale + 1).split("");
          let toRoundLastDigit = Number(toRoundArray[toRoundArray.length - 1]);
          toRoundArray.pop();
          if (toRoundLastDigit >= 5) {
            toRoundArray[toRoundArray.length - 1] = (
              Number(toRoundArray[toRoundArray.length - 1]) + 1
            ).toString();
          }
          return Number(splittedNumber[0] + "." + toRoundArray.join(""));
        } else {
          return num;
        }
      } else {
        return num;
      }
    } else {
      return Math.round(num);
    }
  }

  static sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  static floatAmount(amount: number): number {
    return amount * Constants.Instance.Float;
  }

  static unfloatAmount(amount: number): number {
    return amount / Constants.Instance.Float;
  }

  static bestScale(amount: number): string {
    if (!amount) {
      amount = 0;
    }
    let amnt = StaticHelper.toFixedNSN(amount).toString();
    let index = amnt.indexOf(".");
    let currentScale = amnt.substr(index + 1, amnt.length - (index + 1)).length;
    let scale = StaticHelper.minScale(currentScale);
    if (typeof amount.toFixed === "function") {
      return amount.toFixed(scale);
    } else {
      return amount.toString();
    }
  }

  static toFixedNSN(x) {
    //no scientific notation
    if (Math.abs(x) < 1.0) {
      var e = parseInt(x.toString().split("e-")[1]);
      if (e) {
        x *= Math.pow(10, e - 1);
        x = "0." + new Array(e).join("0") + x.toString().substring(2);
      }
    } else {
      var e = parseInt(x.toString().split("+")[1]);
      if (e > 20) {
        e -= 20;
        x /= Math.pow(10, e);
        x += new Array(e + 1).join("0");
      }
    }
    return x;
  }

  static minScale(scale: number): number {
    if (scale > Constants.Instance.MaxScaleToAvoidScientificNotation) {
      return Constants.Instance.MaxScaleToAvoidScientificNotation;
    }
    // else
    // if (scale < Constants.MinScaleForClientInput) {
    //     return Constants.MinScaleForClientInput;
    // }
    else {
      return scale;
    }
  }

  static toLocalDate(date: Date): Date {
    if (!date) {
      return null;
    }
    let mmnt = moment(date);
    let local = mmnt.local();
    return local.toDate();
    // date = new Date(date);
    // let offset = new Date().getTimezoneOffset();
    // offset *= -1;
    // date.setMinutes(date.getMinutes() + offset);
    // return date;
  }

  static getPropNameByValue(obj: object, value: any) {
    let keys = Object.keys(obj);
    let values = Object.keys(obj).map(k => obj[k]);
    let index = values.indexOf(value);
    if (index < keys.length) {
      return keys[index];
    } else {
      index = keys.indexOf(value);
      if (index < keys.length) {
        return keys[index];
      } else {
        return value;
      }
    }
  }

  static formatString(...args): string {
    // = function(...args) {
    // The string containing the format items (e.g. "{0}")
    // will and always has to be the first argument.
    if (arguments.length == 0) {
      return "";
    }
    var theString = arguments[0];
    if (theString == null) {
      return "";
    }
    if (typeof theString == "undefined") {
      return "";
    }
    if (theString.length < 1) {
      return "";
    }
    if (typeof theString != "string") {
      return theString;
    }
    // start with the second argument (i = 1)
    for (var i = 1; i < arguments.length; i++) {
      // "gm" = RegEx options for Global search (more than one instance)
      // and for Multiline search
      var regEx = new RegExp("\\{" + (i - 1) + "\\}", "gm");
      theString = theString.replace(regEx, arguments[i]);
    }

    return theString;
  }

  static bulletList(array: string[], ...args): string {
    // = function(...args) {
    // The string containing the format items (e.g. "{0}")
    // will and always has to be the first argument.
    if (array.length == 0) {
      return "";
    }
    var response = "<ul class='bullet-dot'>";
    for (var i = 0; i < array.length; i++) {
      response +=
        "<li>" + StaticHelper.formatString(array[i], ...args) + "</li>";
    }
    response += "</ul>";
    return response;
  }

  static copyProp(fromObj: any, toObj: any): any {
    // = function(...args) {
    let keys = Object.keys(fromObj);
    for (let j = 0; j < keys.length; j++) {
      toObj[keys[j]] = fromObj[keys[j]];
    }
    return toObj;
  }

  static distinctArray(array: any[]): any {
    // = function(...args) {
    let newArray = [];
    for (let i = 0; i < array.length; i++) {
      if (newArray.indexOf(array[i]) == -1) {
        newArray.push(array[i]);
      }
    }
    return newArray;
  }

  static arrayOfObjectToObjectOfObject(array: any[], key: string) {
    let obj = {};
    for (let i = 0; i < array.length; i++) {
      obj[array[i][key]] = array[i];
    }
    return obj;
  }

  static capitalizeFirstLetter(value: string) {
    if (!value) {
      return "";
    }
    if (value.length < 1) {
      return "";
    }
    let firstChar = value.charAt(0).toUpperCase();
    let remainingString = "";
    if (value.length > 1) {
      remainingString = value.slice(1);
    }
    return firstChar + remainingString;
  }

  static getUUID = (): string => {
    return uuid.v4();
  };

  static assignPropertyOfObject(
    targetObject: any,
    property: string,
    propertyValue: any
  ) {
    let obj = {};
    obj[property] = propertyValue;
    Object.assign({}, obj);
    targetObject = {
      ...targetObject,
      ...obj
    };
    return targetObject;
  }

  static isNullOrEmpty(value: any): boolean {
    if (value == null) {
      return true;
    }
    if (typeof value === "string") {
      if (value.length < 1) {
        return true;
      }
      return false;
    }
    if (typeof value === "object") {
      if (Array.isArray(value)) {
        if (value.length < 1) {
          return true;
        }
        return false;
      } else if (value instanceof Date) {
        if (!isNaN(Number(value))) {
          return false;
        } else {
          return true;
        }
      } else {
        if (Object.keys(value).length < 1) {
          return true;
        }
        return false;
      }
    }
    if (isNaN(value)) {
      return true;
    }
    return false;
  }

  static emptyNaN(value: any): any | string {
    if (this.isNullOrEmpty(value)) {
      return "";
    } else {
      return value;
    }
  }

  static testRegex(regex, value) {
    if (this.isNullOrEmpty(regex)) {
      return true;
    }
    let regExp = RegExp(regex);
    return regExp.test(value);
  }

  static objectToValuesArrayWithObjectName(
    obj: object,
    objNameProp: string,
    stringValues: boolean = false
  ): any[] {
    let keys = Object.keys(obj);
    let res: any[] = [];
    for (let i = 0; i < keys.length; i++) {
      let o = obj[keys[i]];
      o[objNameProp] = keys[i];
      res.push(o);
    }
    return res;
  }

  static longDateFormat(date: Date) {
    if (!date) {
      return "";
    }
    let mmnt = moment(date);
    return mmnt.locale("en").format("MMM D, YYYY, hh:mm:ss A");
  }

  static toTimehhmmss(date: Date) {
    if (!date) {
      return "";
    }
    let mmnt = moment(date);
    return mmnt.locale("en").format("hh:mm:ss");
  }

  static objectToValuesArray(
    obj: object,
    stringValues: boolean = false
  ): any[] {
    return Object.keys(obj).map(valueNamedIndex => {
      let value = obj[valueNamedIndex];
      if (stringValues) {
        return value.toString();
      } else {
        return value;
      }
    });
  }

  static shortDateFormat = (date: Date) => {
    if (StaticHelper.isNullOrEmpty(date)) {
      return "";
    }
    let mmnt = moment(date);
    return mmnt.locale("en").format("DD MMM, YYYY");
  };

  static objectKeyValueArrayArray(
    obj: object,
    stringValues: boolean = false
  ): mdKeyValue[] {
    let keys = Object.keys(obj);
    let res: mdKeyValue[] = [];
    for (var valueNamedIndex in obj) {
      var isValueProperty = parseInt(valueNamedIndex, 10) >= 0;
      if (!isValueProperty) {
        let kv = new mdKeyValue();
        kv.key = valueNamedIndex;
        kv.value;
        kv.value = obj[valueNamedIndex];
        if (stringValues) {
          kv.value = kv.value.toString();
        }
        res.push(kv);
      }
    }
    return res;
  }

  static objectKeyValueArrayWithAll(
    obj: object,
    stringValues: boolean = false
  ): mdKeyValue[] {
    let keys = Object.keys(obj);
    let res: mdKeyValue[] = [
      new mdKeyValue("All", Constants.Instance.DefaultValue)
    ];
    for (var valueNamedIndex in obj) {
      var isValueProperty = parseInt(valueNamedIndex, 10) >= 0;
      if (!isValueProperty) {
        let kv = new mdKeyValue();
        kv.key = valueNamedIndex.toUpperCase().replace("_", " ");
        kv.value = obj[valueNamedIndex];
        if (stringValues) {
          kv.value = kv.value.toString();
        }
        res.push(kv);
      }
    }
    return res;
  }

  static getEnumKey = (enumType, value) => {
    let keyVal = StaticHelper.objectKeyValueArrayArray(
      enumType,
      value
    ) as mdKeyValue[];
    let keys = keyVal.filter(m => m.value == value);
    if (keys.length > 0) {
      return keys[0].key;
    }
    return null;
  };

  static getScale(num: number): number {
    let scale = 0;
    let nsn = StaticHelper.toFixedNSN(num).toString();
    if (nsn.indexOf(".") > -1) {
      scale = nsn.split(".")[1].length;
    }
    return scale;
  }

  static subtract(...args): number {
    for (let i = 0; i < args.length - 1; i++) {
      if (this.isNullOrEmpty(arguments[i])) {
        arguments[i] = 0;
      }
    }
    if (arguments.length == 0) {
      return 0;
    }
    let from = arguments[0] as number;
    if (arguments.length == 1) {
      return arguments[0];
    }
    let res = from;
    let biggestScale = StaticHelper.getScale(arguments[0]);
    let smallestScale = StaticHelper.getScale(arguments[0]);
    // start with the second argument (i = 1)
    for (var i = 1; i < arguments.length; i++) {
      res -= arguments[i];
      let scale = StaticHelper.getScale(arguments[i]);
      if (scale > biggestScale) {
        biggestScale = scale;
      }
      if (scale < smallestScale) {
        smallestScale = scale;
      }
    }
    res = parseFloat(res.toFixed(biggestScale));
    return res;
  }

  static getHiddenPhoneNumber = (callingCode, phoneNumber) => {
    if (!phoneNumber || !callingCode) {
      return null;
    }
    let pn = callingCode + " " + phoneNumber;
    let original = pn;
    for (let i = 1; i < pn.length; i++) {
      let code = original.substr(0, i);
      if (i + 2 < pn.length && code != callingCode) {
        pn = pn.substr(0, i) + "x" + pn.substr(i + 1);
      }
    }
    return pn;
  };
}
