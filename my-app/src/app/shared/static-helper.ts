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

}