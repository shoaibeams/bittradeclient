import * as React from "react";
import { Row, Card, Select, Table, Form, Col, Button, Tag } from "antd";
import "./deposit-component.css";
import { DepositRequestRecordStatuses } from "../../../../enums/deposit-requests";
import { FeeSlabFeeApplyTypes } from "../../../../enums/fee-slabs";
import { BaseComponent } from "../../../components/base/BaseComponent";
import FileUploaderComponent from "../../shared/file-uploader/FileUploaderComponent";
import FontAwesome from "../../../components/base/FontAwesome";
import { mdDepositRequests } from "../../../../models/deposit-requests";
import { mdFeeSlabs } from "../../../../models/fee-slabs";
import { RequiredValidator } from "../../../../shared/validation-attributes";
import { mdFormControl } from "../../../../shared/form-control";
import { Transitions } from "../../../../models/transitions";
import { StaticHelper } from "../../../../shared/static-helper";
import { mdDepositRequestHistory } from "../../../../models/deposit-request-history";
import { mdFileUploaderConfig } from "../../shared/file-uploader/file-uploader-config";
import { SearchableDropdownSettings } from "../../shared/searchable-dropdown/searchable-dropdown-settings";
import { mdDepositMethods } from "../../../../models/deposit-methods";
import { TransitionState } from "../../../../enums/transition";
import { mdCallResponse } from "../../../../models/call-response";
import { mdDepositRequestHisotryRequest } from "../../../../models/deposit-request-history-request";
const Option = Select.Option;

