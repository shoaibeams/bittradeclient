//@angular
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

//node_modules
import { RecaptchaModule } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';
import {
    NbSpinnerModule,
    NbDatepickerModule,
    NbThemeModule,
} from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { FileUploaderModule } from "src/modules/file-uploader/file-uploader.module";

//modules
import { FundingRoutingModule, FundingCompoents } from './funding-routing.module';
import {SearchableDropdownModule} from 'src/modules/searchable-dropdown/searchable-dropdown.module';
import {SharedModule} from 'src/modules/shared/shared.module';

//misc

@NgModule({
    imports: [
        FundingRoutingModule,
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        RecaptchaModule,
        RecaptchaFormsModule,
        NbSpinnerModule,
        NbDatepickerModule,
        SearchableDropdownModule,
        NbThemeModule,
        OwlDateTimeModule,
        OwlNativeDateTimeModule,
        Ng2SmartTableModule,
        SharedModule,
        FileUploaderModule,
    ],
    declarations: FundingCompoents,
    providers:[
    ]
})
export class FundingModule {
}

