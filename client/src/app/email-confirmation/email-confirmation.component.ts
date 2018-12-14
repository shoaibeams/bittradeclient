import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router'
import { LanguageBase } from 'src/shared/language';
import { SpinnerService } from 'src/services/spinner.service';
import { mdCallResponse } from 'src/models/call-response';
import { HttpClientService } from 'src/services/http-client.service';
import { LoggerService } from 'src/services/logger.service';
import { ConfirmationBoxService } from 'src/services/confirmation-box.service';
import { GlobalsService } from 'src/services/globals.service';
import { Constants } from 'src/shared/constants';

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
    public constants: Constants;
    constructor(private router: Router, 
        private route: ActivatedRoute, 
        private spinner: SpinnerService,
        private http: HttpClientService, 
        private log: LoggerService, 
        private alertBox: ConfirmationBoxService,
        private globals: GlobalsService,) {
        spinner.show();
    }

    ngOnInit() {
        this.constants = this.globals.constants;
        this.disableResendEmailButton = false;
        this.lang = this.globals.lang;
        this.verificationEmailDetail = this.lang.VerificationEmailSentDetail.replace(/\n/g, '<br />');
        this.verificationEmailHeader = this.lang.VerificationEmailSent.replace(/\n/g, '<br />');
        let email: string = "";
        this.route.queryParams
            .subscribe((params: ParamMap) => {
                email = params[this.constants.QueryParams.email];
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
        this.http.get<mdCallResponse>(this.constants.EndPoints.GetSendSignUpVerificationEmail).subscribe((data) => {
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
