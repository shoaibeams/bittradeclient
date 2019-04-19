import { BaseComponent } from "../../base/BaseComponent";
import * as React from "react";
import { Link } from "react-router-dom";
import { StaticHelper } from "../../../../shared/static-helper";
import { mdFormControl } from "../../../../shared/form-control";
import { Transitions } from "../../../../models/transitions";
import { mdProps } from "../../../../models/props";
import Widget from "../../../../components/Widget/index";
import "./tradebriefhistory-component.less";
import { Tabs, Table, Button } from "antd";
const TabPane = Tabs.TabPane;

export default class TradeBriefHistoryComponent extends BaseComponent {
  render() {
    let table = () => {
      let histr = this.state.selectedTradePairHistory;
      if (histr) {
        histr = histr.map((p, i) => {
          p["key"] = i;
          return p;
        });
      } else {
        histr = [];
      }
      return (
        <Table
          className="gx-table-no-bordered custom-table"
          columns={this.columns as any}
          dataSource={histr}
          pagination={false}
          bordered={false}
          size="small"
          // scroll={{ x: 'auto' }}
        />
      );
    };
    return (
      <Widget
        styleName="gx-order-history"
        title={
          <h2 className="h4 gx-text-capitalize gx-mb-0">
            {this.lang.BriefHistory}
          </h2>
        }
        extra={<p className="gx-text-primary gx-mb-0 gx-pointer">{""}</p>}
      >
        {this.isNullOrEmpty(this.selectedMarket) ? null : (
          <Tabs
            defaultActiveKey={this.selectedMarket}
            tabPosition={"top"} //this.widthLessThanmd() ? "top" : "left"}
            // style={{ height: 340 }}
          >
            {this.markets
              ? this.markets.map((m, i) => {
                  return (
                    <TabPane
                      tab={
                        <div
                          className="gx-text-center"
                          onClick={() => {
                            let pairHistory = this.changePairHistoryTab(m);
                            this.updateState({
                              selectedTradePairHistory: pairHistory
                            });
                          }}
                        >
                          <img
                            width="34"
                            height="34"
                            src={this.getCP(m).tc_icon}
                            alt={this.getCP(m).tc_name}
                          />
                          <br />
                          {this.getCP(m).tc_name}
                        </div>
                      }
                      key={m}
                    >
                      <div className="gx-table-responsive">{table()}</div>
                    </TabPane>
                  );
                })
              : null}
          </Tabs>
        )}
        <div className="gx-text-center trading-box gx-mb-4">
          <Link
            to={
              this.g.isLoggedIn
                ? this.getLink(this.constants.RoutePaths.Trade)
                : this.getLink(this.constants.RoutePaths.Login)
            }
          >
            {this.lang.StartTradingNow}
          </Link>
        </div>
      </Widget>
    );
  }

  constructor(props) {
    super(props);
    this.init();
  }

  tradePairHistorySortings: any = {
    pair: 1,
    last: 2,
    change: 3,
    high: 4,
    low: 5,
    volume: 6
  };
  tradePairhistoryCurrentSorting: any = {
    sort: this.tradePairHistorySortings.pair,
    isASC: true
  };
  selectedMarket: string;
  markets: any[];
  oldHistory: any[];
  oldTCName: string;

  init() {
    //market data
    if (this.g.currencyPairs) {
      let tcCurrencies = this.g.currencyPairs.map(m => {
        return m.tc_name;
      });
      this.markets = StaticHelper.distinctArray(tcCurrencies);
    }
    if (!this.selectedMarket) {
      if (this.markets) {
        if (this.markets.length > 0) {
          this.selectedMarket = this.markets[0];
        }
      }
    }
    this.updateState({
      selectedTradePairHistory: this.selectedMarket
        ? this.changePairHistoryTab(this.selectedMarket)
        : []
    });
    // this.state = {
    //   selectedTradePairHistory: []
    // }
    // this.state = {
    //   selectedTradePairHistory: this.selectedMarket ? this.changePairHistoryTab(this.selectedMarket) : []
    // }
  }

  udpatePairState = p => {
    let previousHistory = this.state.selectedTradePairHistory;
    let previousPair = previousHistory.filter(m => m.id == p.id);
    if (previousPair.length > 0) {
      let index = previousHistory.indexOf(previousPair[0]);
      if (index > -1) {
        previousHistory[index] = p;
        this.updateState({
          selectedTradePairHistory: previousHistory
        });
      }
    }
  };

