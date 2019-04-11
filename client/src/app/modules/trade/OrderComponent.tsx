import * as React from "react";
import * as ValidationAttributes from "../../../shared/validation-attributes";
import NBSpinnerComponent from "../shared/spinner/NBSpinnerComponent";
import { BaseComponent } from "../../components/base/BaseComponent";
import { mdOrder } from "../../../models/order";
import { mdFormControl } from "../../../shared/form-control";
import { mdCallResponse } from "../../../models/call-response";
import { StaticHelper } from "../../../shared/static-helper";
import { Tabs, Card, Row, Form, Button, Col } from "antd";
import { OrderActions, CurrencyTypes } from "../../../enums/order";
import { mdKeyValue } from "../../../models/key-value";
const TabPane = Tabs.TabPane;

export default class OrderComponent extends BaseComponent {

  render() {
    this.initShorts();
    let cp = this.g.selectedCurrencyPair;
    let currencyTypeSource: mdKeyValue[] = [];
    if (!cp) {
      cp = {
        fc_name: '',
      };
    }
    else {
      currencyTypeSource.push(new mdKeyValue(cp.tc_name, CurrencyTypes.Base));
      currencyTypeSource.push(new mdKeyValue(cp.fc_name, CurrencyTypes.Quote));
    }
    let balance = "";
    if (this.action == OrderActions.buy && !this.isNullOrEmpty(this.state.buyBalance)) {
      balance = this.state.buyBalance
    }
    else
      if (this.action == OrderActions.sell && !this.isNullOrEmpty(this.state.sellBalance)) {
        balance = this.state.sellBalance
      }
    let amountStep = 1;
    if (this.f.amountCurrency.value == CurrencyTypes.Base) {
      amountStep = this.state.tcStep;
    }
    else if (this.f.amountCurrency.value == CurrencyTypes.Quote) {
      amountStep = this.state.fcStep;
    }
    return (
      <>
        {/* <Row>
          {
            this.colmd12( */}
        <Card className="gx-card"
          title={OrderActions[this.action] + " " + cp.fc_name}>

          <Form onSubmit={this.onSubmit} className="gx-signin-form gx-form-row0">
            {
              this.getLabelAndValueRow(this.lang.Balance + ":",
                <span className="gx-mb-2 gx-text-primary gx-font-weight-semi-bold gx-fs-lg">
                  {balance}
                </span>)
            }
            {/* <Row>
              <Col {...this.formItemLayout.labelCol} style={{ textAlign: 'right', paddingLeft: 0 }}>
                <label style={{ }}>{this.lang.Balance + ":"}</label>
              </Col>
              <Col {...this.formItemLayout.wrapperCol} style={{ textAlign: 'right', paddingRight: 0 }}>
                <p className="gx-mb-2 gx-text-primary gx-font-weight-semi-bold gx-fs-lg">
                  {balance}
                </p>
              </Col>
            </Row> */}
            {
              this.antd.numberFormItem(this.f.price, true, this.state.tcStep, 0, 9999999, this.priceAmountKeyup, this.formItemLayout)
            }
            {
              this.antd.numberWithDropDownFormItem(this.f.amount, this.f.amountCurrency, currencyTypeSource, this.priceAmountKeyup,
                true, amountStep, 0, 9999999, currencyTypeSource.length < 1, this.priceAmountKeyup, this.formItemLayout)
            }
            {
              this.getLabelAndValueRow(this.lang.Gross + ":", this.state.limitGrossAmount)
            }
            {
              this.getLabelAndValueRow(this.lang.Fee + ":", this.state.limitFeeAmount)
            }
            {
              this.getLabelAndValueRow(this.lang.Total + ":", this.state.limitTotalAmount)
            }
            {
              <Button loading={this.state.disableSubmitButton}
                type={this.action == OrderActions.buy ? "primary" : "danger"}
                htmlType="submit"
                style={{
                  backgroundColor: '#ff4d4f',
                  color: 'white'
                }}
                className="gx-w-100">
                <img src={this.action == OrderActions.buy ? "/assets/images/buy-icon.png" :
                  "/assets/images/sell-icon.png"}
                  style={{ width: '30px', marginRight: '15px' }}
                  alt={this.action == OrderActions.buy ? this.lang.Buy : this.lang.Sell} />
                <span>{this.action == OrderActions.buy ? this.lang.Buy : this.lang.Sell}</span>
              </Button>
            }
          </Form>
        </Card>
        {/* )
          }
        </Row> */}
      </>
    );
  }

