import React, { Component } from "react";
import { connect } from "react-redux";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import {
  NAV_STYLE_ABOVE_HEADER,
  NAV_STYLE_BELOW_HEADER,
  NAV_STYLE_DEFAULT_HORIZONTAL,
  NAV_STYLE_INSIDE_HEADER_HORIZONTAL
} from "../../constants/ThemeSetting";
import { BaseComponent } from "../../app/components/base/BaseComponent";
import NavMenuComponent from "../../app/components/main-header/NavMenu";
import { NavMenuTypes } from "../../enums/general";


const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class HorizontalNav extends BaseComponent {

  getNavStyleSubMenuClass = (navStyle) => {
    switch (navStyle) {
      case NAV_STYLE_DEFAULT_HORIZONTAL:
        return "gx-menu-horizontal gx-submenu-popup-curve";
      case NAV_STYLE_INSIDE_HEADER_HORIZONTAL:
        return "gx-menu-horizontal gx-submenu-popup-curve gx-inside-submenu-popup-curve";
      case NAV_STYLE_BELOW_HEADER:
        return "gx-menu-horizontal gx-submenu-popup-curve gx-below-submenu-popup-curve";
      case NAV_STYLE_ABOVE_HEADER:
        return "gx-menu-horizontal gx-submenu-popup-curve gx-above-submenu-popup-curve";
      default:
        return "gx-menu-horizontal";

    }
  };

  render() {
    const { pathname, navStyle } = this.props as any;
    const selectedKeys = pathname.substr(1);
    const defaultOpenKeys = selectedKeys.split('/')[1];
    return (
      <NavMenuComponent {...this.props} params={{navMenuType: NavMenuTypes.Topbar}} />
      // <Menu
      //   defaultOpenKeys={[defaultOpenKeys]}
      //   selectedKeys={[selectedKeys]}
      //   mode="horizontal">

      //   <SubMenu className={`${this.getNavStyleSubMenuClass(navStyle)} gx-text-center`} key="exchange"
      //     title={
      //       <>
      //       <Link to={this.getLink(this.constants.RoutePaths.Trade)}>
      //         <img width="40" height="34" src="/assets/images/home-icon.png" />
      //         <br />
      //         {this.lang.Exchange}
      //       </Link>
      //       </>
      //     }
      //     style={{lineHeight:'36px'}}
      //     // title={this.lang.Exchange}
      //      >

      //     {/* <Menu.Item key={"exchange/trade"}>
      //       <Link to={this.getLink(this.constants.RoutePaths.Trade)}>
      //         <span style={{ marginRight: '20px' }}>{this.faicon("money-bill-wave")}</span>
      //         {this.lang.Trade}
      //       </Link>
      //     </Menu.Item> */}

      //   </SubMenu>

      //   <SubMenu className={this.getNavStyleSubMenuClass(navStyle)} key="funding"
      //     title={this.lang.Funding}>

      //     <Menu.Item key={"funding/deposit"}>
      //       <Link to={this.getLink(this.constants.RoutePaths.FundingDeposit)}>
      //         <span style={{ marginRight: '20px' }}>{this.faicon("angle-double-up")}</span>
      //         {this.lang.Deposit}
      //       </Link>
      //     </Menu.Item>

      //     <Menu.Item key={"funding/withdrawl"}>
      //       <Link to={this.getLink(this.constants.RoutePaths.FundingWithdrawl)}>
      //         <span style={{ marginRight: '20px' }}>{this.faicon("angle-double-down")}</span>
      //         {this.lang.Withdrawl}
      //       </Link>
      //     </Menu.Item>

      //   </SubMenu>

      // </Menu>

    );
  }
}

const mapStateToProps = ({ settings }) => {
  const { themeType, navStyle, pathname, locale } = settings;
  return { themeType, navStyle, pathname, locale }
};
export default connect(mapStateToProps)(HorizontalNav);

