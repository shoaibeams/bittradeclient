import React, {Component} from "react";
import {Layout, Popover} from "antd";
import {Link} from "react-router-dom";

import {switchLanguage, toggleCollapsedSideNav} from "../../appRedux/actions/Setting";
import SearchBox from "../../components/SearchBox";
import UserInfo from "../../components/UserInfo";
import AppNotification from "../../components/AppNotification";
import MailNotification from "../../components/MailNotification";
import Auxiliary from "../../util/Auxiliary";


import {NAV_STYLE_DRAWER, NAV_STYLE_FIXED, NAV_STYLE_MINI_SIDEBAR, TAB_SIZE} from "../../constants/ThemeSetting";
import {connect} from "react-redux";
import { BaseComponent } from "../../app/components/base/BaseComponent";
import LanguageMenu from "./LanguageMenu";

const {Header} = Layout;

class Topbar extends BaseComponent {

  state = {
    searchText: '',
  };

  updateSearchChatUser = (evt) => {
    this.setState({
      searchText: evt.target.value,
    });
  };


  render() {
    const {locale, width, navCollapsed, navStyle} = this.props as any;
    let lmnu = LanguageMenu(this.props);
    return (
      <Auxiliary>
        <Header>
          {navStyle === NAV_STYLE_DRAWER || ((navStyle === NAV_STYLE_FIXED || navStyle === NAV_STYLE_MINI_SIDEBAR) && width < TAB_SIZE) ?
            <div className="gx-linebar gx-mr-3">
              <i className="gx-icon-btn icon icon-menu"
                 onClick={() => {
                   this.props.toggleCollapsedSideNav(!navCollapsed);
                 }}
              />
            </div> : null}
          <Link to={this.getLink(this.constants.RoutePaths.Home)} className="gx-d-block gx-d-lg-none gx-pointer">
            <img alt="" src={"/assets/images/logo.png"}/></Link>

          <SearchBox styleName="gx-d-none gx-d-lg-block gx-lt-icon-search-bar-lg"
                     placeholder="Search in app..."
                     onChange={this.updateSearchChatUser.bind(this)}
                     value={this.state.searchText}/>
          <ul className="gx-header-notifications gx-ml-auto">
            <li className="gx-notify gx-notify-search gx-d-inline-block gx-d-lg-none">
              <Popover overlayClassName="gx-popover-horizantal" placement="bottomRight" content={
                <SearchBox styleName="gx-popover-search-bar"
                           placeholder="Search in app..."
                           onChange={this.updateSearchChatUser.bind(this)}
                           value={this.state.searchText}/>
              } trigger="click">
                <span className="gx-pointer gx-d-block"><i className="icon icon-search-new"/></span>
              </Popover>
            </li>
            {width >= TAB_SIZE ? null :
              <Auxiliary>
                <li className="gx-notify">
                  <Popover overlayClassName="gx-popover-horizantal" placement="bottomRight" content={<AppNotification/>}
                           trigger="click">
                    <span className="gx-pointer gx-d-block"><i className="icon icon-notification"/></span>
                  </Popover>
                </li>

                <li className="gx-msg">
                  <Popover overlayClassName="gx-popover-horizantal" placement="bottomRight"
                           content={<MailNotification/>} trigger="click">
                  <span className="gx-pointer gx-status-pos gx-d-block">
                    <i className="icon icon-chat-new"/>
                    <span className="gx-status gx-status-rtl gx-small gx-orange"/>
                  </span>
                  </Popover>
                </li>
              </Auxiliary>
            }
            <li className="gx-language">
              <Popover overlayClassName="gx-popover-horizantal" placement="bottomRight" 
              content={lmnu.menu}
                       trigger="click">
                <span className="gx-pointer gx-flex-row gx-align-items-center">
                  <i className={`flag flag-24 flag-${lmnu.current.icon}`}/>
                  <span className="gx-pl-2 gx-language-name">{lmnu.current.name}</span>
                  <i className="icon icon-chevron-down gx-pl-2"/>
                </span>
              </Popover>
            </li>
            {width >= TAB_SIZE ? null :
              <Auxiliary>
                <li className="gx-user-nav"><UserInfo {...this.props}/></li>
              </Auxiliary>
            }
          </ul>
        </Header>
      </Auxiliary>
    );
  }
}

const mapStateToProps = ({settings}) => {
  const {locale, navStyle, navCollapsed, width} = settings;
  return {locale, navStyle, navCollapsed, width}
};

export default connect(mapStateToProps, {toggleCollapsedSideNav, switchLanguage})(Topbar);
