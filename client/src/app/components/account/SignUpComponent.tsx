import { BaseComponent } from "../base/BaseComponent";
import * as React from "react";
import { Link } from "react-router-dom";
import { StaticHelper } from "../../../shared/static-helper";
import { mdFormControl } from "../../../shared/form-control";
import { mdSignUp, SignUpMetaData } from "../../../models/sign-up";
import * as ValidationAttributes from "../../../shared/validation-attributes"
import { mdCallResponse } from "../../../models/call-response";

export default class SignUpComponent extends BaseComponent {

    render() {
        this.initShorts();
        return (
            <div className="mainpage clearfix">
                <section className="signupwrap clearfix">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6 col-md-offset-3 col-sm-12">
                                <p className="h3">Create your account</p>
                                <div className="signupbox clearfix">
                                    <ul className="nav nav-tabs">
                                        <li className="active">
                                            <a data-toggle="tab" href="#Individual" onClick={(e) => { this.signupType(1) }}>
                                                <img src="assets/images/u-icon.png" alt="Individual" /> {this.lang.Individual}
                                            </a>
                                        </li>
                                        <li>
                                            <a data-toggle="tab" href="#Individual" onClick={(e) => { this.signupType(2) }}>
                                                <img src="assets/images/b-icon.png" alt={this.lang.Business} /> {this.lang.Business} <i></i>
                                            </a>
                                        </li>
                                    </ul>
                                    <div className="tab-content">
                                        <div id="Individual" className="tab-pane fade in active">
                                            <form onSubmit={this.onSubmit}>
                                                <div className="row">
                                                    <div className="col-sm-6">
                                                        {
                                                            this.textFormControl(this.f.first_name, this.handleFormControlInput)
                                                        }
                                                    </div>
                                                    <div className="col-sm-6">
                                                        {
                                                            this.textFormControl(this.f.last_name, this.handleFormControlInput)
                                                        }
                                                    </div>
                                                    {
                                                        this.state.account_type == 2 ? (
                                                            <div className="col-sm-12">
                                                                {
                                                                    this.textFormControl(this.f.company_name, this.handleFormControlInput)
                                                                }
                                                            </div>
                                                        ) : (null)
                                                    }

                                                    <div className="col-sm-12">
                                                        {
                                                            this.textFormControl(this.f.email, this.handleFormControlInput)
                                                        }
                                                    </div>
                                                    <div className="col-sm-12">
                                                        {
                                                            this.passwordFormControl(this.f.password, [this.handleFormControlInput, this.matchPassword])
                                                        }
                                                    </div>
                                                    <div className="col-sm-12">
                                                        {
                                                            this.passwordFormControl(this.f.confirm_password, [this.handleFormControlInput, this.matchPassword])
                                                        }
                                                    </div>
                                                    <div className="col-sm-12 order-txt">
                                                        "In order to be GDPR compliant, you give permission to us for using
                                                        your
                                                        personal data on our servers."
                                                    </div>
                                                    <div className="col-sm-12 form-group">
                                                        <button className="signup-btn btn-primary" disabled={this.state.diableSubmitButton}>{this.lang.CreateAccount}</button>
                                                    </div>
                                                    <div className="col-sm-12">
                                                        <strong>
                                                            {
                                                                this.state.showSubmitResponse ? (
                                                                    <div className={`${this.state.submitResponseClass} text-bold`}>{this.state.submitResponse}</div>
                                                                ) : (null)
                                                            }
                                                        </strong>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <div className="pstylish color-white">
                                    <span>{this.lang.AlreadyHaveAnAccount}</span>
                                    <Link className="hyperlink-color" to={this.constants.RoutePaths.Login}>{this.lang.Login}</Link>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>
            </div>
        );
    }

    model: mdSignUp;
    passwordDidNotMatch: boolean;
    constructor(props) {
        super(props);
        this.init();
    }

    init() {
        this.passwordDidNotMatch = true;
        this.model = new mdSignUp(true);
        this.state = {
            form: {
                first_name: new mdFormControl(this.model.first_name, "first_name", this.lang.FirstName, [
                    new ValidationAttributes.RequiredValidator(this.lang.RequiredFormat),
                    new ValidationAttributes.MaxLengthValidator(this.lang.MaxLengthFormat2,
                        SignUpMetaData.firstNameMaxLength),
                ]),
                last_name: new mdFormControl(this.model.last_name, "last_name", this.lang.LastName, [
                    new ValidationAttributes.RequiredValidator(this.lang.RequiredFormat),
                    new ValidationAttributes.MaxLengthValidator(this.lang.MaxLengthFormat2,
                        SignUpMetaData.lastNameMaxLength),
                ]),
                company_name: new mdFormControl(this.model.company_name, "company_name", this.lang.CompanyName),
                email: new mdFormControl(this.model.email, "email", this.lang.Email, [
                    new ValidationAttributes.MailValidator(this.lang.InvalidEmail),
                    new ValidationAttributes.MaxLengthValidator(this.lang.MaxLengthFormat2,
                        SignUpMetaData.emailMaxLength),
                ]),
                password: new mdFormControl(this.model.password, "password", this.lang.Password, [
                    new ValidationAttributes.RequiredValidator(this.lang.RequiredFormat),
                    new ValidationAttributes.RegexValidator(this.bulletList(this.lang.PasswordRequirement, this.lang.Password, SignUpMetaData.passwordMinLength,
                        SignUpMetaData.passwordMaxLength), SignUpMetaData.passwordRegex)
                ]),
                confirm_password: new mdFormControl(this.model.confirm_password, "confirm_password", this.lang.ConfirmPassword),
                // captcha: global.isDev ? null : new mdFormControl(null, "captcha", '', [
                //     new ValidationAttributes.RequiredValidator(this.lang.CapitchaErrorMessage)
                // ])
            },
            diableSubmitButton: false,
            showSubmitResponse: false,
            submitResponseClass: 'text-danger',
            submitResponse: '',
            account_type: 1,
        }
    }

