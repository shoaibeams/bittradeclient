import { BaseComponent } from "../base/BaseComponent";
import * as React from "react";
import { Link } from "react-router-dom";
import { StaticHelper } from "../../../shared/static-helper";
import { mdFormControl } from "../../../shared/form-control";
import { mdCallResponse } from "../../../models/call-response";
import { mdSignUp, SignUpMetaData } from "../../../models/sign-up";
import * as ValidationAttributes from "../../../shared/validation-attributes";
import ReCAPTCHA from "react-google-recaptcha";
import { StaticConstatns } from "../../../shared/constants";
import { Form, Input, Checkbox, Button, Icon, Progress } from "antd";
import { InputTypes } from "../../../enums/general";
import { mdAnimControl } from "../../../models/anim-control";
import { TransitionState } from "../../../enums/transition";
import { Transitions } from "../../../models/transitions";
const FormItem = Form.Item;

export class PasswordRecoveryComponent extends BaseComponent {
  render() {
    this.initShorts();
    return (
      <>
        <div
          className="gx-login-container"
          style={{ overflow: "auto", paddingBottom: "120px" }}
        >
          <div
            className="gx-login-content"
            style={{ maxWidth: "500px", margin: "unset" }}
          >
            <div className="gx-login-header">
              <img
                className=""
                src="/assets/images/footer-logo.png"
                width={180}
                height={88}
              />
            </div>
            <div className="gx-login-header">
              <h1 className="gx-login-title">{this.lang.PasswordRecovery}</h1>
            </div>
            {this.state.tokenVerified ? (
              <div>
                <div className="gx-flex-row">
                  <span className="gx-mb-2 gx-mr-3">
                    {this.lang.SetNewPassword}
                  </span>
                </div>
                <Form
                  layout="vertical"
                  onSubmit={this.onSubmit}
                  className="gx-form-row0"
                >
                  {this.antd.passwordFormItem(this.f.password, false)}
                  {this.antd.passwordFormItem(this.f.confirm_password, false)}
                  <Button
                    loading={this.state.disableSubmitButton}
                    type="primary"
                    htmlType="submit"
                    disabled={this.state.disableSubmitButton}
                  >
                    {this.lang.Update}
                  </Button>
                </Form>
                {this.state.redirectToLogin ? (
                  <div className="gx-mb-2">
                    <p>
                      {this.lang.RedirectingYouToLogin +
                        " " +
                        this.state.threeDots}
                    </p>
                  </div>
                ) : null}
              </div>
            ) : (
              <div className="gx-text-center">
                <div className="gx-flex-row gx-mb-2">
                  <span>
                    {this.state.invalidToken ? (
                      <>
                        {StaticHelper.formatString(
                          this.lang.InvalidFormat,
                          this.lang.Token
                        ) +
                          ". " +
                          this.lang.Try +
                          " "}
                        <Link
                          to={this.getLink(this.constants.RoutePaths.Login)}
                        >
                          {this.lang.Login}
                        </Link>
                      </>
                    ) : (
                      this.lang.PleaseWait + " " + this.state.threeDots
                    )}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </>
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
        password: new mdFormControl(
          this.model.password,
          "password",
          this.lang.Password,
          [
            // new ValidationAttributes.RequiredValidator(this.lang.RequiredFormat),
            new ValidationAttributes.RegexValidator( //length rage
              StaticHelper.formatString(
                this.constants.Regex.RangeLength,
                SignUpMetaData.passwordMinLength,
                SignUpMetaData.passwordMaxLength
              ),
              this.lang.RangeLengthFormat2,
              SignUpMetaData.passwordMinLength,
              SignUpMetaData.passwordMaxLength
            ),
            new ValidationAttributes.RegexValidator(
              this.constants.Regex.MustContainSmallLetter, //must contain small letter
              this.lang.MustContainOneSmallLetterFormat
            ),
            new ValidationAttributes.RegexValidator(
              this.constants.Regex.MustContainCapitalLetter, //must contain capital letter
              this.lang.MustContainOneCapitalLetterFormat
            ),
            new ValidationAttributes.RegexValidator(
              this.constants.Regex.MustContainSpecialChar, //special char
              this.lang.MustContainOneSpecialCharFormat
            ),
            new ValidationAttributes.RegexValidator(
              this.constants.Regex.MustContainNumber, //number
              this.lang.MustContainOneNumberFormat
            )
            // new ValidationAttributes.RegexValidator(this.lang.PasswordRequirement, SignUpMetaData.passwordRegex, this.lang.Password, SignUpMetaData.passwordMinLength,
            //   SignUpMetaData.passwordMaxLength)
          ],
          "lock"
        ),
        confirm_password: new mdFormControl(
          this.model.confirm_password,
          "confirm_password",
          this.lang.ConfirmPassword,
          [],
          "lock"
        )
      },
      animValues: {
        mail_img: new mdAnimControl(
          this.getTransition(Transitions.pulse, TransitionState.Running),
          "mail_img",
          true
        )
      },
      disableSubmitButton: false,
      showSubmitResponse: false,
      submitResponseClass: "text-danger",
      submitResponse: "",
      tokenVerified: false,
      progress: 0,
      redirectToLogin: false
    };
    this.threeDots();
    this.verifyPassowrdRecoveryToken();
  }

  matchPassword = (ev: any) => {
    if (this.showErrors) {
      if (
        this.state.form.password.value ===
        this.state.form.confirm_password.value
      ) {
        this.passwordDidNotMatch = false;
      } else {
        this.passwordDidNotMatch = true;
        let confirm_password = this.state.form
          .confirm_password as mdFormControl;
        if (confirm_password.errors) {
          if (confirm_password.errors.length < 1) {
            confirm_password.errors = null;
          }
        }
        if (!confirm_password.errors) {
          confirm_password.errors = [
            StaticHelper.formatString(
              this.lang.DidNotMatchFormat,
              this.lang.Password,
              this.lang.ConfirmPassword
            )
          ];
          this.updateState({
            form: {
              ...this.state.form,
              confirm_password
            }
          });
        }
      }
    }
  };

  verifyPassowrdRecoveryToken = () => {
    this.http
      .post<mdCallResponse>(
        this.constants.EndPoints.PostAccountPasswordRecoveryToken,
        { key: this.parsedLocation.key }
      )
      .then((res: mdCallResponse) => {
        this.log.debug(res);
        let state = {};
        if (res) {
          if (res.isSuccess) {
            state = { tokenVerified: true };
          } else {
            state = { invalidToken: true };
            this.errorNotification(
              this.bulletList(res.message.split("\n")),
              this.lang.Alert
            );
          }
        }
        this.updateState({
          ...state,
          disableSubmitButton: false
        });
      })
      .catch(error => {
        if (!error) return;
        this.log.debug(error);
      });
  };

  onSubmit = e => {
    e.preventDefault();
    this.showErrors = true;

    if (!this.validateForm("form")) {
      this.log.debug("invalid form");
      return;
    }

    this.matchPassword(null);
    if (this.passwordDidNotMatch) {
      return;
    }

    //everything is fine, now save the data
    this.updateState({
      disableSubmitButton: true
    });
    let formData: mdSignUp = this.getFormData(this.state.form) as mdSignUp;
    this.http
      .post<mdCallResponse>(
        this.constants.EndPoints.PostAccountUpdatePassword,
        {
          ...formData,
          key: this.parsedLocation.key
        }
      )
      .then((res: mdCallResponse) => {
        this.log.debug(res);
        let state: any = {};
        if (res) {
          if (res.isSuccess) {
            state = { redirectToLogin: true };
            this.successNotification(res.message);
            setTimeout(() => {
              window.location.replace(
                this.getLink(this.constants.RoutePaths.Login)
              );
            }, 5 * 1000);
          } else {
            this.errorNotification(
              this.bulletList(res.message.split("\n")),
              this.lang.Alert
            );
          }
        }
        this.updateState({
          ...state,
          disableSubmitButton: false
        });
      })
      .catch(error => {
        if (!error) return;
        this.log.debug(error);
      });
  };
}

export default PasswordRecoveryComponent;
