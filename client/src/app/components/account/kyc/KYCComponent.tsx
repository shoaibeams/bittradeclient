import * as React from "react";
import { BaseComponent } from "../../base/BaseComponent";
import { AccountTypes } from "../../../../enums/general";
import { Button, Table, Card, Row, Col, Badge } from "antd";
import Widget from "../../../../components/Widget";
import { Link } from "react-router-dom";
import WidgetHeader from "../../../../components/WidgetHeader";
import {
  DocumentTypesWithNames,
  ProofTypes,
  DocumentRecordStatuses
} from "../../../../enums/kyc";
import BasicInfoFormComponent from "./proofs/identity/BasicInfoFormComponent";
import AddressInfoFormComponent from "./proofs/address/AddressInfoFormComponent";
import VerificationComponent from "./proofs/VerificationComponent";
import IncomeInfoFormComponent from "./proofs/income/IncomeInfoFormComponent";
import { mdCallResponse } from "../../../../models/call-response";
import {
  mdDocumentHistoryRequest,
  mdDocument
} from "../../../../models/document";

export default class KYCComponent extends BaseComponent {
  render() {
    if (this.state.currentProof == null) {
      return (
        <>
          <WidgetHeader
            styleName="gx-flex-row"
            title={this.lang.Verification}
            extra={null}
          />
          <Row>
            {this.state.proofs.map((p, i) => {
              return this.antd.colmd8(
                this.spinnerComponent(
                  <Widget styleName="gx-ch-capitalize gx-card-sm-px">
                    <div className="gx-text-center gx-pt-sm-3">
                      <img
                        className="gx-size-60 gx-mb-3"
                        src={p.icon}
                        alt="birds"
                      />
                      <h2 className="gx-mb-3 gx-mb-sm-4">{p.title}</h2>
                      <Badge status={p.badge.status} text={p.badge.text} />
                      <br />
                      {/* <Link to={p.link}> */}
                      <Button
                        className="gx-btn gx-btn-primary gx-text-white gx-mb-1"
                        loading={p.showSpinner}
                        onClick={() => {
                          this.loadDocumentDetails(p, i);
                        }}
                      >
                        {p.buttonText}
                      </Button>
                      {/* </Link> */}
                    </div>
                  </Widget>,
                  !this.state.statusChecked
                ),
                { key: i }
              );
            })}
          </Row>
        </>
        // </Card>
      );
    } else {
      let proof = this.state.currentProof;
      return (
        <VerificationComponent
          {...this.props}
          params={{
            accountType: this.accountType,
            docs: proof.docs,
            doc: proof.doc,
            proof: proof.type,
            proofTitle: proof.title,
            basicInfoComponent: proof.basicInfoComponent,
            onDone: this.onDone,
            onBack: this.onBack
          }}
        />
      );
    }
  }

  accountType: AccountTypes;
  constructor(props) {
    super(props);
    this.init();
  }

