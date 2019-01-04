//@angular
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

//node_modules
import {
    NbSpinnerModule,
    NbProgressBarModule,
} from '@nebular/theme';
import { FileUploadModule  } from 'ng2-file-upload';

//components
import {FileUploaderComponent} from './file-uploader.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        NbSpinnerModule,
        NbProgressBarModule,
        FileUploadModule,
    ],
    exports:[FileUploaderComponent],
    declarations: [FileUploaderComponent],
})
export class FileUploaderModule {
}

