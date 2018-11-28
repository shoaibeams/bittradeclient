import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router'
import { LanguageBase } from '../../shared/language';
import { Constants } from '../../shared/constants';
import { SpinnerService } from 'src/app/services/spinner.service';
import { mdCallResponse } from 'src/app/models/call-response';
import { HttpClientService } from 'src/app/services/http-client.service';
import { LoggerService } from 'src/app/services/logger.service';
import { ConfirmationBoxService } from 'src/app/services/confirmation-box.service';
import { GlobalsService } from 'src/app/services/globals.service';

@Component({
    selector: 'app-account-verification',
    templateUrl: './account-verification.component.html',
    styleUrls: ['./account-verification.component.css']
})
export class AccountVerificationComponent implements OnInit {

    lang: LanguageBase;
    verificationResponse: string;
    constructor(private router: Router, private route: ActivatedRoute, private spinner: SpinnerService,
        private http: HttpClientService, private log: LoggerService, private alertBox: ConfirmationBoxService,
        private globals: GlobalsService) {
        spinner.show();
    }

    ngOnInit() {
        this.lang = this.globals.lang;
        this.verificationResponse = this.lang.Verifying;
        let key: string = "";
        this.route.queryParams
            .subscribe((params: ParamMap) => {
                key = params[Constants.QueryParams.key];
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
        this.http.post<mdCallResponse>(Constants.EndPoints.PostAccountVerify, { key: key }).subscribe((data) => {
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
                        window.location.href = Constants.RoutePaths.Login;
                    }, 2 * 1000);
                }
            }
        });
    }

}
