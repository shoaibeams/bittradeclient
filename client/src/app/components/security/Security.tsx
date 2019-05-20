import * as React from "react";
import { Card, Row } from "antd";
import { BaseComponent } from "../base/BaseComponent";
import "./Security.less";

export default class About extends BaseComponent {
  render() {
    return (
      <>
        <Card>
          <h1
            className="gx-text-center heading-big"
            style={{ marginBottom: "30px" }}
          >
            {this.lang.Security}
          </h1>
          <p className="text-medium">{this.lang.SecurityIntroPara}</p>

          <Row className="security-row gx-text-center">
            {this.antd.colmd6(
              <Card className="security-feature-card">
                <img src="/assets/images/shield.svg" alt="Secured" />
                <h1 className="heading-medium">{this.lang.TwoFactorAuthHeading}</h1>
                <p className="text-small">{this.lang.TwoFactorAuthPara}</p>
              </Card>
            )}

            {this.antd.colmd6(
              <Card className="security-feature-card">
                <img src="/assets/images/ddos.svg" alt="DDOS Protection" />
                <h1 className="heading-medium">{this.lang.DDosHeading}</h1>
                <p className="text-small">{this.lang.DDosPara}</p>
              </Card>
            )}

            {this.antd.colmd6(
              <Card className="security-feature-card">
                <img src="/assets/images/folder.svg" alt="Offline Storage" />
                <h1 className="heading-medium">
                  {this.lang.Offline} {this.lang.Storage}
                </h1>
                <p className="text-small">{this.lang.OfflineStoragePara1}</p>
              </Card>
            )}
            {this.antd.colmd6(
              <Card className="security-feature-card">
                <img src="/assets/images/wallet.svg" alt="Offline Storage" />
                <h1 className="heading-medium">
                  {this.lang.Multisig} {this.lang.Wallet}
                </h1>
                <p className="text-small">{this.lang.MultisigWalletPara}</p>
              </Card>
            )}
          </Row>
        </Card>
      </>
    );
  }
}
