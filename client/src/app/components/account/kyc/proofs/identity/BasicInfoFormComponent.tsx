import * as React from "react";
import { Row, Col, Card } from "antd";
import { Route, Switch } from "react-router";
import { BaseComponent } from "../../../../base/BaseComponent";
import { AccountTypes } from "../../../../../../enums/general";
import {
  mdUserAccounts,
  UserAccountsMetaData
} from "../../../../../../models/user-accounts";
import { mdFormControl } from "../../../../../../shared/form-control";
import {
  RequiredValidator,
  MaxLengthValidator
} from "../../../../../../shared/validation-attributes";

export default class BasicInfoFormComponent extends BaseComponent {
  render() {
    return <></>;
  }

  accountType: AccountTypes;
  model: mdUserAccounts;
  constructor(pps) {
    super(pps);
    this.init();
  }

  init() {
    this.accountType = this.p.accountType;
    if (!this.accountType) {
      this.accountType = AccountTypes.Individual;
    }
    this.model = new mdUserAccounts(true);
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
          [
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
          [
            new RequiredValidator(this.lang.RequiredFormat),
            new MaxLengthValidator(
              this.lang.MaxLengthFormat2,
              UserAccountsMetaData.last_nameMaxLength
            )
          ]
        ),
        dob: new mdFormControl(this.model.dob, "dob", this.lang.BirthDate, [
          new RequiredValidator(this.lang.RequiredFormat)
        ]),
        gender: new mdFormControl(
          this.model.gender,
          "gender",
          this.lang.Gender,
          [new RequiredValidator(this.lang.RequiredFormat)]
        )
      }
    };
  }
}
