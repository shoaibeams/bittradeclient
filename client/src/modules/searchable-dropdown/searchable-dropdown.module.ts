//@angular
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

//thirdparty
import {
    NbSpinnerModule,
} from '@nebular/theme';

//components
import {SearchableDropdownComponent} from './searchable-dropdown.component';
import {SearchableDropdownSettings} from './searchable-dropdown-settings';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        NbSpinnerModule,
    ],
    exports:[SearchableDropdownComponent],
    declarations: [SearchableDropdownComponent],
})
export class SearchableDropdownModule {
}

