import * as React from "react";
import { connect } from "react-redux";
import { Avatar, Popover } from "antd";
import { userSignOut } from "../../appRedux/actions/Auth";
import { BaseComponent } from "../../app/components/base/BaseComponent";

class UserProfile extends BaseComponent {
  render() {
    let userAccount = this.g.user.userAccount;
    let fullName = "";
    if (userAccount) {
      fullName =
        userAccount.first_name +
        " " +
        userAccount.middle_name +
        " " +
        userAccount.last_name;
    }
    const userMenuOptions = (
      <ul className="gx-user-popover">
        <li>My Account</li>
        <li>Connections</li>
        <li onClick={this.logout}>{this.lang.Logout}</li>
      </ul>
    );

    return (
      <div className="gx-flex-row gx-align-items-center gx-mb-4 gx-avatar-row">
        <Popover
          placement="bottomRight"
          content={userMenuOptions}
          trigger="click"
        >
          <Avatar
            src="https://via.placeholder.com/150x150"
            className="gx-size-40 gx-pointer gx-mr-3"
            alt=""
          />
          <span className="gx-avatar-name">
            {fullName}
            <i className="icon icon-chevron-down gx-fs-xxs gx-ml-2" />
          </span>
        </Popover>
      </div>
    );
  }
  constructor(props) {
    super(props);
  }
}

export default connect(
  null,
  { userSignOut }
)(UserProfile);
