import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors, FormControl } from '@angular/forms';
import { mdContactUs, ContactUsMetaData } from 'src/models/contact-us';
import { LanguageBase } from 'src/shared/language';
import { HttpClientService } from 'src/services/http-client.service';
import { SpinnerService } from 'src/services/spinner.service';
import { mdCallResponse } from 'src/models/call-response';
import * as EmailValidator from 'email-validator';
import { v4 as uuid } from 'uuid';
import { Router } from '@angular/router';
import { GlobalsService } from 'src/services/globals.service';
import { StaticHelper } from 'src/shared/static-helper';
import { Constants } from 'src/shared/constants';
import { LoggerService } from 'src/services/logger.service'; import {
    trigger,
    state,
    style,
    animate,
    transition,
    useAnimation,
    // ...
} from '@angular/animations';
import { slideInLeft, slideOutRight, flipOutX, flipInY, flipInX, fadeInUp } from 'ng-animate';

declare var $;

@Component({
    selector: 'consulting-contact-us',
    templateUrl: './contact-us.component.html',
    styleUrls: [],
    animations: [
        trigger('slideInLeft', [transition('out => in',
            useAnimation(fadeInUp, {
                // Set the duration to 5seconds and delay to 2seconds
                params: { timing: 1, delay: 0 }
            })), state('out', style({
                display: 'none',
                // width:'0'
            })), state('in', style({
                display: 'block',
            }))
        ]),
        trigger('slideOutRight', [transition('in => out', useAnimation(flipOutX, {
            // Set the duration to 5seconds and delay to 2seconds
            params: { timing: 1, delay: 0 }
        })), state('out', style({
            display: 'none'
        }))
        ]),
    ],
})
export class ContactUsComponent implements OnInit {

    // @Output() onDataSaved: EventEmitter<any> = new EventEmitter<any>();
    // constants: Constants = new Constants();
    bounce: any;
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
    constants: Constants;
    durations: string[] = ["Contract", "Hourly", "Daily", "Monthly", "Quaterly", "Yearly"];
    technologies: string[] = ["Interested In", "Angular js", "Node js", "React js", "C++", "AWS", "EC2 Console", "ERC 20 Tokens", "ASP .NET MVC",
        "JAVA", "Android", "Blockchain", "Xen Server", "Cloud Vertualization", "IOS"];
    budgetArray: string[] = ["Budget", "Less Than £25k", "£25-50k", "£100-250k", "£250-500k", "£1 Million", "More Than 1 £Million"]
    animateDiv: boolean = false;

    constructor(private formBuilder: FormBuilder,
        private http: HttpClientService,
        private spinner: SpinnerService,
        private router: Router,
        public globals: GlobalsService,
        private log: LoggerService) {
    }

