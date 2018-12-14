import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { ConsultingComponent } from './consulting.component';
import { CenterComponent } from './center.component';

const routes: Routes = [{
    path: '',
    component: ConsultingComponent,
    // children: [{
    //     path: 'dashboard',
    //     component: DashboardComponent,
    // },
    // {
    //     path: 'order',
    //     loadChildren: './order/order.module#OrderModule',
    // }
    // ],
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ConsultingRoutingModule {
}
