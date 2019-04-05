import { BaseComponent } from "../../base/BaseComponent";
import * as React from "react";
import { Link } from "react-router-dom";
import { StaticHelper } from "../../../../shared/static-helper";
import { mdFormControl } from "../../../../shared/form-control";
import { CSSTransition } from 'react-transition-group';
import { Transitions } from "../../../../models/transitions";
import { TransitionState } from "../../../../enums/transition";
import { Row, Card, Button, Switch, Radio, Col } from "antd";
import { mdKeyValue } from "../../../../models/key-value";
import { mdCurrencyPair } from "../../../../models/currency-pair";
import "./banner-component.less";

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;


export default class BannerComponent extends BaseComponent {

  render() {
    this.initShorts();
    let currencyPairs = [];
    if (this.g.currencyPairs) {
      currencyPairs = this.g.currencyPairs.map((cp: mdCurrencyPair, i) => {
        return new mdKeyValue(cp.fc_name + "/" + cp.tc_name, cp.id);
      })
    }
    let scp: any = {};
    if (this.g.selectedCurrencyPair) {
      scp = this.g.selectedCurrencyPair;
    }
    let sbh: any = {};
    if (this.g.selectedBriefHistory) {
      sbh = this.g.selectedBriefHistory;
      if (this.g.selectedCurrencyPair && this.g.selectedBriefHistory && this.f.tc.value == '') {
        this.state = {
          ...this.state,
          fcPlaceholder: this.calculatePlceholder('tc'),
        }
      }
    }
    if (sbh != this.previousHistory) {
      this.setAnimValuesForSelectedPairHistory(sbh, this.previousHistory);
      this.previousHistory = sbh;
    }
    // this.log.debug("render banner");
    return (
      <>
        {/* <Row className="gx-mb-3">
          {
            this.colmd4(this.getCPDropDown(currencyPairs, (cp) => {
              this.afterSettingCurrencyPair(cp);
            }))
          }
        </Row> */}
        <Row>
          {
            this.colmd24(
              <div className="main-page-header gx-text-center">
                <p> {this.lang.MainPageHeader}</p>
              </div>
            )
          }
          {
            this.colmd12(
              <Card className="gx-card">
                <Row>
                  {
                    this.colsm12(
                      <div className="buy-txt">{`${this.lang.Buy} ${scp.fc_name} ${this.lang.at}:`}<br />
                        {
                          this.animatedCSSDiv(sbh.current_buy, this.state.animValues.current_buy)
                        }
                        &nbsp;{scp.tc_name}<br />
                        <Link to={this.g.isLoggedIn ? this.getLink(this.constants.RoutePaths.Trade) :
                          this.getLink(this.constants.RoutePaths.Login)}>
                          <img src="/assets/images/buy-icon.png" alt={this.lang.Buy} />
                          <br />
                          {this.lang.Sell} {this.lang.Now}
                        </Link>
                      </div>

                    )
                  }
                  {
                    this.colsm12(
                      <div className="sell-txt">{`${this.lang.Sell} ${scp.tc_name} ${this.lang.at}:`}<br />
                        {
                          this.animatedCSSDiv(sbh.current_sell, this.state.animValues.current_sell)
                        }
                        &nbsp;{scp.tc_name}<br />
                        <Link to={this.g.isLoggedIn ? this.getLink(this.constants.RoutePaths.Trade) : this.getLink(this.constants.RoutePaths.Login)}>
                          <img src="/assets/images/sell-icon.png" alt={this.lang.Sell} />
                          <br />
                          {this.lang.Sell} {this.lang.Now}
                        </Link>
                      </div>
                    )
                  }
                </Row>
              </Card>
            )
          }
          {
            this.colmd12(
              <Card className="gx-card buysellwrap" title={this.lang.CurrencyCalculator}>
                <Row>
                  {
                    this.colmd12(<div className="gx-mb-3">{this.getCPDropDown(currencyPairs, (cp) => {
                      this.afterSettingCurrencyPair(cp);
                    })
                  }
                  </div>)
                  }{
                    this.colmd12(
                      <div className="gx-mb-3">
                        <RadioGroup onChange={this.buySellChange} defaultValue="buy">
                          <RadioButton value="buy">{this.lang.Buy}</RadioButton>
                          <RadioButton value="sell">{this.lang.Sell}</RadioButton>
                        </RadioGroup>
                      </div>
                    )
                  }
                </Row>
                <Row>
                  {
                    this.colmd12(
                      <>
                        <div className="buy-colors gx-mb-3">
                          <span className="holder">{scp.fc_name}</span>
                        </div>
                        {
                          this.numberWithoutFormItem(this.f.fc, true, this.state.fcStep, 0,
                            this.maxInputValue, this.calculatorInput, this.formItemLayout, this.state.fcPlaceholder)
                        }
                      </>
                    )
                  }
                  {
                    this.colmd12(
                      <>
                        <div className="sell-colors gx-mb-3">
                          <span className="holder">{scp.tc_name}</span>
                          <span>{" (" + (this.state.isBuy ? this.lang.Cost : this.lang.YouGet) + ")"}</span>
                        </div>
                        {
                          this.numberWithoutFormItem(this.f.tc, true, this.state.tcStep, 0,
                            this.maxInputValue, this.calculatorInput, this.formItemLayout, this.state.tcPlaceholder)
                        }
                      </>
                    )
                  }
                </Row>
              </Card>
            )
          }
          {/* {
            this.colmd12(
              <Card className="gx-card buysellwrap" title={this.lang.CurrencyCalculator}>
                <div>
                  <RadioGroup onChange={this.buySellChange} defaultValue="buy">
                    <RadioButton value="buy">{this.lang.Buy}</RadioButton>
                    <RadioButton value="sell">{this.lang.Sell}</RadioButton>
                  </RadioGroup>
                </div>
                <Row>
                  <Col xs={17} sm={17} md={17}>
                    {
                      this.numberWithoutFormItem(this.f.fc, false, this.state.fcStep, 0,
                        this.maxInputValue, this.calculatorInput, this.formItemLayout, this.state.fcPlaceholder)
                    }
                  </Col>
                  <Col xs={7} sm={7} md={7} className="buy-colors">
                    <span className="holder-old">{scp.fc_name}</span>
                  </Col>
                </Row>
                <Row>
                  <Col xs={24} sm={24} md={24}>
                    <h4 className="gx-mt-2">{this.state.isBuy ? this.lang.Cost : this.lang.YouGet}</h4>
                  </Col>
                </Row>
                <Row>
                  <Col xs={17} sm={17} md={17}>
                    {
                      this.numberWithoutFormItem(this.f.tc, false, this.state.tcStep, 0,
                        this.maxInputValue, this.calculatorInput, this.formItemLayout, this.state.tcPlaceholder)
                    }
                  </Col>
                  <Col xs={7} sm={7} md={7} className="sell-colors" style={{ verticalAlign: 'middle' }}>
                    <span className="holder-old">{scp.tc_name}</span>
                  </Col>
                </Row>
              </Card>
            )
          } */}
        </Row>
        </>
    );
  }

