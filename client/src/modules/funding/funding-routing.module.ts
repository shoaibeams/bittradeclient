import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import {FundingComponent} from './funding.component';
import {DepositComponent} from './deposit/deposit.component';

const routes: Routes = [{
    path: '',
    component: FundingComponent,
    children: [
        {
            path: 'deposit',
            component: DepositComponent,
        },
    ],
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class FundingRoutingModule {
}

export const FundingCompoents = [
    FundingComponent,
    DepositComponent,
]
