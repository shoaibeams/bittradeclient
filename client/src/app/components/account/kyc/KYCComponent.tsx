import React from "react";
import { BaseComponent } from "../../base/BaseComponent";
import { AccountTypes } from "../../../../enums/general";
import { Button, Row, Badge, Radio } from "antd";
import Widget from "../../../../components/Widget";
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
import { StaticHelper } from "../../../../shared/static-helper";
import AccountTypeSelectionComponent from "./account-type-selection/AccountTypeSelectionComponent";
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

export default class KYCComponent extends BaseComponent {
  render() {
    if (this.state.accountType == null) {
      return (
        <AccountTypeSelectionComponent
          {...this.props}
          params={{
            onSelect: accountType => {
              this.setStateBasedOnAccountType(
                accountType,
                this.updateProofStatuses
              );
            }
          }}
        />
      );
    } else if (this.state.currentProof == null) {
      return (
        <>
          {this.getHeaderTopRightCorner()}
          {/* <div>
            <WidgetHeader
              styleName="gx-flex-row"
              title={this.lang.Verification}
              extra={null}
            /> */}
          {/* </div> */}
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
            accountType: this.state.accountType,
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

  getHeaderTopRightCorner = () => {
    let statuses = this.state.statuses;
    if (!statuses) {
      statuses = {};
    } else if (
      statuses[AccountTypes.Individual] &&
      statuses[AccountTypes.Business]
    ) {
      return (
        <div className="gx-mb-3 gx-text-right">
          <RadioGroup
            onChange={e => {
              this.setStateBasedOnAccountType(
                e.target.value,
                this.updateProofStatuses
              );
            }}
            value={this.state.accountType}
          >
            <RadioButton value={AccountTypes.Individual}>
              <img className="" src={this.individualLogo} alt="birds" />
              &nbsp;
              {this.lang.Individual}
            </RadioButton>
            <RadioButton value={AccountTypes.Business}>
              <img className="" src={this.businessLogo} alt="birds" />
              &nbsp;
              {this.lang.Business}
            </RadioButton>
          </RadioGroup>
        </div>
      );
    } else {
      return (
        <div className="gx-mb-3 gx-text-right">
          {this.state.accountType == AccountTypes.Business ? (
            <>
              <span style={{marginRight:'7px'}}>{this.lang.AccountType}:</span>&nbsp;
              <img className="" src={this.businessLogo} alt="birds" />
              &nbsp;
              {this.lang.Business}
            </>
          ) : (
            <>
              <span style={{marginRight:'7px'}}>{this.lang.AccountType}:</span>&nbsp;
              <img className="" src={this.individualLogo} alt="birds" />
              &nbsp;
              {this.lang.Individual}
            </>
          )}
          &nbsp;&nbsp;
          <Button
            type="primary"
            onClick={_ => {
              this.updateState({ accountType: null });
            }}
            style={{ marginTop: "15px" }}
          >
            {this.lang.Change}
          </Button>
        </div>
      );
    }
  };

  identityDocs = [];
  addressDocs = [];
  incomeDocs = [];
  individualLogo = "/assets/images/boss32x32.png";
  businessLogo = "/assets/images/online-store24x24.png";
  constructor(props) {
    super(props);
    this.init();
  }

  init() {
    let accountType = this.p.accountType as AccountTypes;
    if (!accountType) {
      //load default account type from server
      accountType = AccountTypes.Individual;
    }
    this.identityDocs = [];
    if (accountType == AccountTypes.Business) {
      this.identityDocs.push(
        DocumentTypesWithNames.BusinessIncorporationCertificate
      );
      this.identityDocs.push(DocumentTypesWithNames.MemorandumOfAssociation);
    } else {
      this.identityDocs.push(DocumentTypesWithNames.Passport);
      this.identityDocs.push(DocumentTypesWithNames.NIC);
      this.identityDocs.push(DocumentTypesWithNames.ResidentPermit);
    }

    this.addressDocs = [];
    if (accountType == AccountTypes.Business) {
      let bankStatement = DocumentTypesWithNames.BankStatement;
      bankStatement.title = this.lang.Business + " " + bankStatement.title;
      this.addressDocs.push(bankStatement);
      this.addressDocs.push(DocumentTypesWithNames.UtilityBill);
      this.addressDocs.push(DocumentTypesWithNames.Tax);
    } else {
      this.addressDocs.push(DocumentTypesWithNames.DrivingLicense);
      this.addressDocs.push(DocumentTypesWithNames.UtilityBill);
      this.addressDocs.push(DocumentTypesWithNames.Tax);
    }

    this.incomeDocs = [];
    if (accountType == AccountTypes.Business) {
      let bankStatement = DocumentTypesWithNames.BankStatement;
      bankStatement.title = this.lang.Business + " " + bankStatement.title;
      this.incomeDocs.push(bankStatement);
    } else {
      this.incomeDocs.push(DocumentTypesWithNames.WagesSlip);
      this.incomeDocs.push(DocumentTypesWithNames.BankStatement);
    }

    this.setStateBasedOnAccountType(accountType);
    this.loadProofStatus();
  }

  setStateBasedOnAccountType = (accountType, callback?) => {
    let state = {
      currentProof: null,
      statusChecked: false,
      accountType,
      proofs: [
        {
          icon:
            accountType == AccountTypes.Business
              ? "/assets/images/online-store128x128.png"
              : "/assets/images/boss128x128.png",
          title:
            accountType == AccountTypes.Business
              ? this.lang.ProofOfBusiness
              : accountType == AccountTypes.Individual
              ? this.lang.ProofOfIdentity
              : "",
          buttonText: this.lang.Verify,
          badge: {
            status: "default",
            text: this.lang.NotVerified
          },
          link: this.getLink(
            this.constants.RoutePaths.MyAccountVerificationProofsIdentity +
              "?" +
              this.constants.QueryParams.aType +
              "=" +
              accountType
          ),
          docs: this.identityDocs,
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
            this.constants.RoutePaths.MyAccountVerificationProofsIdentity +
              "?" +
              this.constants.QueryParams.aType +
              "=" +
              accountType
          ),
          docs: this.addressDocs,
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
            this.constants.RoutePaths.MyAccountVerificationProofsIdentity +
              "?" +
              this.constants.QueryParams.aType +
              "=" +
              accountType
          ),
          docs: this.incomeDocs,
          basicInfoComponent: IncomeInfoFormComponent,
          type: ProofTypes.income
        }
      ]
    };
    this.updateState(state, callback);
  };

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

  updateProofStatuses = () => {
    let proofs = this.state.proofs as any[];
    let statuses = this.state.statuses[this.state.accountType];
    if (!statuses) {
      for (let i = 0; i < proofs.length; i++) {
        statuses = StaticHelper.assignPropertyOfObject(
          statuses,
          proofs[i].type,
          {
            record_status: DocumentRecordStatuses.NotSubmitted
          }
        );
      }
    }
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

  onDone = statuses => {
    let accountType = this.state.accountType;
    if (
      statuses.lastAccountType == AccountTypes.Business ||
      statuses.lastAccountType == AccountTypes.Individual
    ) {
      accountType = statuses.lastAccountType;
    }
    this.updateState({ statuses, accountType }, this.updateProofStatuses);
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
