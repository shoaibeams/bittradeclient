import React, { Component } from "react";
import {
  Button,
  Dropdown,
  Icon,
  Layout,
  Menu,
  message,
  Popover,
  Row
} from "antd";
import { connect } from "react-redux";

import UserInfo from "../../../components/UserInfo";
import AppNotification from "../../../components/AppNotification";
import HorizontalNav from "../HorizontalNav";
import { Link } from "react-router-dom";
import {
  switchLanguage,
  toggleCollapsedSideNav
} from "../../../appRedux/actions/Setting";
import { BaseComponent } from "../../../app/components/base/BaseComponent";
import LanguageMenu from "../LanguageMenu";
import { mdCurrencyPair } from "../../../models/currency-pair";
import { mdCurrency } from "../../../models/currency";
import { StaticHelper } from "../../../shared/static-helper";
import moment from "moment";
import Logo from "./Logo";

const { Header } = Layout;

const menu = (
  <Menu onClick={handleMenuClick}>
    <Menu.Item key="1">Products</Menu.Item>
    <Menu.Item key="2">Apps</Menu.Item>
    <Menu.Item key="3">Blogs</Menu.Item>
  </Menu>
);

function handleMenuClick(e) {
  message.info("Click on menu item.");
}

class InsideHeader extends BaseComponent {
  state = {
    searchText: "",
    currentSession: 0
  };
  headerDiv;
  currentSessionTimer;

  componentDidMount = () => {
    this.isComponentMounted = true;
    window.addEventListener("resize", this.updateHeaderHeight);

    //this timer is for updating state for current session timer
    this.currentSessionTimer = setInterval(_ => {
      this.updateState({ currentSession: ++this.state.currentSession });
    }, 50);
  };

  componentUnMount() {
    window.removeEventListener("resize", this.updateHeaderHeight);
    clearInterval(this.currentSessionTimer);
  }

  updateHeaderHeight = () => {
    if (this.headerDiv != null)
      this.props.updateGlobalProperty(
        global.propKeys.headerHeight,
        this.headerDiv.clientHeight
      );
  };

  updateSearchChatUser = evt => {
    this.setState({
      searchText: evt.target.value
    });
  };

  currentSession = () => {
    let currentSession = "";
    if (this.g.sessionStartedOn) {
      let seconds = moment().diff(moment(this.g.sessionStartedOn), "seconds");
      // let duration = moment.duration(seconds, "seconds");
      // currentSession =
      //   duration.hours() + ":" + duration.minutes() + ":" + duration.seconds(); // StaticHelper.toTimehhmmss(duration);
      let hours = Math.floor(seconds / 3600);
      seconds %= 3600;
      let minutes = Math.floor(seconds / 60);
      seconds = seconds % 60;
      if (hours < 10) {
        hours = ("0" + hours) as any;
      }
      if (minutes < 10) {
        minutes = ("0" + minutes) as any;
      }
      if (seconds < 10) {
        seconds = ("0" + seconds) as any;
      }
      currentSession = hours + ":" + minutes + ":" + seconds;
    }
    return (
      <div className="gx-text-right">
        <span>{this.lang.CurrentTime}:</span>&nbsp;
        {StaticHelper.toTimehhmmss(moment().toDate())}
        <span className="gx-ml-3">{this.lang.CurrentSession}:</span>&nbsp;
        {currentSession}
      </div>
    );
  };

  topBarContent = () => {
    let cp = this.g.selectedCurrencyPair as mdCurrencyPair;
    if (!cp) {
      return null;
    }
    let currencies = this.g.currencies as mdCurrency[];
    if (!currencies) {
      return null;
    }
    let fc = currencies.filter(m => m.name == cp.fc_name)[0];
    let tc = currencies.filter(m => m.name == cp.tc_name)[0];
    if (!fc || !tc) {
      return null;
    }
    let fcBalance = StaticHelper.subtract(fc.balance - fc.hold_balance);
    fcBalance = fcBalance > 0 ? StaticHelper.unfloatAmount(fcBalance) : 0;
    let tcBalance = StaticHelper.subtract(tc.balance - tc.hold_balance);
    tcBalance = tcBalance > 0 ? StaticHelper.unfloatAmount(tcBalance) : 0;
    return (
      <div style={{ width: "100%", color: "white" }}>
        {/* <div className="gx-text-center" >
        </div> */}
        <div className="gx-text-right">
          <span>{this.lang.Balance}</span>&nbsp;
          <span>{tc.name}:</span>&nbsp;
          {tc.symbol + tcBalance.toFixed(tc.scale)}
          <span className="gx-ml-3">{fc.name}:</span>&nbsp;
          {fc.symbol + fcBalance.toFixed(fc.scale)}
          <span className="gx-ml-3">{this.lang.LastLogon}:</span>&nbsp;
          {StaticHelper.longDateFormat(this.g.lastLogon)}
        </div>
        {this.currentSession()}
      </div>
    );
  };

