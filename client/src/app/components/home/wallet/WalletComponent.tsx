import { BaseComponent } from "../../base/BaseComponent";
import * as React from "react";
import { Transitions } from "../../../../models/transitions";
import { mdFormControl } from "../../../../shared/form-control";
import ChartCard from "../../../../components/dashboard/Listing/ChartCard";
import { Area, AreaChart, Line, LineChart, ResponsiveContainer, Tooltip } from "recharts";
import { Col, Row } from "antd";
import "./wallet-component.less";
import { mdProps } from "../../../../models/props";
import { mdCallResponse } from "../../../../models/call-response";
import { StaticHelper } from "../../../../shared/static-helper";

export default class WalletComponent extends BaseComponent {

  render() {
    this.initShorts();
    let getWalletBox = (pair: any, last: mdFormControl, volume: mdFormControl, bgColor: string, barsFillColor: string) => {
      let data = pair.data;
      return (
        this.colmd6(
          <ChartCard
            chartProperties={{
              title: data == null ? "" :
                <span>
                  <img width="18" height="18" src={data.fc_icon} />
                  &nbsp;
                {data.fc_name}/{data.tc_name}
                  &nbsp;
                <span>24h</span>
                </span>,
              prize: this.animatedCSSDiv(
                data == null ? "" :
                  <>
                    {(data.tc_symbol ? data.tc_symbol : "") + "" + (data.last ? data.last : "")}
                  </>, last),
              icon: 'stats',
              bgColor: bgColor,
              styleName: 'up',
              desc: "",
              // this.animatedCSSDiv(
              //   <>
              //     {(pair.volume ? pair.volume : "") + " " + (pair.tc_name ? pair.tc_name : "")}
              //   </>, volume),
              percent: '',
            }}
            children={
                <ResponsiveContainer width="100%" height={75}>
                  <AreaChart data={pair.trades}
                    margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                    <Tooltip />
                    <Area dataKey='amount' type='monotone' strokeWidth={0} stackId="2" stroke='#C87000'
                      fill={barsFillColor}
                      fillOpacity={1} />
                  </AreaChart>
                  {/* <LineChart data={pair.trades}
                                  margin={{top: 5, right: 5, left: 5, bottom: 5}}>
                         <Tooltip/>
                         <Line dataKey="amount" stroke="#038FDE"/>
                       </LineChart> */}
              </ResponsiveContainer>
            }
          />
        )
      );
    }
    // let getWalletBoxOld = (pair: any, last: mdFormControl, volume: mdFormControl) => {
    //   return (
    //     <div className="col-md-3 col-sm-6">
    //         <div className="walletbox">
    //             <h2>
    //                 <img width="34" height="34" src={pair.fc_icon} />
    //                 {pair.fc_name}/{pair.tc_name}
    //                 <span>24h</span>
    //             </h2>
    //             <div className="p">{this.lang.Last}&nbsp;
    //                 {
    //                     this.animatedCSSDiv(
    //                         <b>
    //                             {(pair.tc_symbol ? pair.tc_symbol : "") + "" + (pair.last ? pair.last : "")}
    //                         </b>, last)
    //                 }
    //                 <br />
    //                 {this.lang.Volume}
    //                 &nbsp;
    //                     {
    //                     this.animatedCSSDiv(
    //                         <b>
    //                             {(pair.volume ? pair.volume : "") + " " + (pair.tc_name ? pair.tc_name : "")}
    //                         </b>, volume)
    //                 }
    //             </div>
    //         </div>
    //     </div>

    //   );
    // }
    if (this.g.briefHistory) {
      if (this.g.briefHistory.length > 0) {
        if (this.old) {
          this.setAnimValuesForPair();
        }
        else {
          this.old = this.g.briefHistory;
        }
      }
    }
    return (
      <>
        <Row className="walletwrap">
        
          {
            getWalletBox(this.state.firstPair, this.state.animValues.firstLast, this.state.animValues.firstVolume, 
              'primary', '#092453')
          }
          {
            getWalletBox(this.state.secondPair, this.state.animValues.secondLast, this.state.animValues.secondVolume, 
              'orange', '#C87000')
          }
          {
            getWalletBox(this.state.thirdPair, this.state.animValues.thirdLast, this.state.animValues.thirdVolume, 
              'teal', '#158765')
          }
          {
            getWalletBox(this.state.fourthPair, this.state.animValues.fourthLast, this.state.animValues.fourthVolume, 
              'pink', '#BB1258')
          }
        </Row>
        {/* <section className="walletwrap clearfix">
          <div className="container">
              <div className="row">
                  {
                      getWalletBoxOld(this.firstPair, this.state.animValues.firstLast, this.state.animValues.firstVolume)
                  }
                  {
                      getWalletBoxOld(this.secondPair, this.state.animValues.secondLast, this.state.animValues.secondVolume)
                  }
                  {
                      getWalletBoxOld(this.thirdPair, this.state.animValues.thirdLast, this.state.animValues.thirdVolume)
                  }
                  {
                      getWalletBoxOld(this.fourthPair, this.state.animValues.fourthLast, this.state.animValues.fourthVolume)
                  }
              </div>
          </div>
      </section> */}
      </>
    );
  }