    ngOnInit() {
        this.constants = this.globals.constants;
        this.lang = this.globals.lang;
        this.showsubmitResponse = false;
        this.submitResponseMessage = "";
        this.submitRequestResposneClass = "";
        this.frmContactUs = new mdContactUs(true);
        this.frmContactUs.duration = this.durations[0];
        this.frmContactUs.interested_in = this.technologies[0];
        this.frmContactUs.budget = this.budgetArray[0];
        this.invalidEmail = false;
        this.diableSubmitButton = false;
        this.contactUsForm = this.formBuilder.group({
            name: [
                this.frmContactUs.name,
                Validators.compose([
                    // Validators.required,
                    Validators.maxLength(ContactUsMetaData.nameMaxLength)
                ])
            ],
            contact_no: [
                this.frmContactUs.contact_no,
                Validators.compose([
                    // Validators.required,
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
            interested_in: [
                this.frmContactUs.interested_in,
                // Validators.compose([
                //     Validators.required,
                // ])
            ],
            duration: [
                this.frmContactUs.duration,
                // Validators.compose([
                //     Validators.required,
                // ])
            ],
            budget: [
                this.frmContactUs.budget,
                // Validators.compose([
                //     Validators.required,
                // ])
            ],
            skype_id: [
                this.frmContactUs.skype_id,
                Validators.compose([
                    // Validators.required,
                    Validators.maxLength(ContactUsMetaData.skypeIdMaxLength)
                ])
            ],
            // message: [
            //     this.frmContactUs.message,
            //     Validators.compose([
            //         Validators.required,
            //         Validators.maxLength(ContactUsMetaData.messageMaxLength)
            //     ])
            // ],
            // contactus_capitcha: new FormControl(false, null)
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
            interestedInRequried: this.lang.FieldRequired,
            durationRequried: this.lang.FieldRequired,
            budgetRequried: this.lang.FieldRequired,
            skypeIdRequried: this.lang.FieldRequired,
            skypeIdMaxLength: StaticHelper.formatString(this.lang.RequiredFormat, this.lang.SkypeId),

        };
    }

    setDefaultValues() {
        this.contactUsForm.controls.name.setValue("");
        this.contactUsForm.controls.contact_no.setValue("");
        this.contactUsForm.controls.email.setValue("");
        this.contactUsForm.controls.interested_in.setValue(this.technologies[0]);
        this.contactUsForm.controls.budget.setValue(this.budgetArray[0]);
        this.contactUsForm.controls.duration.setValue(this.durations[0]);
        this.contactUsForm.controls.skype_id.setValue("");
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
        this.log.debug('Google reCAPTCHA loaded and is ready for use!')
    }

    onScriptError() {
        this.log.error('Something went long when loading the Google reCAPTCHA')
    }

    onSubmit() {
        this.submitted = true;
        // this.onDataSaved.emit();
        // if (this.contactUsForm.controls.contactus_capitcha.status != "VALID") {
        //     return;
        // }
        // stop here if form is invalid
        // only email is the required field therefore, we are checking email separately
        // if (this.contactUsForm.invalid) {
        //     this.log.debug('invalid form');
        //     return;
        // }

        if (this.contactUsForm.controls.email.value.length < 1) {
            alert(this.errors.emailRequried)
            return;
        }
        if (!EmailValidator.validate(this.contactUsForm.controls.email.value)) {
            this.invalidEmail = true;
            alert(this.errors.emailInvalid)
            return;
        }
        else {
            this.invalidEmail = false;
        }

        //everything is fine, now save the data
        this.diableSubmitButton = true;
        this.invalidEmail = false;
        let formData: mdContactUs = this.contactUsForm.value;
        if (this.budgetArray.indexOf(formData.budget) < 1) {
            formData.budget = "";
        }
        if (this.budgetArray.indexOf(formData.interested_in) < 1) {
            formData.interested_in = "";
        }
        if (this.budgetArray.indexOf(formData.duration) < 1) {
            formData.duration = "";
        }
        formData.uuid = uuid();
        let res = new mdCallResponse();
        //var response = this.http.post(this.http.endpoints.postContactUs, formData);
        this.spinner.show();
        this.http.postPromise<mdCallResponse>(this.constants.EndPoints.PostContactUs, formData).then((res: mdCallResponse) => {
            this.spinner.hide();
            this.diableSubmitButton = false;
            this.submitRequestResposneClass = "text-danger";
            if (res) {
                this.submitResponseMessage = res.message.replace("\n", "<br/>");
                if (res.isSuccess) {
                    this.submitRequestResposneClass = "text-success";
                }
            }
            // this.showsubmitResponse = true;
            if (res) {
                if (res.isSuccess) {
                    this.animateDiv = !this.animateDiv
                    // setTimeout(() => {
                    //     this.setDefaultValues();
                    //     // this.onDataSaved.emit();
                    //     $('.working-tech-sec .head-sec').html("These are the Technologies we specialise in and our expert will be in touch with you within 3 working days");
                    //     $('html,body').animate({
                    //         scrollTop: $(".working-tech-sec").offset().top
                    //     }, 'slow');
                    // }, this.constants.ResponseMessageTimeout * 1000);
                }
            }
        }).catch(error => {
            this.spinner.hide();
            this.diableSubmitButton = false;
        });
    }

}
