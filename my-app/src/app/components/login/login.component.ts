import { Inject, Component, OnInit } from '@angular/core';

import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxNotificationService } from 'ngx-notification';
import { FormBuilder, Validators } from '@angular/forms';
import { LocalStorage, SharedStorage } from 'ngx-store';
import { LanguageBase } from 'src/app/shared/language';
import { Constants } from 'src/app/shared/constants';
import { mdSignUp } from 'src/app/models/sign-up';
import { HttpClientService } from 'src/app/services/http-client.service';
import { LoggerService } from 'src/app/services/logger.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { String } from 'src/app/shared/strings';
import { mdCallResponse } from 'src/app/models/call-response';
import { GlobalsService } from 'src/app/services/globals.service';

declare var $: any;
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    lang: LanguageBase;
    const: Constants;
    model: mdSignUp;
    form: FormGroup;
    submitted = false;
    errors: any;
    submitResponseMessage: string;
    showsubmitResponse: boolean;
    submitRequestResposneClass: string;
    diableSubmitButton: boolean;
    redirectURI: string;


    constructor(private formBuilder: FormBuilder, private http: HttpClientService, private spinner: SpinnerService, 
        private router: Router, private log: LoggerService, private route: ActivatedRoute, private globals: GlobalsService) {
    }

    ngOnInit() {
        this.lang = this.globals.lang;
        this.route.queryParams.subscribe((params: ParamMap) => {
            this.redirectURI = params[Constants.QueryParams.redirectURI];
        });
        if (!this.redirectURI) {
            this.redirectURI = Constants.RoutePaths.Trade;
        }
        this.const = Constants;
        this.showsubmitResponse = false;
        this.submitResponseMessage = "";
        this.submitRequestResposneClass = "";
        this.model = new mdSignUp(true);
        this.diableSubmitButton = false;
        this.form = this.formBuilder.group({
            username: [
                this.model.username,
                Validators.compose([Validators.required])
            ],
            password: [
                this.model.password,
                Validators.compose([Validators.required])
            ],
            captcha: !this.globals.isDev ? null : new FormControl(false, null)
        });
        this.errors = {
            usernameRequired: String.format(this.lang.RequiredFormat, this.lang.UserName),
            passwordRequired: String.format(this.lang.RequiredFormat, this.lang.Password),
            capitchaErrorMessage: this.lang.CapitchaErrorMessage,
        };
        this.spinner.hide();
    }

    onScriptLoad() {
        this.log.debug('Google reCAPTCHA loaded and is ready for use!')
    }

    onScriptError() {
        this.log.debug('Something went long when loading the Google reCAPTCHA')
    }
    // bool: any;
    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;
        if (this.form.controls.captcha.status != "VALID" && !this.globals.isDev) {
            return;
        }
        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        //everything is fine, now save the data
        this.submitResponseMessage = "";
        this.diableSubmitButton = true;
        let formData: mdSignUp = this.form.value;

        let res = new mdCallResponse();
        this.spinner.show();
        this.http.post<mdCallResponse>(Constants.EndPoints.PostAuthLogin, formData).subscribe((data) => {
            this.log.debug(data);
            res = data;
        },
            (error) => {
                this.log.debug(error);
                this.spinner.hide();
                this.showsubmitResponse = true;
                this.diableSubmitButton = false;
                this.submitResponseMessage = this.lang.UnableToCompleteYourRequest;
            },
            () => {
                this.spinner.hide();
                this.submitRequestResposneClass = "text-danger";
                this.log.debug(res);
                if (res) {
                    if (res.isSuccess) {
                        //signup completed, now sign in
                        if (res.extras) {
                            if (res.extras.status == Constants.RecordStatus.PendingVerification) {
                                let emailConfirmationRout = "<a href='" + Constants.RoutePaths.EmailConfirmation + "?" + Constants.QueryParams.email + "=em'>" + this.lang.Here + "</a>"
                                res.message = String.format(this.lang.EmailVerificationRequired, emailConfirmationRout);

                                this.hideSpinnerAndShowError(String.bulletList(res.message.split("\n")));
                            }
                            else {
                                window.location.href = this.redirectURI;
                            }
                        }
                    }
                    else {
                        this.hideSpinnerAndShowError(String.bulletList(res.message.split("\n")));
                    }
                }
            });
    }

    hideSpinnerAndShowError(message = null) {
        this.spinner.hide();
        if (!message) {
            message = this.lang.AccountCreatedLoginToContinue;
        }
        this.submitResponseMessage = message;
        this.showsubmitResponse = true;
        this.diableSubmitButton = false;
    }
}