  constructor(props) {
    super(props);
    this.init();
  }

  formItemLayout = {
    inputClassName: "calculator-input"
  }

  maxInputValue: number;
  firstRun: boolean = true;
  previousHistory: any;

  init() {
    this.maxInputValue = 99999999;
    this.state = {
      form: {
        fc: new mdFormControl('', "fc"),
        tc: new mdFormControl('', "tc"),
      },
      isBuy: true,
      fcStep: 1,
      tcStep: 25,
      tcPlaceholder: 25,
      fcPlaceholder: '',
      animValues: {
        current_buy: new mdFormControl(this.getTransisition(Transitions.origional, TransitionState.Completed), 'current_buy'),
        current_sell: new mdFormControl(this.getTransisition(Transitions.origional, TransitionState.Completed), 'current_sell'),
      }
    }
    this.state = {
      ...this.state,
      fcPlaceholder: this.calculatePlceholder('tc'),
    }
  }

  buySellChange = (e) => {
    this.updateState({
      isBuy: !this.state.isBuy
    })
    this.calculatorInput('', null);
  }

  updatePlaceholder(field: string) {
    let value = this.calculatePlceholder(field);
    let obj = {};
    obj = field == 'tc' ? {
      fcPlaceholder: value
    } : {
        tcPlaceholder: value
      }
    this.updateState(obj);
  }

  calculatePlceholder(field: string)//1 for fc and 2 for tc
  {
    if (!this.g.selectedBriefHistory || !this.g.selectedCurrencyPair) {
      return;
    }
    let value: number;
    if (this.state.isBuy) {
      if (field == 'fc')//fc
      {
        value = this.state.fcPlaceholder * this.g.selectedBriefHistory.current_buy;
        value = StaticHelper.roundNumber(value, this.g.selectedCurrencyPair.tcd_scale);
      }
      else {
        value = this.state.tcPlaceholder / this.g.selectedBriefHistory.current_buy;
        value = StaticHelper.roundNumber(value, this.g.selectedCurrencyPair.fcd_scale);
      }
    }
    else {
      if (field == 'fc')//fc
      {
        value = this.state.fcPlaceholder * this.g.selectedBriefHistory.current_sell;
        value = StaticHelper.roundNumber(value, this.g.selectedCurrencyPair.tcd_scale);
      }
      else {
        value = this.state.tcPlaceholder / this.g.selectedBriefHistory.current_sell;
        value = StaticHelper.roundNumber(value, this.g.selectedCurrencyPair.fcd_scale);
      }
    }
    return value;
  }

