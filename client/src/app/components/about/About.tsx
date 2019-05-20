import * as React from "react";
import { Card, Row, Col } from "antd";
import { BaseComponent } from "../base/BaseComponent";
import SaveMoneyCard from "./SaveMoneyCard/SaveMoneyCard";
import Team from "./team/Team";
import "./About.less";

export default class About extends BaseComponent {
  render() {
    return (
      <>
        <Card>
          <h1
            className="gx-text-center heading-big"
            style={{ marginBottom: "30px" }}
          >
            {this.lang.AboutHeading}
          </h1>
          <p className="gx-text-center text-medium">
            {this.lang.AboutIntroPara}
          </p>
          <h1 className="gx-text-center heading-big">
            {this.lang.Our} {this.lang.Mission}
          </h1>
          <p className="gx-text-center text-medium">{this.lang.AboutMission}</p>
        </Card>
        <Card>
          <Row className="about-row gx-text-center">
            <h1 className="logo-text heading-big">
              {this.lang.Why} <span>{this.lang.Bit}</span>
              {this.lang.Velocity}&#63;
            </h1>
            
          </Row>
          <Row className="about-row gx-text-center">
            {this.antd.colmd8(
              <div>
                <img src="/assets/images/shield.svg" alt="Secured" />
                <h1 className="heading-big">{this.lang.Secure}</h1>
                <p className="text-medium">{this.lang.AboutPara1}</p>
              </div>
            )}
            {this.antd.colmd8(
              <div>
                <img src="/assets/images/folder.svg" alt="Offline Storage" />
                <h1 className="heading-big">
                  {this.lang.Offline} {this.lang.Storage}
                </h1>
                <p className="text-medium">{this.lang.AboutPara2}</p>
              </div>
            )}

            {this.antd.colmd8(
              <div>
                <img src="/assets/images/wallet.svg" alt="Offline Storage" />
                <h1 className="heading-big">
                  {this.lang.Multisig} {this.lang.Wallet}
                </h1>
                <p className="text-medium">{this.lang.AboutPara3}</p>
              </div>
            )}
          </Row>
          <Row className="about-row gx-text-center">
            {this.antd.colmd8(
              <div>
                <img src="/assets/images/chip.svg" alt="Secured" />
                <h1 className="heading-big">{this.lang.Tokenization}</h1>
                <p className="text-medium">{this.lang.AboutPara4}</p>
              </div>
            )}
            {this.antd.colmd8(
              <div>
                <img
                  src="/assets/images/artificial-intelligence.svg"
                  alt="Offline Storage"
                />
                <h1 className="heading-big">
                  {this.lang.AI} {this.lang.Forecast}
                </h1>
                <p className="text-medium">{this.lang.AboutPara5}</p>
              </div>
            )}
            {this.antd.colmd8(
              <div>
                <img src="/assets/images/tools.svg" alt="TA Tools" />
                <h1 className="heading-big">
                  {this.lang.TA} {this.lang.Tools}
                </h1>
                <p className="text-medium">{this.lang.AboutPara6}</p>
              </div>
            )}
          </Row>
        </Card>
        <SaveMoneyCard />
        <Team />
      </>
    );
  }
}
