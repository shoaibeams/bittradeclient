import * as React from "react";
import { BaseComponent } from "../../base/BaseComponent";
import AccountTypeSelectionComponent from "./account-type-selection/AccountTypeSelectionComponent";
import { Row, Col } from "antd";
import { Redirect } from "react-router";
import { AccountTypes } from "../../../../enums/general";

export default class KYCComponent extends BaseComponent {
  render() {
    const getContent = currentStep => {
      if (currentStep == this.steps.AccountTypeSelection) {
        return <AccountTypeSelectionComponent {...this.props} params={{}} />;
      } else if (currentStep == this.steps.ProofsGrid) {
        return (
          <Redirect
            to={this.getLink(
              this.constants.RoutePaths.AccountVerificationProofs
            )}
          />
        );
      }
    };
    return (
      <>
        {this.state.accountType == null ? (
          <AccountTypeSelectionComponent
            {...this.props}
            params={{
              nextClick: (accountType: AccountTypes) => {
                this.updateState({ accountType });
              }
            }}
          />
        ) : (
          <Redirect
            to={this.getLink(
              this.constants.RoutePaths.AccountVerificationProofs +
                "?" +
                this.constants.QueryParams.aType +
                "=" +
                this.state.accountType
            )}
          />
        )}
      </>
    );
    // (
    //   <>
    //     <Row type="flex" style={{ alignItems: "center" }}>
    //       <Col
    //         style={{
    //           display: "inline-flex",
    //           justifyContent: "center",
    //           alignItems: "center"
    //         }}
    //         xl={24}
    //       >
    //         <div
    //           style={{
    //             display: "inline-block",
    //             verticalAlign: "middle",
    //             minWidth: 500
    //           }}
    //         >
    //           <h1 className="gx-login-title">{this.lang.Verification}</h1>
    //           {getContent(this.state.currentStep)}
    //         </div>
    //       </Col>
    //     </Row>
    //   </>
    // );
  }

  steps = {
    AccountTypeSelection: 1,
    ProofsGrid: 2
  };
  constructor(props) {
    super(props);
    this.init();
  }

  init() {
    this.state = {
      currentStep: this.steps.AccountTypeSelection,
      accountType: null
    };
  }

  nextClick = previous => {
    let next = null;
    if (previous == this.steps.AccountTypeSelection) {
      next = this.steps.ProofsGrid;
    }
    if (next != null) {
      this.updateState({ currentStep: next });
    }
  };
}