  handleFormControlInput = (field, value) => {
    if (!value) {
      return;
    }
    let form = this.state.form;
    form[field].value = value;
    if (this.showErrors) {
      form[field] = this.validateFormControl(form[field]);
    }
    this.updateState({ form: form });
  }

  calculatorInput = (field: string, e: any) =>//1 for fc and 2 for tc
  {
    field = this.isNullOrEmpty(field) ? 'tc' : field;
    if (!e || !e.target || !this.g.selectedBriefHistory || !this.g.selectedCurrencyPair) {
      this.updatePlaceholder(field);
      return;
    }
    let value: number;
    let form = this.state.form;
    form[field].value = e.target.value;
    if (this.state.isBuy) {
      if (field == 'fc')//fc
      {
        value = form.fc.value * this.g.selectedBriefHistory.current_buy;
        value = StaticHelper.roundNumber(value, this.g.selectedCurrencyPair.tcd_scale);
        form.tc.value = value;

      }
      else {
        value = form.tc.value / this.g.selectedBriefHistory.current_buy;
        value = StaticHelper.roundNumber(value, this.g.selectedCurrencyPair.fcd_scale);
        form.fc.value = value;
      }
    }
    else {
      if (field == 'fc')//tc
      {
        value = form.fc.value * this.g.selectedBriefHistory.current_sell;
        value = StaticHelper.roundNumber(value, this.g.selectedCurrencyPair.tcd_scale);
        form.tc.value = value;
      }
      else {
        value = form.tc.value / this.g.selectedBriefHistory.current_sell;
        value = StaticHelper.roundNumber(value, this.g.selectedCurrencyPair.fcd_scale);
        form.fc.value = value;
      }
    }
    this.updateState({
      form: {
        fc: form.fc,
        tc: form.tc,
      }
    })
  }

  setAnimValuesForSelectedPairHistory(obj: any, old: any) {
    let animValues = {
      ...this.state.animValues
    };
    if (old != null) {
      //setting current buy
      if (old.id == obj.id) {
        if (old.current_buy > obj.current_buy) {
          animValues.current_buy.value = this.runTransition(Transitions.lesser);
        }
        else if (old.current_buy < obj.current_buy) {
          animValues.current_buy.value = this.runTransition(Transitions.greater);
        }
        else {
          animValues.current_buy.value = this.runTransition(Transitions.origional);
        }

        // if (animValues.current_buy.value != 'origional') {
        //     setTimeout(() => {
        //         animValues.current_buy = 'origional';
        //     }, 100);
        // }
        //setting current sell
        if (old.current_sell > obj.current_sell) {
          animValues.current_sell.value = this.runTransition(Transitions.lesser);
        }
        else if (old.current_sell < obj.current_sell) {
          animValues.current_sell.value = this.runTransition(Transitions.greater);
        }
        else {
          animValues.current_sell.value = this.runTransition(Transitions.origional);
        }

        // if (animValues.current_sell.value != 'origional') {
        //     setTimeout(() => {
        //         animValues.current_sell = 'origional';
        //     }, 100);
        // }
      }
    }
    this.state = {
      ...this.state,
      animValues: animValues,
    }
  }

  afterSettingCurrencyPair = (cp) => {
    if (!cp) {
      return;
    }
    this.props.updateGlobalProperty(global.propKeys.selectedCurrencyPair, cp);
    let obj = {
      tcStep: this.state.tcStep,
      fcStep: this.state.fcStep,
    };
    // obj.tcStep = 1 / Math.pow(10, StaticHelper.minScale(this.g.selectedCurrencyPair.tcd_scale));
    //obj.fcStep = 1 / Math.pow(10, StaticHelper.minScale(this.g.selectedCurrencyPair.fcd_scale));
    //this.updateState(obj);
    if (this.g.briefHistory) {
      let sbh = this.g.briefHistory.filter(m => m.id == cp.id);
      if (sbh.length > 0) {
        let old = this.g.selectedBriefHistory;
        // this.g.selectedBriefHistory = sbh[0];
        // this.g.selectedBriefHistory.old = old;
        this.props.updateGlobalProperty(global.propKeys.selectedBriefHistory, sbh[0]);
        // this.setAnimValuesForSelectedPairHistory(this.g.selectedBriefHistory);
      }
      this.calculatorInput('', null);
    }
  }

}