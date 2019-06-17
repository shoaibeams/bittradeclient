import React from "react";
import { BaseComponent } from "../../components/base/BaseComponent";
import { StaticHelper } from "../../../shared/static-helper";
import { mdCallResponse } from "../../../models/call-response";
import { OrderActions } from "../../../enums/order";
import { Table, Card } from "antd";
import { SocketCustomEvents } from "../../../enums/socket";
import { debug } from "util";

export default class RecentTradesComponent extends BaseComponent {
  recentTradesWorker;
  SubscribeToTradesFlag = false;
  cpId: number;
  constructor(props) {
    super(props);
    this.init();
    this.SubscribeToTrades();
  }

  render() {
    this.initShorts();
    return (
      <Card className="gx-card" title={this.lang.RecentTrades}>
        <Table
          className="gx-table-responsive"
          pagination={{
            simple: true,
            pageSize: 5
          }}
          columns={this.columns}
          dataSource={this.state.recentTrades}
          size="small"
        />
      </Card>
    );
  }

  SubscribeToTrades = () => {
    if (
      this.isNullOrEmpty(this.g.selectedCurrencyPair) ||
      this.SubscribeToTradesFlag
    ) {
      this.log.error(
        "SubscribeToTrades",
        this.isNullOrEmpty(this.g.selectedCurrencyPair),
        this.SubscribeToTradesFlag
      );
      return;
    }

    this.log.error("SubscribeToTrades", "subscribed");
    this.log.debug("registerEvent " + SocketCustomEvents.SubscribeToTrades);
    this.socket.registerEvent(
      SocketCustomEvents.SubscribeToTrades,
      this.onTrades
    );
    this.socket.emitEvent(
      SocketCustomEvents.SubscribeToTrades,
      this.g.selectedCurrencyPair.id
    );
    this.SubscribeToTradesFlag = true;
  };

  afterReceivingProps = () => {
    if (this.g.selectedCurrencyPair) {
      if (this.cpId) {
        if (this.cpId != this.g.selectedCurrencyPair.id) {
          this.log.error("SubscribeToTrades", "unsubscribed");
          this.socket.unregisterEvent(SocketCustomEvents.SubscribeToTrades);
          this.SubscribeToTradesFlag = false;
        }
      }
      this.cpId = this.g.selectedCurrencyPair.id;
    }
    this.SubscribeToTrades();
  };

  init() {
    if (this.g.selectedCurrencyPair) {
      this.cpId = this.g.selectedCurrencyPair.id;
    }
    this.state = {
      lastTradeId: 0,
      recentTrades: []
    };
    // // this.loadRecentTrades();
  }

  onTrades = newTrades => {
    this.log.error("newTrades", newTrades);
    let lastTradeId = this.state.lastTradeId;
    if (newTrades.length > 0) {
      lastTradeId = newTrades[0].id;
    }
    let trades = [...newTrades, ...this.state.recentTrades];
    trades = trades.map(m => {
      m["key"] = m.id;
      return m;
    });
    if (trades.length > 250) {
      trades.splice(249);
    }
    this.updateState({
      recentTrades: trades,
      lastTradeId
    });
  };

  loadRecentTrades = () => {
    if (this.g.selectedCurrencyPair) {
      this.http
        .post<mdCallResponse>(this.constants.EndPoints.PostGetTrades, {
          currency_pair_id: this.g.selectedCurrencyPair.id,
          last: this.state.lastTradeId,
          recordsPerPage: 250
        })
        .then((res: mdCallResponse) => {
          // this.startSyncingRecentTraded();
        })
        .catch(error => {
          this.log.debug(error);
          this.startSyncingRecentTraded(5 * 1000);
        });
    } else {
      this.startSyncingRecentTraded(1 * 1000);
    }
  };

  startSyncingRecentTraded = (
    timeout: number = this.constants.LoadBriefHistoryTimeout
  ) => {
    this.recentTradesWorker = setTimeout(() => {
      // this.loadRecentTrades();
    }, timeout);
  };

  componentWillUnmount = () => {
    this.socket.unregisterEvent(SocketCustomEvents.SubscribeToTrades);
    if (this.recentTradesWorker) {
      clearTimeout(this.recentTradesWorker);
      this.recentTradesWorker = null;
    }
  };

  columns = [
    {
      title: (
        <>
          {this.lang.Time} <br />
          {"(" + this.lang.Local + ")"}
        </>
      ),
      dataIndex: "timestamp",
      render: data => {
        data = StaticHelper.toLocalDate(data);
        return StaticHelper.toTimehhmmss(data);
      }
    },
    {
      title: this.lang.Action,
      dataIndex: "action",
      render: text => {
        let value = this.formatEnumValue(text, true, true);
        return (
          <span
            className={`${
              text == OrderActions[OrderActions.buy] || text == OrderActions.buy
                ? "gx-text-green"
                : "gx-text-red"
            }`}
          >
            {value}
          </span>
        );
      }
    },
    {
      title: this.lang.Price,
      dataIndex: "price",
      render: text => {
        let currency = "";
        if (this.g.selectedCurrencyPair) {
          currency = this.g.selectedCurrencyPair.tc_symbol;
        }
        let price = parseInt(text);
        return currency + price.toFixed(1);
      }
    },
    {
      title: this.lang.Volume,
      dataIndex: "amount",
      render: text => {
        return text;
      }
    }
  ];
}
