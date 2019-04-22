import * as React from "react";
import { Row, Col, Card, Button } from "antd";
import { Route, Switch } from "react-router";
import { BaseComponent } from "../../../../base/BaseComponent";
import { AccountTypes } from "../../../../../../enums/general";
import BasicInfoFormComponent from "./BasicInfoFormComponent";
import { mdUserAccounts } from "../../../../../../models/user-accounts";
import IdentityAttachmentsComponent from "./IdentityAttachmentsComponent";
import "./identity.less";
import WidgetHeader from "../../../../../../components/WidgetHeader";
import FontAwesome from "../../../../base/FontAwesome";

export default class IdentityVerificationComponent extends BaseComponent {
  render() {
    const getStepComponent = () => {
      if (this.state.currentStep == this.steps.BasicInfo) {
        return (
          <BasicInfoFormComponent
            {...this.props}
            params={{
              accountType: this.accountType,
              onNext: (formData: mdUserAccounts) => {
                this.updateState({
                  basicInfo: formData,
                  currentStep: this.steps.Attachments
                });
              }
            }}
          />
        );
      } else if (this.state.currentStep == this.steps.Attachments) {
        return (
          <IdentityAttachmentsComponent
            {...this.props}
            params={{
              accountType: this.accountType,
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
                    if (this.state.currentStep == this.steps.BasicInfo) {
                      this.p.onBack();
                    } else {
                      this.updateState({ currentStep: this.steps.BasicInfo });
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
    BasicInfo: 1,
    Attachments: 2
  };
  accountType: AccountTypes;
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
    this.state = {
      currentStep: this.steps.BasicInfo
    };
  }
  onAttachmentsDone = attachments => {};
}
