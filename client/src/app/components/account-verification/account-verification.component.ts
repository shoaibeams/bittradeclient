import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router'
import { LanguageBase } from '../../shared/language';
import { SpinnerService } from 'src/app/services/spinner.service';
import { mdCallResponse } from 'src/app/models/call-response';
import { HttpClientService } from 'src/app/services/http-client.service';
import { LoggerService } from 'src/app/services/logger.service';
import { ConfirmationBoxService } from 'src/app/services/confirmation-box.service';
import { GlobalsService } from 'src/app/services/globals.service';
import { Constants } from '../../shared/constants';

@Component({
    selector: 'app-account-verification',
    templateUrl: './account-verification.component.html'
})
export class AccountVerificationComponent implements OnInit {

    lang: LanguageBase;
    verificationResponse: string;
    constants: Constants;
    constructor(private router: Router, 
        private route: ActivatedRoute, 
        private spinner: SpinnerService,
        private http: HttpClientService, 
        private log: LoggerService, 
        private alertBox: ConfirmationBoxService,
        private globals: GlobalsService) {
        spinner.show();
    }

    ngOnInit() {
        this.constants = this.globals.constants;
        this.lang = this.globals.lang;
        this.verificationResponse = this.lang.Verifying;
        let key: string = "";
        this.route.queryParams
            .subscribe((params: ParamMap) => {
                key = params[this.constants.QueryParams.key];
            });
        if (!key) {
            this.spinner.hide();
            //show verify account ui
        }
        else {
            this.verifyAccount(key);
        }
    }

    verifyAccount(key: string) {
        this.spinner.show();
        let res: mdCallResponse = new mdCallResponse();
        this.http.post<mdCallResponse>(this.constants.EndPoints.PostAccountVerify, { key: key }).subscribe((data) => {
            res = data;
        }, error => {
            this.spinner.hide();
        }, () => {
            if (res) {
                this.spinner.hide();
                this.verificationResponse = res.message;
                if (!res.isSuccess) {
                    this.alertBox.displayMessage(res.message);
                }
                else {
                    setTimeout(() => {
                        window.location.replace(this.constants.RoutePaths.Login);
                    }, 2 * 1000);
                }
            }
        });
    }

}
