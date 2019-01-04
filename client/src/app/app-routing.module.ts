import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { StaticConstatns } from 'src/shared/constants';

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
import { NotFoundComponent } from './not-found/not-found.component';

//directives
import { NumberOnlyDirective } from 'src/directives/number-only.directive';
import { NumberdOnlyDirective } from 'src/directives/numberd-only.directive';

const routes: Routes = [
    { path: 'funding', loadChildren: '../modules/funding/funding.module#FundingModule' },
    
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
        path: 'animate',
        component: MyComponent,
    },
    { path: '404', component: NotFoundComponent },
    { path: '**', component: NotFoundComponent },
    {
        path: 'chat',
        component: ChatComponent,
    },
];

const config: ExtraOptions = {
  useHash: false,
};

export const AppCompoents = [
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
    NotFoundComponent,
]

@NgModule({
    imports: [RouterModule.forRoot(routes, config)],
    exports: [RouterModule],
})
export class AppRoutingModule {
}
