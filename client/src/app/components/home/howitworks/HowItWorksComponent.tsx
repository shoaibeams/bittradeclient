import { BaseComponent } from "../../base/BaseComponent";
import * as React from "react";
import { Card, Row, Col } from "antd";
import "./howitworks-component.less";

export default class HowItWorksComponent extends BaseComponent {

  render() {
    this.initShorts();
    return (
      <Card className="gx-card" id={this.constants.Ids.HowItWorks} title={this.lang.HowItWorks}>
        <Row className="howitworks">
          {
            this.state.hiwList.map((m, i) => {
              return (
                <Col key={i} xs={24} sm={12} md={6} className="gx-text-center">
                  <div className="howbox clearfix">
                    {
                      i == 3 ? null :
                        <div className="arrow-how">
                          <img src="/assets/images/arrow-how.png" className="img-responsive" alt={this.lang.RegisterPara} />
                        </div>
                    }
                    <img src={m.icon} alt={m.alt} />
                    <h3>
                      <div>{m.number}</div>
                      {m.header}
                    </h3>
                    <p>{m.detail}</p>
                  </div>
                </Col>
              );
            })
          }
        </Row>
      </Card>
    );
  }

  constructor(props) {
    super(props);
    this.init();
  }

  init() {
    let list = [];
    list.push({
      icon: "/assets/images/reg-icon.png",
      alt: this.lang.Register,
      header: this.lang.Register,
      detail: this.lang.RegisterPara,
      number: 1,
    });
    list.push({
      icon: "/assets/images/kyc-icon.png",
      alt: this.lang.GetKYCVerified,
      header: this.lang.GetKYCVerified,
      detail: this.lang.GetKYCVerifiedPara,
      number: 2,
    });
    list.push({
      icon: "/assets/images/reg-icon.png",
      alt: this.lang.MakeFiatDeposit,
      header: this.lang.MakeFiatDeposit + " " + this.lang.or + " " + this.lang.RegisterDebitCreditCard,
      detail: this.lang.MakeFiatDepositPara,
      number: 3,
    });
    list.push({
      icon: "/assets/images/reg-icon.png",
      alt: this.lang.StartBuying,
      header: this.lang.StartBuying,
      detail: this.lang.StartBuyingPara,
      number: 4,
    });
    this.state = {
      hiwList: list
    }

  }

}