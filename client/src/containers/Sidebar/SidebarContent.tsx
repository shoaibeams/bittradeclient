import React, { Component } from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";

import CustomScrollbars from "../../util/CustomScrollbars";
import SidebarLogo from "./SidebarLogo";

import Auxiliary from "../../util/Auxiliary";
import UserProfile from "./UserProfile";
import AppsNavigation from "./AppsNavigation";
import {
  NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR,
  NAV_STYLE_NO_HEADER_MINI_SIDEBAR,
  THEME_TYPE_LITE
} from "../../constants/ThemeSetting";
// import IntlMessages from "../../util/IntlMessages";
import { connect } from "react-redux";
import { BaseComponent } from "../../app/components/base/BaseComponent";
import NavMenuComponent from "../../app/components/main-header/NavMenu";
import { NavMenuTypes } from "../../enums/general";

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;


class SidebarContent extends BaseComponent {

  getNoHeaderClass = (navStyle) => {
    if (navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR || navStyle === NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR) {
      return "gx-no-header-notifications";
    }
    return "";
  };
  getNavStyleSubMenuClass = (navStyle) => {
    if (navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR) {
      return "gx-no-header-submenu-popup";
    }
    return "";
  };

  render() {
    const { themeType, navStyle, pathname } = this.props as any;
    const selectedKeys = pathname.substr(1);
    const defaultOpenKeys = selectedKeys.split('/')[1];
    return (
      <Auxiliary>
        <SidebarLogo />
        <div className="gx-sidebar-content">
          <div className={`gx-sidebar-notifications ${this.getNoHeaderClass(navStyle)}`}>
            <UserProfile {...this.props} />
            <AppsNavigation />
          </div>
          <CustomScrollbars className="gx-layout-sider-scrollbar">
            <NavMenuComponent {...this.props} params={{ navMenuType: NavMenuTypes.Sidebar }} />
            {/* <Menu
              defaultOpenKeys={[defaultOpenKeys]}
              selectedKeys={[selectedKeys]}
              theme={(themeType === THEME_TYPE_LITE ? 'lite' : 'dark') as any}
              mode="inline">

              <MenuItemGroup key={"exchange"} className="gx-menu-group" title={this.lang.Exchange}>

                <Menu.Item key={"exchange/trade"}>
                  <Link to={this.getLink(this.constants.RoutePaths.Trade)}>
                    <span style={{ marginRight: '20px' }}>{this.faicon("money-bill-wave")}</span>
                    {this.lang.Trade}
                  </Link>
                </Menu.Item>

              </MenuItemGroup>

              <MenuItemGroup key={"funding"} className="gx-menu-group" title={this.lang.Funding}>

                <Menu.Item key={"funding/deposit"}>
                  <Link to={this.getLink(this.constants.RoutePaths.FundingDeposit)}>
                    <span style={{ marginRight: '20px' }}>{this.faicon("angle-double-up")}</span>
                    {this.lang.Deposit}
                  </Link>
                </Menu.Item>

                <Menu.Item key={"funding/withdrawl"}>
                  <Link to={this.getLink(this.constants.RoutePaths.FundingWithdrawl)}>
                    <span style={{ marginRight: '20px' }}>{this.faicon("angle-double-down")}</span>
                    {this.lang.Withdrawl}
                  </Link>
                </Menu.Item>

              </MenuItemGroup>

            </Menu>
           */}
          </CustomScrollbars>
        </div>
      </Auxiliary>
    );
  }
}

const mapStateToProps = ({ settings }) => {
  const { navStyle, themeType, locale, pathname } = settings;
  return { navStyle, themeType, locale, pathname }
};
export default connect(mapStateToProps)(SidebarContent);

