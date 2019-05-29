import React from "react";
import { BaseComponent } from "../../components/base/BaseComponent";
import { StaticHelper } from "../../../shared/static-helper";
import { mdCallResponse } from "../../../models/call-response";
import { OrderActions } from "../../../enums/order";
import { Table, Card } from "antd";

export default class RecentTradesComponent extends BaseComponent {
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

  recentTradesWorker;
  constructor(props) {
    super(props);
    this.init();
  }

  init() {
    this.state = {
      lastTradeId: 0,
      recentTrades: []
    };
    this.loadRecentTrades();
  }

  loadRecentTrades = () => {
    if (this.g.selectedCurrencyPair) {
      this.http
        .post<mdCallResponse>(this.constants.EndPoints.PostGetTrades, {
          currency_pair_id: this.g.selectedCurrencyPair.id,
          last: this.state.lastTradeId,
          recordsPerPage: 250
        })
        .then((res: mdCallResponse) => {
          if (res.isSuccess) {
            let lastTradeId = this.state.lastTradeId;
            if (res.extras.length > 0) {
              lastTradeId = res.extras[0].id;
            }
            let trades = [...res.extras, ...this.state.recentTrades];
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
          }
          this.startSyncingRecentTraded();
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
      this.loadRecentTrades();
    }, timeout);
  };

  componentWillUnmount = () => {
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
