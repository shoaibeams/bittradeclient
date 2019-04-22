import * as React from "react";
import { Row, Col, Card, Button } from "antd";
import { Route, Switch } from "react-router";
import { BaseComponent } from "../../../../base/BaseComponent";
import { AccountTypes } from "../../../../../../enums/general";
import { mdUserAccounts } from "../../../../../../models/user-accounts";
import WidgetHeader from "../../../../../../components/WidgetHeader";
import FontAwesome from "../../../../base/FontAwesome";
import AddressInfoFormComponent from "./AddressInfoFormComponent";
import AttachmentsComponent from "../AttachmentsComponent";
import { DocumentTypesWithNames } from "../../../../../../enums/kyc";

export default class AddressVerificationComponent extends BaseComponent {
  render() {
    const getStepComponent = () => {
      if (this.state.currentStep == this.steps.AddressInfo) {
        return (
          <AddressInfoFormComponent
            {...this.props}
            params={{
              accountType: this.accountType,
              onNext: (formData: mdUserAccounts) => {
                this.updateState({
                  addressInfo: formData,
                  currentStep: this.steps.Attachments
                });
              }
            }}
          />
        );
      } else if (this.state.currentStep == this.steps.Attachments) {
        return (
          <AttachmentsComponent
            {...this.props}
            params={{
              accountType: this.accountType,
              docs: this.docs,
              onNext: this.onAttachmentsDone
            }}
          />
        );
      } else return null;
    };
    return (
      <>
        <WidgetHeader
          styleName="gx-flex-row"
          title={
            <>
              <Button
                type="default"
                size="small"
                title={this.lang.Back}
                onClick={() => {
                  if (typeof this.p.onBack === "function") {
                    if (this.state.currentStep == this.steps.AddressInfo) {
                      this.p.onBack();
                    } else {
                      this.updateState({ currentStep: this.steps.AddressInfo });
                    }
                  }
                }}
              >
                {FontAwesome.faIcon("arrow-left")}&nbsp;
              </Button>
              {this.lang.ProofOfIdentity}
            </>
          }
          extra={null}
        />
        <div className="identity">{getStepComponent()}</div>

        {/* <Card title={this.lang.ProofOfIdentity} className="identity">
        {getStepComponent()}
      </Card> */}
      </>
    );
  }

  steps = {
    AddressInfo: 1,
    Attachments: 2
  };
  accountType: AccountTypes;
  docs: any[];
  constructor(pps) {
    super(pps);
    this.init();
  }

  init() {
    this.accountType = this.p.accountType;
    if (!this.accountType) {
      this.accountType = this.parsedLocation[this.constants.QueryParams.aType];
    }
    if (!this.accountType) {
      this.accountType = AccountTypes.Individual;
    }
    this.docs = [];
    if (this.accountType == AccountTypes.Business) {
      let bankStatement = DocumentTypesWithNames.BankStatement;
      bankStatement.title = this.lang.Business + " " + bankStatement.title;
      this.docs.push(bankStatement);
      this.docs.push(DocumentTypesWithNames.UtilityBill);
      this.docs.push(DocumentTypesWithNames.Tax);
    } else {
      this.docs.push(DocumentTypesWithNames.DrivingLicense);
      this.docs.push(DocumentTypesWithNames.UtilityBill);
      this.docs.push(DocumentTypesWithNames.Tax);
    }
    this.state = {
      currentStep: this.steps.AddressInfo
    };
  }
  onAttachmentsDone = attachments => {};
}
