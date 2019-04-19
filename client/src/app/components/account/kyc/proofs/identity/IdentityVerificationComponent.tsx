import * as React from "react";
import { Row, Col, Card } from "antd";
import { Route, Switch } from "react-router";
import { BaseComponent } from "../../../../base/BaseComponent";
import { AccountTypes } from "../../../../../../enums/general";

export default class IdentityVerificationComponent extends BaseComponent {
  render() {
    return <></>;
  }

  steps = {
    BasicInfo: 1,
    Attachments: 2
  };
  accountType: AccountTypes;
  constructor(pps) {
    super(pps);
    this.init();
  }

  init() {
    this.accountType = this.parsedLocation[this.constants.QueryParams.aType];
    if (!this.accountType) {
      this.accountType = AccountTypes.Individual;
    }
    this.state = {
      currentStep: this.steps.BasicInfo
    };
  }
}
