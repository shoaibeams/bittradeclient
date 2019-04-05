import React, {Component} from "react";
import {connect} from "react-redux";
import {Avatar, Popover} from "antd";
import {userSignOut} from "../../appRedux/actions/Auth";
import { BaseComponent } from "../../app/components/base/BaseComponent";

class UserInfo extends BaseComponent {

  render() {
    const userMenuOptions = (
      <ul className="gx-user-popover">
        <li>My Account</li>
        <li>Connections</li>
        <li onClick={this.logout}>{this.lang.Logout}
        </li>
      </ul>
    );

    return (
      <Popover overlayClassName="gx-popover-horizantal" placement="bottomRight" content={userMenuOptions}
               trigger="click">
        <Avatar src='https://via.placeholder.com/150x150'
                className="gx-avatar gx-pointer" alt=""/>
      </Popover>
    )

  }
}

export default connect(null, {userSignOut})(UserInfo);
