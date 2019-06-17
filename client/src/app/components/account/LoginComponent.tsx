import { BaseComponent } from "../base/BaseComponent";
import React from "react";
import { Link, Redirect } from "react-router-dom";
import { StaticHelper } from "../../../shared/static-helper";
import { mdFormControl } from "../../../shared/form-control";
import { mdCallResponse } from "../../../models/call-response";
import { mdSignUp, SignUpMetaData } from "../../../models/sign-up";
import { Form, Button } from "antd";
import {
  RequiredValidator,
  MaxLengthValidator
} from "../../../shared/validation-attributes";
import { UserRecordStatuses } from "../../../enums/auth-users";
const FormItem = Form.Item;

export class LoginComponent extends BaseComponent {
  render() {
    this.initShorts();
    if (!this.g.loginChecked) {
      return null;
    }
    if (this.g.isLoggedIn) {
      return <Redirect to={this.getLink(this.constants.RoutePaths.Trade)} />;
    }
    // const {getFieldDecorator} = this.props.form;
    return (
      <>
        <div className="gx-app-login-wrap">
          <div className="gx-app-login-container">
            <div className="gx-app-login-main-content slide-in-fwd-center">
              <div className="gx-app-logo-content">
                <div className="gx-app-logo-content-bg" style={{}}>
                  <img
                    src="/assets/images/loginpic.jpeg"
                    alt={this.lang.CryptoCoin}
                  />
                </div>
                <div className="gx-app-logo-wid">
                  <h1>
                    <span>{this.lang.Login}</span>
                  </h1>
                  <p>{this.lang.LoginPageSignupPara}</p>
                  <p>{this.lang.GetAnAccount}</p>
                </div>
                <div className="gx-app-logo" style={{}}>
                  <Link to={this.getLink(this.constants.RoutePaths.Home)}>
                    <img
                      src="/assets/images/logo.png"
                      alt={this.lang.CryptoCoin}
                    />
                  </Link>
                </div>
              </div>
              <div className="gx-app-login-content">
                <h1 style={{ textAlign: "center" }}>{this.lang.Login}</h1>
                <Form
                  onSubmit={this.onSubmit}
                  className="gx-signin-form gx-form-row0"
                >
                  {this.antd.textFormItem(this.f.username)}
                  {this.antd.passwordFormItem(this.f.password, false)}
                  {this.antd.textFormItem(this.f.two_fa_code)}
                  {global.isDev ? null : (
                    <FormItem>
                      {this.captchaFormControl(
                        this.f.captcha,
                        this.handleCaptchaInput
                      )}
                    </FormItem>
                  )}
                  <FormItem>
                    <Link
                      to={this.getLink(
                        this.constants.RoutePaths.AccountForgotPassword
                      )}
                    >
                      <span className="gx-signup-form-forgot gx-link">
                        {this.lang.ForgotPassword + this.lang.QuestionMark}
                      </span>
                    </Link>
                  </FormItem>
                  <FormItem>
                    <Button
                      type="primary"
                      htmlType="submit"
                      disabled={this.state.disableSubmitButton}
                      loading={this.state.disableSubmitButton}
                      className="gx-login-login-btn"
                    >
                      {this.lang.Login}
                    </Button>
                  </FormItem>
                  <Link
                    to={this.getLink(this.constants.RoutePaths.SignUp)}
                    className="gx-login-signup"
                  >
                    {this.lang.DontHaveAccount}
                  </Link>
                </Form>
                <div className="gx-w-100">
                  {this.submitResponseDiv(
                    this.state.showSubmitResponse,
                    this.state.isSuccessSubmitResponse,
                    this.state.submitResponse
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  redirectURI: string;
  model: mdSignUp;
  constructor(props) {
    super(props);
    this.init();
  }

  init() {
    this.redirectURI = this.parsedLocation[
      this.constants.QueryParams.redirectURI
    ];
    if (!this.redirectURI) {
      this.redirectURI = this.getLink(this.constants.RoutePaths.Trade);
    }
    this.model = new mdSignUp(true);
    this.state = {
      form: {
        username: new mdFormControl(
          this.model.username,
          "username",
          this.lang.Email,
          [
            new RequiredValidator(this.lang.RequiredFormat),
            new MaxLengthValidator(
              this.lang.MaxLengthFormat2,
              SignUpMetaData.userNameMaxLength
            )
          ],
          "user"
        ),
        password: new mdFormControl(
          this.model.password,
          "password",
          this.lang.Password,
          [
            new RequiredValidator(this.lang.RequiredFormat),
            new MaxLengthValidator(
              this.lang.MaxLengthFormat2,
              SignUpMetaData.passwordMaxLength
            )
          ],
          "lock"
        ),
        two_fa_code: new mdFormControl(
          this.model.two_fa_code,
          "two_fa_code",
          this.lang.TwoFactorAuthentication + " (" + this.lang.IfEnabled + ")",
          [
            new MaxLengthValidator(
              this.lang.MaxLengthFormat2,
              SignUpMetaData.two_fa_codeMaxLength
            )
          ],
          "mobile-alt"
        ),
        captcha: global.isDev
          ? null
          : new mdFormControl(null, "captcha", "", [
              new RequiredValidator(this.lang.CapitchaErrorMessage)
            ])
      },
      disableSubmitButton: false,
      showSubmitResponse: false,
      submitResponseClass: "text-danger",
      submitResponse: ""
    };
  }

  onSubmit = e => {
    e.preventDefault();
    this.showErrors = true;
    // let captchaToken = this.captchaRef.current.getValue();
    // this.log.info(captchaToken);
    // if (this.isNullOrEmpty(captchaToken) && !global.isDev) {
    //     return;
    // }

    if (!this.validateForm("form")) {
      this.log.debug("invalid form");
      return;
    }

    //everything is fine, now save the data
    this.updateState({
      submitResponse: "",
      disableSubmitButton: true
    });
    let formData: mdSignUp = this.getFormData(this.state.form) as mdSignUp;
    this.http
      .post<mdCallResponse>(this.constants.EndPoints.PostAuthLogin, formData)
      .then((res: mdCallResponse) => {
        this.log.debug(res);
        if (res) {
          if (res.isSuccess) {
            //signup completed, now sign in
            if (res.extras) {
              if (res.extras.status == UserRecordStatuses.pendingVerification) {
                this.errorNotification(this.lang.AccountEmailIsNotVerified);
                this.hideSpinnerAndShowError(this.resendButton(false));
              } else {
                if (this.redirectURI) {
                  window.location.href = this.redirectURI;
                } else {
                  window.location.href = this.getLink(
                    this.constants.RoutePaths.Trade
                  );
                }
              }
            }
          } else {
            this.errorNotification(
              this.bulletList(res.message.split("\n")),
              this.lang.Alert
            );
            this.hideSpinnerAndShowError(
              this.bulletList(res.message.split("\n"))
            );
          }
        }
        this.hideMainSpinner();
      })
      .catch(error => {
        this.log.debug(error);
        this.hideSpinnerAndShowError();
      });
  };

  hideSpinnerAndShowError(message = null) {
    if (!message) {
      message = this.lang.AccountCreatedLoginToContinue;
    }
    this.hideMainSpinner();
    this.updateState({
      disableSubmitButton: false,
      showSubmitResponse: true,
      submitResponse: message
    });
  }

  resendButton = (loading: boolean) => {
    let emailConfirmationRout = (
      <Button
        loading={loading}
        disabled={this.state.disableResendEmailButton}
        type={"primary"}
        onClick={this.sendSignUpVerificationEmail}
      >
        {this.lang.ResendEmail}
      </Button>
    );
    return (
      <>
        {this.lang.EmailVerificationRequired}
        <br />
        {emailConfirmationRout}
      </>
    );
  };

  sendSignUpVerificationEmail = ev => {
    this.hideSpinnerAndShowError(this.resendButton(true));
    this.http
      .get<mdCallResponse>(
        this.constants.EndPoints.GetSendSignUpVerificationEmail
      )
      .then((res: mdCallResponse) => {
        if (res) {
          if (!res.isSuccess) {
            this.errorNotification(res.message);
          } else {
            // let newState = {
            //   ...this.state
            // };
            // if (ev) {
            //   newState = {
            //     ...newState,
            //     disableResendEmailButton: true
            //   };
            // }
            // newState = {
            //   ...newState,
            //   verificationEmailHeader: this.lang.VerificationEmailSentAgain
            // };
            // this.setState(newState);
            this.successNotification(res.message);
            this.props.history.push(
              this.getLink(this.constants.RoutePaths.EmailConfirmation)
            );
          }
        }
        this.updateState({
          showLoadingOnResetButton: false
        });
      })
      .catch(error => {
        this.log.debug(error);
        this.updateState({
          showLoadingOnResetButton: false
        });
      });
  };
}

export default LoginComponent;
