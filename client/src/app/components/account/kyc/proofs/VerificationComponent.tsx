import * as React from "react";
import { Button, Spin } from "antd";
import { BaseComponent } from "../../../base/BaseComponent";
import { mdUserAccounts } from "../../../../../models/user-accounts";
import WidgetHeader from "../../../../../components/WidgetHeader";
import { AccountTypes } from "../../../../../enums/general";
import { ProofTypes } from "../../../../../enums/kyc";
import AttachmentsComponent from "./AttachmentsComponent";
import { mdDocument } from "../../../../../models/document";
import { mdCallResponse } from "../../../../../models/call-response";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default class VerificationComponent extends BaseComponent {
  render() {
    const getStepComponent = () => {
      if (this.state.currentStep == this.steps.BasicInfo) {
        return (
          <this.p.basicInfoComponent
            {...this.props}
            params={{
              accountType: this.accountType,
              docDetails: this.doc ? this.doc.docDetails : null,
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
          <AttachmentsComponent
            {...this.props}
            params={{
              accountType: this.accountType,
              docs: this.p.docs,
              onNext: this.onAttachmentsDone
            }}
          />
        );
      } else return null;
    };
    return (
      <Spin spinning={this.state.showAttachmentSpinner} size={"large"}>
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
              <FontAwesomeIcon icon={["fas", "arrow-left"]} />&nbsp;
              </Button>
              {this.p.proofTitle}
            </>
          }
          extra={null}
        />
        <div className="identity">{getStepComponent()}</div>

        {/* <Card title={this.lang.ProofOfIdentity} className="identity">
        {getStepComponent()}
      </Card> */}
      </Spin>
    );
  }

  steps = {
    BasicInfo: 1,
    Attachments: 2
  };
  accountType: AccountTypes;
  proof: ProofTypes;
  doc: mdDocument;
  constructor(pps) {
    super(pps);
    this.init();
  }

  init() {
    this.accountType = this.p.accountType;
    this.proof = this.p.proof;
    this.doc = this.p.doc;
    if (!this.accountType) {
      this.accountType = this.parsedLocation[this.constants.QueryParams.aType];
    }
    if (!this.accountType) {
      this.accountType = AccountTypes.Individual;
    }
    this.state = {
      currentStep: this.steps.BasicInfo,
      showAttachmentSpinner: false
    };
  }

  onAttachmentsDone = (attachments: any[]) => {
    this.updateState({ showAttachmentSpinner: true }, () => {
      let docs: mdDocument[] = [];
      for (let i = 0; i < attachments.length; i++) {
        let doc = new mdDocument();
        doc.userAccounts = this.state.basicInfo as mdUserAccounts;
        doc.account_type = this.accountType;
        doc.proof_type = this.proof;
        doc.type = attachments[i].value;
        let requirements = attachments[i].requirements;
        let docRequirements = [];
        if (Array.isArray(requirements)) {
          for (let j = 0; j < attachments[i].requirements.length; j++) {
            let requirement = attachments[i].requirements[j];
            let requirementAttachments = [];
            if (Array.isArray(requirement.de)) {
              for (let k = 0; k < requirement.de.length; k++) {
                let de = requirement.de[k];
                if (de.response) {
                  if (de.response.isSuccess) {
                    if (de.response.extras) {
                      if (de.response.extras.length > 0) {
                        requirementAttachments.push({
                          id: de.response.extras[0].id
                        });
                      }
                    }
                  }
                }
              }
            }
            docRequirements.push(requirementAttachments);
          }
        }
        doc.requirements = docRequirements;
        docs.push(doc);
      }

      this.http
        .post<mdCallResponse>(
          this.constants.EndPoints.PostKYCSaveDocuments,
          docs
        )
        .then((res: mdCallResponse) => {
          if (res) {
            if (res.isSuccess) {
              this.successNotification(
                this.lang.Submitted + " " + this.lang.Successfully
              );
              if (typeof this.p.onDone === "function") {
                this.p.onDone(res.extras);
              }
            } else {
              this.errorNotification(res.message, this.lang.Error);
            }
          }
          this.updateState({ showAttachmentSpinner: false });
        });
    });
  };
}
