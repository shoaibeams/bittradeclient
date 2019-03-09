import { BaseComponent } from "../base/BaseComponent";
import * as React from "react";
import { Link } from "react-router-dom";
import { StaticHelper } from "../../../shared/static-helper";
import { mdFormControl } from "../../../shared/form-control";
import { mdCallResponse } from "../../../models/call-response";
import { mdSignUp, SignUpMetaData } from "../../../models/sign-up";
import * as ValidationAttributes from "../../../shared/validation-attributes"
import ReCAPTCHA from "react-google-recaptcha";
import { StaticConstatns } from "../../../shared/constants";

export default class LoginComponent extends BaseComponent {

    render() {
        this.initShorts();
        return (
            <div className="mainpage clearfix">
                <section className="signupwrap clearfix">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6 col-md-offset-3 col-sm-12">
                                <p className="h3">{this.lang.Login}</p>
                                <div className="signupbox clearfix">
                                    <ul className=" nav nav-tabs" style={{ border: 'none' }}>
                                        <li className="active">
                                            <a data-toggle="tab">
                                                <img src="assets/images/u-icon.png" alt={this.lang.Individual} />
                                                <span>{this.lang.Credentials}</span>
                                            </a>
                                        </li>
                                    </ul>
                                    <div className="tab-content">
                                        <div className="tab-pane fade in active">
                                            <form onSubmit={this.onSubmit}>
                                                <div className="row">
                                                    <div className="col-sm-12">
                                                        {
                                                            this.textFormControl(this.f.username, this.handleFormControlInput)
                                                        }
                                                    </div>
                                                    <div className="col-sm-12">
                                                        {
                                                            this.textFormControl(this.f.password, this.handleFormControlInput, true, "password")
                                                        }
                                                    </div>
                                                    {
                                                        global.isDev ? (null
                                                        ) : 
                                                        (
                                                            <div className="col-sm-12">
                                                            {
                                                                this.captchaFormControl(this.f.captcha, this.handleCaptchaInput) 
                                                            }
                                                            {/* //     <div className="form-group">
                                                            //         <ReCAPTCHA ref={this.captchaRef} className="no-form-control" sitekey={StaticConstatns.RecaptchaSiteKey} onChange={this.handleFormControlInput}/>
                                                            //         {
                                                            //             this.getErrosDiv(this.f.captcha)
                                                            //         }
                                                            //     </div> */}
                                                            </div>
                                                           )
                                                    }
                                                    <div className="col-sm-12">
                                                        <button className="signup-btn btn btn-primary">{this.lang.Login}</button>
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
                                <div className="col-sm-12 pstylish color-white">
                                    <Link className="f-fl hyperlink-color" to={this.getLink(this.constants.RoutePaths.AccountForgotPassword)}>
                                        {this.lang.ForgotPassword}
                                    </Link>
                                    <span className="f-fr">
                                        <span>{this.lang.NotJoinedBitvelocityYet}</span>
                                        <Link className="hyperlink-color" to={this.getLink(this.constants.RoutePaths.SignUp)}>{this.lang.JoinNow}</Link>
                                    </span >
                                </div >
                            </div >
                        </div >
                    </div >
                </section >
            </div >
        );
    }

    redirectURI: string;
    model: mdSignUp;
    constructor(props) {
        super(props);
        this.init();
    }

    init() {
        this.redirectURI = this.parsedLocation[this.constants.QueryParams.redirectURI];
        if (!this.redirectURI) {
            this.redirectURI = this.getLink(this.constants.RoutePaths.Trade);
        }
        this.model = new mdSignUp(true);
        this.state = {
            form: {
                username: new mdFormControl(this.model.username, "username", this.lang.UserName, [
                    new ValidationAttributes.RequiredValidator(this.lang.RequiredFormat),
                    new ValidationAttributes.MaxLengthValidator(this.lang.MaxLengthFormat2,
                        SignUpMetaData.userNameMaxLength),
                ]),
                password: new mdFormControl(this.model.password, "password", this.lang.Password, [
                    new ValidationAttributes.RequiredValidator(this.lang.RequiredFormat),
                    new ValidationAttributes.MaxLengthValidator(this.lang.MaxLengthFormat2,
                        SignUpMetaData.passwordMaxLength),
                ]),
                captcha: global.isDev ? null : new mdFormControl(null, "captcha", '', [
                    new ValidationAttributes.RequiredValidator(this.lang.CapitchaErrorMessage)
                ])
            },
            diableSubmitButton: false,
            showSubmitResponse: false,
            submitResponseClass: 'text-danger',
            submitResponse: '',
        }
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.showErrors = true;
        // let captchaToken = this.captchaRef.current.getValue();
        // this.log.info(captchaToken);
        // if (this.isNullOrEmpty(captchaToken) && !global.isDev) {
        //     return;
        // }

        if (!this.validateForm('form')) {
            this.log.debug("invalid form");
            return;
        }

        //everything is fine, now save the data
        this.updateState({
            submitResponse: '',
            diableSubmitButton: true
        })
        let formData: mdSignUp = this.getFormData(this.state.form) as mdSignUp;
        this.showMainSpinner();
        this.http.post<mdCallResponse>(this.constants.EndPoints.PostAuthLogin, formData).then((res: mdCallResponse) => {
            this.log.debug(res);
            if (res) {
                if (res.isSuccess) {
                    //signup completed, now sign in
                    if (res.extras) {
                        if (res.extras.status == this.constants.RecordStatus.PendingVerification) {
                            let emailConfirmationRout = "<a href='" + this.constants.RoutePaths.EmailConfirmation + "?" + this.constants.QueryParams.email + "=em'>" + this.lang.Here + "</a>"
                            res.message = StaticHelper.formatString(this.lang.EmailVerificationRequired, emailConfirmationRout);

                            this.hideSpinnerAndShowError(this.bulletList(res.message.split("\n")));
                        }
                        else {
                            if (this.redirectURI) {
                                window.location.href = this.redirectURI;
                            }
                            else {
                                window.location.href = this.getLink(this.constants.RoutePaths.Trade);
                            }
                        }
                    }
                }
                else {
                    this.hideSpinnerAndShowError(this.bulletList(res.message.split("\n")));
                }
            }
            this.hideMainSpinner();
        }).catch((error) => {
            this.log.debug(error);
            this.hideSpinnerAndShowError();
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