  init() {
    this.accountType = this.p.accountType;
    if (!this.accountType) {
      //load default account type from server
      this.accountType = AccountTypes.Individual;
    }
    let identityDocs = [];
    if (this.accountType == AccountTypes.Business) {
      identityDocs.push(
        DocumentTypesWithNames.BusinessIncorporationCertificate
      );
      identityDocs.push(DocumentTypesWithNames.MemorandumOfAssociation);
    } else {
      identityDocs.push(DocumentTypesWithNames.Passport);
      identityDocs.push(DocumentTypesWithNames.NIC);
      identityDocs.push(DocumentTypesWithNames.ResidentPermit);
    }

    let addressDocs = [];
    if (this.accountType == AccountTypes.Business) {
      let bankStatement = DocumentTypesWithNames.BankStatement;
      bankStatement.title = this.lang.Business + " " + bankStatement.title;
      addressDocs.push(bankStatement);
      addressDocs.push(DocumentTypesWithNames.UtilityBill);
      addressDocs.push(DocumentTypesWithNames.Tax);
    } else {
      addressDocs.push(DocumentTypesWithNames.DrivingLicense);
      addressDocs.push(DocumentTypesWithNames.UtilityBill);
      addressDocs.push(DocumentTypesWithNames.Tax);
    }

    let incomeDocs = [];
    if (this.accountType == AccountTypes.Business) {
      let bankStatement = DocumentTypesWithNames.BankStatement;
      bankStatement.title = this.lang.Business + " " + bankStatement.title;
      incomeDocs.push(bankStatement);
    } else {
      incomeDocs.push(DocumentTypesWithNames.WagesSlip);
      incomeDocs.push(DocumentTypesWithNames.BankStatement);
    }

    this.state = {
      currentProof: null,
      statusChecked: false,
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
          buttonText: this.lang.Verify,
          badge: {
            status: "default",
            text: this.lang.NotVerified
          },
          link: this.getLink(
            this.constants.RoutePaths.AccountVerificationProofsIdentity +
              "?" +
              this.constants.QueryParams.aType +
              "=" +
              this.accountType
          ),
          docs: identityDocs,
          basicInfoComponent: BasicInfoFormComponent,
          type: ProofTypes.Identity
        },
        {
          icon: "/assets/images/placeholder128x128.png",
          title: this.lang.ProofOfAddress,
          buttonText: this.lang.Verify,
          badge: {
            status: "default",
            text: this.lang.NotVerified
          },
          link: this.getLink(
            this.constants.RoutePaths.AccountVerificationProofsIdentity +
              "?" +
              this.constants.QueryParams.aType +
              "=" +
              this.accountType
          ),
          docs: addressDocs,
          basicInfoComponent: AddressInfoFormComponent,
          type: ProofTypes.Address
        },
        {
          value: AccountTypes.Individual,
          icon: "/assets/images/profit128x128.png",
          title: this.lang.ProofOfIncome,
          buttonText: this.lang.Verify,
          badge: {
            status: "default",
            text: this.lang.NotVerified
          },
          link: this.getLink(
            this.constants.RoutePaths.AccountVerificationProofsIdentity +
              "?" +
              this.constants.QueryParams.aType +
              "=" +
              this.accountType
          ),
          docs: incomeDocs,
          basicInfoComponent: IncomeInfoFormComponent,
          type: ProofTypes.income
        }
      ]
    };
    this.loadProofStatus();
  }

  getBadgeAndButtonText = (status: DocumentRecordStatuses) => {
    let badgeStatus = "default";
    let badgeText = this.lang.NotVerified;
    let buttonText = this.lang.Verify;
    switch (status) {
      case DocumentRecordStatuses.Approved:
        badgeStatus = "success";
        badgeText = this.lang.Verified;
        buttonText = this.lang.Submit + " " + this.lang.Again;
        break;

      case DocumentRecordStatuses.PartiallyApproved:
        badgeStatus = "warning";
        badgeText = this.lang.PartiallyVerified;
        buttonText = this.lang.Verify;
        break;

      case DocumentRecordStatuses.PartiallySubmitted:
        badgeStatus = "warning";
        badgeText = this.lang.PartiallySubmitted;
        buttonText = this.lang.Verify;
        break;

      case DocumentRecordStatuses.ReSubmitted:
        badgeStatus = "success";
        badgeText = this.lang.Verified;
        buttonText = this.lang.Review;
        break;

      case DocumentRecordStatuses.Rejected:
        badgeStatus = "danger";
        badgeText = this.lang.Rejected;
        buttonText = this.lang.Verify;
        break;

      case DocumentRecordStatuses.Submitted:
        badgeStatus = "warning";
        badgeText = this.lang.Submitted;
        buttonText = this.lang.Review;
        break;

      default:
        badgeStatus = "default";
        badgeText = this.lang.NotVerified;
        buttonText = this.lang.Verify;
        break;
    }
    return {
      badge: {
        status: badgeStatus,
        text: badgeText
      },
      buttonText
    };
  };

  onBack = () => {
    this.updateState({ currentProof: null });
  };

  onDone = statuses => {
    let proofs = this.state.proofs as any[];
    let keys = Object.keys(statuses);
    for (let i = 0; i < keys.length; i++) {
      let proof = proofs.filter(m => m.type == keys[i]);
      if (proof.length > 0) {
        let index = proofs.indexOf(proof[0]);
        let badgeAndButtonText = this.getBadgeAndButtonText(
          statuses[proofs[index].type].record_status
        );
        proofs[index] = {
          ...proofs[index],
          ...badgeAndButtonText,
          showSpinner: false,
          docId: statuses[proofs[index].type].docId
        };
      }
    }
    this.updateState({
      currentProof: null,
      statusChecked: true,
      proofs: proofs
    });
  };

  loadProofStatus = () => {
    this.http
      .get(this.constants.EndPoints.GetKYCProofsSummary)
      .then((res: mdCallResponse) => {
        if (res) {
          if (res.isSuccess) {
            this.onDone(res.extras);
          }
        }
      });
  };

  loadDocumentDetails = (proof: any, proofIndex) => {
    proof.showSpinner = true;
    let proofs = this.state.proofs as any[];
    proofs[proofIndex] = proof;
    this.updateState({ proofs }, () => {
      let hist = new mdDocumentHistoryRequest();
      hist.id = proof.docId;
      this.http
        .post(this.constants.EndPoints.PostKYCDocumentHistory, hist)
        .then((res: mdCallResponse) => {
          let state = {};
          if (res) {
            if (res.isSuccess) {
              let doc = new mdDocument();
              if (res.extras.length > 0) {
                doc = res.extras[0];
                let proofs = this.state.proofs as any[];
                proof.doc = doc;
                proof.showSpinner = false;
                proofs[proofIndex] = proof;
                state = { proofs };
              }
            }
          }
          state = { ...state, currentProof: proof };
          this.updateState(state);
        });
    });
  };
}
