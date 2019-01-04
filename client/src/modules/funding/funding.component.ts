import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LanguageBase } from 'src/shared/language';
import { GlobalsService } from 'src/services/globals.service';
import { Constants } from 'src/shared/constants';
import { SearchableDropdownSettings } from '../searchable-dropdown/searchable-dropdown-settings';
import { LoggerService } from 'src/services/logger.service';
import { HttpClientService } from 'src/services/http-client.service';
import { mdCallResponse } from 'src/models/call-response';
import { StaticHelper } from 'src/shared/static-helper';

@Component({
    selector: 'funding-root',
    templateUrl: './funding.component.html',
    styleUrls: []
})

@Injectable()
export class FundingComponent {

    lang: LanguageBase;
    constants: Constants;

    constructor(
        private router: Router,
        public globals: GlobalsService,
        private log: LoggerService,
        private http: HttpClientService
    ) {
    }

    ngOnInit() {
        this.lang = this.globals.lang;
        this.constants = Constants.Instance;
    }

}
