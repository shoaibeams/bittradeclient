import { Component, OnInit } from '@angular/core';
import { LanguageBase } from 'src/shared/language';
import { SpinnerService } from 'src/services/spinner.service';
import { HttpClientService } from 'src/services/http-client.service';
import { LoggerService } from 'src/services/logger.service';
import { mdCallResponse } from 'src/models/call-response';
import { GlobalsService } from 'src/services/globals.service';
import { Constants } from 'src/shared/constants';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

declare var $;
@Component({
    selector: 'app-main-header',
    templateUrl: './main-header.component.html',
})

export class MainHeaderComponent implements OnInit {

    lang: LanguageBase;
    constants: Constants;
    routerLinks: any[];
    currentPath: string;
    constructor(private spinner: SpinnerService,
        private http: HttpClientService,
        private log: LoggerService,
        public globals: GlobalsService,
        private locat: Location,
        private router: Router) {
        this.constants = Constants.Instance;
        this.currentPath = this.locat.path();
        if (this.currentPath.length > 0) {
            if (this.currentPath[0] == '/') {
                this.currentPath = this.currentPath.substr(1);
            }
        }
    }

    ngOnInit() {
        this.lang = this.globals.lang;
        this.getNavBarLinks();
    }

    getClasses(link) {
        let classes = '';
        if (link.children.length > 0) {
            classes += ' dropdown';
            if (link.children.indexOf(this.currentPath) > -1) {
                classes += ' active';
            }
        }
        else if ((this.currentPath == link.routerLink && this.currentPath != "") ||
            (this.globals.lang.Home == link.text && this.currentPath == "")) {
            classes += 'active';
        }
        return classes;
    }

    navChildClicked(index) {
        for (let i = 0; i < this.routerLinks.length; i++) {
            this.routerLinks[i].class = this.routerLinks[i].class.replace('active', '');
        }
        if (index >= 0) {
            this.routerLinks[index].class += ' active';
        }
    }

    navItemClicked(index) {
        if (this.routerLinks[index]) {
            if (this.routerLinks[index].children) {
                if (this.routerLinks[index].children.length > 0) {
                    return;
                }
            }
        }
        for (let i = 0; i < this.routerLinks.length; i++) {
            this.routerLinks[i].class = this.routerLinks[i].class.replace('active', '');
        }
        if (index >= 0) {
            this.routerLinks[index].class += ' active';
        }
    }

    getNavBarLinks() {
        this.routerLinks = [
            {
                routerLink: Constants.Instance.RoutePaths.Home,
                icon: 'assets/images/home-icon.png',
                alt: this.globals.lang.Home,
                text: this.globals.lang.Home,
                requrieLogin: false,
                children: [],
            },
            {
                routerLink: Constants.Instance.RoutePaths.Trade,
                icon: 'assets/images/exchange-icon.png',
                alt: this.globals.lang.Trade,
                text: this.globals.lang.Trade,
                requrieLogin: true,
                children: [],
            },
            {
                routerLink: Constants.Instance.RoutePaths.Funding,
                icon: 'assets/images/exchange-icon.png',
                alt: this.globals.lang.Funding,
                text: this.globals.lang.Funding,
                requrieLogin: true,
                children: [],
            },
            {
                routerLink: Constants.Instance.RoutePaths.Home,
                icon: 'assets/images/seller-icon.png',
                alt: this.globals.lang.Charts,
                text: this.globals.lang.Charts,
                requrieLogin: false,
                children: [],
            },
            {
                routerLink: '#',
                icon: 'assets/images/exchange-icon.png',
                alt: this.globals.lang.Blockchain,
                text: this.globals.lang.Blockchain,
                requrieLogin: false,
                children: [
                    {
                        routerLink: Constants.Instance.RoutePaths.Home,
                        text: this.globals.lang.Travel,
                    }, {
                        routerLink: Constants.Instance.RoutePaths.Home,
                        text: this.globals.lang.RealEstate,
                    }
                ],
            },
            {
                routerLink: Constants.Instance.RoutePaths.Home,
                icon: 'assets/images/wallet-icon1.png',
                alt: this.globals.lang.Wallet,
                text: this.globals.lang.Wallet,
                requrieLogin: true,
                children: [],
            },
            {
                routerLink: null,
                href: '/' + Constants.Instance.RoutePaths.Consulting,
                icon: 'assets/images/consult.png',
                alt: this.globals.lang.Consulting,
                text: this.globals.lang.Consulting,
                requrieLogin: false,
                children: [],
            },
            {
                routerLink: '#',
                icon: 'assets/images/faq-icon.png',
                alt: this.globals.lang.Help,
                text: this.globals.lang.Help,
                requrieLogin: false,
                children: [
                    {
                        routerLink: Constants.Instance.RoutePaths.Home,
                        text: this.globals.lang.FAQ,
                    },
                    {
                        routerLink: Constants.Instance.RoutePaths.Home,
                        text: this.globals.lang.AboutUs,
                    },
                    {
                        routerLink: Constants.Instance.RoutePaths.ContactUs,
                        text: this.globals.lang.ContactUs,
                    },
                ],
            },
        ];

        for (let i = 0; i < this.routerLinks.length; i++) {
            this.routerLinks[i].class = this.getClasses(this.routerLinks[i]);
        }
    }

    logout() {
        this.spinner.show();
        this.http.getPromise<mdCallResponse>(Constants.Instance.EndPoints.GetLogout).then((res: mdCallResponse) => {
            window.location.href = Constants.Instance.RoutePaths.Home;
        }).catch(error => {
            this.log.info(error);
            window.location.href = Constants.Instance.RoutePaths.Home;
        });
    }

}
