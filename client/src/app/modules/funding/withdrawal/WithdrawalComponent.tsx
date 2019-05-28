import * as React from "react";
import { SearchableDropdownSettings } from "../../shared/searchable-dropdown/searchable-dropdown-settings";
import FileUploaderComponent from "../../shared/file-uploader/FileUploaderComponent";
import { mdFileUploaderConfig } from "../../shared/file-uploader/file-uploader-config";
import { BaseComponent } from "../../../components/base/BaseComponent";
import { mdFeeSlabs } from "../../../../models/fee-slabs";
import { mdFormControl } from "../../../../shared/form-control";
import { StaticHelper } from "../../../../shared/static-helper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  Row,
  Card,
  Select,
  Table,
  Form,
  Col,
  Button,
  Tag,
  Menu,
  Alert,
  Popover
} from "antd";
import FontAwesome from "../../../components/base/FontAwesome";
import { RequiredValidator } from "../../../../shared/validation-attributes";
import { mdCallResponse } from "../../../../models/call-response";
import { FeeSlabFeeApplyTypes } from "../../../../enums/fee-slabs";
import { mdCurrency } from "../../../../models/currency";
import { CurrencyTypes } from "../../../../enums/currency";
import WidgetHeader from "../../../../components/WidgetHeader";
import { mdWithdrawalRequestHistoryRequest } from "../../../../models/withdrawal-request-history-request";
import { mdWithdrawalRequestHistory } from "../../../../models/withdrawal-request-history";
import { mdBankAccount } from "../../../../models/bank-account";
import { WithdrawalRequestRecordStatuses } from "../../../../enums/withdrawal";
import { mdKeyValue } from "../../../../models/key-value";
import BankAccountComponent from "../bank-account/BankAccountComponent";
import { mdWithdrawalMethod } from "../../../../models/withdrawal-method";
import { mdLimit } from "../../../../models/limit";
import { mdWallet } from "../../../../models/wallet";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { mdWithdrawalRequest } from "../../../../models/withdrawal-request";
import { TwoFactorAuthTypes } from "../../../../enums/general";
const Option = Select.Option;
const MenuItem = Menu.Item;

