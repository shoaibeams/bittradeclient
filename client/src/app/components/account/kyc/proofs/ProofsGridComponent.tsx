import * as React from "react";
import { BaseComponent } from "../../../base/BaseComponent";
import { AccountTypes } from "../../../../../enums/general";
import { Button, Table, Card, Row, Col } from "antd";
import Widget from "../../../../../components/Widget";

export default class ProofsGridComponent extends BaseComponent {
  render() {
    const AccountTypeSelectionListItem = data => {
      const { icon, value, title, steps, description } = data;
      return (
        <div key={value} className="gx-user-list">
          <img
            alt="avatar"
            src={icon}
            className="gx-avatar-img gx-avatar-img-lg gx-border-0"
          />
          <div className="gx-description">
            <h3>{title}</h3>
            <p className="gx-mb-1">{description}</p>
            <ol className="gx-btn-list">
              {steps.map((s, i) => {
                return <li key={i}>{s}</li>;
              })}
            </ol>
          </div>
          <div className="align-middle">
            <Button type="primary">{this.lang.Select}</Button>
          </div>
        </div>
      );
    };

    return (
      <Card title={this.lang.Verification}>
        <Row>
          {this.state.proofs.map((p, i) => {
            return this.antd.colmd8(
              <Widget styleName="gx-ch-capitalize gx-card-sm-px">
                <div className="gx-text-center gx-pt-sm-3">
                  <img
                    className="gx-size-60 gx-mb-3"
                    src={p.icon}
                    alt="birds"
                  />
                  <h2 className="gx-mb-3 gx-mb-sm-4">{p.title}</h2>
                  <Button className="gx-btn gx-btn-primary gx-text-white gx-mb-1">
                    {p.buttonText}
                  </Button>
                </div>
              </Widget>,
              { key: i }
            );
          })}
        </Row>
      </Card>
    );
  }

  accountType: AccountTypes;
  constructor(props) {
    super(props);
    this.init();
  }

  init() {
    this.accountType = this.parsedLocation[this.constants.QueryParams.aType];
    this.state = {
      proofs: [
        {
          icon:
            this.accountType == AccountTypes.Business
              ? "/assets/images/online-store128x128.png"
              : "/assets/images/boss128x128.png",
          title:
            this.accountType == AccountTypes.Business
              ? this.lang.ProofOfBusiness
              : this.accountType == AccountTypes.Individual
              ? this.lang.ProofOfIdentity
              : "",
          buttonText: this.lang.Verify
        },
        {
          icon: "/assets/images/placeholder128x128.png",
          title: this.lang.ProofOfAddress,
          buttonText: this.lang.Verify
        },
        {
          value: AccountTypes.Individual,
          icon: "/assets/images/profit128x128.png",
          title: this.lang.ProofOfIncome,
          buttonText: this.lang.Verify
        }
      ]
    };
  }
}
