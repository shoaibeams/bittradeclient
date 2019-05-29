import React from "react";
import { BaseComponent } from "../../base/BaseComponent";
import { Redirect, Route, Switch } from "react-router";
import asyncComponent from "../../base/AsyncComponent";
import MyAccountSwitch from "./MyAccountSwitch";
import Widget from "../../../../components/Widget";
import { Tabs, Col, Button, Row, Card, Tag } from "antd";
import { AccountTypes } from "../../../../enums/general";
import { mdCallResponse } from "../../../../models/call-response";
import { mdDigitalEvidence } from "../../../../models/digital-evidence";
import { StaticHelper } from "../../../../shared/static-helper";
const TabPane = Tabs.TabPane;

export default class ProfilePictureComponent extends BaseComponent {
  render() {
    const userAccount = this.g.user.userAccount;
    let fullName = userAccount.first_name;
    fullName += " " + (userAccount.middle_name ? userAccount.middle_name : "");
    fullName += " " + (userAccount.last_name ? userAccount.last_name : "");
    return (
      <Card>
        {/* <div
        style={{
          display: "inline-block",
          verticalAlign: "middle",
          minWidth: 500
        }}
        className="account-type-selection-row gx-mb-3"
      > */}
        <Row>
          {this.antd.colsm8(
            <img
              alt="avatar"
              src={this.constants.BaseURL + userAccount.picture}
              className="gx-avatar-img gx-avatar-img-lg gx-border-0"
            />
          )}
          {this.antd.colsm16(
            <div className="gx-description">
              <h2>{fullName}</h2>
              {userAccount.kyc_verified ? (
                <Tag color="green">{this.lang.Verified}</Tag>
              ) : (
                <Tag
                  color="orange"
                  onClick={() => {
                    this.props.history.push(
                      this.getLink(
                        this.constants.RoutePaths.MyAccountVerification
                      )
                    );
                  }}
                >
                  {this.lang.Not + " " + this.lang.Verified}
                </Tag>
              )}
              <input
                onChange={this.fileSelectionChanged}
                type="file"
                id={this.fileInputId}
                multiple={false}
                style={{ display: "none" }}
                accept={"image/png,image/jpeg,image/jpg"}
              />
              {this.spinnerComponent(
                <label
                  htmlFor={this.fileInputId}
                  className="btn btn-primary btn-sm"
                  style={{ marginBottom: 0, height: "auto" }}
                >
                  {this.lang.UpdatePicture}
                </label>,
                this.state.savingPicture
              )}
              {StaticHelper.formatString(
                this.lang.MaxAttachmentSizeFormat,
                this.constants.MaxFileUploadSize + "MB"
              )}
              {/* <Button size="small" type="primary" style={{ marginBottom: 0 }}>
                {this.lang.UpdatePicture}
              </Button> */}
            </div>
          )}
        </Row>
      </Card>
    );
  }

  fileInputId: string;
  formatsAllowed = ["png", "jpg", "jpeg"];
  constructor(props) {
    super(props);
    this.init();
  }

  init() {
    this.fileInputId = "fileInputId" + Math.random();
    this.state = {
      savingPicture: false
    };
  }

  fileSelectionChanged = event => {
    if (!event.target.files) {
      return;
    }
    if (event.target.files.length < 1) {
      return;
    }

    let file = event.target.files[0];
    let sizeInBytes = file.size;
    let allowedFileSizeInBytes = this.constants.MaxFileUploadSize * 1024 * 1024;
    if (sizeInBytes > allowedFileSizeInBytes) {
      status = StaticHelper.formatString(
        this.lang.MaxAttachmentSizeFormat,
        this.constants.MaxFileUploadSize + "MB"
      );
      this.errorNotification(status);
      event.target.value = null;
      return;
    }
    let name = file.name.toLowerCase();
    let splittedName = name.split(".");
    let extension = splittedName[splittedName.length - 1];
    if (this.formatsAllowed.indexOf(extension) < 0) {
      status = StaticHelper.formatString(
        this.lang.AllowFileTypesAreFormat,
        this.formatsAllowed.join(", ")
      );
      this.errorNotification(status);
      event.target.value = null;
      return;
    }

    const fd = new FormData();
    fd.append("files", event.target.files[0]);
    this.updateStatePromise({ savingPicture: true }).then(_ => {
      return this.http
        .postFile(this.constants.EndPoints.PostProfilePicture, fd, null, {
          withCredentials: true
        })
        .then((res: mdCallResponse) => {
          if (res.isSuccess && this.g.user) {
            let user = this.g.user;
            if (user.userAccount) {
              user.userAccount.picture = res.extras;
            }
            this.props.updateGlobalProperty(global.propKeys.user, user);
          }
          return this.updateStatePromise({ savingPicture: false });
        });
    });
  };
}
