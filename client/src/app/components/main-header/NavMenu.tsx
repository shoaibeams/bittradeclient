import React from "react";
import { connect } from "react-redux";
import { Constants } from "../../../shared/constants";
import { mdProps } from "../../../models/props";
import { BaseComponent } from "../base/BaseComponent";
import { mdCallResponse } from "../../../models/call-response";
import { Menu } from "antd";
import {
  NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR,
  NAV_STYLE_NO_HEADER_MINI_SIDEBAR,
  THEME_TYPE_LITE,
  NAV_STYLE_ABOVE_HEADER,
  NAV_STYLE_BELOW_HEADER,
  NAV_STYLE_DEFAULT_HORIZONTAL,
  NAV_STYLE_INSIDE_HEADER_HORIZONTAL
} from "../../../constants/ThemeSetting";
import { NavMenuTypes } from "../../../enums/general";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class NavMenuComponent extends BaseComponent {
  render() {
    const { pathname, navStyle, themeType } = this.props as any;
    const selectedKeys = pathname.substr(1);
    const defaultOpenKeys = selectedKeys.split("/")[1];
    let navMenuType = this.p.navMenuType as NavMenuTypes;
    let theme = (themeType === THEME_TYPE_LITE ? "lite" : "dark") as any;
    if (navMenuType == NavMenuTypes.Topbar) {
      theme = null;
    }
    let navLinks = this.getNavBarLinks();
    return (
      <Menu
        defaultOpenKeys={[defaultOpenKeys]}
        selectedKeys={[selectedKeys]}
        theme={theme}
        mode={navMenuType == NavMenuTypes.Topbar ? "horizontal" : "inline"}
      >
        {navLinks.map(l => {
          return this.getMenuItem(navMenuType, navStyle, l, true);
        })}
      </Menu>
    );
  }

  routerLinks: any[];
  currentPath: string;
  constructor(props: mdProps) {
    super(props);
    this.getNavBarLinks();
  }

  FirstContainer = (navMenuType: NavMenuTypes, navStyle, item, children) => {
    if (navMenuType == NavMenuTypes.Topbar) {
      let titleInner = () => (
        <>
          <img width="40" height="34" src={item.icon} />
          <br />
          {item.text}
        </>
      );
      return (
        <SubMenu
          className={`${this.getNavStyleSubMenuClass(
            navMenuType,
            navStyle
          )} gx-text-center color-white`}
          key={item.name}
          title={this.linkOrA(
            item.href,
            item.routerLink,
            titleInner(),
            item.newTab
          )}
          style={{ lineHeight: "36px" }}
        >
          {children}
        </SubMenu>
      );
    } else {
      let titleInner = () => (
        <div>
          {item.children.length < 1 ? (
            <img
              width="17"
              height="17"
              src={item.icon}
              style={{ marginRight: 20 }}
            />
          ) : null}
          {item.text}
        </div>
      );
      return item.children.length > 0 ? (
        <SubMenu
          className={`${this.getNavStyleSubMenuClass(navMenuType, navStyle)}`}
          key={item.name}
          title={this.linkOrA(
            item.href,
            item.routerLink,
            titleInner(),
            item.newTab
          )}
          style={{ lineHeight: "36px" }}
        >
          {children}
        </SubMenu>
      ) : (
        // <MenuItemGroup key={item.name} className="gx-menu-group"
        //   title={this.linkOrA(item.href, item.routerLink, item.text)}>
        //   {
        //     children
        //   }
        // </MenuItemGroup>
        <Menu.Item className="gx-text-left" key={item.name}>
          {this.linkOrA(item.href, item.routerLink, titleInner(), item.newTab)}
        </Menu.Item>
      );
    }
  };

  getMenuItem = (
    navMenuType: NavMenuTypes,
    navStyle,
    item,
    first: boolean = false
  ) => {
    if (!this.g.isLoggedIn && item.requireLogin) {
      return null;
    }

    let children = () => {
      return item.children.map(c => {
        return this.getMenuItem(navMenuType, navStyle, c);
      });
    };
    if (first) {
      return this.FirstContainer(navMenuType, navStyle, item, children());
    }

    //now handle children
    if (item.children.length < 1) {
      let titleInner = () => {
        return (
          <>
            <span
              style={
                item.text === this.lang.ContactUs
                  ? { marginRight: 10 }
                  : { marginRight: 21 }
              }
            >
              <FontAwesomeIcon icon={item.icon} />
            </span>
            {item.text}
          </>
        );
      };
      return (
        <Menu.Item className="gx-text-left" key={item.name}>
          {this.linkOrA(item.href, item.routerLink, titleInner(), item.newTab)}
        </Menu.Item>
      );
    }
    // else {
    //   return (
    //     <SubMenu className="gx-menu-horizontal" key="dashboard"
    //       title={<span>{this.faicon(item.icon)}{item.text}</span>}>
    //     </SubMenu>);
    // }
  };

  getNavStyleSubMenuClass = (navMenuType = NavMenuTypes.Topbar, navStyle) => {
    switch (navStyle) {
      case NAV_STYLE_DEFAULT_HORIZONTAL:
        return "gx-menu-horizontal gx-submenu-popup-curve";
      case NAV_STYLE_INSIDE_HEADER_HORIZONTAL:
        return "gx-menu-horizontal gx-submenu-popup-curve gx-inside-submenu-popup-curve";
      case NAV_STYLE_BELOW_HEADER:
        return "gx-menu-horizontal gx-submenu-popup-curve gx-below-submenu-popup-curve";
      case NAV_STYLE_ABOVE_HEADER:
        return "gx-menu-horizontal gx-submenu-popup-curve gx-above-submenu-popup-curve";
      case NAV_STYLE_NO_HEADER_MINI_SIDEBAR:
        return "gx-no-header-submenu-popup";
      default:
        if (navMenuType == NavMenuTypes.Topbar) {
          return "gx-menu-horizontal";
        } else {
          return "";
        }
    }
  };

  getClasses(link) {
    let classes = "";
    if (link.children.length > 0) {
      classes += " dropdown";
      if (link.children.indexOf(this.currentPath) > -1) {
        classes += " active";
      }
    } else if (
      (this.currentPath == link.routerLink && this.currentPath != "") ||
      (this.lang.Home == link.text && this.currentPath == "")
    ) {
      classes += "active";
    }
    return classes;
  }

  navChildClicked(index) {
    for (let i = 0; i < this.routerLinks.length; i++) {
      this.routerLinks[i].class = this.routerLinks[i].class.replace(
        "active",
        ""
      );
    }
    if (index >= 0) {
      this.routerLinks[index].class += " active";
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
      this.routerLinks[i].class = this.routerLinks[i].class.replace(
        "active",
        ""
      );
    }
    if (index >= 0) {
      this.routerLinks[index].class += " active";
    }
  }

  getNavBarLinks() {
    let home = {
      name: "home",
      routerLink: this.isNullOrEmpty(Constants.Instance.RoutePaths.Home)
        ? "/"
        : Constants.Instance.RoutePaths.Home,
      icon: "/assets/images/home-icon.png",
      alt: this.lang.Home,
      text: this.lang.Home,
      requireLogin: false,
      children: []
    };
    let exchange = {
      name: "exchange",
      routerLink: Constants.Instance.RoutePaths.Trade,
      icon: "/assets/images/exchange-icon.png",
      alt: this.lang.Exchange,
      text: this.lang.Exchange,
      requireLogin: true,
      children: []
    };
    // let exchange = {
    //   name: "exchange",
    //   icon: "/assets/images/exchange-icon.png",
    //   alt: this.lang.Exchange,
    //   text: this.lang.Exchange,
    //   requireLogin: true,
    //   children: [
    //     {
    //       name: Constants.Instance.RoutePaths.Trade.substr(1),
    //       routerLink: Constants.Instance.RoutePaths.Trade,
    //       icon: "money-bill-wave",
    //       alt: this.lang.Trade,
    //       text: this.lang.Trade,
    //       requireLogin: true,
    //       children: []
    //     }
    //   ]
    // };
    let funding = {
      name: "funding",
      icon: "/assets/images/funds.png",
      alt: this.lang.Funding,
      text: this.lang.Funding,
      requireLogin: true,
      children: [
        {
          name: Constants.Instance.RoutePaths.FundingDeposit.substr(1),
          routerLink: Constants.Instance.RoutePaths.FundingDeposit,
          icon: "angle-double-up",
          alt: this.lang.Deposit,
          text: this.lang.Deposit,
          requireLogin: true,
          children: []
        },
        {
          name: Constants.Instance.RoutePaths.FundingWithdrawal.substr(1),
          routerLink: Constants.Instance.RoutePaths.FundingWithdrawal,
          icon: "angle-double-down",
          alt: this.lang.Withdrawal,
          text: this.lang.Withdrawal,
          requireLogin: true,
          children: []
        }
      ]
    };
    let blockchain = {
      name: "blockchain",
      icon: "/assets/images/blockchain.png",
      alt: this.lang.Blockchain,
      text: this.lang.Blockchain,
      requireLogin: false,
      children: [
        {
          name: "blockchain/travel",
          routerLink: "/blockchain/travel",
          icon: "walking",
          alt: this.lang.Travel,
          text: this.lang.Travel,
          requireLogin: false,
          children: []
        },
        {
          name: "blockchain/realEstate",
          routerLink: "/blockchain/realEstate",
          icon: "building",
          alt: this.lang.RealEstate,
          text: this.lang.RealEstate,
          requireLogin: false,
          children: []
        }
      ]
    };
    // let wallet = {
    //   routerLink: Constants.Instance.RoutePaths.Home,
    //   icon: '/assets/images/wallet-icon1.png',
    //   alt: this.lang.Wallet,
    //   text: this.lang.Wallet,
    //   requireLogin: true,
    //   children: [],
    // }
    let STO = {
      name: "sto",
      routerLink: Constants.Instance.RoutePaths.STO,
      icon: "/assets/images/casino-chip.svg",
      alt: this.lang.STO,
      text: this.lang.STO,
      requireLogin: false,
      children: []
    };
    let consulting = {
      name: "consulting",
      routerLink: null,
      href: Constants.Instance.RoutePaths.Consulting,
      newTab: true,
      icon: "/assets/images/consult.png",
      alt: this.lang.Consulting,
      text: this.lang.Consulting,
      requireLogin: false,
      children: []
    };
    let help = {
      name: "help",
      icon: "/assets/images/faq-icon.png",
      alt: this.lang.Help,
      text: this.lang.Help,
      requireLogin: false,
      children: [
        {
          name: "help/faq",
          routerLink: Constants.Instance.RoutePaths.FAQ,
          icon: "question",
          alt: this.lang.FAQ,
          text: this.lang.FAQ,
          requireLogin: false,
          children: []
        },
        {
          name: "help/aboutUs",
          routerLink: Constants.Instance.RoutePaths.AboutUs,
          icon: "info",
          alt: this.lang.AboutUs,
          text: this.lang.AboutUs,
          requireLogin: false,
          children: []
        },
        {
          name: Constants.Instance.RoutePaths.ContactUs.substr(1),
          routerLink: Constants.Instance.RoutePaths.ContactUs,
          icon: "file-signature",
          alt: this.lang.ContactUs,
          text: this.lang.ContactUs,
          requireLogin: false,
          children: []
        }
      ]
    };
    let navItems = [];
    if (!this.g.isLoggedIn) {
      navItems.push(home);
    }
    return [...navItems, exchange, funding, blockchain, STO, consulting, help];
    // if(this.g.isLoggedIn)
    // {
    //   return [trade, charts, funding, help];
    // }
    // else
    // {
    //   return [home, charts, blockchain, consulting, help];
    // }
  }

  logout = e => {
    this.showMainSpinner();
    this.http
      .get<mdCallResponse>(Constants.Instance.EndPoints.GetLogout)
      .then((res: mdCallResponse) => {
        window.location.href = Constants.Instance.RoutePaths.Home;
      })
      .catch(error => {
        this.log.info(error);
        window.location.href = Constants.Instance.RoutePaths.Home;
      });
  };
}
const mapStateToProps = ({ settings }) => {
  const { themeType, navStyle, pathname, locale } = settings;
  return { themeType, navStyle, pathname, locale };
};
export default connect(mapStateToProps)(NavMenuComponent);
