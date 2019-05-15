import * as React from "react";
import { mdContactUs, ContactUsMetaData } from "../../../models/contact-us";
import { StaticHelper } from "../../../shared/static-helper";
import * as ValidationAttributes from "../../../shared/validation-attributes";
import { mdFormControl } from "../../../shared/form-control";
import { mdCallResponse } from "../../../models/call-response";
import { BaseComponent } from "../base/BaseComponent";
import { Row, Card, Form, Button } from "antd";

export default class ContactUsComponent extends BaseComponent {
  render() {
    this.initShorts();
    return (
      <Row className="full-width-controls" style={{ display: "flex" }}>
        {this.antd.colmd6(<></>)}
        {this.antd.colmd12(
          <Card
            className="gx-card form-header"
            title={this.p.title || this.lang.ContactUs}
            style={{ fontSize: 25, textAlign: "center" }}
          >
            <Form
              onSubmit={this.onSubmit}
              className="gx-signin-form gx-form-row0 large-size-form"
            >
              {this.antd.textFormItem(this.f.name, false)}
              {this.antd.textFormItem(this.f.contact_no, false)}
              {this.antd.textFormItem(this.f.email, false)}
              {this.antd.textAreaFormItem(this.f.message, 4, false)}
              <div className="gx-text-center">
                <Button
                  loading={this.state.disableSubmitButton}
                  type={"primary"}
                  htmlType="submit"
                  className="gx-w-50"
                >
                  {this.lang.Submit}
                </Button>
              </div>
            </Form>
          </Card>
        )}
        {this.antd.colmd6(<></>)}
      </Row>
    );
  }

  model: mdContactUs;
  showErrors: boolean;

  constructor(props) {
    super(props);
    this.init();
  }

  init() {
    this.model = new mdContactUs(true);
    this.state = {
      form: {
        name: new mdFormControl(this.model.name, "name", this.lang.Name, [
          new ValidationAttributes.RequiredValidator(this.lang.RequiredFormat),
          new ValidationAttributes.MaxLengthValidator(
            this.lang.MaxLengthFormat2,
            ContactUsMetaData.nameMaxLength
          )
        ]),
        contact_no: new mdFormControl(
          this.model.contact_no,
          "contact_no",
          this.lang.ContactNo,
          [
            new ValidationAttributes.RequiredValidator(
              this.lang.RequiredFormat
            ),
            new ValidationAttributes.MaxLengthValidator(
              this.lang.MaxLengthFormat2,
              ContactUsMetaData.contactNoMaxLength
            )
          ]
        ),
        email: new mdFormControl(this.model.email, "email", this.lang.Email, [
          new ValidationAttributes.MailValidator(this.lang.InvalidEmail),
          new ValidationAttributes.MaxLengthValidator(
            this.lang.MaxLengthFormat2,
            ContactUsMetaData.emailMaxLength
          )
        ]),
        message: new mdFormControl(
          this.model.message,
          "message",
          this.lang.Message,
          [
            new ValidationAttributes.RequiredValidator(
              this.lang.RequiredFormat
            ),
            new ValidationAttributes.MaxLengthValidator(
              this.lang.MaxLengthFormat2,
              ContactUsMetaData.messageMaxLength
            )
          ]
        )
      },
      disableSubmitButton: false,
      showSubmitResponse: false,
      submitResponseClass: "",
      submitResponse: ""
    };
  }

  onSubmit = e => {
    e.preventDefault();
    this.showErrors = true;
    // stop here if form is invalid

    if (!this.validateForm("form")) {
      this.log.debug("invalid form");
      return;
    }

    //everything is fine, now save the data
    this.props.updateGlobalProperty(global.propKeys.showMainLoader, true);
    this.updateState({
      form: { ...this.state.form },
      disableSubmitButton: true
    });
    let formData: mdContactUs = this.getFormData(
      this.state.form
    ) as mdContactUs;
    formData.uuid = StaticHelper.getUUID();

    this.http
      .post(this.constants.EndPoints.PostContactUs, formData)
      .then((res: mdCallResponse) => {
        let submitResponseClass = "text-danger";
        let submitResponse = "";
        if (res) {
          submitResponse = res.message.replace("\n", "<br/>");
          if (res.isSuccess) {
            this.successNotification(res.message);
          } else {
            this.errorNotification(res.message);
          }
        } else {
          this.errorNotification(this.lang.ErrorOccured);
        }

        this.updateState({
          form: {
            ...this.state.form,
            showSubmitResponse: true,
            submitResponseClass: submitResponseClass,
            submitResponse: submitResponse
          }
        });
        setTimeout(() => {
          this.props.history.push(this.constants.RoutePaths.Home);
        }, this.constants.ResponseMessageTimeout * 1000);
        this.props.updateGlobalProperty(global.propKeys.showMainLoader, false);
      })
      .catch(error => {
        this.log.debug(error);
        this.props.updateGlobalProperty(global.propKeys.showMainLoader, false);
      });
  };
}
