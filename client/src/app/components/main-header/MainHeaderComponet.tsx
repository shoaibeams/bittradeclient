import * as React from 'react';
import { Constants } from '../../../shared/constants';
import { mdProps } from "../../../models/props";
import HeaderComponentHTML from './MainHeaderHTML';
import { BaseComponent } from '../base/BaseComponent';
import { mdCallResponse } from '../../../models/call-response';

export default class MainHeaderComponent extends BaseComponent {

  render() {
    return (
      <HeaderComponentHTML globals={this.props.globals} params={{
        routerLinks: this.routerLinks,
        navItemClicked: this.navItemClicked,
        logout: this.logout,
      }} />
    );
  }

  routerLinks: any[];
  currentPath: string;
  params: mdProps;
  constructor(props: mdProps) {
    super(props);
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
      (this.lang.Home == link.text && this.currentPath == "")) {
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
        icon: '/assets/images/home-icon.png',
        alt: this.lang.Home,
        text: this.lang.Home,
        requrieLogin: false,
        children: [],
      },
      {
        routerLink: Constants.Instance.RoutePaths.Trade,
        icon: '/assets/images/exchange-icon.png',
        alt: this.lang.Trade,
        text: this.lang.Trade,
        requrieLogin: true,
        children: [],
      },
      {
        routerLink: Constants.Instance.RoutePaths.Funding,
        icon: '/assets/images/exchange-icon.png',
        alt: this.lang.Funding,
        text: this.lang.Funding,
        requrieLogin: true,
        children: [],
      },
      {
        routerLink: Constants.Instance.RoutePaths.Home,
        icon: '/assets/images/seller-icon.png',
        alt: this.lang.Charts,
        text: this.lang.Charts,
        requrieLogin: false,
        children: [],
      },
      {
        routerLink: '#',
        icon: '/assets/images/exchange-icon.png',
        alt: this.lang.Blockchain,
        text: this.lang.Blockchain,
        requrieLogin: false,
        children: [
          {
            routerLink: Constants.Instance.RoutePaths.Home,
            text: this.lang.Travel,
          }, {
            routerLink: Constants.Instance.RoutePaths.Home,
            text: this.lang.RealEstate,
          }
        ],
      },
      {
        routerLink: Constants.Instance.RoutePaths.Home,
        icon: '/assets/images/wallet-icon1.png',
        alt: this.lang.Wallet,
        text: this.lang.Wallet,
        requrieLogin: true,
        children: [],
      },
      {
        routerLink: null,
        href: Constants.Instance.RoutePaths.Consulting,
        icon: '/assets/images/consult.png',
        alt: this.lang.Consulting,
        text: this.lang.Consulting,
        requrieLogin: false,
        children: [],
      },
      {
        routerLink: '#',
        icon: '/assets/images/faq-icon.png',
        alt: this.lang.Help,
        text: this.lang.Help,
        requrieLogin: false,
        children: [
          {
            routerLink: Constants.Instance.RoutePaths.Home,
            text: this.lang.FAQ,
          },
          {
            routerLink: Constants.Instance.RoutePaths.Home,
            text: this.lang.AboutUs,
          },
          {
            routerLink: Constants.Instance.RoutePaths.ContactUs,
            text: this.lang.ContactUs,
          },
        ],
      },
    ];

    for (let i = 0; i < this.routerLinks.length; i++) {
      this.routerLinks[i].class = this.getClasses(this.routerLinks[i]);
    }
  }

  logout = (e) => {
    this.showMainSpinner();
    this.http.get<mdCallResponse>(Constants.Instance.EndPoints.GetLogout).then((res: mdCallResponse) => {
      window.location.href = Constants.Instance.RoutePaths.Home;
    }).catch(error => {
      this.log.info(error);
      window.location.href = Constants.Instance.RoutePaths.Home;
    });
  }

}