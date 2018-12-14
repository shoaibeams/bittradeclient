import { NgModule } from '@angular/core';

import {ConsultingRoutingModule} from './consulting-routing.module';
import { ConsultingComponent } from './consulting.component';
import { CenterComponent } from './center.component';

const PAGES_COMPONENTS = [
    ConsultingComponent,
    CenterComponent,
];

@NgModule({
    imports: [
        ConsultingRoutingModule
    ],
    declarations: [
        ...PAGES_COMPONENTS
    ],
})
export class ConsultingModule {
}
