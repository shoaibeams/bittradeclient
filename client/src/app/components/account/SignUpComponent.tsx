
import { BaseComponent } from "../base/BaseComponent";
import * as React from "react";
import { Link } from "react-router-dom";
import { StaticHelper } from "../../../shared/static-helper";
import { mdFormControl } from "../../../shared/form-control";
import { mdSignUp, SignUpMetaData } from "../../../models/sign-up";
import * as ValidationAttributes from "../../../shared/validation-attributes"
import { mdCallResponse } from "../../../models/call-response";
import { Form, Tabs, Button, Row } from "antd";
import { AccountTypes } from "../../../enums/general";
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

export default class SignUpComponent extends BaseComponent {

  render() {
    this.initShorts();
    let formItems = () => {
      return (
        <Form onSubmit={this.onSubmit} className="gx-login-form gx-form-row0" style={{ maxWidth: 'unset' }}>
          <Row>
            {
              this.colmd12(this.textFormItem(this.f.first_name, false), true, false)
            }
            {
              this.colmd12(this.textFormItem(this.f.last_name, false), false, true)
            }
          </Row>
          {/* {
            this.textFormItem(this.f.first_name, false)
          }
          {
            this.textFormItem(this.f.last_name, false)
          } */}
          {
            this.state.account_type == AccountTypes.Business ?
              this.textFormItem(this.f.company_name, false) : (null)

          }
          {
            this.textFormItem(this.f.email, false)
          }
          <Row>
            {
              this.colmd12(this.passwordFormItem(this.f.password, false), true, false)
            }
            {
              this.colmd12(this.passwordFormItem(this.f.confirm_password, false), false, true)
            }
          </Row>
          {/* {
            this.passwordFormItem(this.f.password, false)
          }
          {
            this.passwordFormItem(this.f.confirm_password, false)
          } */}
          {
            this.checkboxFormItem(this.f.agreement,
              <>
                {this.lang.IAgree}
                <Link className="gx-login-form-forgot" to={this.getLink(this.constants.RoutePaths.Home)}>
                  {this.lang.TermsOfUse}</Link>
              </>
            )
          }
          <Button loading={this.state.disableSubmitButton}
            type="primary"
            htmlType="submit"
            disabled={this.state.disableSubmitButton}
            className="gx-w-100">
            {this.lang.CreateAccount}
          </Button>
        </Form>
      );
    }
    return (
      <>
        <div className="gx-text-center">
          <img className="gx-mt-2"
            src="/assets/images/footer-logo.png"
            width={180}
            height={88}></img>
        </div>
        <div className="gx-login-container" style={{ overflow: 'auto', paddingBottom: '120px' }}>
          <div className="gx-login-content" style={{ maxWidth: '500px' }}>
            <div className="gx-login-header gx-text-center">
              <h1 className="gx-login-title">{this.lang.CreateAccount}</h1>
            </div>
            <Tabs defaultActiveKey={AccountTypes.Inidvidual.toString()} onChange={(e) => {
              this.signupType(parseInt(e));
            }}>
              <TabPane tab={
                <>
                  <img src="/assets/images/u-icon.png" alt="Individual" />
                  &nbsp;
                                    {this.lang.Individual}
                </>
              } key={AccountTypes.Inidvidual.toString()}>{formItems()}</TabPane>
              <TabPane tab={
                <>
                  <img src="/assets/images/b-icon.png" alt={this.lang.Business} />
                  &nbsp;
                                   {this.lang.Business}
                </>
              } key={AccountTypes.Business.toString()}>
                {formItems()}
              </TabPane>
            </Tabs>
            <div className="gx-flex-row">
              <span className="gx-mb-2 gx-mr-3">{this.lang.AlreadyHaveAnAccount}</span>
              <Link to={this.getLink(this.constants.RoutePaths.Login)}>{this.lang.Login}</Link>
            </div>
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
      ...this.state,
      form: {
        first_name: new mdFormControl(this.model.first_name, "first_name", this.lang.FirstName, [
          new ValidationAttributes.RequiredValidator(this.lang.RequiredFormat),
          new ValidationAttributes.MaxLengthValidator(this.lang.MaxLengthFormat2,
            SignUpMetaData.firstNameMaxLength),
        ], "user"),
        last_name: new mdFormControl(this.model.last_name, "last_name", this.lang.LastName, [
          new ValidationAttributes.RequiredValidator(this.lang.RequiredFormat),
          new ValidationAttributes.MaxLengthValidator(this.lang.MaxLengthFormat2,
            SignUpMetaData.lastNameMaxLength),
        ], "user"),
        company_name: new mdFormControl(this.model.company_name, "company_name", this.lang.CompanyName,
          [], "briefcase"),
        email: new mdFormControl(this.model.email, "email", this.lang.Email, [
          new ValidationAttributes.MailValidator(this.lang.InvalidEmail),
          new ValidationAttributes.MaxLengthValidator(this.lang.MaxLengthFormat2,
            SignUpMetaData.emailMaxLength),
        ], "envelope"),
        password: new mdFormControl(this.model.password, "password", this.lang.Password, [
          // new ValidationAttributes.RequiredValidator(this.lang.RequiredFormat),
          new ValidationAttributes.RegexValidator(this.lang.RangeLengthFormat2,//length rage
            StaticHelper.formatString(this.constants.Regex.RangeLength, SignUpMetaData.passwordMinLength,
              SignUpMetaData.passwordMaxLength), SignUpMetaData.passwordMinLength,
            SignUpMetaData.passwordMaxLength),
          new ValidationAttributes.RegexValidator(this.lang.MustContainOneSmallLetterFormat,//must contain small letter
            this.constants.Regex.MustContainSmallLetter),
          new ValidationAttributes.RegexValidator(this.lang.MustContainOneCapitalLetterFormat,//must contain capital letter
            this.constants.Regex.MustContainCapitalLetter),
          new ValidationAttributes.RegexValidator(this.lang.MustContainOneSpecialCharFormat,//special char
            this.constants.Regex.MustContainSpecialChar),
          new ValidationAttributes.RegexValidator(this.lang.MustContainOneNumberFormat,//number
            this.constants.Regex.MustContainNumber),
          // new ValidationAttributes.RegexValidator(this.lang.PasswordRequirement, SignUpMetaData.passwordRegex, this.lang.Password, SignUpMetaData.passwordMinLength,
          //   SignUpMetaData.passwordMaxLength)
        ], "lock"),
        confirm_password: new mdFormControl(this.model.confirm_password, "confirm_password", this.lang.ConfirmPassword, [], "lock"),
        agreement: new mdFormControl(0, "agreement", this.lang.TermsOfUse, [
          new ValidationAttributes.RegexpValidator(this.lang.RequiredFormat, new RegExp("true")),
        ]),
        // captcha: global.isDev ? null : new mdFormControl(null, "captcha", '', [
        //     new ValidationAttributes.RequiredValidator(this.lang.CapitchaErrorMessage)
        // ])
      },
      disableSubmitButton: false,
      showSubmitResponse: false,
      submitResponseClass: 'text-danger',
      submitResponse: '',
      account_type: AccountTypes.Inidvidual,
    }
  }

  signupType = (type: number) => {
    let company_name = this.state.form.company_name as mdFormControl;
    if (type == AccountTypes.Inidvidual) {
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
      form: {
        ...this.state.form,
        company_name,
      },
      account_type: type,
    })
  }

  matchPassword = (ev: any) => {
    if (this.showErrors) {
      if (this.state.form.password.value === this.state.form.confirm_password.value) {
        this.passwordDidNotMatch = false;
      }
      else {
        this.passwordDidNotMatch = true;
        let confirm_password = this.state.form.confirm_password as mdFormControl;
        if (confirm_password.errors) {
          if (confirm_password.errors.length < 1) {
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
      disableSubmitButton: true
    })
    let formData: mdSignUp = this.getFormData(this.state.form) as mdSignUp;
    formData.account_type = this.state.account_type;
    formData.uuid = StaticHelper.getUUID();

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
                window.location.href = this.getLink(this.constants.RoutePaths.EmailConfirmation);// + "?" + this.constants.QueryParams.email + "=em";//we just need to set something in this param if we want to send email on component load
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
          this.errorNotification(res.message, this.lang.Error);
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
      disableSubmitButton: false,
      showSubmitResponse: true,
      submitResponse: message
    })
  }

}
