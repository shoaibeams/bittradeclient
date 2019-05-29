import React from "react";
import { Progress, Form, Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BaseComponent } from "../../base/BaseComponent";
import { mdAnimControl } from "../../../../models/anim-control";
import { Transitions } from "../../../../models/transitions";
import { TransitionState } from "../../../../enums/transition";
import { mdCallResponse } from "../../../../models/call-response";
import { mdPreferences } from "../../../../models/user-preference";
import { mdFormControl } from "../../../../shared/form-control";
import { mdCurrencyPair } from "../../../../models/currency-pair";
import { mdKeyValue } from "../../../../models/key-value";
import { mdCurrency } from "../../../../models/currency";
import RadioGroup from "antd/lib/radio/group";
import RadioButton from "antd/lib/radio/radioButton";
import FormItem from "antd/lib/form/FormItem";

export default class PreferencesComponent extends BaseComponent {
  render() {
    this.initShorts();
    let currencies = [];
    if (this.g.currencies) {
      currencies = this.g.currencies.map((cp: mdCurrency, i) => {
        return new mdKeyValue(cp.name, cp.id);
      });
    }
    let currencyPairs = [];
    if (this.g.currencyPairs) {
      currencyPairs = this.g.currencyPairs.map((cp: mdCurrencyPair, i) => {
        return new mdKeyValue(cp.fc_name + "/" + cp.tc_name, cp.id);
      });
    }
    let timeZones: mdKeyValue[] = [];
    let countries = this.g.countries;
    if (countries) {
      countries = countries.filter(c => !this.isNullOrEmpty(c.capital));
      countries.sort(a => a.timezone_offset);
      timeZones = countries.map(c => {
        let key = "(GMT";
        let timezone = c.timezone_offset;
        key += timezone < 0 ? "-" : "+";
        timezone = Math.abs(timezone);
        let hours = timezone / 60;
        let minutes = timezone % 60;
        key += hours > 9 ? hours : "0" + hours;
        key += ":";
        key += minutes > 9 ? minutes : "0" + minutes;
        key += ") " + c.capital;
        return new mdKeyValue(key, c.id);
      });
    }
    const {
      two_fa_on_order,
      two_fa_on_withdrawal,
      notify_email_on_deposit_verification,
      notify_email_on_order_execution,
      notify_email_on_withdrawal_verification
    } = this.state.form;
    return (
      <>
        <Form
          layout="horizontal"
          onSubmit={this.onSubmit}
          className="gx-w-100 gx-mb-3"
        >
          <h2>{this.lang.Preferences}</h2>
          <hr />
          {this.antd.selectFormItem(
            this.f.default_currency_id,
            currencies,
            true,
            false,
            null,
            this.formItemLayout
          )}
          {this.antd.selectFormItem(
            this.f.default_currency_pair_id,
            currencyPairs,
            true,
            false,
            null,
            this.formItemLayout
          )}
          {this.antd.selectFormItem(
            this.f.timezone_offset,
            timeZones,
            true,
            false,
            null,
            this.formItemLayout
          )}
          <h2>{this.lang.TwoFactorAuthentication}</h2>
          <hr />
          <FormItem {...this.formItemLayout} label={two_fa_on_order.title}>
            <RadioGroup
              onChange={e => {
                this.handleFormControlInput(two_fa_on_order.name, e);
              }}
              value={two_fa_on_order.value}
            >
              <RadioButton value={true}>{this.lang.Yes}</RadioButton>
              <RadioButton value={false}>{this.lang.No}</RadioButton>
            </RadioGroup>
          </FormItem>
          <FormItem {...this.formItemLayout} label={two_fa_on_withdrawal.title}>
            <RadioGroup
              onChange={e => {
                this.handleFormControlInput(two_fa_on_withdrawal.name, e);
              }}
              value={two_fa_on_withdrawal.value}
            >
              <RadioButton value={true}>{this.lang.Yes}</RadioButton>
              <RadioButton value={false}>{this.lang.No}</RadioButton>
            </RadioGroup>
          </FormItem>
          <h2>{this.lang.Notification}</h2>
          <hr />
          <FormItem
            {...this.formItemLayout}
            label={notify_email_on_deposit_verification.title}
          >
            <RadioGroup
              onChange={e => {
                this.handleFormControlInput(
                  notify_email_on_deposit_verification.name,
                  e
                );
              }}
              value={notify_email_on_deposit_verification.value}
            >
              <RadioButton value={true}>{this.lang.Yes}</RadioButton>
              <RadioButton value={false}>{this.lang.No}</RadioButton>
            </RadioGroup>
          </FormItem>
          <FormItem
            {...this.formItemLayout}
            label={notify_email_on_withdrawal_verification.title}
          >
            <RadioGroup
              onChange={e => {
                this.handleFormControlInput(
                  notify_email_on_withdrawal_verification.name,
                  e
                );
              }}
              value={notify_email_on_withdrawal_verification.value}
            >
              <RadioButton value={true}>{this.lang.Yes}</RadioButton>
              <RadioButton value={false}>{this.lang.No}</RadioButton>
            </RadioGroup>
          </FormItem>
          <FormItem
            {...this.formItemLayout}
            label={notify_email_on_order_execution.title}
          >
            <RadioGroup
              onChange={e => {
                this.handleFormControlInput(
                  notify_email_on_order_execution.name,
                  e
                );
              }}
              value={notify_email_on_order_execution.value}
            >
              <RadioButton value={true}>{this.lang.Yes}</RadioButton>
              <RadioButton value={false}>{this.lang.No}</RadioButton>
            </RadioGroup>
          </FormItem>
          <div className="gx-w-100 gx-text-center gx-mb-3">
            <Button
              htmlType="submit"
              type="primary"
              loading={this.state.disableSubmitButton}
            >
              <FontAwesomeIcon icon="save" />
              &nbsp;
              {this.lang.Save}
            </Button>
          </div>
        </Form>
      </>
    );
  }

