import React from "react";
import {
  Tabs,
  Col,
  Button,
  Row,
  Input,
  Tag,
  Steps,
  Icon,
  Form,
  InputNumber
} from "antd";
import { BaseComponent } from "../../../base/BaseComponent";
import { StaticHelper } from "../../../../../shared/static-helper";
import { mdCallResponse } from "../../../../../models/call-response";
import { mdUserAccounts } from "../../../../../models/user-accounts";
import {
  TwoFactorAuthTypes,
  UserPhoneNumberStatuses,
  InputTypes
} from "../../../../../enums/general";
import { mdSignUp, SignUpMetaData } from "../../../../../models/sign-up";
import { mdFormControl } from "../../../../../shared/form-control";
import {
  RequiredValidator,
  MaxLengthValidator,
  RegexValidator
} from "../../../../../shared/validation-attributes";
import { mdAuthUsers } from "../../../../../models/auth-users";
import * as QRCode from "qrcode";
import * as speakeasy from "speakeasy";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { mdUserPhoneNumber } from "../../../../../models/user-phone-number";
import { mdCountry } from "../../../../../models/country";
import { mdKeyValue } from "../../../../../models/key-value";
import FormItem from "antd/lib/form/FormItem";
import { mdChangePassword } from "../../../../../models/change-password";
const TabPane = Tabs.TabPane;
const Step = Steps.Step;
const InputGroup = Input.Group;

export default class ChangePasswordComponent extends BaseComponent {
  render() {
    this.initShorts();
    const {
      password,
      current_password,
      confirm_password,
      two_fa_code
    } = this.state.form;
    return (
      <>
        <Row>
          {this.antd.colmd24(
            <div className="h2 gx-mb-3">{this.lang.ChangePassword}</div>
          )}
        </Row>
        <Form layout="horizontal" onSubmit={this.onSubmit}>
          {this.antd.passwordFormItem(
            current_password,
            true,
            null,
            this.formItemLayout
          )}
          {this.antd.passwordFormItem(
            password,
            true,
            null,
            this.formItemLayout
          )}
          {this.antd.passwordFormItem(
            confirm_password,
            true,
            null,
            this.formItemLayout
          )}
          {this.getUserTFA() != TwoFactorAuthTypes.None
            ? this.antd.textFormItem(
                two_fa_code,
                true,
                null,
                this.formItemLayout
              )
            : null}
          <Row className="gx-mt-3">
            <Col xs={12} className="gx-text-left">
              <Button
                disabled={this.state.disableSubmitButton}
                type={"default"}
                // disabled={this.state.currentStepIndex <= 0}
                onClick={e => {
                  e.preventDefault();
                  this.notifyParent(false);
                }}
              >
                <FontAwesomeIcon icon={["fas", "times"]} />
                &nbsp;
                {this.lang.Cancel}
              </Button>
            </Col>
            <Col xs={12} className="gx-text-right">
              <Button
                loading={this.state.disableSubmitButton}
                type={"primary"}
                htmlType="submit"
              >
                {this.lang.Save}
                &nbsp;
                <FontAwesomeIcon icon={["fas", "save"]} />
              </Button>
            </Col>
          </Row>
          <Row>
            <Col sm="12">
              {this.submitResponseDiv(
                this.state.showSubmitResponse,
                this.state.isSuccessSubmitResponse,
                this.state.submitResponse
              )}
            </Col>
          </Row>
        </Form>
      </>
    );
  }

  formItemLayout = {
    labelCol: { xs: 24, sm: 24, md: 8 },
    wrapperCol: { xs: 24, sm: 24, md: 12 }
  };
  model: mdChangePassword;
  constructor(props) {
    super(props);
    this.init();
  }

