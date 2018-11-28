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
    selector: 'app-email-confirmation',
    templateUrl: './email-confirmation.component.html',
    styleUrls: ['./email-confirmation.component.css']
})
export class EmailConfirmationComponent implements OnInit {

    lang: LanguageBase;
    verificationEmailDetail: string;
    verificationEmailHeader: string = "";
    disableResendEmailButton: boolean;
    constructor(private router: Router, private route: ActivatedRoute, private spinner: SpinnerService,
        private http: HttpClientService, private log: LoggerService, private alertBox: ConfirmationBoxService,
        private globals: GlobalsService) {
        spinner.show();
    }

    ngOnInit() {
        this.disableResendEmailButton = false;
        this.lang = this.globals.lang;
        this.verificationEmailDetail = this.lang.VerificationEmailSentDetail.replace(/\n/g, '<br />');
        this.verificationEmailHeader = this.lang.VerificationEmailSent.replace(/\n/g, '<br />');
        let email: string = "";
        this.route.queryParams
            .subscribe((params: ParamMap) => {
                email = params[Constants.QueryParams.email];
            });
        if (!email) {
            this.spinner.hide();
        }
        else {
            this.sendSignupVerificatinEmail(null);
        }
    }

    sendSignupVerificatinEmail(ev) {
        this.spinner.show();
        let res: mdCallResponse = new mdCallResponse();
        this.http.get<mdCallResponse>(Constants.EndPoints.GetSendSignUpVerificationEmail).subscribe((data) => {
            res = data;
        }, error => {
            this.spinner.hide();
        }, () => {
            if (res) {
                if (!res.isSuccess) {
                    this.alertBox.displayMessage(res.message);
                }
                else {
                    if (ev) {
                        this.disableResendEmailButton = true;
                    }
                    this.verificationEmailHeader = this.lang.VerificationEmailSentAgain;
                }
            }
            this.spinner.hide();
        });
    }

}