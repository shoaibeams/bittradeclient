import React from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";
import { BaseComponent } from "../base/BaseComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./MessageBox.less";

export default class MessageBox extends BaseComponent {
  state = {
    buttonState: true
  };

  togglePopup = () => {
    this.setState({ buttonState: !this.state.buttonState });
  };

  renderContent = () => {
    if (!this.g.user.userAccount.contact_no) {
      return (
        <>
          <div className="message-box-heading">
            <h4>
              {this.lang.NoPhoneHeading}
              <img
                src="/assets/images/letter-x.svg"
                alt="close"
                onClick={this.togglePopup}
                className="close-btn"
              />
            </h4>
          </div>
          <p>{this.lang.NoPhonePara1}</p>
          <p>{this.lang.NoPhonePara2}</p>
          <ul>
            <li>
              {this.lang.NoPhoneLi11}
              &nbsp;
              <span>
                <img src="/assets/images/boss16x16.png" alt="" />
              </span>
              &nbsp;
              {this.lang.NoPhoneLi12}
            </li>
            <li>
              {this.lang.NoPhoneLi21}&nbsp;&nbsp;
              <span>
                <FontAwesomeIcon icon={["fas", "mobile-alt"]} size="1x" />
              </span>
              &nbsp;{this.lang.NoPhoneLi22}
            </li>
            <li>{this.lang.NoPhoneLi3}</li>
          </ul>
        </>
      );
    } else if (this.g.user.userAccount.two_fa === "none") {
      return (
        <>
          <h2>
            {this.lang.TwoFAIncompleteHeading}
            <img
              src="/assets/images/letter-x.svg"
              alt="close"
              onClick={this.togglePopup}
              className="close-btn"
            />
          </h2>
          <p>{this.lang.TwoFAIncompletePara1}</p>
          <p>{this.lang.TwoFAIncompletePara2}</p>
          <ul>
            <li>
              {this.lang.TwoFAIncompleteLi11}&nbsp;
              <span>
                <img src="/assets/images/boss16x16.png" alt="" />
              </span>
              {this.lang.TwoFAIncompleteLi12}
            </li>
            <li>
              {this.lang.TwoFAIncompleteLi21}
              <span>
                <img
                  src="/assets/images/google-authenticator-app.png"
                  width={16}
                  alt=""
                />
              </span>
              {this.lang.TwoFAIncompleteLi22}
            </li>
          </ul>
        </>
      );
    } else if (!this.g.user.userAccount.kyc_verified) {
      return (
        <>
          <h1>
            {this.lang.KYC} {this.lang.Unverified}
            <img
              src="/assets/images/letter-x.svg"
              alt="close"
              onClick={this.togglePopup}
              className="close-btn"
            />
          </h1>
          {this.lang.KYCUnverifiedPara1}
          <ul>
            <li>
              {this.lang.KYCUnverifiedLi1}&nbsp;
              <img src="/assets/images/boss16x16.png" alt="" />
            </li>
            <li>
              {this.lang.KYCUnverifiedLi2}&nbsp;
              <img src="/assets/images/profit16x16.png" alt="" />
            </li>
            <li>
              {this.lang.KYCUnverifiedLi3}&nbsp;
              <img src="/assets/images/placeholder16x16.png" alt="" />
            </li>
          </ul>
        </>
      );
    }
  };
  render() {
    return (
      <>
        <Button
          className="open-button"
          onClick={this.togglePopup}
          type="danger"
          icon="notification"
          shape="round"
        />
        <div
          className={
            this.state.buttonState ? "chat-popup" : "chat-popup-hidden"
          }
        >
          <div className="message-box">
            {this.renderContent()}
            <Button className="btn cancel" onClick={this.togglePopup}>
              <Link to={this.getLink(this.constants.RoutePaths.Verification)}>
                {this.lang.Start} {this.lang.The} {this.lang.Process}
              </Link>
            </Button>
          </div>
        </div>
      </>
    );
  }
}