    signupType = (type: number) => {
        let company_name = this.state.form.company_name as mdFormControl;
        if (this.state.account_type == 1) {
            company_name.validators = null;
        }
        else {
            company_name.validators = [
                new ValidationAttributes.RequiredValidator(this.lang.RequiredFormat),
                new ValidationAttributes.MaxLengthValidator(this.lang.MaxLengthFormat2,
                    SignUpMetaData.companyNameMaxLength),
            ]
        }
        this.updateState({
            ...this.state,
            form: {
                ...this.state.form,
                company_name,
            },
            account_type: type,
        })
    }

    onScriptLoad() {
        this.log.debug('Google reCAPTCHA loaded and is ready for use!')
    }

    onScriptError() {
        this.log.debug('Something went long when loading the Google reCAPTCHA')
    }

    matchPassword = (ev: any) => {
        if (this.showErrors) {
            if (this.state.form.password.value === this.state.form.confirm_password.value) {
                this.passwordDidNotMatch = false;
            }
            else {
                this.passwordDidNotMatch = true;
                let confirm_password = this.state.form.confirm_password as mdFormControl;
                if(confirm_password.errors)
                {
                    if(confirm_password.errors.length < 1)
                    {
                        confirm_password.errors = null;
                    }
                }
                if (!confirm_password.errors) {
                    confirm_password.errors = [StaticHelper.formatString(this.lang.DidNotMatchFormat, this.lang.Password, this.lang.ConfirmPassword)];
                    this.updateState({
                        form: {
                            ...this.state.form,
                            confirm_password
                        }
                    });
                }
            }
        }
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.showErrors = true;
        // if (this.personalForm.controls.personal_capitcha.status != "VALID" && !this.globals.isDev) {
        //     return;
        // }
        // stop here if form is invalid
        if (!this.validateForm('form')) {
            this.log.debug("invalid form");
            return;
        }

        this.matchPassword(null);
        if (this.passwordDidNotMatch) {
            return;
        }

        //everything is fine, now save the data
        this.updateState({
            submitResponse: '',
            diableSubmitButton: true
        })
        let formData: mdSignUp = this.getFormData(this.state.form) as mdSignUp;
        formData.account_type = this.state.account_type;
        formData.uuid = StaticHelper.getUUID();

        this.showMainSpinner();
        this.http.post<mdCallResponse>(this.constants.EndPoints.PostAccountRegister, formData).then((res: mdCallResponse) => {
            // this.spinner.hide();
            this.log.debug(res);
            if (res) {
                if (res.isSuccess) {
                    //signup completed, now sign in
                    let token = res.extras.token;
                    res = null;
                    var newFormData = {
                        username: formData.email,
                        password: formData.password,
                        grant_type: this.constants.GrantTypes.Password,
                        captcha: token,
                    }
                    this.http.post<mdCallResponse>(this.constants.EndPoints.PostAuthLogin, newFormData).then((res: mdCallResponse) => {
                        this.log.debug(res);
                        if (res) {
                            if (res.isSuccess) {
                                window.location.href = this.constants.RoutePaths.EmailConfirmation + "?" + this.constants.QueryParams.email + "=em";//we just need to set something in this param if we want to send email on component load
                            }
                            else {
                                this.hideSpinnerAndShowError();
                                this.props.history.push(this.constants.RoutePaths.Login);
                            }
                        }
                        else {
                            this.hideSpinnerAndShowError(this.bulletList(res.message.split("\n")));
                        }
                    }).catch(error => {
                        this.log.debug(error);
                        this.hideSpinnerAndShowError();
                    });
                }
                else {
                    this.hideSpinnerAndShowError(this.bulletList(res.message.split("\n")));
                }
            }
        }).catch(error => {
            this.log.debug(error);
            this.hideSpinnerAndShowError(this.lang.UnableToCompleteYourRequest);
        });
    }

    hideSpinnerAndShowError(message = null) {
        if (!message) {
            message = this.lang.AccountCreatedLoginToContinue;
        }
        this.hideMainSpinner();
        this.updateState({
            diableSubmitButton: false,
            showSubmitResponse: true,
            submitResponse: message
        })
    }

}