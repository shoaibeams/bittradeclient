import * as React from 'react';
import "./file-uploader.component.css";
import { BaseComponent } from "../../../app/components/base/BaseComponent";
import { mdFileUploaderConfig } from "./file-uploader-config";
import { mdFormControl } from "../../../shared/form-control";
import { mdDigitalEvidence } from "../../../models/digital-evidence";
import { StaticHelper } from "../../../shared/static-helper";
import { mdCallResponse } from "../../../models/call-response";
import axios from "axios";
import ProgressBarComponent from '../progress-bar/ProgressBarComponent';

export default class FileUploaderComponent extends BaseComponent {

    render() {
        this.initShorts();
        return (
            <div className="file-uploader col-md-12">
                <input onChange={this.fileSelectionChanged} type="file" id={this.fileInputId} multiple={this.p.config.multiple}
                    style={{ display: 'none' }} accept={this.p.config.formatsAllowed.join(',')} ref={ref => this.fileInput = ref} />
                <label htmlFor={this.fileInputId} className="btn btn-primary">{this.p.config.text}</label>
                <button style={{ marginLeft: '10px' }} onClick={this.clearButtonClicked} className="btn btn-info">{this.lang.Clear}</button>
                <label style={{ paddingLeft: '5px' }} className="info-label text-danger">{this.state.status}</label>
                <br />
                <label className="info-label">{this.state.info}</label>
                {
                    this.state.filesToUpload ? this.state.filesToUpload.map((f, i) => {
                        return (
                            <div key={i} className="row nb-theme-default stylish-border stylish-row">
                                <div className="col-md-7">
                                    <label className="info-label">{f.fileName}</label>
                                </div>
                                <div className="col-md-5">
                                    {
                                        <ProgressBarComponent {...this.props} params={{
                                            status: f.progressBar.status,
                                            displayValue: f.progressBar.displayValue,
                                            value: f.progressBar.progress
                                        }} />
                                    }
                                    {/* <nb-progress-bar [value]="f.progressBar.progress" [status]="f.progressBar.status" [displayValue]="f.progressBar.displayValue"></nb-progress-bar> */}
                                </div>
                            </div>
                        );
                    }) : null
                }

            </div>
        );
    }

    value: mdDigitalEvidence[] = [];
    fileInputId: string = 'fu' + Math.random();
    fileInput: any;
    constructor(props) {
        super(props);
        this.init();
    }

    init() {
        this.state = {
            filesToUpload: [],
            infoText: '',
            status: '',
        }
        this.setInfoText();
    }

    recievedNewChanges() {
        this.clearFiles();
        this.setInfoText();
    }

    clearButtonClicked = (e) => {
        e.preventDefault();
        this.clearFiles();
    }

    clearFiles() {
        this.fileInput.value = null;
        this.resetProps();
    }

    resetProps(callback?) {
        for (let i = 0; i < this.state.filesToUpload.length; i++) {
            let file = this.state.filesToUpload[i];
            if (file.progressBar.progress < 100) {
                file.cancelTokenSource.cancel("");
            }
        }
        this.updateState({
            filesToUpload: []
        }, callback);
        this.p.isBusyChange(false);
        this.updateValue([]);
    }

    updateValue(val) {
        this.value = val;
        this.p.valueChange(this.value);
        this.log.debug(this.value);
    }

    setInfoText() {
        this.state = {
            ...this.state,
            infoText: '(' + this.p.config.formatsAllowed.join(', ') + ') ' + this.lang.SizeLimit + ' ' + this.p.config.maxSize + ' MB'
        }
    }

    fileSelectionChanged = (event) => {
        if (!event.target.files) {
            return;
        }
        if (event.target.files.length < 1) {
            return;
        }

        this.resetProps(() => {

        });
        let isError = false; const reader = new FileReader();

        let status = this.state.status;
        for (let i = 0; i < event.target.files.length; i++) {
            let sizeInBytes = event.target.files[i].size;
            let allowedFileSizeInBytes = this.p.config.maxSize * 1024 * 1024;
            if (sizeInBytes > allowedFileSizeInBytes) {
                status = this.p.globals.lang.SizeLimitExceeds;
                isError = true;
                break;
            }
            let name = event.target.files[i].name;
            let splittedName = name.split('.');
            if (splittedName.length < 2) {
                status = StaticHelper.formatString(this.lang.AllowFileTypesAreFormat, this.p.config.formatsAllowed.join(', '));
                isError = true;
                break;
            }

            if (this.p.config.formatsAllowed.indexOf('.' + splittedName[splittedName.length - 1]) < 0) {
                status = StaticHelper.formatString(this.lang.AllowFileTypesAreFormat, this.p.config.formatsAllowed.join(', '));
                isError = true;
                break;
            }
        }
        if (status != this.state.status) {
            this.updateState({
                status: status,
            })
        }

        if (isError) {
            this.updateState({
                fileInput: '',
            })
            return;
        }

        if (this.p.config.uploadEndpoint == null) {
            return;
        }

        if (this.p.config.uploadEndpoint.length < 1) {
            return;
        }

        this.p.isBusyChange(true);
        let filesToUpload = [];
        for (let i = 0; i < event.target.files.length; i++) {
            const fd = new FormData();
            fd.append('files', event.target.files[i]);
            const CancelToken = axios.CancelToken;
            const source = CancelToken.source();
            this.postFile(fd, i, source);
            filesToUpload.push({
                progressBar: {
                    progress: 0,
                    status: 'info',
                    displayValue: true,
                },
                fileName: event.target.files[i].name,
                cancelTokenSource: source,
            })
            this.updateState({
                filesToUpload: filesToUpload,
            })

        }
    }

    postFile(fd, i, cancelTokenSource) {
        return this.http.postFile(this.p.config.uploadEndpoint, fd, (event) => {
            let newProgress = Math.round(event['loaded'] / event['total'] * 100);
            if (Math.round(this.state.filesToUpload[i].progressBar.progress) !== newProgress) {
                let filesToUpload = this.state.filesToUpload;
                filesToUpload[i].progressBar.progress = newProgress;
                this.updateState({
                    filesToUpload: filesToUpload,
                })
            }
        }, {
                cancelToken: cancelTokenSource.token
            }).then((res: mdCallResponse) => {

                let filesToUpload = this.state.filesToUpload;
                filesToUpload[i].progressBar.progress = 100;
                this.p.isBusyChange(false);
                if (res.extras) {
                    if (res.extras.de) {
                        this.updateValue(this.value.concat(res.extras.de));
                    }
                }
                this.updateState({
                    filesToUpload: filesToUpload,
                    status: res.isSuccess ? this.state.status : this.lang.SomethingWentWrongTryAgainLater,
                })
            }).catch(error => {
                this.p.isBusyChange(false);
                this.log.info(error);
                this.updateState({
                    status: this.lang.SomethingWentWrongTryAgainLater
                })
            });
    }
}