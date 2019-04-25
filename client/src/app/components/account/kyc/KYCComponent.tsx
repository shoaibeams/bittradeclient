import * as React from "react";
import { BaseComponent } from "../../base/BaseComponent";
import { AccountTypes } from "../../../../enums/general";
import { Button, Table, Card, Row, Col, Badge } from "antd";
import Widget from "../../../../components/Widget";
import { Link } from "react-router-dom";
import WidgetHeader from "../../../../components/WidgetHeader";
import { DocumentTypesWithNames, ProofTypes } from "../../../../enums/kyc";
import BasicInfoFormComponent from "./proofs/identity/BasicInfoFormComponent";
import AddressInfoFormComponent from "./proofs/address/AddressInfoFormComponent";
import VerificationComponent from "./proofs/VerificationComponent";
import IncomeInfoFormComponent from "./proofs/income/IncomeInfoFormComponent";

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
                      onClick={() => {
                        this.updateState({ currentProof: p });
                      }}
                    >
                      {p.buttonText}
                    </Button>
                    {/* </Link> */}
                  </div>
                </Widget>,
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
            proof: proof.type,
            proofTitle: proof.title,
            basicInfoComponent: proof.basicInfoComponent,
            onDone: proof.onDone,
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
  }

  onBack = () => {
    this.updateState({ currentProof: null });
  };

  getBadge = () => {};
}
