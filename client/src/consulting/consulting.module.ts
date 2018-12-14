//@angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//node_modules
import { RECAPTCHA_SETTINGS, RecaptchaSettings, RecaptchaModule } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';
import { NgxNotificationModule } from 'ngx-notification';
// import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { WebStorageModule } from 'ngx-store';
import { NgxSpinnerModule } from 'ngx-spinner';
import {
    // NbAlertModule,
    // NbButtonModule,
    // NbCardModule,
    // NbCheckboxModule,
    // NbInputModule,
    // NbLayoutModule,
    NbSpinnerModule,
    // NbDatepickerModule,
    // NbThemeModule,
} from '@nebular/theme';

//components
import { ConsultingComponent } from './consulting.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
// import { CenterComponent } from './center/center.component';

//services
import { HttpClientService } from '../services/http-client.service';
import { SpinnerService } from '../services/spinner.service';
import { LoggerService } from '../services/logger.service'
import { ConfirmationBoxService } from '../services/confirmation-box.service';
import { GlobalsService } from '../services/globals.service';

//directives
import { NumberOnlyDirective } from '../directives/number-only.directive';
//modules
// import { AppRoutingModule } from './consulting-routing.module';

//misc
import { Constants, StaticConstatns } from '../shared/constants';

const appRoutes: Routes = [
    {
        path: StaticConstatns.RoutePaths.Consulting,
        component: ConsultingComponent
    },
];
@NgModule({
    exports: [RouterModule],
    declarations: [
        ConsultingComponent,
        // LoginComponent,
        // SignupComponent,
        // HomeComponent,
        // ForgetpasswordComponent,
        ContactUsComponent,
        // MainHeaderComponent,
        // EmailConfirmationComponent,
        // AccountVerificationComponent,
        // TradeComponent,
        // MainFooterComponent,
        // OrderComponent,
        // NumberOnlyDirective,
        // OrderHistoryComponent,
        // ConsultingComponent,
        // CenterComponent,
    ],
    imports: [
        WebStorageModule,
        // GooglePlaceModule,
        ReactiveFormsModule,
        RecaptchaModule,
        BrowserModule,
        FormsModule,
        HttpModule,
        HttpClientModule,
        NgxSpinnerModule,
        RouterModule.forRoot(appRoutes),
        BrowserAnimationsModule,
        RecaptchaFormsModule,
        NgxNotificationModule,
        // ConsultingModule,
        // AppRoutingModule,
    // NbAlertModule,
    // NbButtonModule,
    // NbCardModule,
    // NbCheckboxModule,
    // NbInputModule,
    // NbLayoutModule,
    NbSpinnerModule,
    // NbDatepickerModule,
        // NgbModule,
        // NbThemeModule,
        // angular,
        // ngAnimate,
    ],
    providers: [
        HttpClientService,
        SpinnerService,
        LoggerService,
        ConfirmationBoxService,
        GlobalsService,
    ],
    bootstrap: [ConsultingComponent]
})
export class ConsultingModule { }
