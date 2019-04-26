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

export default class BasicInfoFormComponent extends BaseComponent {
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
          {this.antd.textFormItem(
            this.f.first_name,
            true,
            null,
            this.formItemLayout
          )}
          {this.accountType == AccountTypes.Individual ? (
            <>
              {this.antd.textFormItem(
                this.f.middle_name,
                true,
                null,
                this.formItemLayout
              )}
              {this.antd.textFormItem(
                this.f.last_name,
                true,
                null,
                this.formItemLayout
              )}
            </>
          ) : null}
          {this.antd.dateFormItem(this.f.dob, true, null, this.formItemLayout)}
          {this.accountType == AccountTypes.Individual
            ? this.antd.selectFormItem(
                this.f.gender,
                this.genderSource,
                true,
                false,
                null,
                this.formItemLayout
              )
            : null}
          {/* {this.antd.selectFormItem(
            this.f.country_id,
            countriesList,
            true,
            false,
            null,
            this.formItemLayout
          )} */}
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
  constructor(pps) {
    super(pps);
    this.init();
  }

  init() {
    this.accountType = this.p.accountType;
    this.genderSource = StaticHelper.objectKeyValueArrayArray(Genders);
    this.model = this.p.docDetails;
    if (!this.model) {
      this.model = new mdUserAccounts(true);
    }
    this.state = {
      form: {
        first_name: new mdFormControl(
          this.model.first_name,
          "first_name",
          this.accountType == AccountTypes.Business
            ? this.lang.BusinessName
            : this.lang.FirstName,
          [
            new RequiredValidator(this.lang.RequiredFormat),
            new MaxLengthValidator(
              this.lang.MaxLengthFormat2,
              UserAccountsMetaData.first_nameMaxLength
            )
          ]
        ),
        middle_name: new mdFormControl(
          this.model.middle_name,
          "middle_name",
          this.lang.MiddleName,
          this.accountType == AccountTypes.Business
            ? []
            : [
                new MaxLengthValidator(
                  this.lang.MaxLengthFormat2,
                  UserAccountsMetaData.middle_nameMaxLength
                )
              ]
        ),
        last_name: new mdFormControl(
          this.model.last_name,
          "last_name",
          this.lang.LastName,
          this.accountType == AccountTypes.Business
            ? []
            : [
                new RequiredValidator(this.lang.RequiredFormat),
                new MaxLengthValidator(
                  this.lang.MaxLengthFormat2,
                  UserAccountsMetaData.last_nameMaxLength
                )
              ]
        ),
        dob: new mdFormControl(
          this.model.dob,
          "dob",
          this.accountType == AccountTypes.Business
            ? this.lang.DateOfIncorporation
            : this.lang.BirthDate,
          [new RequiredValidator(this.lang.RequiredFormat)]
        ),
        gender: new mdFormControl(
          this.model.gender,
          "gender",
          this.lang.Gender,
          this.accountType == AccountTypes.Business
            ? []
            : [new RequiredValidator(this.lang.RequiredFormat)]
        )
        // country_id: new mdFormControl(
        //   this.model.country_id,
        //   "country_id",
        //   this.accountType == AccountTypes.Business
        //     ? this.lang.CountryOfOperation
        //     : this.lang.Nationality,
        //   [new RequiredValidator(this.lang.RequiredFormat)]
        // )
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
    this.p.onNext(formData);
  };
}
