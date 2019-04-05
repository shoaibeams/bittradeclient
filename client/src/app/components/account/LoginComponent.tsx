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
import { Form, Input, Checkbox, Button, Icon, } from "antd";
import { InputTypes } from "../../../enums/general";
const FormItem = Form.Item;

export class LoginComponent extends BaseComponent {

  render() {
    this.initShorts();
    // const {getFieldDecorator} = this.props.form;
    return (
      <>
        <div className="gx-app-login-wrap">
          <div className="gx-app-login-container">
            <div className="gx-app-login-main-content">
              <div className="gx-app-logo-content">
                <div className="gx-app-logo-content-bg" style={{}}>
                  <img src="/assets/images/loginpic.jpeg" alt={this.lang.CryptoCoin} />
                </div>
                <div className="gx-app-logo-wid">
                  <h1><span>{this.lang.SignIn}</span></h1>
                  <p>{this.lang.LoginPageSignupPara}</p>
                  <p>{this.lang.GetAnAccount}</p>
                </div>
                {/* <div className="gx-app-logo">
                  <img alt="BitVelocity" src="/assets/images/favicon.ico" />
                </div> */}
                <div className="gx-app-logo" style={{}}>
                  <img src="/assets/images/logo.png" alt={this.lang.CryptoCoin} />
                </div>
              </div>
              <div className="gx-app-login-content">
                <h1 style={{ textAlign: 'center' }}>{this.lang.SignIn}</h1>
                <Form onSubmit={this.onSubmit} className="gx-signin-form gx-form-row0">
                  {
                    this.textFormItem(this.f.username)
                  }
                  {
                    this.passwordFormItem(this.f.password, false)
                  }
                  <FormItem>
                    {
                      global.isDev ? (null) :
                        this.captchaFormControl(this.f.captcha, this.handleCaptchaInput)
                    }
                  </FormItem>
                  <FormItem>
                    <Button type="primary"
                      htmlType="submit"
                      disabled={this.state.diableSubmitButton}
                      loading={this.state.diableSubmitButton}>
                      {this.lang.Login}
                    </Button>
                    <span>
                      {this.lang.or + " "}
                      <Link to={this.getLink(this.constants.RoutePaths.SignUp)}>
                        {this.lang.SignUp}
                      </Link>
                    </span>
                  </FormItem>
                  <FormItem>
                    <span className="gx-signup-form-forgot gx-link">
                      {this.lang.ForgotPassword + this.lang.QuestionMark}
                    </span>
                  </FormItem>
                </Form>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="gx-login-container">
          <div className="gx-login-content">
            <div className="gx-login-header gx-text-center">
              <h1 className="gx-login-title">{this.lang.Login}</h1>
            </div>
            <Form onSubmit={this.onSubmit} className="gx-login-form gx-form-row0">
              {
                this.textFormItem(this.f.username)
              }
              {
                this.formItemInput(this.f.password, false, InputTypes.password)
              }
              <FormItem className="gx-text-center">
                <Button type="primary" htmlType="submit" loading={this.state.diableSubmitButton}>
                  {this.lang.Login}
                </Button>
              </FormItem>
            </Form>
          </div>
        </div> */}
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
        ], "user"),
        password: new mdFormControl(this.model.password, "password", this.lang.Password, [
          new ValidationAttributes.RequiredValidator(this.lang.RequiredFormat),
          new ValidationAttributes.MaxLengthValidator(this.lang.MaxLengthFormat2,
            SignUpMetaData.passwordMaxLength),
        ], "lock"),
        captcha: global.isDev ? null : new mdFormControl(null, "captcha", '', [
          new ValidationAttributes.RequiredValidator(this.lang.CapitchaErrorMessage)
        ]),
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
          this.errorNotification(this.bulletList(res.message.split("\n")), this.lang.Alert);
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

export default LoginComponent;
