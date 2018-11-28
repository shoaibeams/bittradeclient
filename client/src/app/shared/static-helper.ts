import { Constants } from "./constants";
import { Router } from "@angular/router";

export class StaticHelper {

    static navigateToLogin(router: Router) {
        router.navigateByUrl(Constants.RoutePaths.Login +
            "?" + Constants.QueryParams.redirectURI + "=" + window.location.href,
            { skipLocationChange: false });
    }

    static floatAmount(amount: number): number {
        return amount * Constants.Float;
    }

    static unfloatAmount(amount: number): number {
        return amount / Constants.Float;
    }

    static bestScale(amount: number): string
    {
        let amnt = StaticHelper.toFixedNSN(amount).toString();
        let index = amnt.indexOf('.');
        let currentScale = amnt.substr(index + 1, amnt.length - (index + 1)).length;
        let scale = StaticHelper.minScale(currentScale);
        return amount.toFixed(scale);
    }

    static toFixedNSN(x) {//no scientific notation
        if (Math.abs(x) < 1.0) {
          var e = parseInt(x.toString().split('e-')[1]);
          if (e) {
              x *= Math.pow(10,e-1);
              x = '0.' + (new Array(e)).join('0') + x.toString().substring(2);
          }
        } else {
          var e = parseInt(x.toString().split('+')[1]);
          if (e > 20) {
              e -= 20;
              x /= Math.pow(10,e);
              x += (new Array(e+1)).join('0');
          }
        }
        return x;
      }

    static minScale(scale: number): number {
        if(scale > Constants.MaxScaleToAvoidScientificNotation)
        {
            return Constants.MaxScaleToAvoidScientificNotation;
        }
        // else
        // if (scale < Constants.MinScaleForClientInput) {
        //     return Constants.MinScaleForClientInput;
        // }
        else 
        {
            return scale;
        }
    }

    static toLocalDate(date: Date):Date
    {
        date = new Date(date);
        let offset = new Date().getTimezoneOffset();
        offset *= -1;
        date.setMinutes(date.getMinutes() + offset);
        return date;
    }

    static getPropNameByValue(obj: object, value: any) {
        let keys = Object.keys(obj);
        let values = Object.keys(obj).map(k => obj[k]);
        let index = values.indexOf(value);
        if (index < keys.length) {
            return keys[index];
        }
        else {
            index = keys.indexOf(value);
            if (index < keys.length) {
                return keys[index];
            }
            else {
                return value;
            }
        }
    }

    static formatString(...args): string// = function(...args) {
    {
        // The string containing the format items (e.g. "{0}")
        // will and always has to be the first argument.
        if (arguments.length == 0) {
            return "";
        }
        var theString = arguments[0];
        if (theString == null) {
            return "";
        }
        if (typeof theString == 'undefined') {
            return "";
        }
        if (theString.length < 1) {
            return "";
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
    static bulletList(array: string[], ...args): string// = function(...args) {
    {
        // The string containing the format items (e.g. "{0}")
        // will and always has to be the first argument.
        if (array.length == 0) {
            return "";
        }
        var response = "<ul class='bullet-dot'>";
        for(var i = 0; i < array.length; i++)
        {
            response += "<li>" + StaticHelper.formatString(array[i], ...args) + "</li>";
        }
        response += "</ul>";
        return response;
    }
    
}