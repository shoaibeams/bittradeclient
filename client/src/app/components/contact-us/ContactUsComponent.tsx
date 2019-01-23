import React = require('react');
import { LanguageBase } from '../../../shared/language';
import { mdContactUs, ContactUsMetaData } from '../../../models/contact-us';
import { mdProps } from '../../../models/props';
import { Constants } from '../../../shared/constants';
import { StaticHelper } from '../../../shared/static-helper';
import * as ValidationAttributes from "../../../shared/validation-attributes"
import { mdFormControl } from '../../../shared/form-control';
import { mdCallResponse } from '../../../models/call-response';
import { BaseComponent } from '../base/BaseComponent';


export default class ContactUsComponent extends BaseComponent {

    render() {
        this.initShorts();
        return (
            <div className="mainpage clearfix">
                <section className="signupwrap clearfix">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6 col-md-offset-3 col-sm-12 ">
                                <p className="h3">{this.lang.ContactUs}</p>
                                <form onSubmit={this.onSubmit}>
                                    <div className="signupbox clearfix">
                                        <div className="tab-content">
                                            <div id="Individual" className="tab-pane fade in active">
                                                <div className="row">
                                                    <div className="col-sm-12">
                                                        {
                                                            this.textFormControl(this.f.name, this.handleFormControlInput)
                                                        }
                                                    </div>
                                                    <div className="col-sm-12">
                                                        {
                                                            this.textFormControl(this.f.contact_no, this.handleFormControlInput)
                                                        }
                                                    </div>
                                                    <div className="col-sm-12">
                                                        {
                                                            this.textFormControl(this.f.email, this.handleFormControlInput)
                                                        }
                                                    </div>
                                                    <div className="col-sm-12">
                                                        {
                                                            this.textareaFormControl(this.f.message, this.handleFormControlInput)
                                                        }
                                                    </div >
                                                    <div className="col-sm-12 form-group">
                                                        <button type="submit" className="btn-primary signup-btn " disabled={this.f.diableSubmitButton} >{this.lang.Submit}</button>
                                                    </div >
                                                    <div className="col-sm-12">
                                                        {
                                                            this.getSubmitResponseDiv(this.f.submitResponseClass,
                                                                this.f.submitResponse, this.f.showSubmitResponse)
                                                        }
                                                    </div >
                                                </div >
                                            </div >
                                        </div >
                                    </div >
                                </form >
                            </div >
                        </div >
                    </div >
                </section >
            </div >
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
                    new ValidationAttributes.MaxLengthValidator(this.lang.MaxLengthFormat2,
                        ContactUsMetaData.nameMaxLength),
                ]),
                contact_no: new mdFormControl(this.model.contact_no, "contact_no", this.lang.ContactNo, [
                    new ValidationAttributes.RequiredValidator(this.lang.RequiredFormat),
                    new ValidationAttributes.MaxLengthValidator(this.lang.MaxLengthFormat2,
                        ContactUsMetaData.contactNoMaxLength),
                ]),
                email: new mdFormControl(this.model.email, "email", this.lang.Email, [
                    new ValidationAttributes.MailValidator(this.lang.InvalidEmail),
                    new ValidationAttributes.MaxLengthValidator(this.lang.MaxLengthFormat2,
                        ContactUsMetaData.emailMaxLength),
                ]),
                message: new mdFormControl(this.model.message, "message", this.lang.Message, [
                    new ValidationAttributes.RequiredValidator(this.lang.RequiredFormat),
                    new ValidationAttributes.MaxLengthValidator(this.lang.MaxLengthFormat2,
                        ContactUsMetaData.messageMaxLength),
                ]),
                diableSubmitButton: false,
                showSubmitResponse: false,
                submitResponseClass: '',
                submitResponse: '',
            },
        }
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.showErrors = true;
        // stop here if form is invalid

        if (!this.validateForm('form')) {
            this.log.debug("invalid form");
            return;
        }

        //everything is fine, now save the data
        this.props.updateGlobalProperty(global.propKeys.showMainLoader, true);
        this.updateState({ form: { ...this.state.form, diableSubmitButton: true } });
        let formData: mdContactUs = this.getFormData(this.state.form) as mdContactUs;
        formData.uuid = StaticHelper.getUUID();

        this.http.post(this.constants.EndPoints.PostContactUs, formData).then((res: mdCallResponse) => {
            let submitResponseClass = "text-danger";
            let submitResponse = '';
            if (res) {
                submitResponse = res.message.replace("\n", "<br/>");
                if (res.isSuccess) {
                    submitResponseClass = "text-success";
                }
            }

            this.updateState({
                form: {
                    ...this.state.form,
                    showSubmitResponse: true,
                    submitResponseClass: submitResponseClass,
                    submitResponse: submitResponse,
                }
            })
            setTimeout(() => {
                this.props.history.push(this.constants.RoutePaths.Home);
            }, this.constants.ResponseMessageTimeout * 1000);
            this.props.updateGlobalProperty(global.propKeys.showMainLoader, false);
        }).catch((error) => {
            this.log.debug(error);
            this.props.updateGlobalProperty(global.propKeys.showMainLoader, false);
        });
    }

}
