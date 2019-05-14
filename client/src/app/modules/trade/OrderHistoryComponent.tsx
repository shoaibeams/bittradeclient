import * as React from "react";
import NBSpinnerComponent from "../shared/spinner/NBSpinnerComponent";
import { BaseComponent } from "../../components/base/BaseComponent";
import { mdOrderHistory } from "../../../models/order-history";
import { StaticHelper } from "../../../shared/static-helper";
import { mdCallResponse } from "../../../models/call-response";
import { OrderRecordStatuses } from "../../../enums/order";
import { mdOrder } from "../../../models/order";
import Widget from "../../../components/Widget/index";
import { Table, Tabs } from "antd";
const TabPane = Tabs.TabPane;

export default class OrderHistoryComponent extends BaseComponent {
  render() {
    this.initShorts();
    if (!this.currencyPair) {
      this.recievedNewChanges(this.g.selectedCurrencyPair);
    }
    let pendingOrders: mdOrderHistory[] = [];
    let previousHistory: mdOrderHistory[] = [];
    if (this.state.orders) {
      pendingOrders = this.state.orders.filter(
        m =>
          m.record_status == OrderRecordStatuses.partially_completed ||
          m.record_status ==
            OrderRecordStatuses[OrderRecordStatuses.partially_completed] ||
          m.record_status == OrderRecordStatuses.open ||
          m.record_status == OrderRecordStatuses[OrderRecordStatuses.open]
      );
      previousHistory = this.state.orders.filter(
        m =>
          m.record_status == OrderRecordStatuses.cancelled ||
          m.record_status ==
            OrderRecordStatuses[OrderRecordStatuses.cancelled] ||
          m.record_status == OrderRecordStatuses.completed ||
          m.record_status == OrderRecordStatuses[OrderRecordStatuses.completed]
      );
    }
    return (
      <Widget
        styleName="gx-order-history"
        title={
          <h2 className="h4 gx-text-capitalize gx-mb-0">
            {this.lang.OrderHistory}
          </h2>
        }
        extra={
          <p className="gx-text-primary gx-mb-0 gx-pointer">
            {this.lang.DetailedHistory}
          </p>
        }
      >
        <Tabs
          defaultActiveKey="1"
          tabPosition={this.widthLessThanmd() ? "top" : "left"}
          style={{ height: 340 }}
        >
          <TabPane tab={this.lang.PendingOrders} key="1">
            <div className="gx-table-responsive">
              <Table
                className="gx-table-no-bordered"
                columns={this.columns as any}
                dataSource={pendingOrders}
                pagination={false}
                bordered={false}
                size="small"
                scroll={{ x: 900, y: 300 }}
              />
            </div>
          </TabPane>
          <TabPane tab={this.lang.PreviousHistory} key="2">
            <div className="gx-table-responsive">
              <Table
                className="gx-table-no-bordered"
                columns={this.columns as any}
                dataSource={previousHistory}
                pagination={false}
                bordered={false}
                size="small"
                scroll={{ x: 900, y: 300 }}
              />
            </div>
          </TabPane>
        </Tabs>
      </Widget>
    );
  }

  currencyPair: any;

  constructor(props) {
    super(props);
    this.init();
  }

  init() {
    this.state = {
      orders: [],
      showSpinner: true,
      last: 0
    };
    this.currencyPair = this.g.selectedCurrencyPair;
    this.getOrderHistory();
  }

  recievedNewChanges = (newCP, isnew: boolean = false) => {
    if (!newCP) {
      return;
    }
    let oldCP = this.currencyPair;
    if (oldCP) {
      if (oldCP.id == newCP.id && !isnew) {
        return;
      }
    }
    this.currencyPair = newCP;
    this.updateState({
      showSpinner: true
    });
    this.getOrderHistory();
  };

  getOrderHistory = () => {
    if (!this.currencyPair) {
      if (this.state.showSpinner) {
        this.state = {
          ...this.state,
          showSpinner: false
        };
      }
      return;
    }
    if (this.currencyPair.id) {
      let model = {
        currencyPair: this.currencyPair.id,
        recordsPerPage: 250,
        last: this.state.last
      };
      this.http
        .post<mdCallResponse>(this.constants.EndPoints.PostOrderHistory, model)
        .then((res: mdCallResponse) => {
          this.log.debug(res);
          if (res.isSuccess) {
            let orders = res.extras.map((o, i) => {
              o["key"] = o.id;
              return o;
            }) as any[];
            orders.sort((a, b) => {
              return parseFloat(b.id) - parseFloat(a.id);
            });
            let last = this.state.last;
            if (orders.length > 0) {
              last = orders[0].id;
            }
            this.updateState({
              orders: [...this.state.orders, ...orders],
              last: last
            });
          }
          this.updateState({
            showSpinner: false
          });
        })
        .catch(error => {
          this.log.debug(error);
          this.updateState({
            showSpinner: false
          });
        });
    }
  };

  columns = [
    {
      title: this.lang.Order + "#",
      dataIndex: "id",
      //align: 'center',
      fixed: "left",
      width: 60
    },
    {
      title: this.lang.Date,
      //align: 'center',
      dataIndex: "created_timestamp",
      width: 200,
      render: data => {
        return StaticHelper.longDateFormat(data);
      }
    },
    {
      title: this.lang.Action,
      dataIndex: "action",
      //align: 'center',
      width: 60,
      render: text => {
        return this.formatEnumValue(text, true, true);
      }
    },
    {
      title: this.lang.Price,
      dataIndex: "price",
      //align: 'center',
      width: 60,
      render: text => {
        let currency = "";
        if (this.currencyPair) {
          currency = this.currencyPair.tc_name;
        }
        return <span className="gx-text-blue">{text + " " + currency}</span>;
      }
    },
    {
      title: this.lang.Amount,
      dataIndex: "amount",
      //align: 'center',
      width: 100,
      render: text => {
        let currency = "";
        if (this.currencyPair) {
          currency = this.currencyPair.fc_name;
        }
        return text + " " + currency;
      }
    },
    {
      title: this.lang.Total,
      dataIndex: "total_amount",
      //align: 'center',
      width: 100,
      render: text => {
        let currency = "";
        if (this.currencyPair) {
          currency = this.currencyPair.tc_name;
        }
        return text + " " + currency;
      }
    },
    {
      title: this.lang.Fee,
      dataIndex: "fee_percentage",
      //align: 'center',
      // width: 100,
      render: text => {
        return <span className="gx-text-blue">{text + "%"}</span>;
      }
    },
    {
      title: this.lang.Status,
      dataIndex: "record_status",
      //align: 'center',
      fixed: "right",
      width: 100,
      render: text => {
        return this.formatEnumValue(text, true, true);
      }
    }
  ];
}
