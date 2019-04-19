import * as React from "react";
import { Button, Table, Card, Col, Row } from "antd";
import { BaseComponent } from "../../../base/BaseComponent";
import { AccountTypes } from "../../../../../enums/general";
import "./account-type-selection.less";
import { Link } from "react-router-dom";
import Widget from "../../../../../components/Widget";

export default class AccountTypeSelectionComponent extends BaseComponent {
  render() {
    const AccountTypeSelectionListItem = data => {
      const { icon, value, title, steps, description } = data;
      return (
        <Col
          style={{
            display: "inline-flex",
            justifyContent: "center",
            alignItems: "center"
          }}
          xl={24}
          key={value}
        >
          <Widget styleName="gx-ch-capitalize gx-card-sm-px">
            {/* <div
            style={{
              display: "inline-block",
              verticalAlign: "middle",
              minWidth: 500
            }}
            className="account-type-selection-row gx-mb-3"
          > */}
            <div className="gx-user-list gx-mt-3">
              <img
                alt="avatar"
                src={icon}
                className="gx-avatar-img gx-avatar-img-lg gx-border-0"
              />
              <div className="gx-description" style={{ width: 200 }}>
                <h3>{title}</h3>
                <p className="gx-mb-1">{description}</p>
                <ol className="gx-btn-list">
                  {steps.map((s, i) => {
                    return <li key={i}>{s}</li>;
                  })}
                </ol>
              </div>
              <div className="align-middle">
                <Link
                  to={this.getLink(
                    this.constants.RoutePaths.AccountVerificationProofs +
                      "?" +
                      this.constants.QueryParams.aType +
                      "=" +
                      value
                  )}
                >
                  <Button type="primary">{this.lang.Select}</Button>
                </Link>
              </div>
            </div>
          </Widget>
        </Col>
      );
    };

    return (
      <Card title={this.lang.AccountTypeSelection}>
        <Row type="flex" className="" style={{ alignItems: "center" }}>
          {this.state.accountTypeItems.map((m, i) => {
            return AccountTypeSelectionListItem(m);
          })}
        </Row>
      </Card>
    );
  }

  constructor(props) {
    super(props);
    this.init();
  }

  init() {
    this.state = {
      accountTypeItems: [
        {
          value: AccountTypes.Individual,
          icon: "/assets/images/boss128x128.png",
          title: this.lang.Individual,
          description: this.lang.AccountForAnIndividual,
          steps: [
            this.lang.ProofOfIdentity,
            this.lang.ProofOfAddress,
            this.lang.ProofOfIncome
          ]
        },
        {
          value: AccountTypes.Business,
          icon: "/assets/images/online-store128x128.png",
          title: this.lang.Business,
          steps: [
            this.lang.ProofOfBusiness,
            this.lang.ProofOfAddress,
            this.lang.ProofOfIncome
          ]
        }
      ]
    };
  }
}
