import { Component, OnInit } from '@angular/core';
import { Constants } from 'src/app/shared/constants';
import { LanguageBase } from 'src/app/shared/language';
import { SpinnerService } from 'src/app/services/spinner.service';
import { HttpClientService } from 'src/app/services/http-client.service';
import { LoggerService } from 'src/app/services/logger.service';
import { mdCallResponse } from 'src/app/models/call-response';
import { GlobalsService } from 'src/app/services/globals.service';

@Component({
    selector: 'app-main-header',
    templateUrl: './main-header.component.html',
    styleUrls: ['./main-header.component.css']
})
export class MainHeaderComponent implements OnInit {

    const: Constants;
    lang: LanguageBase;
    constructor(private spinner: SpinnerService, private http: HttpClientService, private log: LoggerService,
        private globals: GlobalsService) { }

    ngOnInit() {
        this.const = Constants;
        this.lang = this.globals.lang;
    }

    logout(){
        this.spinner.show();
        let res = new mdCallResponse();
        this.http.get<mdCallResponse>(Constants.EndPoints.GetLogout).subscribe((data) => {
            res = data;
        }, error => {
            this.log.debug(error);
            window.location.href = Constants.RoutePaths.Login;
        }, () => {
            this.log.debug(res);
            window.location.href = Constants.RoutePaths.Login;
        });
    }

}
