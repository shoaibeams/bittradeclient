//@angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';  

//node_modules
import {
    NbSpinnerModule,
    NbDatepickerModule,
    NbThemeModule,
    NbButtonModule,
} from '@nebular/theme';

//components
import {ButtonCellSmartTableRendererComponent} from './button-cell-smat-table/button-cell-smat-table.component';

const components = [ButtonCellSmartTableRendererComponent]

@NgModule({
    imports: [
        CommonModule,
        NbSpinnerModule,
        NbDatepickerModule,
        NbThemeModule,
        NbButtonModule,
    ],
    exports:[...components],
    declarations: [...components],
    entryComponents:[...components],
})
export class SharedModule {
}