  columns = [
    {
      title: <div className="table-head">{this.lang.Pair}</div>,
      dataIndex: "id",
      //align: 'center',
      fixed: "left",
      width: 110,
      render: (data, p) => {
        return (
          <div className="">
            {this.getCP(p.id).fc_name + "/" + this.getCP(p.id).tc_name}
          </div>
        );
      }
    },
    {
      title: <div className="table-head">{this.lang.LastPrice}</div>,
      dataIndex: "last",
      //align: 'center',
      fixed: "left",
      width: 210,
      render: (data, p) => {
        return this.animatedCSSDiv(p.last, p.lastAnim, e => {
          p.lastAnim = new mdFormControl(
            this.getTransition(Transitions.origional)
          );
          this.udpatePairState(p);
        });
      }
    },
    {
      title: <div className="table-head">{this.lang.Change24H}</div>,
      dataIndex: "change",
      //align: 'center',
      fixed: "left",
      width: 230,
      render: (data, p) => {
        if (this.isNullOrEmpty(p.change)) {
          return "";
        }
        return (
          <div className={p.change >= 0 ? "green-txt" : "red-txt"}>
            {p.change + "%"}
          </div>
        );
      }
    },
    {
      title: <div className="table-head">{this.lang.High24H}</div>,
      dataIndex: "high",
      //align: 'center',
      fixed: "left",
      width: 190,
      render: (data, p) => {
        return this.animatedCSSDiv(p.high, p.highAnim, e => {
          p.highAnim = new mdFormControl(
            this.getTransition(Transitions.origional)
          );
          this.udpatePairState(p);
        });
      }
    },
    {
      title: <div className="table-head">{this.lang.Low24H}</div>,
      dataIndex: "low",
      //align: 'center',
      fixed: "left",
      width: 180,
      render: (data, p) => {
        return this.animatedCSSDiv(p.low, p.lowAnim, e => {
          p.lowAnim = new mdFormControl(
            this.getTransition(Transitions.origional)
          );
          this.udpatePairState(p);
        });
      }
    },
    {
      title: <div className="table-head">{this.lang.Volume24H}</div>,
      dataIndex: "volume",
      //align: 'center',
      fixed: "left",
      width: 237,
      render: (data, p) => {
        return this.animatedCSSDiv(
          `${p.volume} ${this.getCP(p.id).fc_name}`,
          p.volumeAnim,
          e => {
            p.volumeAnim = new mdFormControl(
              this.getTransition(Transitions.origional)
            );
            this.udpatePairState(p);
          }
        );
      }
    }
  ];

  afterReceivingProps = (newProps: mdProps) => {
    this.init();
  };

  getCP(id) {
    return this.g.currencyPairs.filter(m => m.id == id || m.tc_name == id)[0];
  }

  sortPairHistoryTab(sorting: number) {
    if (sorting == this.tradePairhistoryCurrentSorting.sort) {
      this.tradePairhistoryCurrentSorting.isASC = !this
        .tradePairhistoryCurrentSorting.isASC;
    } else {
      this.tradePairhistoryCurrentSorting.isASC = true;
    }
    this.tradePairhistoryCurrentSorting.sort = sorting;
    if (this.g.selectedBriefHistory) {
      this.updateState({
        selectedTradePairHistory: this.state.selectedTradePairHistory.sort(
          this.sortPairHistoryTabInner
        )
      });
    }
  }

  changePairHistoryTab(name: string) {
    let histr = this.g.briefHistory ? this.g.briefHistory : [];
    if (!histr || !this.g.currencyPairs) {
      return;
    }
    let currentSelectedPairs = this.g.currencyPairs
      .filter(m => m.tc_name == name)
      .map(m => {
        return m.id;
      });
    let brfHistory = histr.filter(m => {
      if (currentSelectedPairs.indexOf(m.id) == -1) {
        return false;
      } else {
        return true;
      }
    });
    let brfhSorted = brfHistory.sort(this.sortPairHistoryTabInner);
    let newHistory = this.setAnimValuesForTable(brfhSorted, name);
    this.selectedMarket = name;
    return newHistory;
  }

