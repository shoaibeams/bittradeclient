import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { SpinnerService } from './services/spinner.service';
import { HttpClientService } from './services/http-client.service';
import { Constants } from './shared/constants';
import { mdCallResponse } from './models/call-response';
import { LoggerService } from './services/logger.service';
import { GlobalsService } from './services/globals.service';
import * as publicIp from 'public-ip'
import { isDevMode } from '@angular/core';
import { StaticHelper } from './shared/static-helper';
import { LanguageBase } from './shared/language';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: []
})

@Injectable()
export class AppComponent {

    checkedLogin: boolean = false;
    constructor(private http: HttpClientService, private router: Router, private spinner: SpinnerService,
        private log: LoggerService, private globals: GlobalsService) {

    }

    loadGlobals() {
        if (isDevMode()) {
            this.globals.isDev = true;
        }
        else {
            this.globals.isDev = false;
        }
        // this.globals.isDev = false;

        this.globals.spinnerConfig.main.bdColor = 'rgba(51, 51, 51, 0.8)';
        this.globals.spinnerConfig.main.size = 'medium';
        this.globals.spinnerConfig.main.color = 'rgb(243, 103, 93)';
        this.globals.spinnerConfig.main.type = 'ball-fussion';

        this.globals.lang = LanguageBase.getLanguage(Constants.LanguageKey.ENUS);
        
        //resolve ip address
        publicIp.v4().then(ip => {
            this.globals.ip = ip;
        });

    }

    ngOnInit() {
        this.loadGlobals();
        if (window.location.href.indexOf(Constants.RoutePaths.Login) == -1) {
            this.spinner.show();
            let res = new mdCallResponse();
            this.http.get<mdCallResponse>(Constants.EndPoints.GetAuthUser).subscribe((data) => {
                res = data;
            }, error => {
                this.log.debug(error);
                this.spinner.hide();
                this.globals.isLoggedIn = false;
                this.checkedLogin = true;
            }, () => {
                this.log.debug(res);
                this.spinner.hide();
                if (res.isSuccess) {
                    //a user is logged in
                    if (res.extras.status == Constants.RecordStatus.PendingVerification) {
                        //email is not verified of the user
                        this.globals.isLoggedIn = false;
                    }
                    else {
                        this.globals.isLoggedIn = true;
                    }
                    this.globals.username = res.extras.username;
                }
                else
                    if (res.extras == true) {
                        this.globals.isLoggedIn = false;
                        this.globals.username = res.extras.username;
                        StaticHelper.navigateToLogin(this.router);
                        // this.router.navigateByUrl(Constants.RoutePaths.Login + "?" + Constants.QueryParams.redirectURI + "=" + window.location.href, { skipLocationChange: false });
                        // window.location.href = Constants.RoutePaths.Login + "?" + Constants.QueryParams.redirectURI + "=" + window.location.href;
                        //a user was logged in but now token has expired
                    }
                    else {
                        this.globals.isLoggedIn = false;
                        //no user was logged in
                    }
                this.log.debug("isLoggedIn: " + this.globals.isLoggedIn);
                this.checkedLogin = true;
            });
        }
        else
        {
            this.checkedLogin = true;
        }
    }
}