  constructor(props) {
    super(props);
    this.init();
  }

  // firstPair: any = {};
  // secondPair: any = {}
  // thirdPair: any = {};
  // fourthPair: any = {};
  old: any[];
  recentTradesWorkers: any[] = [];

  init() {

    this.state = {
      firstPair: {
        name: "firstPair",
        trades: [],
      },
      secondPair: {
        name: "secondPair",
        trades: [],
      },
      thirdPair: {
        name: "thirdPair",
        trades: [],
      },
      fourthPair: {
        name: "fourthPair",
        trades: [],
      },
      animValues: {
        firstLast: new mdFormControl(this.getTransisition(Transitions.origional), 'firstLast'),
        firstVolume: new mdFormControl(this.getTransisition(Transitions.origional), 'firstVolume'),
        secondLast: new mdFormControl(this.getTransisition(Transitions.origional), 'secondLast'),
        secondVolume: new mdFormControl(this.getTransisition(Transitions.origional), 'secondVolume'),
        thirdLast: new mdFormControl(this.getTransisition(Transitions.origional), 'thirdLast'),
        thirdVolume: new mdFormControl(this.getTransisition(Transitions.origional), 'thirdVolume'),
        fourthLast: new mdFormControl(this.getTransisition(Transitions.origional), 'fourthLast'),
        fourthVolume: new mdFormControl(this.getTransisition(Transitions.origional), 'fourthVolume'),
      }
    }
    this.loadPairs();
    // this.startSyncingRecentTrades(this.state.firstPair, 2 * 1000);
    // this.startSyncingRecentTrades(this.state.secondPair, 2 * 1000);
    // this.startSyncingRecentTrades(this.state.thirdPair, 2 * 1000);
    // this.startSyncingRecentTrades(this.state.fourthPair, 2 * 1000);
  }

  loadRecentTrades = (pair) => {
    if (pair.id) {
      if (!pair.last) {
        pair.last = 0;
      }
      this.http.post<mdCallResponse>(this.constants.EndPoints.PostGetTrades, {
        currency_pair_id: pair.id,
        last: pair.last,
        recordsPerPage: 20,
      }).then((res: mdCallResponse) => {
        if (res.isSuccess) {
          pair = this.state[pair.name];
          let lastTradeId = pair.lastTradeId
          if (res.extras.length > 0) {
            lastTradeId = res.extras[0].id;
          }
          // let trades = [
          //   ...res.extras,
          //   ...pair.trades,
          // ];
          let trades = pair.trades;
          if(res.extras.length > 0)
          {
            trades = res.extras;
          }
          trades = trades.map(m => {
            m["key"] = m.id;
            m["name"] = m.last;
            return m;
          })
          pair.last = lastTradeId;
          pair.trades = trades;
          let state = {};
          StaticHelper.assignPropertyOfObject(state, pair.name, pair);
          this.updateState(state);
        }
        this.startSyncingRecentTrades(pair);
      }).catch((error) => {
        this.log.debug(error);
        this.startSyncingRecentTrades(pair, 5 * 1000);
      });
    }
    else {
      this.startSyncingRecentTrades(pair, 1 * 1000);
    }
  }

