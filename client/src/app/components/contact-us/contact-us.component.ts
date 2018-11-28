import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors, FormControl } from '@angular/forms';
import { mdContactUs, ContactUsMetaData } from '../../models/contact-us';
import { Constants } from '../../shared/constants';
import { LanguageBase } from '../../shared/language';
import { HttpClientService } from '../../services/http-client.service';
import { SpinnerService } from '../../services/spinner.service';
import { mdCallResponse } from '../../models/call-response';
import * as EmailValidator from 'email-validator';
import { v4 as uuid } from 'uuid';
import { Router } from '@angular/router';
import { GlobalsService } from 'src/app/services/globals.service';
import { StaticHelper } from 'src/app/shared/static-helper';

declare var $;

@Component({
    selector: 'app-contact-us',
    templateUrl: './contact-us.component.html',
    styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

    // constants: Constants = new Constants();
    lang: LanguageBase;
    frmContactUs: mdContactUs;
    contactUsForm: FormGroup;
    submitted = false;
    errors: any;
    submitResponseMessage: string;
    showsubmitResponse: boolean;
    submitRequestResposneClass: string;
    invalidEmail: boolean;
    diableSubmitButton: boolean;

    constructor(private formBuilder: FormBuilder, private http: HttpClientService,
        private spinner: SpinnerService, private router: Router, private globals: GlobalsService) {
    }

    ngOnInit() {
        this.lang = this.globals.lang;
        this.showsubmitResponse = false;
        this.submitResponseMessage = "";
        this.submitRequestResposneClass = "";
        this.frmContactUs = new mdContactUs(true);
        this.invalidEmail = false;
        this.diableSubmitButton = false;
        this.contactUsForm = this.formBuilder.group({
            name: [
                this.frmContactUs.name,
                Validators.compose([
                    Validators.required,
                    Validators.maxLength(ContactUsMetaData.nameMaxLength)
                ])
            ],
            contact_no: [
                this.frmContactUs.contact_no,
                Validators.compose([
                    Validators.required,
                    Validators.maxLength(ContactUsMetaData.contactNoMaxLength)
                ])
            ],
            email: [
                this.frmContactUs.email,
                Validators.compose([
                    Validators.required,
                    Validators.email,
                    Validators.maxLength(ContactUsMetaData.emailMaxLength)
                ])
            ],
            message: [
                this.frmContactUs.message,
                Validators.compose([
                    Validators.required,
                    Validators.maxLength(ContactUsMetaData.messageMaxLength)
                ])
            ],
            contactus_capitcha: new FormControl(false, null)
        });
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
    }
    // bool: any;
    // convenience getter for easy access to form fields
    get f() { return this.contactUsForm.controls; }

    onEmailKeyUp(ev: any) {
        if (this.submitted) {
            if (!EmailValidator.validate(this.contactUsForm.controls.email.value)) {
                this.invalidEmail = true;
            }
            else {
                this.invalidEmail = false;
            }
        }
    }

    onScriptLoad() {
        console.log('Google reCAPTCHA loaded and is ready for use!')
    }

    onScriptError() {
        console.log('Something went long when loading the Google reCAPTCHA')
    }

    onSubmit() {
        this.submitted = true;
        let captchaResposne = $("#g-recaptcha-response").val();
        console.log("captchaResposne: " + captchaResposne);
        if (this.contactUsForm.controls.contactus_capitcha.status != "VALID") {
            return;
        }
        // stop here if form is invalid
        if (this.contactUsForm.invalid) {
            return;
        }

        if (!EmailValidator.validate(this.contactUsForm.controls.email.value)) {
            this.invalidEmail = true;
            return;
        }
        else {
            this.invalidEmail = false;
        }

        //everything is fine, now save the data
        this.diableSubmitButton = true;
        this.invalidEmail = false;
        let formData: mdContactUs = this.contactUsForm.value;
        formData.uuid = uuid();
        let res = new mdCallResponse();
        //var response = this.http.post(this.http.endpoints.postContactUs, formData);
        this.spinner.show();
        this.http.post<mdCallResponse>(Constants.EndPoints.PostContactUs, formData).subscribe((data) => {
            res = data;
        }, (error) => {
            console.log(error);
            this.spinner.hide();
        }, () => {
            this.spinner.hide();
            this.submitRequestResposneClass = "text-danger";
            console.log(res);
            if (res) {
                this.submitResponseMessage = res.message.replace("\n", "<br/>");
                if (res.isSuccess) {
                    this.submitRequestResposneClass = "text-success";
                }
            }
            this.showsubmitResponse = true;
            setTimeout(() => {
                // this.showsubmitResponse = false;
                // this.submitRequestResposneClass = "";
                // this.submitResponseMessage = "";
                this.router.navigateByUrl('');
            }, Constants.ResponseMessageTimeout * 1000);
        });
    }

}
