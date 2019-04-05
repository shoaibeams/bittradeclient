import React, {Component} from "react";
import {connect} from "react-redux";
import {Drawer, Layout} from "antd";

import SidebarContent from "./SidebarContent";
import {toggleCollapsedSideNav} from "../../appRedux/actions/Setting";
import {
  NAV_STYLE_DRAWER,
  NAV_STYLE_FIXED,
  NAV_STYLE_MINI_SIDEBAR,
  NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR,
  NAV_STYLE_NO_HEADER_MINI_SIDEBAR,
  TAB_SIZE,
  THEME_TYPE_LITE
} from "../../constants/ThemeSetting";
import { BaseComponent } from "../../app/components/base/BaseComponent";

const {Sider} = Layout;

export class Sidebar extends BaseComponent {

  onToggleCollapsedNav = () => {
    this.props.toggleCollapsedSideNav(!(this.props as any).navCollapsed);
  };
  
  render() {
    const {themeType, navCollapsed, width, navStyle} = this.props as any;

    let drawerStyle = "gx-collapsed-sidebar";

    if (navStyle === NAV_STYLE_FIXED) {
      drawerStyle = "";
    } else if (navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR) {
      drawerStyle = "gx-mini-sidebar gx-mini-custom-sidebar";
    } else if (navStyle === NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR) {
      drawerStyle = "gx-custom-sidebar"
    } else if (navStyle === NAV_STYLE_MINI_SIDEBAR) {
      drawerStyle = "gx-mini-sidebar";
    } else if (navStyle === NAV_STYLE_DRAWER) {
      drawerStyle = "gx-collapsed-sidebar"
    }
    if ((navStyle === NAV_STYLE_FIXED || navStyle === NAV_STYLE_MINI_SIDEBAR
        || navStyle === NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR) && width < TAB_SIZE) {
      drawerStyle = "gx-collapsed-sidebar"
    }
    return (
      <Sider
        className={`gx-app-sidebar ${drawerStyle} ${themeType !== THEME_TYPE_LITE ? 'gx-layout-sider-dark' : null}`}
        trigger={null}
        collapsed={(width < TAB_SIZE ? false : navStyle === NAV_STYLE_MINI_SIDEBAR || navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR)}
        theme={(themeType === THEME_TYPE_LITE ? "lite" : "dark") as any}
        collapsible>
        {
          navStyle === NAV_STYLE_DRAWER || width < TAB_SIZE ?
            <Drawer
              wrapClassName={`gx-drawer-sidebar ${themeType !== THEME_TYPE_LITE ? 'gx-drawer-sidebar-dark' : null}`}
              placement="left"
              closable={false}
              onClose={this.onToggleCollapsedNav.bind(this)}
              visible={navCollapsed}>
              <SidebarContent {...this.props}/>
            </Drawer> :
            <SidebarContent {...this.props}/>
        }
      </Sider>)
  }
}

const mapStateToProps = ({settings}) => {
  const {themeType, navStyle, navCollapsed, width, locale} = settings;
  return {themeType, navStyle, navCollapsed, width, locale}
};
export default connect(mapStateToProps, {toggleCollapsedSideNav})(Sidebar);
