import { bounce } from 'ng-animate';
import { Component } from '@angular/core';
import { Constants } from 'src/shared/constants';
import { GlobalsService } from 'src/services/globals.service';
import { LanguageBase } from 'src/shared/language';
import { StaticHelper } from 'src/shared/static-helper';

@Component({
    selector: 'not-found-component',
    styleUrls: ['not-found.component.css'],
    template:
`<div class="body signupwrap">
    <h1 [innerHTML]="pageNotFoundText"></h1>
    <section class="error-container">
        <span>4</span>
        <span><span class="screen-reader-text">0</span></span>
        <span>4</span>
    </section>
    <div class="link-container">
        <a [routerLink]="constants.RoutePaths.Home" class="more-link" [innerHTML]="globals.lang.BackToHome"></a>
    </div>
</div>
`

})
export class NotFoundComponent {
    constants: Constants;
    pageNotFoundText: string;
    constructor(public globals: GlobalsService)
    {

    }

    ngOnInit() {
        this.constants = this.globals.constants;
        this.pageNotFoundText = StaticHelper.formatString(this.globals.lang.NotFoundFormat, this.globals.lang.Page);
    }

}