  setAnimValuesForTable(obj: any[], newTCName: string) {
    let returnWithoutSettingAnimValues = false;
    if (this.isNullOrEmpty(this.oldHistory)) {
      returnWithoutSettingAnimValues = true;
    }
    if (this.oldTCName != newTCName) {
      returnWithoutSettingAnimValues = true;
    }
    if (returnWithoutSettingAnimValues) {
      this.oldHistory = obj;
      this.oldTCName = newTCName;
      return obj;
    }
    for (let i = 0; i < obj.length; i++) {
      let old = this.oldHistory.filter(m => m.id == obj[i].id);
      if (old.length > 0) {
        old = old[0];
      } else {
        old = null;
      }
      obj[i].old = old;
      if (obj[i].old != null) {
        //setting last
        if (obj[i].old.last > obj[i].last) {
          obj[i].lastAnim = new mdFormControl(
            this.runTransition(Transitions.lesser)
          );
        } else if (obj[i].old.last < obj[i].last) {
          obj[i].lastAnim = new mdFormControl(
            this.runTransition(Transitions.greater)
          );
        } else {
          obj[i].lastAnim = new mdFormControl(
            this.runTransition(Transitions.origional)
          );
        }
      }
      if (obj[i].old != null) {
        //setting change
        if (obj[i].old.change > obj[i].change) {
          obj[i].changeAnim = new mdFormControl(
            this.runTransition(Transitions.lesser)
          );
        } else if (obj[i].old.change < obj[i].change) {
          obj[i].changeAnim = new mdFormControl(
            this.runTransition(Transitions.greater)
          );
        } else {
          obj[i].changeAnim = new mdFormControl(
            this.runTransition(Transitions.origional)
          );
        }
      }
      if (obj[i].old != null) {
        //setting high
        if (obj[i].old.high > obj[i].high) {
          obj[i].highAnim = new mdFormControl(
            this.runTransition(Transitions.lesser)
          );
        } else if (obj[i].old.high < obj[i].high) {
          obj[i].highAnim = new mdFormControl(
            this.runTransition(Transitions.greater)
          );
        } else {
          obj[i].highAnim = new mdFormControl(
            this.runTransition(Transitions.origional)
          );
        }
      }
      if (obj[i].old != null) {
        //setting low
        if (obj[i].old.low > obj[i].low) {
          obj[i].lowAnim = new mdFormControl(
            this.runTransition(Transitions.lesser)
          );
        } else if (obj[i].old.low < obj[i].low) {
          obj[i].lowAnim = new mdFormControl(
            this.runTransition(Transitions.greater)
          );
        } else {
          obj[i].lowAnim = new mdFormControl(
            this.runTransition(Transitions.origional)
          );
        }
      }
      if (obj[i].old != null) {
        //setting volume
        if (obj[i].old.volume > obj[i].volume) {
          obj[i].volumeAnim = new mdFormControl(
            this.runTransition(Transitions.lesser)
          );
        } else if (obj[i].old.volume < obj[i].volume) {
          obj[i].volumeAnim = new mdFormControl(
            this.runTransition(Transitions.greater)
          );
        } else {
          obj[i].volumeAnim = new mdFormControl(
            this.runTransition(Transitions.origional)
          );
        }
      }
    }
    this.oldHistory = obj;
    this.oldTCName = newTCName;
    return obj;
  }

  sortPairHistoryTabInner = (a, b) => {
    if (
      this.tradePairhistoryCurrentSorting.sort ==
      this.tradePairHistorySortings.pair
    ) {
      if (a.fc_name + "/" + a.tc_name > b.fc_name + "/" + b.tc_name) {
        return this.tradePairhistoryCurrentSorting.isASC ? 1 : -1;
      } else {
        return this.tradePairhistoryCurrentSorting.isASC ? -1 : 1;
      }
    } else if (
      this.tradePairhistoryCurrentSorting.sort ==
      this.tradePairHistorySortings.last
    ) {
      if (a.last > b.last) {
        return this.tradePairhistoryCurrentSorting.isASC ? 1 : -1;
      } else {
        return this.tradePairhistoryCurrentSorting.isASC ? -1 : 1;
      }
    } else if (
      this.tradePairhistoryCurrentSorting.sort ==
      this.tradePairHistorySortings.change
    ) {
      if (a.change > b.change) {
        return this.tradePairhistoryCurrentSorting.isASC ? 1 : -1;
      } else {
        return this.tradePairhistoryCurrentSorting.isASC ? -1 : 1;
      }
    } else if (
      this.tradePairhistoryCurrentSorting.sort ==
      this.tradePairHistorySortings.high
    ) {
      if (a.high > b.high) {
        return this.tradePairhistoryCurrentSorting.isASC ? 1 : -1;
      } else {
        return this.tradePairhistoryCurrentSorting.isASC ? -1 : 1;
      }
    } else if (
      this.tradePairhistoryCurrentSorting.sort ==
      this.tradePairHistorySortings.low
    ) {
      if (a.low > b.low) {
        return this.tradePairhistoryCurrentSorting.isASC ? 1 : -1;
      } else {
        return this.tradePairhistoryCurrentSorting.isASC ? -1 : 1;
      }
    } else if (
      this.tradePairhistoryCurrentSorting.sort ==
      this.tradePairHistorySortings.volume
    ) {
      if (a.low > b.low) {
        return this.tradePairhistoryCurrentSorting.isASC ? 1 : -1;
      } else {
        return this.tradePairhistoryCurrentSorting.isASC ? -1 : 1;
      }
    }
  };
}
