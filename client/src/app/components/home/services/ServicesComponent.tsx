import { BaseComponent } from "../../base/BaseComponent";
import * as React from "react";
import { Row, Col, Card } from "antd";
import "./services.component.less";

export default class ServicesComponent extends BaseComponent {

  render() {
    this.initShorts();
    let buyFee: string = "";
    let sellFee: string = "";
    if (this.g.selectedCurrencyPair) {
      if (this.g.selectedCurrencyPair.buy_fee) {
        buyFee = this.g.selectedCurrencyPair.buy_fee.toFixed(2);
      }
      if (this.g.selectedCurrencyPair.sell_fee) {
        sellFee = this.g.selectedCurrencyPair.sell_fee.toFixed(2);
      }
    }
    let list = [];
    list.push({
      icon: "/assets/images/support-icon.png",
      header: this.lang.ExpertSupport,
      detail: this.lang.ExpertSupportPara,
    });
    list.push({
      icon: "/assets/images/safe-icon.png",
      header: <>{this.lang.Safe}&nbsp;&amp;&nbsp; {this.lang.Secure}</>,
      detail: this.lang.SafeAndSecurePara,
    });
    list.push({
      icon: "/assets/images/instant-icon.png",
      header: this.lang.Fees,
      detail: <>{`${this.lang.Standard} ${this.lang.Buy} `}{buyFee}%
      <br />{`${this.lang.Standard} ${this.lang.Sell} `}{sellFee}%</>,
      id: this.constants.Ids.OurFees,
    });
    list.push({
      icon: "/assets/images/wallet-icon.png",
      header: this.lang.AdvancedOrdering,
      detail: this.lang.AdvancedOrderingPara,
    });
    list.push({
      icon: "/assets/images/buye-icon.png",
      header: this.lang.Reliability,
      detail: this.lang.ReliabilityPara,
    });
    list.push({
      icon: "/assets/images/trading-icon.png",
      header: this.lang.OfflineStorage,
      detail: this.lang.OfflineStoragePara,
    });
    return (
      <Card className="gx-card">
        <Row className="servicewrap">
          {
            list.map((m,i) => {
              return (
                <Col key={i} xs={24} sm={12} md={8} id={m.id} className="gx-text-center gx-mb-3">
                  <img src={m.icon} alt={m.header} />
                  <h2>{m.header}</h2>
                  <p>{m.detail}</p>
                </Col>
              );
            })
          }
        </Row>
      </Card>
    );
  }

}