export default class WithdrawalComponent extends BaseComponent {
  render() {
    this.initShorts();
    const withdrawableCurrencies = this.state
      .withdrawableCurrencies as mdCurrency[];
    const settings = this.state.withdrawableCurrenciesSettings;
    const cp = this.state.selectedCurrency as mdCurrency;
    const withdrawalMethods = this.state
      .withdrawalMethods as mdWithdrawalMethod[];
    let selectedMethod: mdWithdrawalMethod = null;
    if (!this.isNullOrEmpty(this.f.withdrawal_method_id.value)) {
      selectedMethod = withdrawalMethods.filter(
        m => m.id == this.f.withdrawal_method_id.value
      )[0];
    }
    const sdm = this.state.selectedDepositMethod;
    const fiatCurrencies = withdrawableCurrencies.filter(
      m => m.type == CurrencyTypes.Fiat
    );
    const cryptoCurrencies = withdrawableCurrencies.filter(
      m => m.type == CurrencyTypes.Crypto
    );
    const bankAccounts = this.state.bankAccounts as mdBankAccount[];
    const bankAccountsSource = bankAccounts.map(m => {
      return new mdKeyValue(
        m.bank_name + " - " + m.iban + " (" + m.account_name + ")",
        m.id
      );
    });
    const withdrawalMethodsSource = withdrawalMethods.map(m => {
      return new mdKeyValue(m.title, m.id);
    });
    let limitDaily = this.state.limitDaily as mdLimit;
    if (!limitDaily) {
      limitDaily = new mdLimit();
    }
    let limitMonthly = this.state.limitMonthly as mdLimit;
    if (!limitMonthly) {
      limitMonthly = new mdLimit();
    }
    let wallet = this.state.wallet as mdWallet;
    if (!wallet) {
      wallet = new mdWallet();
      wallet.available_balance = 0;
    }
    let ourFeeSlabs = this.state.ourFeeSlabs as mdFeeSlabs[];
    ourFeeSlabs = ourFeeSlabs.map(f => {
      f["key"] = f.id;
      return f;
    });
    return (
      <>
        <Row>
          {this.antd.colmd6(
            <div className="gx-mb-3 gx-w-100">
              {this.getCurrencyMenus(fiatCurrencies, this.lang.FiatCurrencies)}
              {this.getCurrencyMenus(
                cryptoCurrencies,
                this.lang.CryptoCurrencies
              )}
            </div>
          )}
          {this.antd.colmd18(
            this.isNullOrEmpty(cp) ? (
              this.spinnerComponent(
                <Card className="gx-card" title={this.lang.WithdrawalRequests}>
                  <Table
                    className="gx-table-responsive"
                    columns={this.withdrawRequestsTableSettings.columns}
                    dataSource={this.state.withdrawalRequestHistory}
                    size="small"
                    pagination={false}
                  />
                </Card>,
                this.state.loadingWithdrawalHistory
              )
            ) : this.state.newBankAccountForm ? (
              <BankAccountComponent
                {...this.props}
                params={{
                  onSaved: (bankAccount: mdBankAccount) => {
                    if (bankAccount) {
                      if (
                        bankAccounts.filter(m => m.id == bankAccount.id)
                          .length < 1
                      ) {
                        bankAccounts.push(bankAccount);

                        this.updateStatePromise({
                          bankAccounts,
                          newBankAccountForm: false
                        }).then(_ => {
                          this.handleFormControlInputWithValue(
                            this.f.bank_account_id.name,
                            bankAccount.id
                          );
                        });
                      }
                    }
                  },
                  onCancel: _ => {
                    this.updateState({ newBankAccountForm: false });
                  }
                }}
              />
            ) : (
              <Card
                className="gx-card"
                title={this.lang.New + " " + this.lang.WithdrawalRequest}
                extra={
                  <p
                    className="ant-btn-background-ghost gx-text-primary gx-mb-0 gx-pointer"
                    onClick={_ => {
                      this.updateState({ newBankAccountForm: true });
                    }}
                  >
                    <FontAwesomeIcon icon="plus" />
                    {this.lang.AddBankAccount}
                  </p>
                }
              >
                <Alert
                  className="gx-mb-3"
                  message={
                    <div>
                      <Row>
                        {this.antd.colmd6(<span>{this.lang.DailyLimit}</span>)}
                        {this.antd.colmd6(
                          <span>
                            {cp.symbol + "" + this.state.withdrawalsToday}/
                            {cp.symbol + "" + limitDaily.max}
                          </span>
                        )}
                      </Row>
                      <Row>
                        {this.antd.colmd6(
                          <span>{this.lang.MonthlyLimit}</span>
                        )}
                        {this.antd.colmd6(
                          <span>
                            {cp.symbol +
                              "" +
                              this.state.withdrawalsCurrentMonth}
                            {cp.symbol + "" + limitMonthly.max}
                          </span>
                        )}
                      </Row>
                      <Row>
                        {this.antd.colmd6(<span>{this.lang.Balance}</span>)}
                        {this.antd.colmd6(
                          <span>
                            {cp.symbol + "" + wallet.available_balance}
                          </span>
                        )}
                      </Row>
                    </div>
                  }
                  type="info"
                />
                <Form layout="horizontal" onSubmit={this.onSubmit}>
                  {this.antd.selectFormItem(
                    this.f.withdrawal_method_id,
                    withdrawalMethodsSource,
                    true,
                    this.state.loadingPreRequisites,
                    null,
                    this.formItemLayout
                  )}
                  {this.antd.selectFormItem(
                    this.f.bank_account_id,
                    bankAccountsSource,
                    true,
                    this.state.loadingBankAccounts,
                    null,
                    this.formItemLayout
                  )}
                  {this.antd.numberFormItem(
                    this.f.amount,
                    true,
                    5,
                    this.isNullOrEmpty(selectedMethod)
                      ? 10
                      : selectedMethod.minimum_withdrawal,
                    this.getMaximumAmount(limitDaily, limitMonthly),
                    null,
                    this.formItemLayout
                  )}
                  {selectedMethod == null
                    ? null
                    : this.antd.labelFormItem(
                        new mdFormControl(
                          cp.symbol + selectedMethod.fee,
                          "",
                          this.lang.BankCharges
                        ),
                        true,
                        this.formItemLayout
                      )}
                  {this.antd.labelFormItem(
                    new mdFormControl("", "", this.lang.ExchangeFee),
                    true,
                    this.formItemLayout,
                    () => {
                      return (
                        cp.symbol +
                        this.getCurrentFee(ourFeeSlabs, this.f.amount)
                      );
                    }
                  )}
                  {ourFeeSlabs.length > 0
                    ? this.antd.labelFormItem(
                        new mdFormControl("", "", this.lang.OurFees),
                        true,
                        this.formItemLayout,
                        () => {
                          if (ourFeeSlabs.length < 2) {
                            return this.getFeeStringFromFeeSlab(ourFeeSlabs[0]);
                          } else {
                            return (
                              <Table
                                className="gx-table-responsive"
                                columns={this.feeSlabsTableSettings.columns}
                                dataSource={ourFeeSlabs}
                                size="small"
                                pagination={false}
                              />
                            );
                          }
                        }
                      )
                    : null}

                  {this.g.preferences.two_fa_on_withdrawal &&
                  this.getUserTFA() != TwoFactorAuthTypes.None
                    ? this.antd.textFormItem(
                        this.f.two_fa_code,
                        true,
                        null,
                        this.formItemLayout
                      )
                    : null}
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
                        this.updateState({ selectedCurrency: null });
                      }}
                    >
                      <FontAwesomeIcon icon="times" />
                      {this.lang.Cancel}
                    </Button>
                  </div>
                </Form>
              </Card>
            )
          )}
        </Row>
      </>
    );
  }

  getCurrencyMenus = (currencies: mdCurrency[], title) => {
    let selectedKeys = [];
    if (!this.isNullOrEmpty(this.state.selectedCurrency)) {
      if (
        currencies.filter(m => m.id == this.state.selectedCurrency.id).length >
        0
      ) {
        selectedKeys = [this.state.selectedCurrency.id.toString()];
      }
    }
    return (
      <>
        {currencies.length < 1 ? null : (
          <>
            <span className="h3">{title}</span>
            <Menu selectedKeys={selectedKeys}>
              {currencies.map((c, i) => {
                return (
                  <MenuItem
                    key={c.id}
                    onClick={() => {
                      this.onCurrencySelected(c);
                    }}
                  >
                    <img
                      src={c.icon}
                      width={25}
                      height={25}
                      className="gx-mr-2"
                    />
                    {c.name}
                  </MenuItem>
                );
              })}
            </Menu>
          </>
        )}
      </>
    );
  };
  formItemLayout = {
    labelCol: { xs: 24, sm: 6 },
    wrapperCol: { xs: 24, sm: 14, md: 12 }
  };
  model: mdWithdrawalRequest;
  withdrawReceiptFileUploader = React.createRef<FileUploaderComponent>();
  constructor(props) {
    super(props);
    this.init();
  }

  init() {
    this.model = new mdWithdrawalRequest();
    this.state = {
      withdrawableCurrencies: [],
      bankAccounts: [],
      withdrawalMethods: [],
      ourFeeSlabs: [],
      withdrawalsToday: 0,
      withdrawalsCurrentMonth: 0,
      newBankAccountForm: false,
      selectedCurrency: null,
      loadingBankAccounts: true
    };
    this.resetForm(true);
  }

  afterReceivingProps = _ => {
    let two_fa_code = this.state.form.two_fa_code as mdFormControl;
    if (
      this.g.preferences.two_fa_on_withdrawal &&
      this.getUserTFA() != TwoFactorAuthTypes.None
    ) {
      two_fa_code.validators = [
        new RequiredValidator(this.lang.RequiredFormat)
      ];
    } else {
      two_fa_code.validators = [];
    }
    this.updateState({ form: { ...this.state.form, two_fa_code } });
  };

  resetForm(loadWithdrawableCurrencies: boolean = false) {
    let state = {
      form: {
        amount: new mdFormControl("", "amount", this.lang.Amount, [
          new RequiredValidator(this.lang.RequiredFormat)
        ]),
        bank_account_id: new mdFormControl(
          this.model.bank_account_id,
          "bank_account_id",
          this.lang.BankAccount,
          [new RequiredValidator(this.lang.RequiredFormat)]
        ),
        withdrawal_method_id: new mdFormControl(
          this.model.withdrawal_method_id,
          "withdrawal_method_id",
          this.lang.Withdrawal,
          [new RequiredValidator(this.lang.RequiredFormat)]
        ),
        two_fa_code: new mdFormControl(
          this.model.two_fa_code,
          "two_fa_code",
          this.lang.TwoFactorAuthentication,
          this.g.preferences.two_fa_on_withdrawal
            ? [new RequiredValidator(this.lang.RequiredFormat)]
            : []
        )
      },
      disableSubmitButton: false,
      showSubmitResponse: false,
      submitResponseClass: "text-danger",
      submitResponse: "",
      loadingWithdrawalHistory: false
    };
    this.updateState(state, _ => {
      if (loadWithdrawableCurrencies) {
        this.loadWithdrawableCurrencies();
        this.loadBankAccounts().then(_ => {
          this.loadWithdrawalRequestHistory();
        });
      }
    });
  }

  getMaximumAmount = (limitDaily: mdLimit, limitMonthly: mdLimit) => {
    let maxAmount = 0;
    let dailyMaxAmount = 0;
    let monthlyMaxAmount = 0;
    if (limitDaily) {
      dailyMaxAmount = limitDaily.max - this.state.withdrawalsToday;
    }
    if (limitMonthly) {
      monthlyMaxAmount = limitMonthly.max - this.state.withdrawalsCurrentMonth;
    }
    if (monthlyMaxAmount < dailyMaxAmount) {
      maxAmount = monthlyMaxAmount;
    } else {
      maxAmount = dailyMaxAmount;
    }
    return maxAmount;
  };

  onCurrencySelected = c => {
    let newCurrency = false;
    if (this.isNullOrEmpty(this.state.selectedCurrency)) {
      newCurrency = true;
    } else {
      if (c.id != this.state.selectedCurrency.id) {
        newCurrency = true;
      }
    }
    if (newCurrency) {
      this.updateStatePromise({ selectedCurrency: c }).then(_ => {
        this.resetForm();
        return this.loadPreRequisites();
      });
    }
  };

  loadPreRequisites = () => {
    let currency = new mdCurrency();
    currency.id = this.state.selectedCurrency.id;
    currency.type = this.state.selectedCurrency.type;
    return this.updateStatePromise({ loadingPreRequisites: true })
      .then(_ => {
        return this.http
          .post<mdCallResponse>(
            this.constants.EndPoints.GetWithdrawalPreRequisites,
            currency
          )
          .then((res: mdCallResponse) => {
            let state = {};
            if (res.isSuccess) {
              if (res.extras) {
                let withdrawalMethods = res.extras
                  .withdrawalMethods as mdWithdrawalMethod[];
                if (withdrawalMethods.length > 0) {
                  state = this.getNewStateForControlInput(
                    this.state.form.withdrawal_method_id.name,
                    withdrawalMethods[0].id
                  );
                }
                state = { ...state, ...res.extras };
              }
            }
            return this.updateStatePromise({
              ...state,
              loadingPreRequisites: false
            });
          });
      })
      .catch(error => {
        this.log.error(error);
        return this.updateStatePromise({
          loadingPreRequisites: false
        });
      });
  };

  newWithdrawalRequestClicked = () => {
    this.showErrors = false;
    this.resetForm();
  };

  loadWithdrawableCurrencies() {
    this.updateState(
      {
        loadingWithdrawableCurrencies: true
      },
      _ => {
        this.http
          .get<mdCallResponse>(
            this.constants.EndPoints.GetWithdrawableCurrencies
          )
          .then((res: mdCallResponse) => {
            if (res.isSuccess) {
              if (res.extras) {
                if (res.extras.withdrawableCurrencies) {
                  this.updateState({
                    withdrawableCurrencies: res.extras.withdrawableCurrencies,
                    loadingWithdrawableCurrencies: false
                  });
                }
              }
            }
          })
          .catch(error => {
            this.log.error(error);
            this.updateState({
              loadingWithdrawableCurrencies: false
            });
          });
      }
    );
  }

  loadBankAccounts() {
    return this.http
      .get<mdCallResponse>(this.constants.EndPoints.GetUserBankAccounts)
      .then((res: mdCallResponse) => {
        let bankAccounts = [];
        if (res.isSuccess) {
          if (res.extras) {
            bankAccounts = res.extras;
          }
        }
        return this.updateStatePromise({
          bankAccounts,
          loadingBankAccounts: false
        });
      })
      .catch(error => {
        this.log.error(error);
        return this.updateStatePromise({
          loadingBankAccounts: false
        });
      });
  }

  getFeeByAmountAndFeeSlabs = (amount: number, slabs: mdFeeSlabs[]) => {
    let fee = 0;
    if (slabs.length < 1) {
      return fee;
      //TODO: return error if fee slab not found
    }
    let feeSlab: mdFeeSlabs = null;
    if (slabs.length == 1) {
      //if only fee slab then take that fee slab and apply both (percentage and amount)
      feeSlab = slabs[0];
      feeSlab.fee_type = FeeSlabFeeApplyTypes.both;
    }

    if (!feeSlab) {
      feeSlab = slabs.filter(
        m => amount >= m.from_volume && amount <= m.to_volume
      )[0];
      if (!feeSlab) {
        feeSlab = slabs.filter(
          m => amount >= m.from_volume && m.to_volume == 0 //to_volume = 0 means unlimited
        )[0];
      }
    }

    if (!feeSlab) {
      return 0;
    }

    if (feeSlab.fee_type == FeeSlabFeeApplyTypes.percentage) {
      if (feeSlab.fee_percentage > 0) {
        //floated fee in model.fee
        fee =
          amount * (StaticHelper.unfloatAmount(feeSlab.fee_percentage) / 100);
      } else {
        fee = 0;
      }
    } else if (feeSlab.fee_type == FeeSlabFeeApplyTypes.amount) {
      fee = feeSlab.fee;
    } else if (feeSlab.fee_type == FeeSlabFeeApplyTypes.both) {
      let percentage = 0;
      if (feeSlab.fee_percentage > 0) {
        //floated fee in percentage
        percentage =
          amount * (StaticHelper.unfloatAmount(feeSlab.fee_percentage) / 100);
      }
      fee = feeSlab.fee;
      if (percentage > fee) {
        fee = percentage;
      }
    } else {
      fee = 0;
    }
    return fee;
  };

  getCurrentFee = (feeSlabs: mdFeeSlabs[], amountControl: mdFormControl) => {
    if (feeSlabs.length < 1) {
      return this.lang.Free;
    }
    return this.getFeeByAmountAndFeeSlabs(amountControl.value, feeSlabs);
  };

  getFeeStringFromFeeSlab(fs: mdFeeSlabs) {
    let fee = this.lang.Free;
    if (fs) {
      if (fs.fee_type == FeeSlabFeeApplyTypes.amount) {
        fee = this.state.selectedCurrency.symbol + fs.fee;
      } else if (fs.fee_type == FeeSlabFeeApplyTypes.percentage) {
        fee = fs.fee_percentage + "%";
      } else if (fs.fee_type == FeeSlabFeeApplyTypes.both) {
        fee = StaticHelper.formatString(
          this.lang.WhichEverHigherFormat,
          this.state.selectedCurrency.symbol + fs.fee,
          fs.fee_percentage + "%"
        );
      }
    }
    return fee;
  }

  withdrawFormCancelButtonClicked = e => {
    e.preventDefault();
    this.updateState({
      showNewDespositRequestForm: false
    });
  };

  submitDepositRequest = e => {
    e.preventDefault();
    this.showErrors = true;
    // stop here if form is invalid
    if (!this.validateForm("form")) {
      this.log.debug("invalid form");
      return;
    }

    if (!this.state.selectedCurrency) {
      this.updateState({
        showSubmitResponse: true,
        submitResponseClass: "text-danger",
        submitResponse: this.lang.NoCurrencySelected
      });
      return;
    }

    this.updateState({
      showSubmitResponse: true,
      submitResponseClass: "text-danger",
      submitResponse: "",
      disableSubmitButton: true
    });

    let formData: mdWithdrawalRequest = this.getFormData(
      this.state.form
    ) as mdWithdrawalRequest;
    formData.currency_id = this.state.selectedCurrency.id;
    this.http
      .post<mdCallResponse>(
        this.constants.EndPoints.PostDepositRequest,
        formData
      )
      .then((res: mdCallResponse) => {
        this.log.debug(res);
        if (res) {
          if (res.isSuccess) {
            this.successNotification(
              StaticHelper.formatString(
                this.lang.CreatedSuccessfullyFormat,
                this.lang.WithdrawalRequest
              ),
              this.lang.Success
            );
            this.updateState({
              submitResponseClass: "text-success",
              showNewDespositRequestForm: false
            });
          } else {
            this.errorNotification(res.message, this.lang.Error);
            this.hideSpinnerAndShowError(
              this.bulletList(res.message.split("\n"))
            );
          }
        }
      })
      .catch(error => {
        this.log.debug(error);
        this.errorNotification(this.lang.ErrorOccured, this.lang.Error);
        this.hideSpinnerAndShowError(this.lang.UnableToCompleteYourRequest);
      });
  };

  hideSpinnerAndShowError(message = null) {
    if (!message) {
      message = this.lang.AccountCreatedLoginToContinue;
    }
    this.updateState({
      submitResponseClass: "text-danger",
      showSubmitResponse: true,
      disableSubmitButton: false,
      submitResponse: message
    });
  }

  loadWithdrawalRequestHistory = () => {
    let model: mdWithdrawalRequestHistoryRequest = new mdWithdrawalRequestHistoryRequest();
    model.order = "desc";
    return this.updateStatePromise({
      withdrawalRequestHistory: [],
      loadingWithdrawalHistory: true
    }).then(_ => {
      return this.http
        .post(this.constants.EndPoints.PostWithdrawalRequestHistory, model)
        .then((res: mdCallResponse) => {
          let withdrawalRequestHistory: mdWithdrawalRequestHistory[] = [];
          let bankAccounts: mdBankAccount[] = this.state.bankAccounts;
          if (res.isSuccess) {
            withdrawalRequestHistory = res.extras;
          } else {
            withdrawalRequestHistory = [];
          }
          withdrawalRequestHistory = withdrawalRequestHistory.map(m => {
            m["key"] = m.id;
            m.bankAccount = bankAccounts.filter(
              b => b.id == m.bank_account_id
            )[0];
            return m;
          });
          return this.updateStatePromise({
            withdrawalRequestHistory,
            loadingWithdrawalHistory: false
          });
        })
        .catch(error => {
          this.updateState({
            withdrawalRequestHistory: [],
            loadingWithdrawalHistory: false
          });
          this.log.error(error);
        });
    });
  };

  onSubmit = e => {
    e.preventDefault();

    if (!this.validateForm()) {
      // this.antd.modalError("InValid Form");
      return;
    }
    let formData = this.getFormData(this.state.form) as mdWithdrawalRequest;
    formData.currency_id = this.state.selectedCurrency.id;
    return this.updateStatePromise({ disableSubmitButton: true }).then(_ => {
      return this.http
        .post<mdCallResponse>(
          this.constants.EndPoints.PostSaveWithdrawalRequest,
          formData
        )
        .then((res: mdCallResponse) => {
          return this.updateStatePromise({ disableSubmitButton: false }).then(
            _ => {
              if (res.isSuccess) {
                this.successNotification(this.lang.SavedSuccessfully);
                let bankAccounts: mdBankAccount[] = this.state.bankAccounts;
                let wr = res.extras;
                wr["key"] = wr.id;
                wr.bankAccount = bankAccounts.filter(
                  b => b.id == wr.bank_account_id
                )[0];
                let withdrawalRequestHistory = this.state
                  .withdrawalRequestHistory as any[];
                withdrawalRequestHistory.unshift(wr);

                this.updateState({
                  withdrawalRequestHistory,
                  selectedCurrency: null
                });
              } else {
                this.errorNotification(res.message);
              }
            }
          );
        })
        .catch(error => {});
    });
  };

  feeSlabsTableSettings = {
    attr: {
      className: "table-responsive funding-table"
    },
    rowClassFunction: () => {
      return "color-white align-center";
    },
    columns: [
      {
        title: this.lang.Deposit + " " + this.lang.Amount,
        dataIndex: "from_volume",
        render: (value: number, row: mdFeeSlabs) => {
          let tovol = " - " + row.to_volume.toString();
          if (row.to_volume <= 0) {
            tovol = "";
          }
          if (tovol == "") {
            return " > " + row.from_volume;
          }
          return row.from_volume + tovol;
        }
      },
      {
        title: this.lang.Fee,
        dataIndex: "fee",
        render: (value: number, row: mdFeeSlabs) => {
          return this.getFeeStringFromFeeSlab(row);
        }
      }
    ]
  };

  withdrawRequestsTableSettings = {
    hideSubHeader: true,
    actions: {
      add: false,
      edit: false,
      delete: false
    },
    attr: {
      className: "table-responsive funding-table"
    },
    rowClassFunction: () => {
      return "color-white align-center";
    },
    columns: [
      {
        title: this.lang.Id,
        dataIndex: "id"
      },
      {
        title: this.lang.Currency,
        dataIndex: "currency_name"
      },
      {
        title: this.lang.BankAccount,
        dataIndex: "bank_account_id",
        render: (value, row: mdWithdrawalRequestHistory) => {
          if (!row.bankAccount) {
            return "";
          }
          return (
            row.bankAccount.bank_name + " - " + row.bankAccount.account_name
          );
        }
      },
      {
        title: this.lang.Amount,
        dataIndex: "amount"
      },
      {
        title: this.lang.Fee,
        dataIndex: "fee"
      },
      {
        title: this.lang.BankCharges,
        dataIndex: "bank_charges"
      },
      {
        title: this.lang.Status,
        dataIndex: "record_status",
        render: (value: any, row: mdWithdrawalRequestHistory) => {
          let displayValue = StaticHelper.capitalizeFirstLetter(value);
          if (value == WithdrawalRequestRecordStatuses.pending) {
            return <Tag color="orange">{displayValue}</Tag>;
          } else if (value == WithdrawalRequestRecordStatuses.rejected) {
            return <Tag color="red">{displayValue}</Tag>;
          } else if (value == WithdrawalRequestRecordStatuses.success) {
            return <Tag color="green">{displayValue}</Tag>;
          } else {
            return <Tag color="geekblue">{displayValue}</Tag>;
          }
        },
        addable: false,
        editable: false,
        filter: false
      },
      {
        title: this.lang.CreatedOn,
        dataIndex: "timestamp",
        render: StaticHelper.longDateFormat
      }
    ]
  };
}
