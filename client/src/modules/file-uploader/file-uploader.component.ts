import { Component, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LanguageBase } from 'src/shared/language';
import { GlobalsService } from 'src/services/globals.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as $ from 'jquery';
import { EventEmitter } from '@angular/core';
import { mdFileUploaderConfig } from './file-uploader-config';
import { StaticHelper } from 'src/shared/static-helper';
import { areAllEquivalent } from '@angular/compiler/src/output/output_ast';
import { HttpClientService } from 'src/services/http-client.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { LoggerService } from 'src/services/logger.service';
import { mdCallResponse } from 'src/models/call-response';
import { mdDigitalEvidence } from 'src/models/digital-evidence';

declare var $;

@Component({
    selector: 'file-uploader',
    templateUrl: './file-uploader.component.html',
    styleUrls: ['./file-uploader.component.css']
})

export class FileUploaderComponent {

    @ViewChild("fileInput") fileInput;
    @Input() config: mdFileUploaderConfig;
    @Input() reset: boolean;
    @Input() isBusy: boolean;
    @Output() isBusyChange = new EventEmitter<any>();
    @Output() valueChange = new EventEmitter<any>();
    value: mdDigitalEvidence[] = [];
    infoText: string;
    fileInputId: string;
    status: string = '';
    selectedFileName: string;
    filesToUpload: any[] = [];

    constructor(
        private formBuilder: FormBuilder,
        public globals: GlobalsService,
        public https: HttpClientService,
        public log: LoggerService,
    ) {
        this.config = new mdFileUploaderConfig();
        this.config.text = this.globals.lang.SelectFile
        this.fileInputId = 'fu' + Math.random();
        this.setInfoText();
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.config) {
            if (changes.config.currentValue != null) {
                this.config.setConfig(changes.config.currentValue);
            }
        }
        
        if (changes.reset) {
            this.reset = changes.reset.currentValue;
            if (this.reset) {
                this.clearFiles();
            }
        }

        this.setInfoText();
    }

    clearButtonClicked()
    {
        this.clearFiles();
    }

    clearFiles() {
        this.fileInput.nativeElement.value = '';
        this.resetProps();
    }

    resetProps()
    {
        this.selectedFileName = '';
        for(let i = 0; i < this.filesToUpload.length; i++)
        {
            this.filesToUpload[i].httpRequest.unsubscribe();
        }
        this.filesToUpload = [];
        this.isBusyChange.emit(false);
        this.updateValue([]);
    }

    updateValue(val)
    {
        this.value = val;
        this.valueChange.emit(this.value);
        this.log.debug(this.value);
    }

    setInfoText() {
        this.infoText = '(' + this.config.formatsAllowed.join(', ') + ') ' + this.globals.lang.SizeLimit + ' ' + this.config.maxSize + ' MB'
    }

    ngOnInit() {
    }

    get fi() { return this.fileInput.nativeElement; }

    fileSelectionChanged(event) {
        if (!event.target.files) {
            return;
        }
        if (event.target.files.length < 1) {
            return;
        }
        
        this.resetProps();
        let isError = false; const reader = new FileReader();

        for (let i = 0; i < event.target.files.length; i++) {
            let sizeInBytes = event.target.files[i].size;
            let allowedFileSizeInBytes = this.config.maxSize * 1024 * 1024;
            if (sizeInBytes > allowedFileSizeInBytes) {
                this.status = this.globals.lang.SizeLimitExceeds;
                isError = true;
                break;
            }
            let name = event.target.files[i].name;
            let splittedName = name.split('.');
            if (splittedName.length < 2) {
                this.status = StaticHelper.formatString(this.globals.lang.AllowFileTypesAreFormat, this.config.formatsAllowed.join(', '));
                isError = true;
                break;
            }

            if (this.config.formatsAllowed.indexOf('.' + splittedName[splittedName.length - 1]) < 0) {
                this.status = StaticHelper.formatString(this.globals.lang.AllowFileTypesAreFormat, this.config.formatsAllowed.join(', '));
                isError = true;
                break;
            }
        }

        if (isError) {
            this.fileInput.nativeElement.value = '';
            return;
        }

        if (this.config.uploadEndpoint == null) {
            return;
        }

        if (this.config.uploadEndpoint.length < 1) {
            return;
        }

        this.isBusyChange.emit(true);
        for (let i = 0; i < event.target.files.length; i++) {
            this.filesToUpload.push({
                progressBar: {
                    progress: 0,
                    status: 'info',
                    displayValue: true,
                },
                fileName: event.target.files[i].name,
            });
            const fd = new FormData();
            fd.append('files', <File>event.target.files[i]);
            this.filesToUpload[i].httpRequest = this.https.postFile(this.config.uploadEndpoint, fd).subscribe((event: HttpEvent<any>) => {
                switch (event.type) {
                    case HttpEventType.Sent:
                        this.filesToUpload[i].progressBar.progress = 0;
                        break;
                    case HttpEventType.Response:
                        this.filesToUpload[i].progressBar.progress = 100;
                        this.isBusyChange.emit(false);
                        let res: mdCallResponse = event.body as mdCallResponse;
                        if (!res.isSuccess) {
                            this.status = this.globals.lang.SomethingWentWrongTryAgainLater;
                            return;
                        }
                        if (res.extras) {
                            if (res.extras.de) {
                                this.updateValue(this.value.concat(res.extras.de));
                            }
                        }
                        break;
                    case 1: {
                        let newProgress = Math.round(event['loaded'] / event['total'] * 100);
                        if (Math.round(this.filesToUpload[i].progressBar.progress) !== newProgress) {
                            this.filesToUpload[i].progressBar.progress = newProgress;
                        }
                        break;
                    }
                }
            }, error => {
                this.isBusyChange.emit(false);
                this.log.info(error);
                this.status = this.globals.lang.SomethingWentWrongTryAgainLater;
            });
        }
        // setTimeout(this.updateProgress, 100);
    }

}