  startSyncingRecentTrades = (pair: any, timeout: number = this.constants.LoadBriefHistoryTimeout) => {
      let worker: any = {};
      worker.id = pair.id;
      worker.func = setTimeout(() => {
        this.loadRecentTrades(pair);
      }, timeout);
      let previousWorker: any = {};
      if(!this.recentTradesWorkers)
      {
        this.recentTradesWorkers = [];
      }
      let previousWorkers = this.recentTradesWorkers.filter(m => m.id == pair.id);
      if (previousWorkers.length > 0) {
        previousWorker = previousWorkers[0];
        let index = this.recentTradesWorkers.indexOf(previousWorker);
        this.recentTradesWorkers[index] = worker;
      }
      else {
        this.recentTradesWorkers.push(worker);
      }
  }

  componentWillUnmount = () => {
    this.recentTradesWorkers.forEach(w => {
      clearTimeout(w.func);
      w.func = null;
    })
    this.recentTradesWorkers = null;
  }

  componentWillUpdate = () => {

  }

  componentWillReceiveProps(nextProps: mdProps) {
    this.initShorts(nextProps);
    this.loadPairs(nextProps, true);
  }

  loadPairs = (e = null, ccp = false) => {
    let firstPair: any = this.state.firstPair;
    let secondPair: any = this.state.secondPair;
    let thirdPair: any = this.state.thirdPair;
    let fourthPair: any = this.state.fourthPair;
    let sortedPairs: any[] = [];
    let newPairs = [];
    if (this.g.briefHistory) {
      sortedPairs = this.g.briefHistory.sort((a, b) => {
        if (a.volume > b.volume) {
          return -1;
        }
        else {
          return 1;
        }
      });
      if (!firstPair.id) {
        firstPair.data = sortedPairs.length > 0 ? sortedPairs[0] : {};
        firstPair.id = firstPair.data.id;
        newPairs.push(firstPair);
      }
      else {
        firstPair.data = sortedPairs.filter(m => m.id == firstPair.id)[0];
      }
      if (!secondPair.id) {
        secondPair.data = sortedPairs.length > 1 ? sortedPairs[1] : {};
        secondPair.id = secondPair.data.id;
        newPairs.push(secondPair);
      }
      else {
        secondPair.data = sortedPairs.filter(m => m.id == secondPair.id)[0];
      }
      if (!thirdPair.id) {
        thirdPair.data = sortedPairs.length > 2 ? sortedPairs[2] : {};
        thirdPair.id = thirdPair.data.id;
        newPairs.push(thirdPair);
      }
      else {
        thirdPair.data = sortedPairs.filter(m => m.id == thirdPair.id)[0];
      }
      if (!fourthPair.id) {
        fourthPair.data = sortedPairs.length > 3 ? sortedPairs[3] : {};
        fourthPair.id = fourthPair.data.id;
        newPairs.push(fourthPair);
      }
      else {
        fourthPair.data = sortedPairs.filter(m => m.id == fourthPair.id)[0];
      }
      let newState = {
        ...this.state,
        firstPair: firstPair,
        secondPair: secondPair,
        thirdPair: thirdPair,
        fourthPair: fourthPair,
      }
      if (e == null) {
        this.state = newState;
        this.startSyncingTrades(newPairs);
      }
      else {
        this.updateState(newState, () => {
          this.startSyncingTrades(newPairs);
        });
      }
    }
  }

  startSyncingTrades = (newPairs: any[]) => {
    if (!newPairs) {
      return;
    }
    newPairs.forEach(p => {
      this.loadRecentTrades(p);
    })
  }

