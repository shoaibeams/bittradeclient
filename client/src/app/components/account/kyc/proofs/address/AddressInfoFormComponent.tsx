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

export default class AddressInfoFormComponent extends BaseComponent {
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
          {this.antd.textAreaFormItem(
            this.f.address,
            3,
            true,
            null,
            this.formItemLayout
          )}
          {this.antd.textFormItem(
            this.f.postal_code,
            true,
            null,
            this.formItemLayout
          )}
          {this.antd.textFormItem(this.f.city, true, null, this.formItemLayout)}
          {this.antd.selectFormItem(
            this.f.country_id,
            countriesList,
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
  constructor(pps) {
    super(pps);
    this.init();
  }

  init() {
    this.accountType = this.p.accountType;
    this.genderSource = StaticHelper.objectKeyValueArrayArray(Genders);
    this.model = new mdUserAccounts(true);
    this.state = {
      form: {
        address: new mdFormControl(
          this.model.address,
          "address",
          this.lang.Address,
          [
            new RequiredValidator(this.lang.RequiredFormat),
            new MaxLengthValidator(
              this.lang.MaxLengthFormat2,
              UserAccountsMetaData.addressMaxLength
            )
          ]
        ),
        postal_code: new mdFormControl(
          this.model.postal_code,
          "postal_code",
          this.lang.PostalCode,
          [
            new RequiredValidator(this.lang.RequiredFormat),
            new MaxLengthValidator(
              this.lang.MaxLengthFormat2,
              UserAccountsMetaData.postal_codeMaxLength
            )
          ]
        ),
        city: new mdFormControl(this.model.city, "city", this.lang.City, [
          new RequiredValidator(this.lang.RequiredFormat),
          new MaxLengthValidator(
            this.lang.MaxLengthFormat2,
            UserAccountsMetaData.cityMaxLength
          )
        ]),
        country_id: new mdFormControl(
          this.model.country_id,
          "country_id",
          this.lang.Country,
          [new RequiredValidator(this.lang.RequiredFormat)]
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
      // return;
    }
    let formData = this.getFormData() as mdUserAccounts;
    this.p.onNext(formData);
  };
}
