import React from "react";
import OrderHistoryComponent from "./OrderHistoryComponent";
import OrderComponent from "./OrderComponent";
import { BaseComponent } from "../../components/base/BaseComponent";
import { mdKeyValue } from "../../../models/key-value";
import { mdCurrencyPair } from "../../../models/currency-pair";
import { Row } from "antd";
import LivePriceWidget from "../../t-components/LivePriceCard";
import { OrderActions } from "../../../enums/order";
import RecentTradesComponent from "./RecentTradesComponent";
import { SocketCustomEvents } from "../../../enums/socket";


export default class TradingViewComponent extends BaseComponent {
  subscribedToBriefHistory = false;

  orderHistoryRef = React.createRef<OrderHistoryComponent>();
  constructor(props) {
    super(props);
    this.init();
  }

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
      });
    }
    const getOrderComponent = action => {
      return (
        <OrderComponent
          {...this.props}
          params={{
            onNewOrder: this.newOrderCreated,
            action: action,
            currencyPairDetails: this.state.currencyPairDetails,
            selectedCurrencyPair: this.state.selectedCurrencyPair
          }}
        />
      );
    };
    return (
      <>
        <Row type="flex" align="middle">
          {this.antd.colmd4(
            this.getCPDropDown(currencyPairs, cp => {
              this.loadBalanceAndFee(cp);
            })
          )}
          {this.antd.colmd4(
            <LivePriceWidget
              iconColor={"white"}
              cardColor="cyan"
              icon="timeline"
              title={this.lang.Last}
              subTitle={sbh.tc_symbol + (isNaN(sbh.last) ? "" : sbh.last)}
            />
          )}
          {this.antd.colmd4(
            <LivePriceWidget
              iconColor={"white"}
              cardColor="teal"
              icon="long-arrow-up"
              title={this.lang.High}
              subTitle={sbh.tc_symbol + (isNaN(sbh.high) ? "" : sbh.high)}
            />
          )}
          {this.antd.colmd4(
            <LivePriceWidget
              iconColor={"white"}
              cardColor="red"
              icon="long-arrow-down"
              title={this.lang.Low}
              subTitle={sbh.tc_symbol + (isNaN(sbh.low) ? "" : sbh.low)}
            />
          )}
          {this.antd.colmd4(
            <LivePriceWidget
              iconColor={"white"}
              cardColor="orange"
              icon="tasks"
              title={this.lang.Volume24H}
              subTitle={sbh.tc_symbol + (isNaN(sbh.volume) ? "" : sbh.volume)}
            />
          )}
          {this.antd.colmd4(
            <LivePriceWidget
              iconColor={"white"}
              cardColor="primary"
              icon="timeline-with-icons"
              title={this.lang.Change}
              subTitle={sbh.tc_symbol + (isNaN(sbh.change) ? "" : sbh.change)}
            />
          )}
        </Row>
        <Row>
          {this.antd.collg16(
            <Row>
              {this.antd.colmd12(getOrderComponent(OrderActions.buy))}
              {this.antd.colmd12(getOrderComponent(OrderActions.sell))}
            </Row>
          )}
          {this.antd.collg8(<RecentTradesComponent {...this.props} />)}
        </Row>
      </>
    );
  } 

  init() {
    this.state = {
      selectedCurrencyPair: this.g.selectedCurrencyPair,
      currencyPairDetails: {},
      lastTradeId: 0,
      recentTrades: []
    };
    this.loadBalanceAndFee(this.state.selectedCurrencyPair);
    this.subscribedToBriefHistory = this.SubscribeToBriefRecentHistory(this.subscribedToBriefHistory);
  }

  afterReceivingProps = () => {
    this.subscribedToBriefHistory = this.SubscribeToBriefRecentHistory(this.subscribedToBriefHistory);    
  }

  newOrderCreated = () => {
    this.loadBalanceAndFee(this.state.selectedCurrencyPair);
    this.orderHistoryRef.current.recievedNewChanges(
      this.state.selectedCurrencyPair,
      true
    );
  };

  loadBalanceAndFee = (cp: mdCurrencyPair) => {
    this.updateStateWEvent({
      sellBalance: "",
      buyBalance: "",
      showSpinner: true
    });

    // if (cp) {
    //   this.http
    //     .post<mdCallResponse>(this.constants.EndPoints.PostPairDetails, cp.id)
    //     .then((res: mdCallResponse) => {
    //       let state = {}
    //       if (res.isSuccess) {
    //         state = { currencyPairDetails: res.extras }
    //       }
    //       this.updateState({
    //         ...state,
    //         selectedCurrencyPair: cp,
    //         showSpinner: false
    //       })
    //     })
    //     .catch(error => {
    //       this.log.debug(error)
    //       this.updateState({
    //         showSpinner: false
    //       })
    //     })
    // }
  };
}
