import { Component, Input, OnInit, EventEmitter, Output } from "@angular/core";
import { ViewCell } from "ng2-smart-table";
import { mdButtonCellSmartTableRenderValue } from "../models/button-cell-smart-table-render-value";

@Component({
    selector: 'button-view',
    template:
        `{{renderValue.displayValue}} 
<button *ngIf="renderValue.show" nbButton fullWidth [status]="renderValue.class" (click)="onClick()" [nbSpinner]="renderValue.spinner"
    [disabled]="renderValue.disabled"
    [class.btn-pulse]="disableSubmitButton" [innerHTML]="renderValue.text">
</button>`,
})
export class ButtonCellSmartTableRendererComponent implements ViewCell, OnInit {
    renderValue: mdButtonCellSmartTableRenderValue;

    @Input() value;

    constructor() { }

    @Input() rowData: any;

    @Output() save: EventEmitter<any> = new EventEmitter();

    ngOnInit() {
        this.renderValue = this.value;
    }

    onClick() {
        this.save.emit(this.rowData);
    }
}
