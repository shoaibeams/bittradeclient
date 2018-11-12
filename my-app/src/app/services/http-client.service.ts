import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Constants } from '../shared/constants';
import { Observable, ObservableInput } from 'rxjs/observable';
import { ErrorObservable } from 'rxjs/Observable/ErrorObservable';
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import { LoggerService } from '../services/logger.service';
import formurlencoded from 'form-urlencoded';
import { GlobalsService } from './globals.service';

@Injectable()

export class HttpClientService {

    Endpoints: object = Constants.EndPoints;
    constructor(private http: HttpClient, private log: LoggerService, private globals: GlobalsService) {
    }

    get<T>(url: string): Observable<T> {

        url = Constants.BaseURL + url;
        return this.http.get<T>(url, {withCredentials: true}).catch((e) => {
            this.log.error(e);
            return new Observable(e);
        });
    }

    post<T>(url: string, data: any, options?: any): Observable<T> {
        this.log.debug(data);
        let requestHeaders: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
        let body:any = {
            model: data,
            lang: null,
            ip: this.globals.ip,
        }
        if (url == Constants.EndPoints.PostAuthLogin) {
            //requestHeaders = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
            body = data;
            //  formurlencoded(data, {
            //     ignorenull : true,
            //     skipIndex : true,
            //     sorted : true
            //   })
        }
        url = Constants.BaseURL + url;
        this.log.debug('url' + url + "\nbody" + JSON.stringify(body));
        return this.http.post<T>(url, body, { headers: requestHeaders, withCredentials: true })
        .catch((errorResponse: HttpErrorResponse):Observable<any> => {
            this.log.debug(errorResponse);
            throw errorResponse;
        });
    }

    // post(url: string, body: any, options?: any) {
    //   url = Constants.BaseURL + url;
    //   const head = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded; charset=utf-8'});

    //   // headers.append("Content-Type", "application/x-www-form-urlencoded");

    //   console.log("post to ur: " + url);
    //   console.log(body);
    //   console.log(head);
    //   return this.http.post(url, body,
    //     { headers: new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'})});
    // }

}
