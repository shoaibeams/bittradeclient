import * as React from "react";
import { Card, Row, Col } from "antd";
import { BaseComponent } from "../base/BaseComponent";
import "./Security.less";

export default class About extends BaseComponent {
  render() {
    return (
      <>
        <Card>
          <h1 className="gx-text-center" style={{ marginBottom: "30px" }}>
            {this.lang.Security}
          </h1>
          <p>{this.lang.SecurityIntroPara}</p>

          <Row className="row-1">
            <Col span={6} className="gx-text-center">
              <Card className="security-feature-card">
                <img src="/assets/images/shield.svg" alt="Secured" />
                <h1>{this.lang.TwoFactorAuthHeading}</h1>
                <p>{this.lang.TwoFactorAuthPara}</p>
              </Card>
            </Col>
            <Col span={6} className="gx-text-center">
              <Card className="security-feature-card">
                <img src="/assets/images/ddos.svg" alt="DDOS Protection" />
                <h1>{this.lang.DDosHeading}</h1>
                <p>{this.lang.DDosPara}</p>
              </Card>
            </Col>
            <Col span={6} className="gx-text-center">
              <Card className="security-feature-card">
                <img src="/assets/images/folder.svg" alt="Offline Storage" />
                <h1>
                  {this.lang.Offline} {this.lang.Storage}
                </h1>
                <p>{this.lang.OfflineStoragePara1}</p>
              </Card>
            </Col>
            <Col span={6} className="gx-text-center">
              <Card className="security-feature-card">
                <img src="/assets/images/wallet.svg" alt="Offline Storage" />
                <h1>
                  {this.lang.Multisig} {this.lang.Wallet}
                </h1>
                <p>{this.lang.MultisigWalletPara}</p>
              </Card>
            </Col>
          </Row>
        </Card>
      </>
    );
  }
}
