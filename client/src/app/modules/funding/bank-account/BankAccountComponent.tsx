import React from "react";
import { BaseComponent } from "../../../components/base/BaseComponent";
import { Card, Form, Button, Alert } from "antd";
import {
  mdBankAccount,
  BankAccountMetaData
} from "../../../../models/bank-account";
import { mdFormControl } from "../../../../shared/form-control";
import {
  RequiredValidator,
  MaxLengthValidator
} from "../../../../shared/validation-attributes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { mdCallResponse } from "../../../../models/call-response";

export default class BankAccountComponent extends BaseComponent {
  render() {
    this.initShorts();
    return (
      <Card
        className="gx-card"
        title={this.lang.New + " " + this.lang.BankAccount}
      >
        <Alert
          className="gx-mb-3"
          message={this.lang.NewBankAccountAlert}
          type="info"
        />
        <Form layout="horizontal" onSubmit={this.onSubmit}>
          {this.antd.textFormItem(
            this.f.bank_name,
            true,
            null,
            this.formItemLayout
          )}
          {this.antd.textFormItem(
            this.f.account_name,
            true,
            null,
            this.formItemLayout
          )}
          {this.antd.textFormItem(this.f.iban, true, null, this.formItemLayout)}
          {this.antd.textFormItem(
            this.f.branch_code,
            true,
            null,
            this.formItemLayout
          )}
          {this.antd.textAreaFormItem(
            this.f.branch_address,
            3,
            true,
            null,
            this.formItemLayout
          )}
          <div className="gx-text-center">
            <Button
              type="primary"
              htmlType={"submit"}
              loading={this.state.disableSubmitButton}
            >
              <FontAwesomeIcon icon="save" />
              {this.lang.Submit}
            </Button>
            <Button
              type="primary"
              onClick={_ => {
                if (typeof this.p.onCancel === "function") {
                  this.p.onCancel();
                }
              }}
            >
              <FontAwesomeIcon icon="times" />
              {this.lang.Cancel}
            </Button>
          </div>
        </Form>
      </Card>
    );
  }

  formItemLayout = {
    labelCol: { xs: 24, sm: 6 },
    wrapperCol: { xs: 24, sm: 14, md: 12 }
  };
  model: mdBankAccount = null;

  constructor(pps) {
    super(pps);
    this.init();
  }

  init() {
    this.model = new mdBankAccount();
    let state = {
      form: {
        bank_name: new mdFormControl(
          this.model.bank_name,
          "bank_name",
          this.lang.BankName,
          [
            new RequiredValidator(),
            new MaxLengthValidator(
              this.lang.MaxLengthFormat2,
              BankAccountMetaData.bank_nameMaxLength
            )
          ]
        ),
        account_name: new mdFormControl(
          this.model.account_name,
          "account_name",
          this.lang.AccountName,
          [
            new RequiredValidator(),
            new MaxLengthValidator(
              this.lang.MaxLengthFormat2,
              BankAccountMetaData.account_nameMaxLength
            )
          ]
        ),
        iban: new mdFormControl(this.model.iban, "iban", this.lang.IBAN, [
          new RequiredValidator(),
          new MaxLengthValidator(
            this.lang.MaxLengthFormat2,
            BankAccountMetaData.ibanMaxLength
          )
        ]),
        branch_code: new mdFormControl(
          this.model.branch_code,
          "branch_code",
          this.lang.BranchCode,
          [
            new RequiredValidator(),
            new MaxLengthValidator(
              this.lang.MaxLengthFormat2,
              BankAccountMetaData.branch_codeMaxLength
            )
          ]
        ),
        branch_address: new mdFormControl(
          this.model.branch_address,
          "branch_address",
          this.lang.Address,
          [
            new RequiredValidator(),
            new MaxLengthValidator(
              this.lang.MaxLengthFormat2,
              BankAccountMetaData.branch_addressMaxLength
            )
          ]
        )
      },
      disableSubmitButton: false
    };
    this.updateState(state);
  }

  onSubmit = e => {
    e.preventDefault();

    if (!this.validateForm()) {
      // this.antd.modalError("InValid Form");
      return;
    }
    let formData = this.getFormData(this.state.form) as mdBankAccount;
    return this.updateStatePromise({ disableSubmitButton: true }).then(_ => {
      return this.http
        .post<mdCallResponse>(
          this.constants.EndPoints.PostSaveBankAccount,
          formData
        )
        .then((res: mdCallResponse) => {
          return this.updateStatePromise({ disableSubmitButton: false }).then(
            _ => {
              if (res.isSuccess) {
                this.successNotification(this.lang.SavedSuccessfully);
                if (typeof this.p.onSaved === "function") {
                  this.p.onSaved(res.extras);
                }
              } else {
                this.errorNotification(res.message);
              }
            }
          );
        })
        .catch(error => {});
    });
  };
}