export default class DepositComponent extends BaseComponent {
  render() {
    this.initShorts();
    let settings = this.state.depositableCurrenciesSettings;
    let cp = this.state.selectedCurrency;
    let wallet = this.state.wallet;
    let sdm = this.state.selectedDepositMethod;
    return (
      <>
        <Row>
          {this.antd.colmd12(
            <Card className="gx-card" title={this.lang.Deposit}>
              <Select
                showSearch
                className="gx-w-100 mb-3 gx-vertical-align-middle"
                optionFilterProp="children"
                onChange={this.depositableCurrenciesOnChange}
                filterOption={(input, option) =>
                  option.props.children
                    .toString()
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
                value={cp ? cp.id : null}
                size={"large"}
              >
                {this.state.depositableCurrenciesSource.map((s, i) => {
                  return (
                    <Option key={i} value={s.value}>
                      <img
                        width={settings.imageWidth}
                        height={settings.imageHeight}
                        src={s.image}
                      />
                      &nbsp;
                      {s.text}
                    </Option>
                  );
                })}
              </Select>
              {
                <table className="funding-wallet">
                  <colgroup style={{ width: "120px" }} />
                  <colgroup style={{ width: "160px" }} />
                  <tbody>
                    <tr>
                      <th>{this.lang.TotalBalance}</th>
                      <td>
                        {wallet
                          ? this.state.wallet.balance.toFixed(cp.scale) +
                            " " +
                            cp.name
                          : ""}
                      </td>
                    </tr>
                    <tr>
                      <th>{this.lang.OnHold}</th>
                      <td>
                        {wallet
                          ? this.state.wallet.hold_balance.toFixed(cp.scale) +
                            " " +
                            cp.name
                          : ""}
                      </td>
                    </tr>
                    <tr>
                      <th>{this.lang.AvailableBalance}</th>
                      <td>
                        {wallet
                          ? this.state.wallet.available_balance.toFixed(
                              cp.scale
                            ) +
                            " " +
                            cp.name
                          : ""}
                      </td>
                    </tr>
                  </tbody>
                </table>
              }
              {
                <>
                  <hr />
                  <table className="table-responsive ">
                    <colgroup style={{ width: "180px" }} />
                    <colgroup style={{ width: "auto" }} />
                    <tbody>
                      <tr>
                        <th>{this.lang.AccountName}</th>
                        <td>{sdm ? sdm.account_name : ""}</td>
                      </tr>
                      <tr>
                        <th>{this.lang.Address}</th>
                        <td>{sdm ? sdm.address : ""}</td>
                      </tr>
                      <tr>
                        <th>{this.lang.IBAN}</th>
                        <td>{sdm ? sdm.iban : ""}</td>
                      </tr>
                      <tr>
                        <th>{this.lang.BankName}</th>
                        <td>{sdm ? sdm.bank_name : ""}</td>
                      </tr>
                      <tr>
                        <th>{this.lang.Branch}</th>
                        <td>{sdm ? sdm.branch_address : ""}</td>
                      </tr>
                      <tr>
                        <th>{this.lang.Reference}</th>
                        <td>{wallet ? wallet.reference : ""}</td>
                      </tr>
                      <tr>
                        <th>{this.lang.Minimum}</th>
                        <td>
                          {sdm
                            ? this.state.selectedCurrency.symbol +
                              sdm.minimum_deposit
                            : ""}
                        </td>
                      </tr>
                      {!this.isNullOrEmpty(this.state.fee) &&
                      this.state.depositMethodFeeSlabs.length <= 1 ? (
                        <tr>
                          <th>{this.lang.Fee}</th>
                          <td>{this.state.fee}</td>
                        </tr>
                      ) : null}
                      {this.state.depositMethodFeeSlabs.length > 1 ? (
                        <tr>
                          <th>{this.lang.Fee}</th>
                          <td>
                            <Table
                              className="gx-table-responsive"
                              columns={this.feeSlabsTableSettings.columns}
                              dataSource={this.state.depositMethodFeeSlabs}
                              size="small"
                              pagination={false}
                            />
                          </td>
                        </tr>
                      ) : null}
                    </tbody>
                  </table>
                </>
              }
            </Card>
          )}
          {this.antd.colmd12(
            this.animatedCSSDivWithAttr(
              <>
                {this.animatedCSSDivWithAttr(
                  <Card
                    className="gx-card"
                    title={this.lang.New + " " + this.lang.Deposit}
                  >
                    <Form
                      onSubmit={this.submitDepositRequest}
                      className="gx-signin-form gx-form-row0"
                    >
                      {this.antd.numberFormItem(
                        this.f.amount,
                        true,
                        25,
                        sdm ? sdm.minimum_deposit : 0,
                        9999999,
                        null,
                        this.formItemLayout
                      )}
                      {this.antd.dateFormItem(
                        this.f.deposit_date,
                        true,
                        null,
                        this.formItemLayout
                      )}
                      <Row>
                        <Col
                          xs={this.formItemLayout.labelCol.xs}
                          sm={this.formItemLayout.labelCol.sm}
                          md={this.formItemLayout.labelCol.md}
                          style={{ paddingLeft: 0 }}
                        >
                          <label style={{ margin: "0 8px 0 2px" }}>
                            {this.lang.Reference}
                          </label>
                        </Col>
                        <Col {...this.formItemLayout.wrapperCol}>
                          <p className="gx-mb-2 gx-text-primary gx-font-weight-semi-bold gx-fs-lg">
                            {wallet ? wallet.reference : ""}
                          </p>
                        </Col>
                      </Row>
                      <Row>
                        <Col
                          xs={this.formItemLayout.labelCol.xs}
                          sm={this.formItemLayout.labelCol.sm}
                          md={this.formItemLayout.labelCol.md}
                          style={{ paddingLeft: 0 }}
                        >
                          <label style={{ margin: "0 8px 0 2px" }}>
                            {this.lang.DepositReceipt}
                          </label>
                        </Col>
                        <Col {...this.formItemLayout.wrapperCol}>
                          <FileUploaderComponent
                            {...this.props}
                            ref={this.depositReceiptFileUploader}
                            params={{
                              config: this.state.fileUploaderConfig,
                              valueChange: this.fileUploaderValueChanged,
                              isBusy: this.state.fileUploaderBusy,
                              isBusyChange: this.fileUploaderisBusyChange
                            }}
                          />
                        </Col>
                      </Row>
                      <Row>
                        {this.antd.colmd12(
                          <Button
                            loading={this.state.disableSubmitButton}
                            type={"primary"}
                            style={{ width: "100%" }}
                            htmlType="submit"
                          >
                            {this.lang.Submit}
                          </Button>
                        )}
                        {this.antd.colmd12(
                          <Button
                            loading={false}
                            type={"default"}
                            style={{ width: "100%" }}
                            htmlType="button"
                            onClick={this.depositFormCancelButtonClicked}
                          >
                            {this.lang.Cancel}
                          </Button>
                        )}
                      </Row>
                    </Form>
                  </Card>,
                  null,
                  this.state.animValues.newDepositRequest
                )}
                <Col span={8} offset={16}>
                  <Button
                    loading={false}
                    type={"primary"}
                    htmlType="button"
                    onClick={this.newDepositRequestClicked}
                    style={{ alignContent: "right" }}
                    size={"small"}
                  >
                    {FontAwesome.faIcon("plus")}
                    <i className="fa fa-plus" />
                    &nbsp;
                    <span>{this.lang.NewDepositRequest}</span>
                  </Button>
                </Col>
                <Card
                  className="gx-card"
                  title={this.lang.DepositRequests}
                  extra={
                    <p className="gx-text-primary gx-mb-0 gx-pointer">
                      {this.lang.DetailedHistory}
                    </p>
                  }
                >
                  <Table
                    className="gx-table-responsive"
                    columns={this.depositRequestsTableSettings.columns}
                    dataSource={this.state.depositRequestHistory}
                    size="small"
                    pagination={false}
                  />
                </Card>
              </>,
              null,
              this.state.animValues.depositRequests
            )
          )}
        </Row>
      </>
    );
  }

  formItemLayout = {
    colon: false,
    labelAlign: "left",
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
      md: { span: 6 },
      style: {
        paddingLeft: 0,
        paddingRight: 0,
        textAlign: "left"
      }
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
      md: { span: 18 },
      style: {
        paddingLeft: 0,
        paddingRight: 0
      }
    }
  };
  model: mdDepositRequests;
  feeSlabs: mdFeeSlabs[] = [];
  depositMethods: mdDepositMethods[];
  // depositRequestHistory: mdDepositRequestHistory[];
  // depositableCurrenciesDropdown = React.createRef<SearchableDropdownComponent>();
  depositReceiptFileUploader = React.createRef<FileUploaderComponent>();
  feeSlabsTableSettings: any;
  depositRequestsTableSettings: any;

