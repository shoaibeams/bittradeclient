//@angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//node_modules
import { RECAPTCHA_SETTINGS, RecaptchaSettings, RecaptchaModule } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';
import { NgxNotificationModule } from 'ngx-notification';
// import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { WebStorageModule } from 'ngx-store';
import { NgxSpinnerModule } from 'ngx-spinner';
import {
    NbAlertModule,
    NbButtonModule,
    NbCardModule,
    NbCheckboxModule,
    NbInputModule,
    NbLayoutModule,
    NbSpinnerModule,
    NbThemeModule,
    NbDatepickerModule,
    NB_DOCUMENT,
} from '@nebular/theme';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

//components
import { AppComponent } from './app.component';
// import { ConsultingComponent } from './consulting/consulting.component';
// import { CenterComponent } from './consulting/center.component';

//services
import { HttpClientService } from '../services/http-client.service';
import { SpinnerService } from '../services/spinner.service';
import { LoggerService } from '../services/logger.service'
import { ConfirmationBoxService } from '../services/confirmation-box.service';
import { GlobalsService } from '../services/globals.service';
import { SocketService } from '../services/socket.service';
import { ToasterService } from '../services/toaster.service';

//directives
import { NumberOnlyDirective } from '../directives/number-only.directive';
import { NumberdOnlyDirective } from '../directives/numberd-only.directive';

//modules
import { AppRoutingModule, AppCompoents } from './app-routing.module';
import { SearchableDropdownModule } from '../modules/searchable-dropdown/searchable-dropdown.module';
import { FileUploaderModule } from '../modules/file-uploader/file-uploader.module';

//misc
import { Constants, StaticConstatns } from '../shared/constants';

@NgModule({
    exports: [RouterModule],
    declarations: [
        AppCompoents,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        WebStorageModule,
        // GooglePlaceModule,
        ReactiveFormsModule,
        RecaptchaModule,
        FormsModule,
        HttpModule,
        HttpClientModule,
        NgxSpinnerModule,
        // RouterModule.forRoot(appRoutes),
        RecaptchaFormsModule,
        NgxNotificationModule,
        NbSpinnerModule,
        AppRoutingModule,
        NbAlertModule,
        NbButtonModule,
        NbCardModule,
        NbCheckboxModule,
        NbInputModule,
        NbLayoutModule,
        NbDatepickerModule.forRoot(),
        NbThemeModule,
        SearchableDropdownModule,
        OwlDateTimeModule,
        OwlNativeDateTimeModule,
        FileUploaderModule,
    ],
    providers: [
        HttpClientService,
        SpinnerService,
        LoggerService,
        ConfirmationBoxService,
        GlobalsService,
        SocketService,
        ToasterService,
        {
            provide: RECAPTCHA_SETTINGS,
            useValue: { siteKey: StaticConstatns.RecaptchaSiteKey } as RecaptchaSettings,
        },
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