  render() {
    const { locale, navCollapsed } = this.props as any;
    let lmnu = LanguageMenu(this.props);
    return (
      <div
        className="gx-header-horizontal gx-header-horizontal-dark gx-inside-header-horizontal"
        ref={element => {
          this.headerDiv = element;
        }}
      >
        {this.g.isLoggedIn ? (
          <div className="gx-header-horizontal-top">
            <div className="gx-container">
              <div className="gx-header-horizontal-top-flex">
                {this.topBarContent()}
                {/* <p className="gx-mb-0 gx-text-truncate">
                
                </p> */}
              </div>
            </div>
          </div>
        ) : null}

        {/* ---------------LOGO AND TITLE------------------*/}
        <Header className="gx-header-horizontal-main">
          <div className="gx-container">
            <div className="gx-header-horizontal-main-flex">
              <div className="gx-d-block gx-d-lg-none gx-linebar gx-mr-xs-3 6e">
                <i
                  className="gx-icon-btn icon icon-menu"
                  onClick={() => {
                    this.props.toggleCollapsedSideNav(!navCollapsed);
                  }}
                />
              </div>
              <Link
                to={this.getLink(this.constants.RoutePaths.Home)}
                className="gx-d-block gx-d-lg-none gx-pointer gx-mr-xs-3 gx-pt-xs-1 gx-w-logo"
              >
                <img alt="" src={"/assets/images/goto.png"} />
              </Link>
              <Link to={this.getLink(this.constants.RoutePaths.Home)}>
                <Logo />
              </Link>

              {/*-------------HORIZONTAL NAVIGATION OF HEADER-----------------*/}
              <div className="gx-header-horizontal-nav gx-header-horizontal-nav-curve gx-d-none gx-d-lg-block">
                <HorizontalNav {...this.props} />
              </div>
              <ul className="gx-header-notifications gx-ml-auto">
                {/* <li className="gx-notify gx-notify-search">
                  <Popover overlayClassName="gx-popover-horizantal"
                    placement="bottomRight" content={
                      <div className="gx-d-flex"><Dropdown overlay={menu}>
                        <Button>
                          Category <Icon type="down" />
                        </Button>
                      </Dropdown>
                        <SearchBox styleName="gx-popover-search-bar"
                          placeholder="Search in app..."
                          onChange={this.updateSearchChatUser.bind(this)}
                          value={this.state.searchText} /></div>
                    } trigger="click">

                    <span className="gx-pointer gx-d-block"><i className="icon icon-search-new" /></span>

                  </Popover>
                </li> */}

                {/* <li className="gx-msg">
                  <Popover overlayClassName="gx-popover-horizantal" placement="bottomRight"
                    content={<MailNotification />} trigger="click">
                    <span className="gx-pointer gx-status-pos gx-d-block">
                      <i className="icon icon-chat-new" />
                      <span className="gx-status gx-status-rtl gx-small gx-orange" />
                    </span>
                  </Popover>
                </li> */}

                <li className="gx-user-nav">
                  {this.g.isLoggedIn ? (
                    <ul className="gx-login-list" style={{ paddingLeft: 0 }}>
                      <li><UserInfo {...this.props} /></li>
                      <li className="gx-notify">
                        <Popover
                          overlayClassName="gx-popover-horizantal"
                          placement="bottomRight"
                          content={<AppNotification />}
                          trigger="click"
                        >
                          <span className="gx-pointer gx-d-block">
                            <i className="icon icon-notification" />
                          </span>
                        </Popover>
                      </li>
                    </ul>
                  ) : (
                    <ul className="gx-login-list" style={{ paddingLeft: 0 }}>
                      <li className="login">
                        <Link
                          to={this.getLink(this.constants.RoutePaths.Login)}
                        >
                          {this.lang.Login}
                        </Link>
                      </li>
                      <li className="gx-login-list signup-btn">
                        <Link
                          to={this.getLink(this.constants.RoutePaths.SignUp)}
                        >
                          <Button style={{ marginTop: "10px", color: "white" }}>
                            {this.lang.SignUp}
                          </Button>
                        </Link>
                      </li>

                      {/*------------NOTIFICATION RING BELL AND LANGUAGE FLAG----------*/}
                      <li className="gx-notify">
                        <Popover
                          overlayClassName="gx-popover-horizantal"
                          placement="bottomRight"
                          content={<AppNotification />}
                          trigger="click"
                        >
                          <span className="gx-pointer gx-d-block">
                            <i className="icon icon-notification" />
                          </span>
                        </Popover>
                      </li>
                      <li className="gx-language">
                        <Popover
                          overlayClassName="gx-popover-horizantal"
                          placement="bottomRight"
                          content={lmnu.menu}
                          trigger="click"
                        >
                          <span className="gx-pointer gx-flex-row gx-align-items-center">
                            <i
                              className={`flag flag-24 flag-${
                                lmnu.current.icon
                              }`}
                            />
                          </span>
                        </Popover>
                      </li>
                    </ul>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </Header>
      </div>
    );
  }
}

const mapStateToProps = ({ settings }) => {
  const { locale, navCollapsed } = settings;
  return { locale, navCollapsed };
};
export default connect(
  mapStateToProps,
  { toggleCollapsedSideNav, switchLanguage }
)(InsideHeader);
