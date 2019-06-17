import React from "react";
import { BaseComponent } from "../../components/base/BaseComponent";
import { mdOrder } from "../../../models/order";
import { mdFormControl } from "../../../shared/form-control";
import { mdCallResponse } from "../../../models/call-response";
import { StaticHelper } from "../../../shared/static-helper";
import { Card, Row, Form, Button, Col } from "antd";
import {
  OrderActions,
  OrderCurrencyTypes,
  OrderTypes
} from "../../../enums/order";
import { mdKeyValue } from "../../../models/key-value";
import { RequiredValidator } from "../../../shared/validation-attributes";

export default class OrderComponent extends BaseComponent {
  render() {
    this.initShorts();
    let cp = this.p.selectedCurrencyPair;
    
    let OrderCurrencyTypesource: mdKeyValue[] = [];
    if (!cp) {
      cp = {
        fc_name: ""
      };
    } else {
      OrderCurrencyTypesource.push(
        new mdKeyValue(cp.tc_name, OrderCurrencyTypes.Base)
      );
      OrderCurrencyTypesource.push(
        new mdKeyValue(cp.fc_name, OrderCurrencyTypes.Quote)
      );
    }
    let balance = "";
    if (
      this.action == OrderActions.buy &&
      !this.isNullOrEmpty(this.state.buyBalance)
    ) {
      balance = this.state.buyBalance;
    } else if (
      this.action == OrderActions.sell &&
      !this.isNullOrEmpty(this.state.sellBalance)
    ) {
      balance = this.state.sellBalance;
    }
    let amountStep = 1;
    if (this.f.amountCurrency.value == OrderCurrencyTypes.Base) {
      amountStep = this.state.tcStep;
    } else if (this.f.amountCurrency.value == OrderCurrencyTypes.Quote) {
      amountStep = this.state.fcStep;
    }
    return (
      <>
        {/* <Row>
          {
            this.colmd12( */}
        <Card
          className="gx-card"
          title={OrderActions[this.action] + " " + cp.fc_name}
        >
          <Form
            onSubmit={this.onSubmit}
            className="gx-signin-form gx-form-row0"
          >
            {this.getLabelAndValueRow(
              this.lang.Balance + ":",
              <span className="gx-mb-2 gx-text-primary gx-font-weight-semi-bold gx-fs-lg">
                {balance}
              </span>
            )}
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
            {this.antd.numberFormItem(
              this.f.price,
              true,
              this.state.tcStep,
              0,
              9999999,
              this.priceAmountKeyup,
              this.formItemLayout
            )}
            {this.antd.numberWithDropDownFormItem(
              this.f.amount,
              this.f.amountCurrency,
              OrderCurrencyTypesource,
              this.priceAmountKeyup,
              true,
              amountStep,
              0,
              9999999,
              OrderCurrencyTypesource.length < 1,
              this.priceAmountKeyup,
              this.formItemLayout
            )}
            {this.getLabelAndValueRow(
              this.lang.Gross + ":",
              this.state.limitGrossAmount
            )}
            {this.getLabelAndValueRow(
              this.lang.Fee + ":",
              this.state.limitFeeAmount
            )}
            {this.getLabelAndValueRow(
              this.lang.Total + ":",
              this.state.limitTotalAmount
            )}
            {this.getLabelAndValueRow(
              this.lang.YouGet + ":",
              this.state.youGet
            )}
            {
              <Button
                loading={this.state.disableSubmitButton}
                type={this.action == OrderActions.buy ? "primary" : "danger"}
                htmlType="submit"
                style={{
                  backgroundColor: "#ff4d4f",
                  color: "white"
                }}
                className="gx-w-100"
              >
                <img
                  src={
                    this.action == OrderActions.buy
                      ? "/assets/images/buy-icon.png"
                      : "/assets/images/sell-icon.png"
                  }
                  style={{ width: "30px", marginRight: "15px" }}
                  alt={
                    this.action == OrderActions.buy
                      ? this.lang.Buy
                      : this.lang.Sell
                  }
                />
                <span>
                  {this.action == OrderActions.buy
                    ? this.lang.Buy
                    : this.lang.Sell}
                </span>
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
      value = <>&nbsp;</>;
    }
    return (
      <Row>
        <Col
          {...this.formItemLayout.labelCol}
          style={{ textAlign: "right", paddingLeft: 0 }}
        >
          <label style={{}}>{label}</label>
        </Col>
        <Col
          {...this.formItemLayout.wrapperCol}
          style={{ textAlign: "right", paddingRight: 0 }}
        >
          <p className="gx-mb-2 gx-text-primary gx-font-weight-semi-bold gx-fs-lg">
            {value}
          </p>
        </Col>
      </Row>
    );
  }

  formItemLayout = {
    labelAlign: "right",
    labelCol: {
      xs: { span: 6 },
      sm: { span: 6 },
      md: { span: 7 },
      style: {
        // paddingLeft: 0,
        // paddingRight: 0,
        textAlign: "right"
      }
    },
    wrapperCol: {
      xs: { span: 18 },
      sm: { span: 18 },
      md: { span: 17 },
      style: {
        paddingLeft: 0,
        paddingRight: 0
      }
    }
  };
  model: mdOrder;
  action: OrderActions;
  previousCP: any;
  previousLast: number;

  constructor(props) {
    super(props);
    this.init();
  }

  resetForm = (e?) => {
    let defaultPrice = "";
    if (this.g.selectedBriefHistory) {
      defaultPrice = this.g.selectedBriefHistory.last;
    }
    let state = {
      form: {
        price: new mdFormControl(defaultPrice, "price", this.lang.Price, [
          new RequiredValidator(this.lang.RequiredFormat)
        ]),
        amount: new mdFormControl("", "amount", this.lang.Amount, [
          new RequiredValidator(this.lang.RequiredFormat)
        ]),
        amountCurrency: new mdFormControl(
          OrderCurrencyTypes.Base,
          "amountCurrency"
        ),
        showErrors: false
      },
      showSpinner: true,
      limitGrossAmount: "",
      limitTotalAmount: "",
      limitFeeAmount: "",
      tcStep: 1,
      fcStep: 1,
      disableSubmitButton: false,
      cp: this.p.selectedCurrencyPair
    };
    this.updateState(state, () => {
      this.updateBalances();
    });
  };

  init = () => {
    this.action = this.p.action;
    this.resetForm();
  };

  afterReceivingProps = newProps => {
    if (newProps) {
      if (this.g.selectedBriefHistory) {
        let last = this.g.selectedBriefHistory.last;
        let price = this.f.price as mdFormControl;
        if (
          ((!price.value || price.value == this.previousLast) &&
            this.isNullOrEmpty(this.f.amount.value)) ||
          this.previousCP != this.p.selectedCurrencyPair
        ) {
          this.handleFormControlInputWithValue(this.f.price.name, last);
        }
        this.previousLast = last;
      }
      this.updateBalances();
      if (this.previousCP) {
        if (this.previousCP.id == this.p.selectedCurrencyPair.id) {
          return;
        }
      }
      this.previousCP = this.p.selectedCurrencyPair;
    }
  };

  updateBalances = () => {
    let cpDetails = this.p.currencyPairDetails;
    let cp = this.p.selectedCurrencyPair;
    if (!cpDetails || !cp) {
      return;
    }
    let feeAmount =
      this.action == OrderActions.buy ? cpDetails.buy_fee : cpDetails.sell_fee;
    let sellBalance = cpDetails.fc_available_balance
      ? (cpDetails.fc_available_balance / this.constants.Float).toFixed(
          cpDetails.fc_scale
        )
      : "0";
    let buyBalance = cpDetails.tc_available_balance
      ? (cpDetails.tc_available_balance / this.constants.Float).toFixed(
          cpDetails.tc_scale
        )
      : "0";
    this.updateState({
      sellBalance: sellBalance + " " + cp.fc_name,
      buyBalance: buyBalance + " " + cp.tc_name,
      tcStep: 1 / Math.pow(10, StaticHelper.minScale(cpDetails.tc_scale)),
      fcStep: 1 / Math.pow(10, StaticHelper.minScale(cpDetails.fc_scale))
    });
  };

  onSubmit = e => {
    e.preventDefault();
    //validate form locally

    if (!this.validateForm("form")) {
      return;
    }

    let formData = this.getFormData(this.state.form) as mdOrder;
    if (this.state.form.amountCurrency.value == OrderCurrencyTypes.Base) {
      formData.amount = formData.amount / formData.price;
    }
    formData.action = this.action;
    formData.currencyPair = this.p.selectedCurrencyPair.id;
    formData.type = OrderTypes.limit;
    if (!formData.currencyPair) {
      this.antd.modalError(this.lang.Error);
      return;
    }
    this.updateState({
      disableSubmitButton: true
    });
    this.http
      .post<mdCallResponse>(this.constants.EndPoints.PostOrder, formData)
      .then((res: mdCallResponse) => {
        this.log.debug(res);
        if (res.isSuccess) {
          this.successNotification(res.message, this.lang.Success);
          this.p.onNewOrder();
          this.resetForm({});
          // this.loadBalanceAndFee();
        } else {
          this.errorNotification(res.message, this.lang.ErrorOccured);
        }
        this.updateState({
          disableSubmitButton: false
        });
      })
      .catch(error => {
        this.log.debug(error);
        this.updateState({
          disableSubmitButton: false
        });
      });
  };

  priceAmountKeyup = (name, e) => {
    let cpDetails = this.p.currencyPairDetails;
    let cp = this.p.selectedCurrencyPair;
    if (!cpDetails || !cp) {
      return;
    }
    let f: any;
    f = this.state.form;
    let grossAmount = f.price.value * f.amount.value;
    if (f.amountCurrency.value == OrderCurrencyTypes.Base) {
      grossAmount = f.amount.value;
    }
    if (typeof grossAmount !== "number") {
      grossAmount = 0;
    }
    if (!grossAmount) {
      grossAmount = 0;
    }
    if (this.action == OrderActions.buy) {
      let feeAmount =
        grossAmount * (StaticHelper.unfloatAmount(cpDetails.buy_fee) / 100);
      let totalAmount = grossAmount + feeAmount;
      let fee = StaticHelper.bestScale(feeAmount);
      let youGet: any = f.amount.value;
      if (f.amountCurrency.value == OrderCurrencyTypes.Base) {
        youGet = f.amount.value / f.price.value;
      }
      if (youGet > 0) {
        youGet = StaticHelper.bestScale(youGet);
      }

      this.updateState({
        youGet: youGet + " " + cp.fc_name,
        limitFeeAmount: this.emptyNaN(fee) + " " + cp.tc_name,
        limitGrossAmount:
          this.emptyNaN(StaticHelper.bestScale(grossAmount)) + " " + cp.tc_name,
        limitTotalAmount:
          this.emptyNaN(
            totalAmount.toFixed(StaticHelper.minScale(cpDetails.tc_scale))
          ) +
          " " +
          cp.tc_name
      });
    } else {
      let feeAmount =
        grossAmount * (StaticHelper.unfloatAmount(cpDetails.sell_fee) / 100);
      let totalAmount = grossAmount + feeAmount;
      let youGet: any = f.amount.value;
      if (f.amountCurrency.value == OrderCurrencyTypes.Quote) {
        youGet = f.amount.value * f.price.value;
      }
      if (youGet > 0) {
        youGet = StaticHelper.bestScale(youGet);
      }
      this.updateState({
        youGet: youGet + " " + cp.tc_name,
        limitFeeAmount:
          this.emptyNaN(StaticHelper.bestScale(feeAmount)) + " " + cp.tc_name,
        limitGrossAmount:
          this.emptyNaN(StaticHelper.bestScale(grossAmount)) + " " + cp.tc_name,
        limitTotalAmount:
          this.emptyNaN(
            totalAmount.toFixed(StaticHelper.minScale(cpDetails.tc_scale))
          ) +
          " " +
          cp.tc_name
      });
    }
  };
}