  constructor(props) {
    super(props);
    this.init();
  }

  init() {
    this.model = new mdDepositRequests(true);
    this.state = {
      form: {
        amount: new mdFormControl("", "amount", this.lang.Amount, [
          new RequiredValidator(this.lang.RequiredFormat)
        ]),
        deposit_date: new mdFormControl(
          this.model.deposit_date,
          "deposit_date",
          this.lang.DepositDate,
          [new RequiredValidator(this.lang.RequiredFormat)]
        )
      },
      fileUploaderConfig: new mdFileUploaderConfig(
        false,
        [".jpg", ".jpeg", ".png"],
        1,
        false,
        false,
        this.lang.SelectFile,
        this.constants.EndPoints.PostDepositReceipt
      ),
      depositableCurrenciesSettings: new SearchableDropdownSettings(
        300,
        true,
        true,
        32,
        32,
        this.lang.SelectCurrencyTodeposit
      ),
      fileUploaderValue: [],
      disableSubmitButton: false,
      showSubmitResponse: false,
      submitResponseClass: "text-danger",
      submitResponse: "",
      showErrors: false,
      showNewDespositRequestForm: false,
      loadingDepositableCurrencies: true,
      depositableCurrencies: [],
      defaultCurrencyId: null,
      depositableCurrenciesSource: [],
      selectedCurrency: null,
      selectedDepositMethod: null,
      depositMethodFeeSlabs: new mdFeeSlabs(),
      fee: "",
      wallet: null,
      depositRequestHistory: [],
      animValues: {
        depositRequests: new mdFormControl(
          this.getTransition(
            Transitions.bounseOutHide2s,
            TransitionState.Completed
          ),
          "depositRequests"
        ),
        newDepositRequest: new mdFormControl(
          this.getTransition(
            Transitions.bounseOutHide2s,
            TransitionState.Completed
          ),
          "newDepositRequest"
        )
      }
    };
    this.loadDepositableCurrencies();
    this.feeSlabsTableSettings = {
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
    this.depositRequestsTableSettings = {
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
          title: this.lang.Amount,
          dataIndex: "amount",
          render: (value: number, row) => {
            return value + " " + row.currency;
          }
        },
        {
          title: this.lang.Date,
          dataIndex: "created_timestamp",
          render: (value: Date, row) => {
            return StaticHelper.longDateFormat(value);
          }
        },
        {
          title: this.lang.Status,
          dataIndex: "record_status",
          render: (value: any, row: mdDepositRequestHistory) => {
            let displayValue = StaticHelper.capitalizeFirstLetter(value);
            if (value == DepositRequestRecordStatuses.pending) {
              return <Tag color="orange">{displayValue}</Tag>;
            } else if (value == DepositRequestRecordStatuses.rejected) {
              return <Tag color="red">{displayValue}</Tag>;
            } else if (value == DepositRequestRecordStatuses.success) {
              return <Tag color="green">{displayValue}</Tag>;
            } else {
              return <Tag color="geekblue">{displayValue}</Tag>;
            }
          },
          addable: false,
          editable: false,
          filter: false
        }
      ]
    };
  }

  fileUploaderValueChanged = value => {
    this.updateState({
      fileUploaderValue: value
    });
  };

  newDepositRequestClicked = () => {
    this.showErrors = false;
    this.depositReceiptFileUploader.current.recievedNewChanges();
    this.updateState(
      {
        disableSubmitButton: false,
        showSubmitResponse: false,
        submitResponseClass: "text-danger",
        submitResponse: "",
        showNewDespositRequestForm: true,
        form: {
          amount: new mdFormControl("", "amount", this.lang.Amount, [
            new RequiredValidator(this.lang.RequiredFormat)
          ]),
          deposit_date: new mdFormControl(
            this.model.deposit_date,
            "deposit_date",
            this.lang.DepositDate,
            [new RequiredValidator(this.lang.RequiredFormat)]
          )
        }
      },
      () => {
        this.updateAnimValue(
          this.state.animValues.newDepositRequest.name,
          Transitions.flipInY,
          TransitionState.Running
        );
      }
    );
  };

  loadDepositableCurrencies() {
    this.http
      .get<mdCallResponse>(this.constants.EndPoints.GetDepositableCurrencies)
      .then((res: mdCallResponse) => {
        if (res.isSuccess) {
          if (res.extras) {
            if (res.extras.depositableCurrencies) {
              let depositableCurrenciesSource = res.extras.depositableCurrencies.map(
                m => {
                  return {
                    text: m.name + " (" + m.description + ")",
                    value: m.id,
                    image: m.icon
                  };
                }
              );
              this.updateState(
                {
                  depositableCurrencies: res.extras.depositableCurrencies,
                  defaultCurrencyId: res.extras.defaultCurrencyId,
                  depositableCurrenciesSource: depositableCurrenciesSource,
                  loadingDepositableCurrencies: false
                },
                () => {
                  let selectedValue = null;
                  let defaultCurrency = depositableCurrenciesSource.filter(
                    m => m.value == res.extras.defaultCurrencyId
                  );
                  if (defaultCurrency.length > 0) {
                    selectedValue = defaultCurrency[0];
                    this.depositableCurrenciesOnChange(selectedValue.value);
                  }
                }
              );
            }
          }
        }
      })
      .catch(error => {
        this.log.error(error);
        this.updateState({
          loadingDepositableCurrencies: false
        });
      });
  }

  getFeeStringFromFeeSlab(fs: mdFeeSlabs) {
    let fee = "";
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
    } else {
      fee = this.lang.Free;
    }
    return fee;
  }

  setSelectedDepositMethod(newMethod: mdDepositMethods) {
    let fee = "";
    if (!newMethod) {
      this.updateState({
        selectedDepositMethod: newMethod,
        depositMethodFeeSlabs: [],
        fee: fee
      });
      return;
    }
    let depositMethodFeeSlabs = newMethod
      ? this.feeSlabs.filter(m => m.pk == newMethod.id.toString())
      : [];
    if (depositMethodFeeSlabs.length == 1) {
      fee = this.getFeeStringFromFeeSlab(depositMethodFeeSlabs[0]);
    } else if (depositMethodFeeSlabs.length > 1) {
      // this.feeSlabsTable.current.load(depositMethodFeeSlabs);
      // this.feeSlabsDataSource.load(depositMethodFeeSlabs);
    } else {
      fee = this.lang.Free;
    }
    depositMethodFeeSlabs = depositMethodFeeSlabs.map((m, i) => {
      m["key"] = i;
      return m;
    });
    this.updateState({
      selectedDepositMethod: newMethod,
      depositMethodFeeSlabs: depositMethodFeeSlabs,
      fee: fee
    });
  }

  depositableCurrenciesOnChange = value => {
    if (!value) {
      return;
    }
    let selectedCurrency = this.state.depositableCurrencies.filter(
      m => m.id == value
    )[0];
    this.updateState(
      {
        selectedCurrency: selectedCurrency,
        wallet: null,
        selectedDepositMethod: null
      },
      () => {
        this.setSelectedDepositMethod(null);
        this.updateAnimValue(
          this.state.animValues.depositRequests.name,
          Transitions.bounseOutHide2s,
          TransitionState.Completed
        );
        this.loadDepositRequestHistory();
        // this.showPreviousDepositRequests = false;
        // this.loadingDepositMethods = true;
        this.http
          .post<mdCallResponse>(this.constants.EndPoints.PostDepositMethods, {
            currency_id: value
          })
          .then((data: mdCallResponse) => {
            this.depositMethods = [];
            this.feeSlabs = [];
            if (data.isSuccess) {
              this.feeSlabs = data.extras.feeSlabs as mdFeeSlabs[];
              if (!this.feeSlabs) {
                this.feeSlabs = [];
              }
              this.depositMethods = data.extras
                .depositMethods as mdDepositMethods[];
              if (!this.depositMethods) {
                this.depositMethods = [];
              }

              this.updateState({
                wallet: data.extras.wallet
              });

              if (this.depositMethods.length > 0) {
                this.setSelectedDepositMethod(this.depositMethods[0]);
              }

              this.updateAnimValue(
                this.state.animValues.depositRequests.name,
                Transitions.fadeIn2s,
                TransitionState.Running
              );
            }
            // this.loadingDepositMethods = false;
          })
          .catch(error => {
            // this.loadingDepositMethods = false;
            this.log.error(error);
          });
      }
    );
  };

  loadDepositRequestHistory = () => {
    let model: mdDepositRequestHisotryRequest = new mdDepositRequestHisotryRequest();
    model.currency_id = this.state.selectedCurrency.id;
    model.rpp = 8;
    model.last = null;
    model.order = "desc";
    this.updateState({
      depositRequestHistory: []
    });
    this.loadDepositRequestsTable();
    this.http
      .post(this.constants.EndPoints.PostDepositRequestHistory, model)
      .then((res: mdCallResponse) => {
        let depositRequestHistory = [];
        if (res.isSuccess) {
          depositRequestHistory = res.extras as mdDepositRequestHistory[];
        } else {
          depositRequestHistory = [];
        }
        depositRequestHistory = depositRequestHistory.map(m => {
          m["key"] = m.id;
          return m;
        });
        this.updateState({
          depositRequestHistory: depositRequestHistory
        });
        // this.loadDepositRequestsTable();
      })
      .catch(error => {
        this.updateState({
          depositRequestHistory: []
        });
        // this.loadDepositRequestsTable();
        this.log.error(error);
      });
  };

  loadDepositRequestsTable() {
    // this.depositRequestsSource.load(this.depositRequestHistory);
  }

  depositFormCancelButtonClicked = e => {
    e.preventDefault();
    this.updateAnimValue(
      this.state.animValues.newDepositRequest.name,
      Transitions.bounseOutHide2s,
      TransitionState.Running
    );
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

    let formData: mdDepositRequests = this.getFormData(
      this.state.form
    ) as mdDepositRequests;
    formData.currency_id = this.state.selectedCurrency.id;
    formData.deposit_method_id = this.state.selectedDepositMethod.id;
    formData.reference = this.state.wallet.reference;
    formData.de = this.state.fileUploaderValue.map(m => {
      return m.id;
    });

    if (formData.de.length < 1) {
      this.errorNotification(
        StaticHelper.formatString(
          this.lang.RequiredFormat,
          this.lang.DepositReceipt
        ),
        this.lang.Success
      );
      return;
    }

    this.updateState({
      showSubmitResponse: true,
      submitResponseClass: "text-danger",
      submitResponse: "",
      disableSubmitButton: true
    });

    this.http
      .post<mdCallResponse>(
        this.constants.EndPoints.PostDepositRequest,
        formData
      )
      .then((res: mdCallResponse) => {
        this.log.debug(res);
        if (res) {
          if (res.isSuccess) {
            //show model
            // this.toaster.Success(StaticHelper.formatString(this.lang.CreatedSuccessfullyFormat, this.lang.DepositRequest));
            this.successNotification(
              StaticHelper.formatString(
                this.lang.CreatedSuccessfullyFormat,
                this.lang.DepositRequest
              ),
              this.lang.Success
            );
            this.updateState({
              submitResponseClass: "text-success",
              showNewDespositRequestForm: false
            });
            this.updateAnimValue(
              this.state.animValues.newDepositRequest.name,
              Transitions.bounseOutHide2s,
              TransitionState.Running
            );
            if (res.extras) {
              if (res.extras.id) {
                let depositRequestHistory = this.state.depositRequestHistory;
                depositRequestHistory.unshift(res.extras);
                this.updateState({
                  depositRequestHistory: depositRequestHistory
                });
                // this.loadDepositRequestsTable();
              }
            }
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

  fileUploaderisBusyChange = value => {
    this.updateState({
      fileUploaderBusy: value
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
}
