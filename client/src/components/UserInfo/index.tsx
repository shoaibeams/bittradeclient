import React, { Component } from "react";
import { connect } from "react-redux";
import { Avatar, Popover } from "antd";
import { userSignOut } from "../../appRedux/actions/Auth";
import { BaseComponent } from "../../app/components/base/BaseComponent";
import { Link } from "react-router-dom";

class UserInfo extends BaseComponent {
  state = {
    visible: false
  };

  hide = () => {
    this.updateState({ visible: false });
  };

  render() {
    const userMenuOptions = (
      <ul className="gx-user-popover">
        <li onClick={this.hide}>
          <Link
            to={this.getLink(this.constants.RoutePaths.MyAccount)}
            className="w-fill-available"
          >
            {this.lang.MyAccount}
          </Link>
        </li>
        <li onClick={this.logout}>{this.lang.Logout}</li>
      </ul>
    );

    let picture = "/assets/images/boss64x64.png";
    if (this.g.user) {
      if (this.g.user.userAccount) {
        if (!this.isNullOrEmpty(this.g.user.userAccount.picture)) {
          picture = this.constants.BaseURL + this.g.user.userAccount.picture;
        }
      }
    }
    return (
      <Popover
        overlayClassName="gx-popover-horizantal"
        placement="bottomRight"
        content={userMenuOptions}
        visible={this.state.visible}
        onVisibleChange={visible => {
          this.updateState({ visible });
        }}
        trigger="click"
      >
        <Avatar src={picture} className="gx-avatar gx-pointer" alt="" />
      </Popover>
    );
  }
}

export default connect(
  null,
  { userSignOut }
)(UserInfo);
