import { Component, OnInit } from '@angular/core';
import { LanguageBase } from 'src/shared/language';
import { SpinnerService } from 'src/services/spinner.service';
import { HttpClientService } from 'src/services/http-client.service';
import { LoggerService } from 'src/services/logger.service';
import { mdCallResponse } from 'src/models/call-response';
import { GlobalsService } from 'src/services/globals.service';
import { Constants } from 'src/shared/constants';

@Component({
    selector: 'app-main-header',
    templateUrl: './main-header.component.html',
})
export class MainHeaderComponent implements OnInit {

    lang: LanguageBase;
    constants: Constants;
    constructor(private spinner: SpinnerService, 
        private http: HttpClientService, 
        private log: LoggerService,
        public globals: GlobalsService) { }

    ngOnInit() {
        this.constants = this.globals.constants;
        this.lang = this.globals.lang;
    }

    logout(){
        this.spinner.show();
        this.http.getPromise<mdCallResponse>(this.constants.EndPoints.GetLogout).then((res:mdCallResponse) => {
            window.location.href = this.constants.RoutePaths.Home;
        }).catch( error => {
            this.log.info(error);
            window.location.href = this.constants.RoutePaths.Home;
        });
    }

}
