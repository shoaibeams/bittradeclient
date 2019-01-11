import React = require('react');
import { LanguageBase } from '../../../shared/language';
import { mdContactUs, ContactUsMetaData } from '../../../models/contact-us';
import { mdProps } from '../../../models/props';
import { Constants } from '../../../shared/constants';
import { StaticHelper } from '../../../shared/static-helper';
import { ValidateParams, Validation, ValidationAttributeResponse } from '../../../shared/validations';
import * as ValidationAttributes from "../../../shared/validation-attributes"
import { mdFormControl } from '../../../shared/form-control';
import { mdCallResponse } from '../../../models/call-response';
import { BaseComponent } from '../BaseComponent';
import { ContactUsHTML } from './ContactUsHTML';


export default class ContactUsComponent extends BaseComponent {

    render() {
        return (
            <ContactUsHTML globals={this.props.globals} form={this.state.form} params={{
                onSubmit: this.onSubmit,
                handleChange: this.handleFormControlInput,
            }} />
        );
    }

    model: mdContactUs;
    errors: any;

    constructor(props) {
        super(props);
        this.init();
    }

    init() {
        this.model = new mdContactUs(true);
        this.errors = {
            nameRequried: StaticHelper.formatString(this.lang.RequiredFormat, this.lang.Name),
            nameMaxLength: StaticHelper.formatString(this.lang.MaxLengthFormat, ContactUsMetaData.nameMaxLength),
            contactNoRequired: StaticHelper.formatString(this.lang.RequiredFormat, this.lang.ContactNo),
            contactNoMaxLength: StaticHelper.formatString(this.lang.MaxLengthFormat, ContactUsMetaData.contactNoMaxLength),
            emailRequried: StaticHelper.formatString(this.lang.RequiredFormat, this.lang.Email),
            emailMaxLength: StaticHelper.formatString(this.lang.MaxLengthFormat, ContactUsMetaData.emailMaxLength),
            emailInvalid: this.lang.InvalidEmail,
            messageRequried: StaticHelper.formatString(this.lang.RequiredFormat, this.lang.Message),
            messageRange: StaticHelper.formatString(this.lang.RangeLengthFormat, ContactUsMetaData.messageMinLength, ContactUsMetaData.messageMaxLength),
            capitchaErrorMessage: this.lang.CapitchaErrorMessage,
        };
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
        this.setState({ form: { ...this.state.form, diableSubmitButton: true } });
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
            
            this.setState({
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
