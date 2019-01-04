import { Component, Input, Output, SimpleChanges } from '@angular/core';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LanguageBase } from 'src/shared/language';
import { GlobalsService } from 'src/services/globals.service';
import { SearchableDropdownSettings } from './searchable-dropdown-settings';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as $ from 'jquery';
import { EventEmitter } from '@angular/core';

@Component({
    selector: 'searchable-dropdown',
    templateUrl: './searchable-dropdown.component.html',
    styleUrls: ['./searchable-dropdown.component.css']
})

export class SearchableDropdownComponent {

    @Input() source: any;
    @Input() settings: SearchableDropdownSettings;
    @Input() selectedValue: any;
    @Input() showSpinner: boolean = false;
    @Output() change = new EventEmitter<any>();
    appliedSource: any[];
    form: FormGroup;
    buttonText: string;
    constructor(
        private formBuilder: FormBuilder,
    ) {
        this.settings = new SearchableDropdownSettings();
        this.buttonText = this.settings.placeholder;
        this.form = this.formBuilder.group({
            searchText: ['', null],
        });
    }

    get f() {
        return this.form.controls;
    }

    ngOnChanges(changes: SimpleChanges) {
        this.source = changes.source.currentValue;
        if (changes.settings) {
            if (changes.settings.currentValue != null) {
                this.settings.setSettings(changes.settings.currentValue);
                if (!this.selectedValue) {
                    this.buttonText = this.settings.placeholder;
                }
            }
        }
        if (changes.selectedValue) {
            if (changes.selectedValue != null) {
                this.selectedValue = changes.selectedValue.currentValue;
            }
        }
        if (changes.showSpinner) {
            if (changes.showSpinner != null) {
                this.showSpinner = changes.showSpinner.currentValue;
            }
        }
        this.applySearch();
    }

    ngOnInit() {
        $(".dropdown-menu").find('input').click(function (e) {
            e.stopPropagation();
        });
    }

    selectionChanged(value) {
        if (this.selectedValue != value) {
            this.change.emit({ newValue: value, previousValue: this.selectedValue });
        }
        this.selectedValue = value;
    }

    applySearch() {
        let st = '';
        if (this.f.searchText.value != null) {
            st = this.f.searchText.value;
        }

        if (st != '') {
            if (this.settings.searchCaseSensitive) {
                this.appliedSource = this.source.filter(m => m.text == st);
            }
            else {
                st = st.toUpperCase();
                this.appliedSource = this.source.filter(m => m.text.toUpperCase().indexOf(st) > -1);
            }
        }
        else {
            this.appliedSource = this.source;
        }
    }

    preventDefaultForAnchor = (event) => {
        alert(JSON.stringify(event));
        event.preventDefault();
    }

    dropdownButtonClicked() {
        this.form.controls.searchText.setValue('');
    }

}
