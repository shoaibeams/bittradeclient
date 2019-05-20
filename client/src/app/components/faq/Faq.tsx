import * as React from "react";
import { Row, Collapse } from "antd";
import { BaseComponent } from "../base/BaseComponent";
import "./Faq.less";
import { Link } from "react-router-dom";

const Panel = Collapse.Panel;

export default class Faq extends BaseComponent {
  render() {
    const {
      FAQ,
      Getting,
      Started,
      GSQuestion1,
      GSQuestion2,
      GSQuestion3,
      GSAnswer1,
      GSAnswer2,
      GSAnswer3,
      Account,
      Managment,
      AMQuestion1,
      AMQuestion2,
      AMQuestion3,
      AMAnswer1,
      AMAnswer2,
      AMAnswer3,
      Trading,
      TradeQuestion1,
      TradeQuestion2,
      TradeQuestion3,
      TradeAnswer1,
      TradeAnswer2,
      TradeAnswer3,
      Fees,
      FeesQuestion1,
      FeesQuestion2,
      FeesQuestion3,
      FeesAnswer1,
      FeesAnswer2,
      FeesAnswer3,
      Security,
      SecurityQuestion1,
      SecurityQuestion2,
      SecurityQuestion3,
      SecurityAnswer1,
      SecurityAnswer2,
      SecurityAnswer3,
      Payment,
      PayQuestion1,
      PayQuestion2,
      PayQuestion3,
      PayAnswer1,
      PayAnswer2,
      PayAnswer3
    } = this.lang;

    return (
      <div className="faq-container">
        <h1 className="faq-heading heading-big gx-text-center">
          {FAQ}
          <img src="/assets/images/help.svg" alt="FAQ" />
        </h1>

        <Row className="faq-row">
          {this.antd.colmd12(
            <Collapse
              defaultActiveKey={["-1"]}
              className="collapse text-medium"
            >
              <h2 className="heading-small">
                {Getting} {Started}
              </h2>
              <Panel header={GSQuestion1} key="1">
                <p>{GSAnswer1}</p>
              </Panel>
              <Panel header={GSQuestion2} key="2">
                <p>
                  {GSAnswer2}&nbsp;
                  <Link to={this.getLink(this.constants.RoutePaths.SignUp)}>
                    here
                  </Link>
                </p>
              </Panel>
              <Panel header={GSQuestion3} key="3">
                <p>{GSAnswer3}</p>
              </Panel>
            </Collapse>
          )}

          {this.antd.colmd12(
            <Collapse
              defaultActiveKey={["-1"]}
              className="collapse text-medium"
            >
              <h2 className="heading-small">
                {Account} {Managment}
              </h2>
              <Panel header={AMQuestion1} key="1">
                <p>
                  {AMAnswer1}&nbsp;
                  <Link to={this.getLink(this.constants.RoutePaths.SignUp)}>
                    here
                  </Link>
                </p>
              </Panel>
              <Panel header={AMQuestion2} key="2">
                <p>{AMAnswer2}</p>
              </Panel>
              <Panel header={AMQuestion3} key="3">
                <p>{AMAnswer3}</p>
              </Panel>
            </Collapse>
          )}
        </Row>

        <Row className="faq-row">
          {this.antd.colmd12(
            <Collapse
              defaultActiveKey={["-1"]}
              className="collapse text-medium"
            >
              <h2 className="heading-small">{Trading}</h2>
              <Panel header={TradeQuestion1} key="1">
                <p>{TradeAnswer1}</p>
              </Panel>
              <Panel header={TradeQuestion2} key="2">
                <p>{TradeAnswer2}</p>
              </Panel>
              <Panel header={TradeQuestion3} key="3">
                <p>{TradeAnswer3}</p>
              </Panel>
            </Collapse>
          )}

          {this.antd.colmd12(
            <Collapse
              defaultActiveKey={["-1"]}
              className="collapse text-medium"
            >
              <h2 className="heading-small">{Payment}</h2>
              <Panel header={PayQuestion1} key="1">
                <p>{PayAnswer1}</p>
              </Panel>
              <Panel header={PayQuestion2} key="2">
                <p>{PayAnswer2}</p>
              </Panel>
              <Panel header={PayQuestion3} key="3">
                <p>{PayAnswer3}</p>
              </Panel>
            </Collapse>
          )}
        </Row>

        <Row className="faq-row" style={{ marginBottom: "100px" }}>
          {this.antd.colmd12(
            <Collapse
              defaultActiveKey={["-1"]}
              className="collapse text-medium"
            >
              <h2 className="heading-small">{Fees}</h2>
              <Panel header={FeesQuestion1} key="1">
                <p>
                  {FeesAnswer1}&nbsp;
                  <Link to={this.getLink(this.constants.RoutePaths.OurFees)}>
                    {this.lang.Here}
                  </Link>
                </p>
              </Panel>
              <Panel header={FeesQuestion2} key="2">
                <p>
                  {FeesAnswer2}&nbsp;
                  <Link to={this.getLink(this.constants.RoutePaths.OurFees)}>
                    {this.lang.Here}
                  </Link>
                </p>
              </Panel>
              <Panel header={FeesQuestion3} key="3">
                <p>{FeesAnswer3}</p>
              </Panel>
            </Collapse>
          )}

          {this.antd.colmd12(
            <Collapse
              defaultActiveKey={["-1"]}
              className="collapse text-medium"
            >
              <h2 className="heading-small">{Security}</h2>
              <Panel header={SecurityQuestion1} key="1">
                <p>{SecurityAnswer1}</p>
              </Panel>
              <Panel header={SecurityQuestion2} key="2">
                <p>{SecurityAnswer2}</p>
              </Panel>
              <Panel header={SecurityQuestion3} key="3">
                <p>{SecurityAnswer3}</p>
              </Panel>
            </Collapse>
          )}
        </Row>
      </div>
    );
  }
}
