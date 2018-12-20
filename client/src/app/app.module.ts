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
    NbAlertModule,
    NbButtonModule,
    NbCardModule,
    NbCheckboxModule,
    NbInputModule,
    NbLayoutModule,
    NbSpinnerModule,
    NbThemeModule,
} from '@nebular/theme';

//components
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { MainHeaderComponent } from './main-header/main-header.component';
import { EmailConfirmationComponent } from './email-confirmation/email-confirmation.component';
import { AccountVerificationComponent } from './account-verification/account-verification.component';
import { TradeComponent } from './trade/trade.component';
import { MainFooterComponent } from './main-footer/main-footer.component';
import { OrderComponent } from './order/order.component';
import { OrderHistoryComponent } from './order-history/order-history.compononent';
import { MyComponent } from './MyComponent/MyComponent';
import { ChatComponent } from './chat/chat.component';
// import { ConsultingComponent } from './consulting/consulting.component';
// import { CenterComponent } from './consulting/center.component';

//services
import { HttpClientService } from '../services/http-client.service';
import { SpinnerService } from '../services/spinner.service';
import { LoggerService } from '../services/logger.service'
import { ConfirmationBoxService } from '../services/confirmation-box.service';
import { GlobalsService } from '../services/globals.service';
import { SocketService } from '../services/socket.service';

//directives
import { NumberOnlyDirective } from '../directives/number-only.directive';
import { NumberdOnlyDirective } from '../directives/numberd-only.directive';

//modules
import { AppRoutingModule } from './app-routing.module';

//misc
import { Constants, StaticConstatns } from '../shared/constants';

const appRoutes: Routes = [
    {
        path: StaticConstatns.RoutePaths.Login,
        component: LoginComponent
    },
    {
        path: StaticConstatns.RoutePaths.Home,
        component: HomeComponent
    },
    {
        path: StaticConstatns.RoutePaths.SignUp,
        component: SignupComponent,
        // children:[
        //   {
        //     path:"",
        //     component: ForgetpasswordComponent
        //   }
        // ]

    },
    {
        path: StaticConstatns.RoutePaths.ContactUs,
        component: ContactUsComponent
    },
    {
        path: StaticConstatns.RoutePaths.EmailConfirmation,
        component: EmailConfirmationComponent
    },
    {
        path: StaticConstatns.RoutePaths.AccountVerify,
        component: AccountVerificationComponent,
    },
    {
        path: StaticConstatns.RoutePaths.AccountForgotPassword,
        component: ForgetpasswordComponent,
    },
    {
        path: StaticConstatns.RoutePaths.Trade,
        component: TradeComponent,
    },
    {
        path: 'chat',
        component: ChatComponent,
    },
    // {
    //     path: StaticConstatns.RoutePaths.Consulting,
    //     component: ConsultingComponent,
    // }

];
@NgModule({
    exports: [RouterModule],
    declarations: [
        AppComponent,
        LoginComponent,
        SignupComponent,
        HomeComponent,
        ForgetpasswordComponent,
        ContactUsComponent,
        MainHeaderComponent,
        EmailConfirmationComponent,
        AccountVerificationComponent,
        TradeComponent,
        MainFooterComponent,
        OrderComponent,
        NumberOnlyDirective,
        NumberdOnlyDirective,
        OrderHistoryComponent,
        // ConsultingComponent,
        // CenterComponent,
        MyComponent,
        ChatComponent,
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
        AppRoutingModule,
        NbAlertModule,
        NbButtonModule,
        NbCardModule,
        NbCheckboxModule,
        NbInputModule,
        NbLayoutModule,
        NbSpinnerModule,
        NbThemeModule,
    ],
    providers: [
        HttpClientService,
        SpinnerService,
        LoggerService,
        ConfirmationBoxService,
        GlobalsService,
        SocketService,
        {
            provide: RECAPTCHA_SETTINGS,
            useValue: { siteKey: StaticConstatns.RecaptchaSiteKey } as RecaptchaSettings,
        },
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
