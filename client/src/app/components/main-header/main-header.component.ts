import { Component, OnInit } from '@angular/core';
import { LanguageBase } from 'src/app/shared/language';
import { SpinnerService } from 'src/app/services/spinner.service';
import { HttpClientService } from 'src/app/services/http-client.service';
import { LoggerService } from 'src/app/services/logger.service';
import { mdCallResponse } from 'src/app/models/call-response';
import { GlobalsService } from 'src/app/services/globals.service';
import { Constants } from '../../shared/constants';

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
        let res = new mdCallResponse();
        this.http.get<mdCallResponse>(this.constants.EndPoints.GetLogout).subscribe((data) => {
            res = data;
        }, error => {
            this.log.debug(error);
            window.location.replace(this.constants.RoutePaths.Login);
        }, () => {
            this.log.debug(res);
            window.location.replace(this.constants.RoutePaths.Login);
        });
    }

}