  init() {
    this.model = new mdChangePassword();
    this.state = {
      form: {
        current_password: new mdFormControl(
          this.model.current_password,
          "current_password",
          this.lang.Current + " " + this.lang.Password,
          [
            new RequiredValidator(this.lang.RequiredFormat),
            new MaxLengthValidator(
              this.lang.MaxLengthFormat2,
              SignUpMetaData.passwordMaxLength
            )
          ]
        ),
        password: new mdFormControl(
          this.model.password,
          "password",
          this.lang.New + " " + this.lang.Password,
          [
            new RequiredValidator(this.lang.RequiredFormat),
            // new ValidationAttributes.RequiredValidator(this.lang.RequiredFormat),
            new RegexValidator( //length rage
              StaticHelper.formatString(
                this.constants.Regex.RangeLength,
                SignUpMetaData.passwordMinLength,
                SignUpMetaData.passwordMaxLength
              ),
              this.lang.RangeLengthFormat2,
              SignUpMetaData.passwordMinLength,
              SignUpMetaData.passwordMaxLength
            ),
            new RegexValidator(
              this.constants.Regex.MustContainSmallLetter, //must contain small letter
              this.lang.MustContainOneSmallLetterFormat
            ),
            new RegexValidator(
              this.constants.Regex.MustContainCapitalLetter, //must contain capital letter
              this.lang.MustContainOneCapitalLetterFormat
            ),
            new RegexValidator(
              this.constants.Regex.MustContainSpecialChar, //special char
              this.lang.MustContainOneSpecialCharFormat
            ),
            new RegexValidator(
              this.constants.Regex.MustContainNumber, //number
              this.lang.MustContainOneNumberFormat
            )
            // new ValidationAttributes.RegexValidator(this.lang.PasswordRequirement, SignUpMetaData.passwordRegex, this.lang.Password, SignUpMetaData.passwordMinLength,
            //   SignUpMetaData.passwordMaxLength)
          ]
        ),
        confirm_password: new mdFormControl(
          this.model.confirm_password,
          "confirm_password",
          this.lang.ConfirmPassword,
          [new RequiredValidator(this.lang.RequiredFormat)]
        ),
        two_fa_code: new mdFormControl(
          this.model.two_fa_code,
          "two_fa_code",
          this.lang.TwoFactorAuthentication,
          this.g.preferences.two_fa_on_withdrawal
            ? [new RequiredValidator(this.lang.RequiredFormat)]
            : []
        )
      },
      showSubmitResponse: false,
      isSuccessSubmitResponse: false,
      submitResponse: "",
      reSendingCode: false
    };
  }

  afterReceivingProps = _ => {
    let two_fa_code = this.state.form.two_fa_code as mdFormControl;
    if (this.getUserTFA() != TwoFactorAuthTypes.None) {
      two_fa_code.validators = [
        new RequiredValidator(this.lang.RequiredFormat)
      ];
    } else {
      two_fa_code.validators = [];
    }
    this.updateState({ form: { ...this.state.form, two_fa_code } });
  };

  matchPassword = (ev: any) => {
    let passwordDidNotMatch = false;
    if (this.showErrors) {
      if (
        this.state.form.password.value ===
        this.state.form.confirm_password.value
      ) {
        passwordDidNotMatch = true;
      } else {
        passwordDidNotMatch = false;
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
    return passwordDidNotMatch;
  };

  notifyParent = (success: boolean, payload = null) => {
    if (typeof this.p.onDone === "function") {
      this.p.onDone(success, payload);
    }
  };

  onSubmit = e => {
    e.preventDefault();
    this.showErrors = true;

    if (!this.validateForm()) {
      return;
    }

    if (!this.matchPassword(null)) {
      return;
    }

    //everything is fine, now save the data
    let formData = this.getFormData() as mdChangePassword;
    return this.updateStatePromise({
      disableSubmitButton: true,
      showSubmitResponse: false
    })
      .then(_ => {
        return this.http
          .post<mdCallResponse>(
            this.constants.EndPoints.PostAccountChangePassword,
            formData
          )
          .then(res => {
            return this.updateStatePromise({ disableSubmitButton: false }).then(
              _ => res
            );
          })
          .then((res: mdCallResponse) => {
            this.log.debug(res);
            if (res) {
              if (res.isSuccess) {
                this.successNotification(
                  StaticHelper.formatString(
                    this.lang.SuccessfullyFormat,
                    this.lang.Password + " " + this.lang.Updated
                  )
                );
                this.notifyParent(true);
              } else {
                this.errorNotification(
                  this.bulletList(res.message.split("\n")),
                  this.lang.Alert
                );
                this.updateState({
                  showSubmitResponse: true,
                  isSuccessSubmitResponse: false,
                  submitResponse: this.bulletList(res.message.split("\n"))
                });
              }
            }
          });
      })
      .catch(error => {
        if (!error) return;
        this.log.debug(error);
      });
  };
}