  formItemLayout = {
    labelCol: { xs: 24, sm: 6 },
    wrapperCol: { xs: 24, sm: 14, md: 12 }
  };
  model: mdPreferences;
  previousModel: mdPreferences = null;

  constructor(props) {
    super(props);
    this.init();
  }

  init = () => {
    this.previousModel = this.g.preferences;
    this.model = this.previousModel;
    if (!this.model) {
      this.model = mdPreferences.defaultPreferences();
    }
    let state = {
      form: {
        default_currency_id: new mdFormControl(
          this.model.default_currency_id,
          "default_currency_id",
          this.lang.DefaultCurrency
        ),
        default_currency_pair_id: new mdFormControl(
          this.model.default_currency_pair_id,
          "default_currency_pair_id",
          this.lang.DefaultCurrencyPair
        ),
        two_fa_on_order: new mdFormControl(
          this.model.two_fa_on_order,
          "two_fa_on_order",
          this.lang.OnOrderExecution
        ),
        two_fa_on_withdrawal: new mdFormControl(
          this.model.two_fa_on_withdrawal,
          "two_fa_on_order",
          this.lang.OnWithdrawal
        ),
        notify_email_on_deposit_verification: new mdFormControl(
          this.model.notify_email_on_deposit_verification,
          "notify_email_on_deposit_verification",
          this.lang.OnDepositVerification
        ),
        // notify_email_on_kyc_verification: new mdFormControl(
        //   this.model.notify_email_on_kyc_verification,
        //   "notify_email_on_kyc_verification",
        //   this.lang.OnWithdrawalVerification
        // ),
        notify_email_on_order_execution: new mdFormControl(
          this.model.notify_email_on_order_execution,
          "notify_email_on_order_execution",
          this.lang.OnOrderFulfilled
        ),
        notify_email_on_withdrawal_verification: new mdFormControl(
          this.model.notify_email_on_withdrawal_verification,
          "notify_email_on_withdrawal_verification",
          this.lang.OnWithdrawalVerification
        ),
        timezone_offset: new mdFormControl(
          this.model.timezone_offset,
          "timezone_offset",
          this.lang.PreferredTimeZone
        )
      },
      disableSubmitButton: false
    };
    this.updateState(state);
  };

  afterReceivingProps = () => {
    if (this.previousModel != this.g.preferences) {
      this.init();
    }
  };

  onSubmit = e => {
    e.preventDefault();

    if (!this.validateForm()) {
      // this.antd.modalError("InValid Form");
      return;
    }
    let formData = this.getFormData(this.state.form) as mdPreferences;
    return this.updateStatePromise({
      disableSubmitButton: true
    }).then(_ => {
      return this.http
        .post<mdCallResponse>(
          this.constants.EndPoints.PostSavePreferences,
          formData
        )
        .then((res: mdCallResponse) => {
          return this.updateStatePromise({
            disableSubmitButton: false
          }).then(_ => {
            if (res.isSuccess) {
              this.successNotification(
                this.lang.SavedSuccessfully,
                this.lang.Success
              );
              this.props.updateGlobalProperty(
                global.propKeys.preferences,
                formData
              );
            } else {
              this.errorNotification(res.message, this.lang.Alert);
            }
          });
        })
        .catch(error => {
          this.log.debug(error);
          this.updateState({
            disableSubmitButton: false
          });
        });
    });
  };
}
