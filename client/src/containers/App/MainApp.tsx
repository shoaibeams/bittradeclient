import React, { Component } from "react";
import { Layout } from "antd";

import Sidebar from "../Sidebar/index";
import HorizontalDefault from "../Topbar/HorizontalDefault/index";
import HorizontalDark from "../Topbar/HorizontalDark/index";
import InsideHeader from "../Topbar/InsideHeader/index";
import AboveHeader from "../Topbar/AboveHeader/index";
import BelowHeader from "../Topbar/BelowHeader/index";

import Topbar from "../Topbar/index";
import { ThemeImplementedRoutes } from "../../routes/index";
import Customizer from "../Customizer";
import { connect } from "react-redux";
import {
  NAV_STYLE_ABOVE_HEADER,
  NAV_STYLE_BELOW_HEADER,
  NAV_STYLE_DARK_HORIZONTAL,
  NAV_STYLE_DEFAULT_HORIZONTAL,
  NAV_STYLE_DRAWER,
  NAV_STYLE_FIXED,
  NAV_STYLE_INSIDE_HEADER_HORIZONTAL,
  NAV_STYLE_MINI_SIDEBAR,
  NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR,
  NAV_STYLE_NO_HEADER_MINI_SIDEBAR,
  TAB_SIZE
} from "../../constants/ThemeSetting";
import NoHeaderNotification from "../Topbar/NoHeaderNotification/index";
import { BaseComponent } from "../../app/components/base/BaseComponent";
import { Redirect } from "react-router";
import MainFooter from "../../app/components/main-footer/MainFooterHTML";
import MessageBox from "../../app/components/message-box/MessageBox";

const { Content, Footer } = Layout;

export class MainApp extends BaseComponent {
  constructor(props) {
    super(props);
  }
  getContainerClass = navStyle => {
    switch (navStyle) {
      case NAV_STYLE_DARK_HORIZONTAL:
        return "gx-container-wrap";
      case NAV_STYLE_DEFAULT_HORIZONTAL:
        return "gx-container-wrap";
      case NAV_STYLE_INSIDE_HEADER_HORIZONTAL:
        return "gx-container-wrap";
      case NAV_STYLE_BELOW_HEADER:
        return "gx-container-wrap";
      case NAV_STYLE_ABOVE_HEADER:
        return "gx-container-wrap";
      default:
        return "";
    }
  };
  getNavStyles = navStyle => {
    switch (navStyle) {
      case NAV_STYLE_DEFAULT_HORIZONTAL:
        return <HorizontalDefault {...this.props} />;
      case NAV_STYLE_DARK_HORIZONTAL:
        return <HorizontalDark {...this.props} />;
      case NAV_STYLE_INSIDE_HEADER_HORIZONTAL:
        return <InsideHeader {...this.props} />;
      case NAV_STYLE_ABOVE_HEADER:
        return <AboveHeader {...this.props} />;
      case NAV_STYLE_BELOW_HEADER:
        return <BelowHeader {...this.props} />;
      case NAV_STYLE_FIXED:
        return <Topbar {...this.props} />;
      case NAV_STYLE_DRAWER:
        return <Topbar {...this.props} />;
      case NAV_STYLE_MINI_SIDEBAR:
        return <Topbar {...this.props} />;
      case NAV_STYLE_NO_HEADER_MINI_SIDEBAR:
        return <NoHeaderNotification {...this.props} />;
      case NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR:
        return <NoHeaderNotification {...this.props} />;
      default:
        return null;
    }
  };

  getSidebar = (navStyle, width) => {
    if (width < TAB_SIZE) {
      return <Sidebar {...this.props} />;
    }
    switch (navStyle) {
      case NAV_STYLE_FIXED:
        return <Sidebar {...this.props} />;
      case NAV_STYLE_DRAWER:
        return <Sidebar {...this.props} />;
      case NAV_STYLE_MINI_SIDEBAR:
        return <Sidebar {...this.props} />;
      case NAV_STYLE_NO_HEADER_MINI_SIDEBAR:
        return <Sidebar {...this.props} />;
      case NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR:
        return <Sidebar {...this.props} />;
      default:
        return null;
    }
  };

  render() {
    this.initShorts();
    if (!this.g.isLoggedIn) {
      // return (<Redirect to={`${this.props.match.url}${this.constants.RoutePaths.Login}`} />);
    }
    const { match, width, navStyle } = this.props as any;
    let footerText = "Copyright " + this.lang.SiteCompanyName + " © 2019";

    return (
      <Layout className="gx-app-layout">
        {this.getSidebar(navStyle, width)}
        <Layout>
          {this.getNavStyles(navStyle)}
          <Content
            className={`gx-layout-content ${this.getContainerClass(navStyle)} `}
          >
            <ThemeImplementedRoutes {...this.props} />
            {this.g.isLoggedIn ? <MessageBox {...this.props} /> : null}
            <MainFooter {...this.props} />
            {/* <Footer>
              <div className="gx-layout-footer-content">
                {footerText}
              </div> 
            </Footer>*/}
          </Content>
        </Layout>
        {/* <Customizer /> */}
      </Layout>
    );
  }
}

const mapStateToProps = ({ settings }) => {
  const { width, navStyle } = settings;
  return { width, navStyle };
};
export default connect(mapStateToProps)(MainApp);