  getLabelAndValueRow(label, value) {
    if (this.isNullOrEmpty(value)) {
      value = <>&nbsp;</>
    }
    return (
      <Row>
        <Col {...this.formItemLayout.labelCol} style={{ textAlign: 'right', paddingLeft: 0 }}>
          <label style={{}}>{label}</label>
        </Col>
        <Col {...this.formItemLayout.wrapperCol} style={{ textAlign: 'right', paddingRight: 0 }}>
          <p className="gx-mb-2 gx-text-primary gx-font-weight-semi-bold gx-fs-lg">
            {value}
          </p>
        </Col>
      </Row>
    );
  }

  formItemLayout = {
    labelAlign: 'right',
    labelCol: {
      xs: { span: 6 },
      sm: { span: 6 },
      md: { span: 7 },
      style: {
        // paddingLeft: 0,
        // paddingRight: 0,
        textAlign: 'right'
      }
    },
    wrapperCol: {
      xs: { span: 18 },
      sm: { span: 18 },
      md: { span: 17 },
      style: {
        paddingLeft: 0,
        paddingRight: 0,
      }
    },
  };
  model: mdOrder;
  action: OrderActions;

  constructor(props) {
    super(props);
    this.init();
  }

  resetForm = (e?) => {
    let defaultPrice = '';
    if (this.g.selectedBriefHistory) {
      defaultPrice = this.g.selectedBriefHistory.last;
    }
    let state = {
      form: {
        price: new mdFormControl(defaultPrice, "price", this.lang.Price, [
          new ValidationAttributes.RequiredValidator(this.lang.RequiredFormat),
        ]),
        amount: new mdFormControl('', "amount", this.lang.Amount, [
          new ValidationAttributes.RequiredValidator(this.lang.RequiredFormat),
        ]),
        amountCurrency: new mdFormControl(CurrencyTypes.Base, "amountCurrency"),
        showErrors: false,
      },
      showSpinner: true,
      limitGrossAmount: "",
      limitTotalAmount: "",
      limitFeeAmount: "",
      tcStep: 1,
      fcStep: 1,
      disableSubmitButton: false,
    }
    if (!e) {
      this.state = {
        ...this.state,
        ...state
      }
    }
    else {
      this.updateState(state);
    }
  }

