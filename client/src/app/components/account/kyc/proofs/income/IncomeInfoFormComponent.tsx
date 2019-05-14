import * as React from "react";
import { Row, Col, Card, Form, Button } from "antd";
import { Route, Switch } from "react-router";
import { BaseComponent } from "../../../../base/BaseComponent";
import { AccountTypes, Genders } from "../../../../../../enums/general";
import {
  mdUserAccounts,
  UserAccountsMetaData
} from "../../../../../../models/user-accounts";
import { mdFormControl } from "../../../../../../shared/form-control";
import {
  RequiredValidator,
  MaxLengthValidator
} from "../../../../../../shared/validation-attributes";
import { mdKeyValue } from "../../../../../../models/key-value";
import { StaticHelper } from "../../../../../../shared/static-helper";

export default class IncomeInfoFormComponent extends BaseComponent {
  render() {
    this.initShorts();
    let countriesList: mdKeyValue[] = [];
    let headerStyle = {};
    if (["xs", "sm"].indexOf(this.getCurrentWidth()) < 0) {
      headerStyle = {
        paddingLeft: 55
      };
    }
    return (
      <>
        <div className="gx-w-100 gx-mb-3">
          <h2 style={headerStyle}>{this.lang.BasicInformation}</h2>
        </div>
        <Form layout="horizontal" onSubmit={this.onSubmit}>
          {this.antd.selectFormItem(
            this.f.income,
            this.incomeSource,
            true,
            false,
            null,
            this.formItemLayout
          )}
          {this.antd.selectFormItem(
            this.f.expected_investment,
            this.expectedInvestments,
            true,
            false,
            null,
            this.formItemLayout
          )}
          <div className="gx-w-100 gx-text-center gx-mb-3">
            <Button htmlType="submit" type="primary">
              {this.lang.Next}
            </Button>
          </div>
        </Form>
      </>
    );
  }

  formItemLayout = {
    labelCol: { xs: 24, sm: 6 },
    wrapperCol: { xs: 24, sm: 14, md: 12 }
  };
  accountType: AccountTypes;
  model: mdUserAccounts;
  genderSource: mdKeyValue[];
  expectedInvestments: mdKeyValue[] = [];
  incomeSource: mdKeyValue[] = [];
  constructor(pps) {
    super(pps);
    this.init();
  }

  init() {
    this.incomeSource.push(new mdKeyValue("Up to $1000", "Up to $1000"));
    this.incomeSource.push(new mdKeyValue("$1001-1500", "$1001-1500"));
    this.incomeSource.push(new mdKeyValue("$1501-2500", "$1501-2500"));
    this.incomeSource.push(new mdKeyValue("$2501-5000", "$2501-5000"));
    this.incomeSource.push(new mdKeyValue("$5001-10000", "$5001-10000"));
    this.incomeSource.push(
      new mdKeyValue("More than $10000", "More than $10000")
    );

    this.expectedInvestments.push(new mdKeyValue("Up to $1000", "Up to $1000"));
    this.expectedInvestments.push(new mdKeyValue("$1000-5000", "$1000-5000"));
    this.expectedInvestments.push(new mdKeyValue("$5000-10000", "$5000-10000"));
    this.expectedInvestments.push(
      new mdKeyValue("$10001-20000", "$10001-20000")
    );
    this.expectedInvestments.push(
      new mdKeyValue("$20001-50000", "$20001-50000")
    );
    this.expectedInvestments.push(
      new mdKeyValue("$50001-100000", "$50001-100000")
    );
    this.expectedInvestments.push(
      new mdKeyValue("More than $100000", "More than $100000")
    );

    this.accountType = this.p.accountType;
    this.genderSource = StaticHelper.objectKeyValueArrayArray(Genders);
    this.model = this.p.docDetails;
    if (!this.model) {
      this.model = new mdUserAccounts(true);
    }
    this.state = {
      form: {
        income: new mdFormControl(
          this.model.income,
          "income",
          this.lang.IncomePerMonth,
          [
            new MaxLengthValidator(
              this.lang.MaxLengthFormat2,
              UserAccountsMetaData.incomeMaxLength
            )
          ]
        ),
        expected_investment: new mdFormControl(
          this.model.expected_investment,
          "expected_investment",
          this.lang.ExpectedAmountOfInvestment,
          [
            new MaxLengthValidator(
              this.lang.MaxLengthFormat2,
              UserAccountsMetaData.expected_investmentMaxLength
            )
          ]
        )
      }
    };
  }

  onSubmit = e => {
    if (e) {
      e.preventDefault();
    }

    if (!this.validateForm()) {
      // this.antd.modalError("InValid Form");
      return;
    }
    let formData = this.getFormData(this.state.form) as mdUserAccounts;
    // this.log.debug("fd", formData);
    this.p.onNext(formData);
  };
}
