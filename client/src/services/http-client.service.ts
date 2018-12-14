import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Constants } from '../shared/constants';
import { Observable, ObservableInput } from 'rxjs/observable';
import { ErrorObservable } from 'rxjs/Observable/ErrorObservable';
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import { LoggerService } from '../services/logger.service';
import { GlobalsService } from './globals.service';
import { StaticHelper } from '../shared/static-helper';
import { Router } from '@angular/router';

@Injectable()

export class HttpClientService {

    Endpoints: object = this.globals.constants.EndPoints;
    constructor(private http: HttpClient, 
        private router: Router,
        private log: LoggerService, private globals: GlobalsService) {
    }

    get<T>(url: string): Observable<T> {

        url = this.globals.constants.BaseURL + url;
        return this.http.get<T>(url, {withCredentials: true}).catch((e) => {
            this.log.error(e);
            return new Observable(e);
        });
    }

    getPromise<T>(url: string) {

        return this.get<T>(url).toPromise().then((data:any)=>{
            if(data)
            {
                if(data.message == 'Unauthorized request: no authentication given')
                {
                    StaticHelper.navigateToLogin(this.router);
                }
            }
            return data;
        }).catch(e=>{
            this.log.error(e);
            throw e;
        });
    }

    postPromise<T>(url: string, formData:any){
        return this.post<T>(url, formData).toPromise().then((data:any)=>{
            if(data)
            {
                if(data.message == 'Unauthorized request: no authentication given')
                {
                    StaticHelper.navigateToLogin(this.router);
                }
            }
            return data;
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
        if (url == this.globals.constants.EndPoints.PostAuthLogin) {
            //requestHeaders = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
            body = data;
            //  formurlencoded(data, {
            //     ignorenull : true,
            //     skipIndex : true,
            //     sorted : true
            //   })
        }
        url = this.globals.constants.BaseURL + url;
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