  init = () => {
    this.action = this.p.action;
    this.resetForm();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps != this.props) {
      this.initShorts();
      if (StaticHelper.isNullOrEmpty(this.f.price.value) && this.g.selectedBriefHistory) {
        let last = this.g.selectedBriefHistory.last;
        if (last) {
          this.handleFormControlInputWithValue(this.f.price.name, last)
        }
      }
      this.updateBalances();
    }
  }

  componentWillUpdate() {
    // if (!this.g.selectedCurrencyPair) {
    //   this.recievedNewChanges(this.g.selectedCurrencyPair);
    // }
  }

  recievedNewChanges = (newCP) => {
    // this.log.debug("recievedNewChanges");
    // if (!newCP) {
    //   return;
    // }
    // let oldCP = this.currencyPair;
    // if (oldCP) {
    //   if (oldCP.id == newCP.id) {
    //     return;
    //   }
    // }
    // this.currencyPair = newCP;
    // if (this.currencyPair) {
    //   this.state = {
    //     ...this.state,
    //     showSpinner: true,
    //   }
    //   // this.loadBalanceAndFee();
    // }
  }

  updateBalances = () => {
    let cpDetails = this.p.currencyPairDetails
    let cp = this.g.selectedCurrencyPair;
    if (!cpDetails || !cp) {
      return;
    }
    let feeAmount = this.action == OrderActions.buy ? cpDetails.buy_fee : cpDetails.sell_fee;
    let sellBalance = cpDetails.fc_available_balance ? (cpDetails.fc_available_balance / this.constants.Float)
      .toFixed(cpDetails.fc_scale) : '';
    let buyBalance = cpDetails.tc_available_balance ? (cpDetails.tc_available_balance / this.constants.Float)
      .toFixed(cpDetails.tc_scale) : '';
    this.updateState({
      sellBalance: sellBalance + " " + cp.fc_name,
      buyBalance: buyBalance + " " + cp.tc_name,
      tcStep: 1 / Math.pow(10, StaticHelper.minScale(cpDetails.tc_scale)),
      fcStep: 1 / Math.pow(10, StaticHelper.minScale(cpDetails.fc_scale)),
    })
  }

  onSubmit = (e) => {
    e.preventDefault();
    //validate form locally

    if (!this.validateForm("form")) {
      return;
    }

    let formData = this.getFormData(this.state.form) as mdOrder;
    if (this.state.form.amountCurrency.value == CurrencyTypes.Base) {
      formData.amount = formData.amount / formData.price;
    }
    formData.action = this.action;
    formData.currencyPair = this.g.selectedCurrencyPair.id;
    formData.type = this.constants.Order.Type.limit;
    this.updateState({
      disableSubmitButton: true,
    });
    this.http.post<mdCallResponse>(this.constants.EndPoints.PostOrder, formData).then((res: mdCallResponse) => {
      this.log.debug(res);
      if (res.isSuccess) {
        this.successNotification(this.lang.Success, res.message);
        this.p.onNewOrder();
        this.resetForm({});
        // this.loadBalanceAndFee();
      }
      else {
        this.errorNotification(this.lang.ErrorOccured, res.message);
      }
      this.updateState({
        disableSubmitButton: false,
      })
    }).catch((error) => {
      this.log.debug(error);
      this.updateState({
        disableSubmitButton: false,
      })
    });
  }

  priceAmountKeyup = (name, e) => {
    let cpDetails = this.p.currencyPairDetails;
    let cp = this.g.selectedCurrencyPair;
    if (!cpDetails || !cp) {
      return;
    }
    let f: any;
    f = this.state.form;
    let grossAmount = f.price.value * f.amount.value;
    if (f.amountCurrency.value == CurrencyTypes.Base) {
      grossAmount = f.amount.value;
    }
    if (!grossAmount) {
      grossAmount = 0;
    }
    if (this.action == OrderActions.buy) {
      let feeAmount = grossAmount * (StaticHelper.unfloatAmount(cpDetails.buy_fee) / 100);
      let totalAmount = grossAmount + feeAmount;
      let fee = StaticHelper.bestScale(feeAmount)
      this.updateState({
        limitFeeAmount: this.emptyNaN(fee) + " " + cp.tc_name,
        limitGrossAmount: this.emptyNaN(StaticHelper.bestScale(grossAmount)) + " " + cp.tc_name,
        limitTotalAmount: this.emptyNaN(totalAmount.toFixed(StaticHelper.minScale(cpDetails.tc_scale))) + " " + cp.tc_name,
      })
    }
    else {
      let feeAmount = grossAmount * (StaticHelper.unfloatAmount(cpDetails.sell_fee) / 100);
      let totalAmount = grossAmount + feeAmount;
      this.log.debug('gm', grossAmount);
      this.updateState({
        limitFeeAmount: this.emptyNaN(StaticHelper.bestScale(feeAmount)) + " " + cp.tc_name,
        limitGrossAmount: this.emptyNaN(StaticHelper.bestScale(grossAmount)) + " " + cp.tc_name,
        limitTotalAmount: this.emptyNaN(totalAmount.toFixed(StaticHelper.minScale(cpDetails.tc_scale))) + " " + cp.tc_name,
      })
    }
  }

}