  setAnimValuesForPair() {
    let animValues = {
      ...this.state.animValues
    };
    if (this.old != null) {
      let old = this.old.filter(m => m.id == this.state.firstPair.id)[0];
      let index;
      if (old) {
        index = this.old.indexOf(old);
        //setting last
        if (old.last > this.state.firstPair.last) {
          animValues.firstLast = new mdFormControl(this.runTransition(Transitions.lesser), 'firstLast')
        }
        else if (old.last < this.state.firstPair.last) {
          animValues.firstLast = new mdFormControl(this.runTransition(Transitions.greater), 'firstLast')
        }
        else {
          animValues.firstLast = new mdFormControl(this.runTransition(Transitions.origional), 'firstLast')
        }

        //setting volume
        if (old.volume > this.state.firstPair.volume) {
          animValues.firstVolume = new mdFormControl(this.runTransition(Transitions.lesser), 'firstVolume')
        }
        else if (old.volume < this.state.firstPair.volume) {
          animValues.firstVolume = new mdFormControl(this.runTransition(Transitions.greater), 'firstVolume')
        }
        else {
          animValues.firstVolume = new mdFormControl(this.runTransition(Transitions.origional), 'firstVolume')
        }
        if (animValues.firstLast.value != 'origional' || animValues.firstVolume.value != 'origional') {
          this.old[index] = this.state.firstPair;
        }
      }

      old = this.old.filter(m => m.id == this.state.secondPair.id)[0];
      if (old) {
        index = this.old.indexOf(old);
        //setting last
        if (old.last > this.state.secondPair.last) {
          animValues.secondLast = new mdFormControl(this.runTransition(Transitions.lesser), 'secondLast')
        }
        else if (old.last < this.state.secondPair.last) {
          animValues.secondLast = new mdFormControl(this.runTransition(Transitions.greater), 'secondLast')
        }
        else {
          animValues.secondLast = new mdFormControl(this.runTransition(Transitions.origional), 'secondLast')
        }

        //setting volume
        if (old.volume > this.state.secondPair.volume) {
          animValues.secondVolume = new mdFormControl(this.runTransition(Transitions.lesser), 'secondVolume')
        }
        else if (old.volume < this.state.secondPair.volume) {
          animValues.secondVolume = new mdFormControl(this.runTransition(Transitions.greater), 'secondVolume')
        }
        else {
          animValues.secondVolume = new mdFormControl(this.runTransition(Transitions.origional), 'secondVolume')
        }
        if (animValues.secondLast.value != 'origional' || animValues.secondVolume.value != 'origional') {
          this.old[index] = this.state.secondPair;
        }
      }
      old = this.old.filter(m => m.id == this.state.thirdPair.id)[0];
      if (old) {
        index = this.old.indexOf(old);
        //setting last
        if (old.last > this.state.thirdPair.last) {
          animValues.thirdLast = new mdFormControl(this.runTransition(Transitions.lesser), 'thirdLast')
        }
        else if (old.last < this.state.thirdPair.last) {
          animValues.thirdLast = new mdFormControl(this.runTransition(Transitions.greater), 'thirdLast')
        }
        else {
          animValues.thirdLast = new mdFormControl(this.runTransition(Transitions.origional), 'thirdLast')
        }

        //setting volume
        if (old.volume > this.state.thirdPair.volume) {
          animValues.thirdVolume = new mdFormControl(this.runTransition(Transitions.lesser), 'thirdVolume')
        }
        else if (old.volume < this.state.thirdPair.volume) {
          animValues.thirdVolume = new mdFormControl(this.runTransition(Transitions.greater), 'thirdVolume')
        }
        else {
          animValues.thirdVolume = new mdFormControl(this.runTransition(Transitions.origional), 'thirdVolume')
        }
        if (animValues.thirdLast.value != 'origional' || animValues.thirdVolume.value != 'origional') {
          this.old[index] = this.state.thirdPair;
        }
      }
      old = this.old.filter(m => m.id == this.state.fourthPair.id)[0];
      if (old) {
        index = this.old.indexOf(old);
        //setting last
        if (old.last > this.state.fourthPair.last) {
          animValues.fourthLast = new mdFormControl(this.runTransition(Transitions.lesser), 'fourthLast')
        }
        else if (old.last < this.state.fourthPair.last) {
          animValues.fourthLast.value = new mdFormControl(this.runTransition(Transitions.greater), 'fourthLast')
        }
        else {
          animValues.fourthLast.value = new mdFormControl(this.runTransition(Transitions.origional), 'fourthLast')
        }

        //setting volume
        if (old.volume > this.state.fourthPair.volume) {
          animValues.fourthVolume = new mdFormControl(this.runTransition(Transitions.lesser), 'fourthVolume')
        }
        else if (old.volume < this.state.fourthPair.volume) {
          animValues.fourthVolume.value = new mdFormControl(this.runTransition(Transitions.greater), 'fourthVolume')
        }
        else {
          animValues.fourthVolume.value = new mdFormControl(this.runTransition(Transitions.lesser), 'fourthVolume')
        }
        if (animValues.fourthLast.value != 'origional' || animValues.fourthVolume.value != 'origional') {
          this.old[index] = this.state.fourthPair;
        }
      }
    }

    this.state = {
      ...this.state,
      animValues: animValues,
    }
    // this.updateState({
    //   animValues: animValues,
    // })
  }

}