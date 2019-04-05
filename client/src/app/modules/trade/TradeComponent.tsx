
import * as React from "react";
import OrderHistoryComponent from "./OrderHistoryComponent";
import OrderComponent from "./OrderComponent";
import { BaseComponent } from "../../components/base/BaseComponent";
import { mdFormControl } from "../../../shared/form-control";
import { mdKeyValue } from "../../../models/key-value";
import { mdCurrencyPair } from "../../../models/currency-pair";
import { SelectSizes } from "../../../enums/general";
import { Select, Form, Row, Card, Pagination } from "antd";
import IconWithTextCard from "../../../components/dashboard/CRM/IconWithTextCard";
import LivePriceWidget from "../../t-components/LivePriceCard";
import { OrderActions } from "../../../enums/order";
import { mdCallResponse } from "../../../models/call-response";
import { mdProps } from "../../../models/props";
import RecentTradesComponent from "./RecentTradesComponent";
const FormItem = Form.Item;
const Option = Select.Option;

export default class TradeComponent extends BaseComponent {

  render() {
    this.initShorts();
    let currencyPairs = [];
    let sbh = this.g.selectedBriefHistory;
    if (!sbh) {
      sbh = {};
    }
    if (this.g.currencyPairs) {
      currencyPairs = this.g.currencyPairs.map((cp: mdCurrencyPair, i) => {
        return new mdKeyValue(cp.fc_name + "/" + cp.tc_name, cp.id);
      })
    }
    return (
      <>
        <Row type="flex" align="middle">
          {
            this.colmd4(this.getCPDropDown(currencyPairs, (e) => {
              if (!e) {
                return;
              }
              this.orderRef.current.recievedNewChanges(e);
            }))
          }
          {
            this.colmd4(<LivePriceWidget
              iconColor={'white'}
              cardColor="cyan"
              icon="timeline"
              title={this.lang.Last}
              subTitle={sbh.tc_symbol + (isNaN(sbh.last) ? '' : sbh.last)} />)
          }
          {
            this.colmd4(<LivePriceWidget
              iconColor={'white'}
              cardColor="teal"
              icon="long-arrow-up"
              title={this.lang.High}
              subTitle={sbh.tc_symbol + (isNaN(sbh.high) ? '' : sbh.high)} />)
          }
          {
            this.colmd4(<LivePriceWidget
              iconColor={'white'}
              cardColor="red"
              icon="long-arrow-down"
              title={this.lang.Low}
              subTitle={sbh.tc_symbol + (isNaN(sbh.low) ? '' : sbh.low)} />)
          }
          {
            this.colmd4(<LivePriceWidget
              iconColor={'white'}
              cardColor="orange"
              icon="tasks"
              title={this.lang.Volume24H}
              subTitle={sbh.tc_symbol + (isNaN(sbh.volume) ? '' : sbh.volume)} />)
          }
          {
            this.colmd4(<LivePriceWidget
              iconColor={'white'}
              cardColor="primary"
              icon="timeline-with-icons"
              title={this.lang.Change}
              subTitle={sbh.tc_symbol + (isNaN(sbh.change) ? '' : sbh.change)} />)
          }
        </Row>
        <Row>
          {
            // this.g.selectedCurrencyPair == null ? null :
            this.colmd16(
              <Row>
                {
                  this.colmd12(
                    <OrderComponent {...this.props} ref={this.orderRef} params={{
                      onNewOrder: this.newOrderCreated,
                      action: OrderActions.buy,
                      currencyPairDetails: this.state.currencyPairDetails
                    }} />)
                }
                {
                  this.colmd12(
                    <OrderComponent {...this.props} ref={this.orderRef} params={{
                      onNewOrder: this.newOrderCreated,
                      action: OrderActions.sell,
                      currencyPairDetails: this.state.currencyPairDetails
                    }} />)
                }
              </Row>)
          }
          {
            this.colmd8(<RecentTradesComponent {...this.props} />)
          }
        </Row>
        <Row>
          {
            this.colmd24(<OrderHistoryComponent {...this.props} ref={this.orderHistoryRef} />)
          }
        </Row>
      </>
    );

  }

  orderHistoryRef = React.createRef<OrderHistoryComponent>();
  orderRef = React.createRef<OrderComponent>();
  constructor(props) {
    super(props);
    this.init();
  }

  init() {
    this.state = {
      currencyPairDetails: {},
      lastTradeId: 0,
      recentTrades: []
    }
    this.loadBalanceAndFee();
  }

  newOrderCreated = () => {
    this.loadBalanceAndFee({});
    this.orderHistoryRef.current.recievedNewChanges(this.g.selectedCurrencyPair, true);
  }

  componentWillReceiveProps(nextProps: mdProps) {
    if (nextProps.globals.selectedCurrencyPair != this.g.selectedCurrencyPair) {
      this.initShorts();
      this.loadBalanceAndFee({});
    }
  }

  loadBalanceAndFee = (e?) => {
    this.updateStateWEvent({
      sellBalance: "",
      buyBalance: "",
      showSpinner: true,
    }, e);

    if (this.g.selectedCurrencyPair) {
      this.http.post<mdCallResponse>(this.constants.EndPoints.PostPairDetails, this.g.selectedCurrencyPair.id)
        .then((res: mdCallResponse) => {
          if (res.isSuccess) {
            this.updateState({
              currencyPairDetails: res.extras
            })
            // this.log.debug(res.extras);
          }
          this.updateState({
            showSpinner: false
          })
        }).catch((error) => {
          this.log.debug(error);
          this.updateState({
            showSpinner: false
          })
        });
    }
  }

}