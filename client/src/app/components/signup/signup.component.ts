import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors, FormControl, AbstractControl } from '@angular/forms';
import { mdSignUp, SignUpMetaData } from '../../models/sign-up'
import { Constants } from '../../shared/constants'
import { LanguageBase } from '../../shared/language'
import { HttpClientService } from '../../services/http-client.service';
import { SpinnerService } from '../../services/spinner.service';
import * as EmailValidator from 'email-validator'
import { v4 as uuid } from 'uuid';
import { Router } from '@angular/router'
import { mdCallResponse } from '../../models/call-response';
import { LoggerService } from '../../services/logger.service';
import { GlobalsService } from 'src/app/services/globals.service';
import { StaticHelper } from 'src/app/shared/static-helper';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
    // constants: Constants = new Constants();
    lang: LanguageBase;
    const:Constants;
    frmPersonal: mdSignUp;
    personalForm: FormGroup;
    submitted = false;
    errors: any;
    submitResponseMessage: string;
    showsubmitResponse: boolean;
    submitRequestResposneClass: string;
    invalidEmail: boolean;
    diableSubmitButton: boolean;
    passwordDidNotMatch: boolean;
    account_type: number;//1 for inidividual 2 for business


    constructor(private formBuilder: FormBuilder, private http: HttpClientService, private spinner: SpinnerService, 
        private router: Router, private log: LoggerService, private globals:GlobalsService) {
    }

    ngOnInit() {
        this.lang = this.globals.lang;
        this.const = Constants;
        this.account_type = 1;
        this.passwordDidNotMatch = true;
        this.showsubmitResponse = false;
        this.submitResponseMessage = "";
        this.submitRequestResposneClass = "";
        this.frmPersonal = new mdSignUp(true);
        this.invalidEmail = false;
        this.diableSubmitButton = false;
        this.personalForm = this.formBuilder.group({
            first_name: [
                this.frmPersonal.first_name,
                Validators.compose([
                    Validators.required,
                    Validators.maxLength(SignUpMetaData.firstNameMaxLength)
                ])
            ],
            last_name: [
                this.frmPersonal.last_name,
                Validators.compose([
                    Validators.required,
                    Validators.maxLength(SignUpMetaData.lastNameMaxLength)
                ])
            ],
            company_name: [
                this.frmPersonal.company_name, null
            ],
            email: [
                this.frmPersonal.email,
                Validators.compose([
                    Validators.required,
                    Validators.email,
                    Validators.maxLength(SignUpMetaData.emailMaxLength)
                ])
            ],
            // username: [
            //     this.frmPersonal.username,
            //     Validators.compose([
            //         Validators.required,
            //         // Validators.minLength(SignUpMetaData.userNameMinLength),
            //         Validators.pattern(new RegExp(SignUpMetaData.userNameRegex)),
            //         // Validators.pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=^.{8,32}$)(?=^\\S*$)')),
            //         // Validators.maxLength(SignUpMetaData.userNameMaxLength),
            //     ])
            // ],
            password: [
                this.frmPersonal.password,
                Validators.compose([
                    Validators.required,
                    Validators.pattern(new RegExp(SignUpMetaData.passwordRegex)),
                ])
            ],
            confirm_password: [
                this.frmPersonal.confirm_password,
            ],
            personal_capitcha: this.globals.isDev ? null : new FormControl(false, null)
        });
        this.errors = {
            first_nameRequired: StaticHelper.formatString(this.lang.RequiredFormat, this.lang.FirstName),
            first_nameMaxLength: StaticHelper.formatString(this.lang.MaxLengthFormat, SignUpMetaData.firstNameMaxLength),
            last_nameRequired: StaticHelper.formatString(this.lang.RequiredFormat, this.lang.LastName),
            last_nameMaxLength: StaticHelper.formatString(this.lang.MaxLengthFormat, SignUpMetaData.lastNameMaxLength),
            usernameRequired: StaticHelper.formatString(this.lang.RequiredFormat, this.lang.UserName),
            usernameRange: StaticHelper.formatString(this.lang.RangeLengthFormat, SignUpMetaData.userNameMinLength,
                SignUpMetaData.userNameMaxLength),
            usernamePattern: StaticHelper.bulletList(this.lang.UserNameRequirement, this.lang.UserName,
                SignUpMetaData.userNameMinLength, SignUpMetaData.userNameMaxLength),
            passwordRequired: StaticHelper.formatString(this.lang.RequiredFormat, this.lang.Password),
            passwordPattern: StaticHelper.bulletList(this.lang.PasswordRequirement, this.lang.Password, SignUpMetaData.passwordMinLength,
                SignUpMetaData.passwordMaxLength),
            emailRequired: StaticHelper.formatString(this.lang.RequiredFormat, this.lang.Email),
            emailInvalid: this.lang.InvalidEmail,
            passwordDidNotMatch: StaticHelper.formatString(this.lang.DidNotMatchFormat, this.lang.Password, this.lang.ConfirmPassword),
            capitchaErrorMessage: this.lang.CapitchaErrorMessage,
            company_nameRequired: StaticHelper.formatString(this.lang.RequiredFormat, this.lang.CompanyName),
            company_nameMaxLength: StaticHelper.formatString(this.lang.MaxLengthFormat, SignUpMetaData.companyNameMaxLength),
        };
    }

    signupType(type: number) {
        this.account_type = type;
        if (this.account_type == 1) {
            this.personalForm.controls.company_name.clearValidators();
        }
        else {
            this.personalForm.controls.company_name.setValidators(Validators.compose([
                Validators.required,
                Validators.maxLength(SignUpMetaData.companyNameMaxLength)
            ]));
        }

    }

    confirmPassowrdValidator(control: AbstractControl): { [key: string]: boolean } | null {

        if (this.personalForm.controls.password.value === this.personalForm.controls.confirm_password.value) {
            this.passwordDidNotMatch = false;
        }
        else {
            this.passwordDidNotMatch = true;
            if (this.personalForm.controls.confirm_password.errors) {
            }
            else {
                this.personalForm.controls.confirm_password.setErrors({ "nomatch": true });
            }
        }
        return null;

    }

    onScriptLoad() {
        this.log.debug('Google reCAPTCHA loaded and is ready for use!')
    }

    onScriptError() {
        this.log.debug('Something went long when loading the Google reCAPTCHA')
    }
    // bool: any;
    // convenience getter for easy access to form fields
    get pf() { return this.personalForm.controls; }

    matchPassword(ev: any) {
        if (this.submitted) {
            if (this.personalForm.controls.password.value === this.personalForm.controls.confirm_password.value) {
                this.passwordDidNotMatch = false;
            }
            else {
                this.passwordDidNotMatch = true;
                if (this.personalForm.controls.confirm_password.errors) {
                }
                else {
                    this.personalForm.controls.confirm_password.setErrors({ "nomatch": true });
                }
            }
        }
    }

    onEmailKeyUp(ev: any) {
        if (this.submitted) {
            if (!EmailValidator.validate(this.personalForm.controls.email.value)) {
                this.invalidEmail = true;
            }
            else {
                this.invalidEmail = false;
            }
        }
    }

    onSubmit() {
        this.submitted = true;
        if (this.personalForm.controls.personal_capitcha.status != "VALID" && !this.globals.isDev) {
            return;
        }
        // stop here if form is invalid
        if (this.personalForm.invalid) {
            return;
        }

        this.onEmailKeyUp(null);
        if (this.invalidEmail) {
            return;
        }

        this.matchPassword(null);
        if (this.passwordDidNotMatch) {
            return;
        }

        //everything is fine, now save the data
        this.diableSubmitButton = true;
        this.invalidEmail = false;
        let formData: mdSignUp = this.personalForm.value;
        formData.account_type = this.account_type;
        formData.uuid = uuid();

        let res = new mdCallResponse();
        this.spinner.show();
        this.http.post<mdCallResponse>(Constants.EndPoints.PostAccountRegister, formData).subscribe((data) => {
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
                // this.spinner.hide();
                this.submitRequestResposneClass = "text-danger";
                this.log.debug(res);
                if (res) {
                    if (res.isSuccess) {
                        //signup completed, now sign in
                        res = null;
                        var newFormData = {
                            username: formData.email,
                            password: formData.password,
                            grant_type: Constants.GrantTypes.Password,
                        }
                        this.http.post<mdCallResponse>(Constants.EndPoints.PostAuthLogin, newFormData).subscribe((data) => {
                            res = data;
                        },
                            (error) => {
                                this.log.debug(error);
                                this.hideSpinnerAndShowError();
                            },
                            () => {
                                this.submitRequestResposneClass = "text-danger";
                                this.log.debug(res);
                                if (res) {
                                    if (res.isSuccess) {
                                        //logged in successfully, now send email
                                        //navigate to /emailConfirmation we'll send email from there
                                        window.location.href = Constants.RoutePaths.EmailConfirmation + "?" + Constants.QueryParams.email + "=em";//we just need to set something in this param if we want to send email on component load
                                    }
                                    else {
                                        this.hideSpinnerAndShowError();
                                        this.router.navigateByUrl(Constants.RoutePaths.Login, { skipLocationChange: false });
                                    }
                                }
                                else {
                                    this.hideSpinnerAndShowError(StaticHelper.bulletList(res.message.split("\n")));
                                }
                            });
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
