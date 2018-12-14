import { Inject, Component, OnInit } from '@angular/core';

import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxNotificationService } from 'ngx-notification';
import { FormBuilder, Validators } from '@angular/forms';
import { LocalStorage, SharedStorage } from 'ngx-store';
import { LanguageBase } from 'src/shared/language';
// import { Constants } from 'src/shared/constants';
import { mdSignUp, SignUpMetaData } from 'src/models/sign-up';
import { HttpClientService } from 'src/services/http-client.service';
import { LoggerService } from 'src/services/logger.service';
import { SpinnerService } from 'src/services/spinner.service';
import { mdCallResponse } from 'src/models/call-response';
import { GlobalsService } from 'src/services/globals.service';
import { StaticHelper } from 'src/shared/static-helper';
import { Constants } from 'src/shared/constants';

declare var $: any;
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
    lang: LanguageBase;
    model: mdSignUp;
    form: FormGroup;
    submitted = false;
    errors: any;
    submitResponseMessage: string;
    showsubmitResponse: boolean;
    submitRequestResposneClass: string;
    diableSubmitButton: boolean;
    redirectURI: string;
    constants: Constants;

    constructor(private formBuilder: FormBuilder,
                private http: HttpClientService, 
                private spinner: SpinnerService,
                private router: Router, 
                private log: LoggerService, 
                private route: ActivatedRoute, 
                public globals: GlobalsService) {
    }

    ngOnInit() {
        this.constants = this.globals.constants;
        this.lang = this.globals.lang;
        this.route.queryParams.subscribe((params: ParamMap) => {
            this.redirectURI = params[this.constants.QueryParams.redirectURI];
        });
        if (!this.redirectURI) {
            this.redirectURI = this.constants.RoutePaths.Trade;
        }
        this.showsubmitResponse = false;
        this.submitResponseMessage = "";
        this.submitRequestResposneClass = "";
        this.model = new mdSignUp(true);
        this.diableSubmitButton = false;
        this.form = this.formBuilder.group({
            username: [
                this.model.username,
                Validators.compose([
                    Validators.required,
                    Validators.maxLength(SignUpMetaData.userNameMaxLength)
                ])
            ],
            password: [
                this.model.password,
                Validators.compose([
                    Validators.required,
                    Validators.maxLength(SignUpMetaData.passwordMaxLength)
                ])
            ],
            captcha: this.globals.isDev ? null : new FormControl(null, null)
        });
        this.errors = {
            usernameRequired: StaticHelper.formatString(this.lang.RequiredFormat, this.lang.UserName),
            passwordRequired: StaticHelper.formatString(this.lang.RequiredFormat, this.lang.Password),
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
        this.http.post<mdCallResponse>(this.constants.EndPoints.PostAuthLogin, formData).subscribe((data) => {
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
                            if (res.extras.status == this.constants.RecordStatus.PendingVerification) {
                                let emailConfirmationRout = "<a href='" + this.constants.RoutePaths.EmailConfirmation + "?" + this.constants.QueryParams.email + "=em'>" + this.lang.Here + "</a>"
                                res.message = StaticHelper.formatString(this.lang.EmailVerificationRequired, emailConfirmationRout);

                                this.hideSpinnerAndShowError(StaticHelper.bulletList(res.message.split("\n")));
                            }
                            else {
                                if(this.redirectURI)
                                {
                                    window.location.href = this.redirectURI;
                                }
                                else
                                {
                                    window.location.href = '/' + this.constants.RoutePaths.Trade;
                                }
                            }
                        }
                    }
                    else {
                        this.hideSpinnerAndShowError(StaticHelper.bulletList(res.message.split("\n")));
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
