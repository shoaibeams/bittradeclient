import * as React from "react";
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
  MaxLengthValidator
} from "../../../../../shared/validation-attributes";
import { mdAuthUsers } from "../../../../../models/auth-users";
import * as QRCode from "qrcode";
import * as speakeasy from "speakeasy";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { mdUserPhoneNumber } from "../../../../../models/user-phone-number";
import { mdCountry } from "../../../../../models/country";
import { mdKeyValue } from "../../../../../models/key-value";
import FormItem from "antd/lib/form/FormItem";
const TabPane = Tabs.TabPane;
const Step = Steps.Step;
const InputGroup = Input.Group;

export default class SavePhoneNumberComponent extends BaseComponent {
  render() {
    this.initShorts();
    const step = this.steps[this.state.currentStepIndex];
    return (
      <>
        <Row>
          {this.antd.colmd24(<div className="h2 gx-mb-3">{this.title}</div>)}
        </Row>
        <Form
          layout="horizontal"
          onSubmit={e => {
            e.preventDefault();
            if (!this.validateForm()) {
              // this.antd.modalError("InValid Form");
              return;
            }
            step.okButtonClick();
          }}
        >
          {step.component(this.state)}
          <Row className="gx-mt-3">
            <Col xs={12} className="gx-text-left">
              <Button
                disabled={this.state.disableSubmitButton}
                type={"default"}
                // disabled={this.state.currentStepIndex <= 0}
                onClick={e => {
                  e.preventDefault();
                  step.cancelButtonClick();
                }}
              >
                <FontAwesomeIcon icon={["fas", step.cancelButtonIcon]} />
                &nbsp;
                {step.cancelButtonTitle}
              </Button>
            </Col>
            <Col xs={12} className="gx-text-right">
              <Button
                loading={this.state.disableSubmitButton}
                type={"primary"}
                htmlType="submit"
              >
                {step.okButtonTitle}
                &nbsp;
                <FontAwesomeIcon icon={["fas", step.okButtonIcon]} />
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

  countryAndContact = state => {
    let countries = this.g.countries;
    countries.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
    let countriesSource = [];
    if (countries) {
      countriesSource = countries.map(m => {
        return new mdKeyValue(
          (
            <>
              <img
                src={"/assets/images/countries/4x3/" + m.iso_code2 + ".svg"}
                width={50}
                height={25}
              />
              &nbsp;
              {m.name}
              &nbsp;
              {m.calling_code}
            </>
          ),
          m.id
        );
      });
    }
    const { phone_number, country_id, code } = state.form;
    let selectedCountry = this.isNullOrEmpty(country_id.value)
      ? null
      : this.g.countries.filter(m => m.id == country_id.value)[0];
    let callingCodeCountry = new mdFormControl(
      this.isNullOrEmpty(selectedCountry)
        ? null
        : "" + selectedCountry.calling_code
    );
    callingCodeCountry.disabled = true;
    callingCodeCountry.type = InputTypes.Text;
    return (
      <>
        {this.antd.selectFormItem(
          country_id,
          countriesSource,
          true,
          false,
          null,
          this.formItemLayout
        )}
        {this.antd.textWithChildFormItem(
          phone_number,
          callingCodeCountry,
          [],
          null,
          true,
          null,
          this.formItemLayout
        )}

        {this.model.record_status == UserPhoneNumberStatuses.Verified ? (
          <>
            {this.antd.textFormItem(code, true, null, this.formItemLayout)}
            {this.resendCodeButton(UserPhoneNumberStatuses.Verified)}
          </>
        ) : null}
      </>
    );
  };

  codeVerification = state => {
    const { verification_code } = state.form;
    let phoneNumber = this.getFormData() as mdUserPhoneNumber;
    return (
      <>
        <div className="h4 gx-text-center gx-mb-3">
          {StaticHelper.formatString(
            this.lang.EnterVerificationCodeForContactPara,
            this.constants.PhoneNumberVerificationCodeLength,
            StaticHelper.getHiddenPhoneNumber(
              phoneNumber.calling_code,
              phoneNumber.phone_number
            )
          )}
        </div>
        {this.antd.textFormItem(
          verification_code,
          true,
          null,
          this.formItemLayout
        )}
        {this.resendCodeButton(UserPhoneNumberStatuses.Pending)}
      </>
    );
  };

  resendCodeButton = status => {
    return (
      <div className="h4 gx-text-center gx-mb-3">
        {this.lang.DidNotReceiveSMS + "?"}
        &nbsp;
        <Button
          disabled={this.state.disableSubmitButton}
          type={"primary"}
          htmlType="button"
          loading={this.state.reSendingCode}
          onClick={e => {
            e.preventDefault();
            this.resendCode(status);
          }}
        >
          <FontAwesomeIcon icon={["fas", "redo-alt"]} />
          &nbsp;
          {this.lang.Resend + " " + this.lang.SMS}
        </Button>
      </div>
    );
  };

  formItemLayout = {
    labelCol: { xs: 24, sm: 24, md: 8 },
    wrapperCol: { xs: 24, sm: 24, md: 12 }
  };
  model: mdUserPhoneNumber;
  title: string;
  steps: any[] = [];
  constructor(props) {
    super(props);
    this.init();
  }

  init() {
    this.steps.push({
      cancelButtonTitle: this.lang.Cancel,
      cancelButtonIcon: "times",
      cancelButtonClick: () => {
        this.notifyParent(false);
      },
      okButtonTitle: this.lang.Next,
      okButtonIcon: "arrow-right",
      okButtonClick: () => {
        this.savePhoneNumber(null).then((res: mdUserPhoneNumber) => {
          if (!res) {
            return;
          }
          if (res.record_status == UserPhoneNumberStatuses.Verified) {
            this.notifyParent(true, res);
            return;
          }
          let { country_id, phone_number, verification_code } = this.state.form;
          country_id.validators = [];
          phone_number.validators = [];
          verification_code.validators = [
            new RequiredValidator(this.lang.RequiredFormat)
          ];
          this.updateState({
            currentStepIndex: this.state.currentStepIndex + 1,
            form: {
              ...this.state.form,
              country_id,
              phone_number,
              verification_code
            }
          });
        });
      },
      component: this.countryAndContact
    });
    this.steps.push({
      cancelButtonTitle: this.lang.Back,
      cancelButtonIcon: "arrow-left",
      cancelButtonClick: () => {
        let { country_id, phone_number, verification_code } = this.state.form;
        country_id.validators = [
          new RequiredValidator(this.lang.RequiredFormat)
        ];
        phone_number.validators = [
          new RequiredValidator(this.lang.RequiredFormat)
        ];
        verification_code.validators = [];
        this.updateState({
          currentStepIndex: this.state.currentStepIndex - 1,
          form: {
            ...this.state.form,
            country_id,
            phone_number,
            verification_code
          }
        });
        this.updateState({ currentStepIndex: this.state.currentStepIndex - 1 });
      },
      okButtonTitle: this.lang.Save,
      okButtonIcon: "save",
      okButtonClick: this.verifyCode,
      component: this.codeVerification
    });
    if (this.p.phoneNumber) {
      this.model = this.p.phoneNumber;
      if (this.model.record_status == UserPhoneNumberStatuses.Verified) {
        this.title = this.lang.Update + " " + this.lang.PhoneNumber;
      } else {
        this.title = this.lang.Update + " " + this.lang.PhoneNumber;
      }
    }
    if (!this.model) {
      this.title = this.lang.Add + " " + this.lang.PhoneNumber;
      this.model = new mdUserPhoneNumber();
      let country: mdCountry = null;
      if (this.g.currencies) {
        if (this.g.user) {
          if (this.g.user.userAccount) {
            country = this.g.countries.filter(
              m => m.id == this.g.user.userAccount.country_id
            )[0];
          }
        }
      }
      if (country) {
        this.model.country_id = country.id;
      }
    }
    let currentStepIndex = this.isNullOrEmpty(this.p.currentStepIndex)
      ? 0
      : this.p.currentStepIndex;
    let placeholder = "";
    for (let i = 0; i < this.constants.PhoneNumberVerificationCodeLength; i++) {
      placeholder += "0";
    }
    let verification_code = new mdFormControl(
      this.model.verification_code,
      "verification_code",
      this.lang.Verification + " " + this.lang.Code,
      currentStepIndex > 0
        ? [new RequiredValidator(this.lang.RequiredFormat)]
        : []
    );
    verification_code.placeholder = placeholder;
    let code = new mdFormControl(
      this.model.code,
      "code",
      this.lang.Verification + " " + this.lang.Code,
      this.model.record_status == UserPhoneNumberStatuses.Verified
        ? [new RequiredValidator(this.lang.RequiredFormat)]
        : []
    );
    code.placeholder = placeholder;
    this.state = {
      form: {
        country_id: new mdFormControl(
          this.model.country_id,
          "country_id",
          this.lang.Country,
          currentStepIndex == 0
            ? [new RequiredValidator(this.lang.RequiredFormat)]
            : []
        ),
        phone_number: new mdFormControl(
          this.model.phone_number,
          "phone_number",
          this.lang.PhoneNumber,
          currentStepIndex == 0
            ? [new RequiredValidator(this.lang.RequiredFormat)]
            : []
        ),
        verification_code,
        code
      },
      currentStepIndex,
      showSubmitResponse: false,
      isSuccessSubmitResponse: false,
      submitResponse: "",
      reSendingCode: false
    };
  }

  afterReceivingProps = _ => {
    if (this.p.phoneNumber) {
      this.model = this.p.phoneNumber;
      let form = this.state.form;
      let code = form.code as mdFormControl;
      if (this.model.record_status == UserPhoneNumberStatuses.Verified) {
        code.validators = [new RequiredValidator(this.lang.RequiredFormat)];
      } else {
        code.validators = [];
      }
      if (form.code.validators.length != code.validators.length) {
        form.code = code;
        this.updateState({ form });
      }
    }
  };

  notifyParent = (success: boolean, payload = null) => {
    if (typeof this.p.onDone === "function") {
      this.p.onDone(success, payload);
    }
  };

  savePhoneNumber = _ => {
    if (!this.validateForm()) {
      // this.antd.modalError("InValid Form");
      return;
    }
    let formData = this.getFormData() as mdUserPhoneNumber;
    return this.updateStatePromise({
      disableSubmitButton: true,
      showSubmitResponse: false
    }).then(_ => {
      return this.http
        .post<mdCallResponse>(
          this.constants.EndPoints.PostSaveUserPhoneNumber,
          formData
        )
        .then((res: mdCallResponse) => {
          return this.updateStatePromise({ disableSubmitButton: false }).then(
            _ => {
              if (res.isSuccess) {
                return res.extras;
              } else {
                this.errorNotification(res.message);
                return this.updateStatePromise({
                  showSubmitResponse: true,
                  isSuccessSubmitResponse: false,
                  submitResponse: this.bulletList(res.message.split("\n"))
                }).then(_ => {
                  return null;
                });
              }
            }
          );
        })
        .catch(error => {});
    });
  };

  resendCode = status => {
    let fd = new mdUserPhoneNumber();
    fd.record_status = status;
    return this.updateStatePromise({
      reSendingCode: true,
      showSubmitResponse: false
    }).then(_ => {
      return this.http
        .post<mdCallResponse>(
          this.constants.EndPoints.PostResendSMSVerificationCode,
          fd
        )
        .then((res: mdCallResponse) => {
          return this.updateStatePromise({ reSendingCode: false }).then(_ => {
            if (res.isSuccess) {
              this.successNotification(this.lang.VerificationCodeResent);
              return true;
            } else {
              this.errorNotification(res.message);
              return this.updateStatePromise({
                showSubmitResponse: true,
                isSuccessSubmitResponse: false,
                submitResponse: this.bulletList(res.message.split("\n"))
              }).then(_ => {
                return false;
              });
            }
          });
        })
        .catch(error => {});
    });
  };

  verifyCode = () => {
    if (!this.validateForm()) {
      // this.antd.modalError("InValid Form");
      return;
    }
    let formData = this.getFormData() as mdUserPhoneNumber;
    return this.updateStatePromise({
      disableSubmitButton: true,
      showSubmitResponse: false
    }).then(_ => {
      return this.http
        .post<mdCallResponse>(
          this.constants.EndPoints.PostVerifyPhoneNumberSMSCode,
          formData
        )
        .then((res: mdCallResponse) => {
          return this.updateStatePromise({ disableSubmitButton: false }).then(
            _ => {
              if (res.isSuccess) {
                let user = this.g.user;
                if (user.userAccount) {
                  let country = this.g.countries.filter(
                    m => m.id == formData.country_id
                  )[0];
                  user.userAccount.contact_no_country_id = formData.country_id;
                  user.userAccount.calling_code = country.calling_code;
                  user.userAccount.contact_no = formData.phone_number;
                  this.props.updateGlobalProperty(global.propKeys.user, user);
                }
                this.successNotification(
                  StaticHelper.formatString(
                    this.lang.SuccessfullyFormat,
                    this.lang.Verified
                  )
                );
                formData.record_status = UserPhoneNumberStatuses.Verified;
                this.notifyParent(true, null);
              } else {
                this.errorNotification(res.message);
                return this.updateStatePromise({
                  showSubmitResponse: true,
                  isSuccessSubmitResponse: false,
                  submitResponse: this.bulletList(res.message.split("\n"))
                }).then(_ => {
                  return false;
                });
              }
            }
          );
        })
        .catch(error => {});
    });
  };
}
