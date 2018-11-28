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
import { NgxNotificationComponent } from 'ngx-notification';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { WebStorageModule } from 'ngx-store';
import { NgxSpinnerModule } from 'ngx-spinner';

//components
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { ForgetpasswordComponent } from './components/forgetpassword/forgetpassword.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { MainHeaderComponent } from './components/main-header/main-header.component';
import { EmailConfirmationComponent } from './components/email-confirmation/email-confirmation.component';
import { AccountVerificationComponent } from './components/account-verification/account-verification.component';
import { TradeComponent } from './components/trade/trade.component';
import { MainFooterComponent } from './components/main-footer/main-footer.component';
import { OrderComponent } from './components/order/order.component';
import { OrderHistoryComponent } from './components/order-history/order-history.compononent';

//services
import { HttpClientService } from './services/http-client.service';
import { SpinnerService } from './services/spinner.service';
import { LoggerService } from './services/logger.service'
import { ConfirmationBoxService } from './services/confirmation-box.service';
import { GlobalsService } from './services/globals.service';

//directives
import { NumberOnlyDirective } from './directives/number-only.directive';

//misc
import { Constants } from './shared/constants';

const appRoutes: Routes = [
    {
        path: Constants.RoutePaths.Login,
        component: LoginComponent
    },
    {
        path: Constants.RoutePaths.Home,
        component: HomeComponent
    },
    {
        path: Constants.RoutePaths.SignUp,
        component: SignupComponent,
        // children:[
        //   {
        //     path:"",
        //     component: ForgetpasswordComponent
        //   }
        // ]

    },
    {
        path: Constants.RoutePaths.ContactUs,
        component: ContactUsComponent
    },
    {
        path: Constants.RoutePaths.EmailConfirmation,
        component: EmailConfirmationComponent
    },
    {
        path: Constants.RoutePaths.AccountVerify,
        component: AccountVerificationComponent,
    },
    {
        path: Constants.RoutePaths.AccountForgotPassword,
        component: ForgetpasswordComponent,
    },
    {
        path: Constants.RoutePaths.Trade,
        component: TradeComponent,
    }

];
@NgModule({
    exports: [RouterModule],
    declarations: [
        AppComponent,
        LoginComponent,
        SignupComponent,
        HomeComponent,
        NgxNotificationComponent,
        ForgetpasswordComponent,
        ContactUsComponent,
        MainHeaderComponent,
        EmailConfirmationComponent,
        AccountVerificationComponent,
        TradeComponent,
        MainFooterComponent,
        OrderComponent,
        NumberOnlyDirective,
        OrderHistoryComponent,
    ],
    imports: [
        WebStorageModule,
        GooglePlaceModule,
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
    ],
    providers: [
        HttpClientService,
        SpinnerService,
        LoggerService,
        ConfirmationBoxService,
        GlobalsService,
        {
            provide: RECAPTCHA_SETTINGS,
            useValue: { siteKey: Constants.RecaptchaSiteKey } as RecaptchaSettings,
        },
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
