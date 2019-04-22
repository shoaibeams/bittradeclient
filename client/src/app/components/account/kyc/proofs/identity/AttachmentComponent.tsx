import * as React from "react";
import { BaseComponent } from "../../../../base/BaseComponent";
import { Card, Upload, Row, Col, Button, Alert, Modal, Spin } from "antd";
// import { StaticHelper } from "../../../../../../shared/static-helper";
import { DocumentTypes } from "../../../../../../enums/kyc";
import FontAwesome from "../../../../base/FontAwesome";
import { StaticHelper } from "../../../../../../shared/static-helper";
import { mdCallResponse } from "../../../../../../models/call-response";

export default class AttachmentComponent extends BaseComponent {
  render() {
    // this.initShorts();
    let attachment = this.state.attachments[this.state.currentAttachment];
    let requirement = null;
    if (attachment.requirements.length > this.state.currentRequirement) {
      requirement = attachment.requirements[this.state.currentRequirement];
    }
    if (!requirement) {
      this.p.onDone();
      return null;
    }
    const uploadButton = (
      <div>
        {FontAwesome.faIcon("plus")}
        <div className="ant-upload-text">{this.lang.Upload}</div>
      </div>
    );
    const draggerProps = {
      multiple: requirement.noOfFiles > 1,
      accept: requirement.types.join(","),
      action:
        this.constants.BaseURL +
        this.constants.EndPoints.PostDigitalEvidence +
        DocumentTypes.NIC,
      withCredentials: true,
      showUploadList: true,
      onChange: ({ file, fileList }) => {
        //we got file upload response now
        this.setState({ fileList: fileList }, () => {
          let res = file.response as mdCallResponse;
          if (res) {
            if (res.isSuccess) {
              requirement.de = res.extras;
              this.updateRequirement(requirement);
            } else {
              if (
                this.constants.RedirectToLoginMessages.indexOf(
                  res.message.toUpperCase()
                ) > -1
              ) {
                StaticHelper.navigateToLogin();
                this.antd.modalError(this.lang.SessionExpired);
              } else {
                this.antd.modalError(
                  this.lang.PleaseTryAgain,
                  this.lang.SomethingWentWrong
                );
              }
            }
          }
        });
      },
      onbeforeunload: (file, fileList) => {
        return new Promise((resolve, reject) => {
          let name = file.name as string;
          let index = name.lastIndexOf(".");
          let ext = name.substr(index + 1);
          if (requirement.types.indexOf(ext) < 0) {
            reject(
              StaticHelper.formatString([
                this.lang.AllowFileTypesAreFormat,
                ...requirement.types
              ])
            );
            return;
          }
          if (file.size > this.constants.MaxFileUploadSize * 1024 * 1024) {
            reject(
              StaticHelper.formatString([
                this.lang.MaxAttachmentSizeFormat,
                this.constants.MaxFileUploadSize + "MB"
              ])
            );
            return;
          }
          resolve(file);
        });
      },
      onPreview: file => {
        this.setState({
          previewImage: file.url || file.thumbUrl,
          previewVisible: true
        });
      }
      // style: {
      //   height: 225
      // }
    };
    let alertDescription = [
      this.lang.ProofsAttachmentAlert,
      StaticHelper.formatString(
        this.lang.MaxAttachmentSizeFormat,
        this.constants.MaxFileUploadSize + "MB"
      ),
      StaticHelper.formatString(
        this.lang.AllowFileTypesAreFormat,
        requirement.types.join(",")
      )
    ];
    return (
      <>
        <Spin spinning={this.state.showAttachmentSpinner} size={"large"}>
          <Card>
            <div className="gx-w-100 gx-mb-3">
              <h2>{attachment.title + " - " + requirement.title}</h2>
            </div>
            <Row>
              <Col
                // key={this.generateDynamicKey()}
                xs={24}
                sm={24}
                md={16}
                lg={16}
                xl={16}
              >
                <div className="clearfix">
                  <Upload
                    {...draggerProps}
                    listType="picture-card"
                    fileList={this.state.fileList}
                  >
                    {this.state.fileList.length >= requirement.noOfFiles
                      ? null
                      : uploadButton}
                  </Upload>
                </div>
              </Col>
              {this.antd.colmd8(
                <div className="">
                  <Button
                    type="primary"
                    className="gx-w-100"
                    onClick={this.onNextButtonClick}
                    disabled={!this.state.currentDocUploaded}
                  >
                    {this.lang.Next}
                  </Button>
                  <Alert
                    message={this.lang.Alert}
                    description={
                      <ul>
                        {alertDescription.map((d, i) => {
                          return <li key={i}>{d}</li>;
                        })}
                      </ul>
                    }
                    type="success"
                  />
                </div>
              )}
            </Row>
          </Card>
        </Spin>
        <Modal
          visible={this.state.previewVisible}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img
            alt="example"
            style={{ width: "100%" }}
            src={this.state.previewImage}
          />
        </Modal>
      </>
    );
  }

  constructor(pps) {
    super(pps);
    this.init();
  }

  init() {
    if (!this.p.attachments) {
      history.back();
      return;
    }
    if (this.p.attachments.length < 1) {
      this.p.onDone();
      return;
    }
    this.state = {
      attachments: this.p.attachments,
      previewImage: null,
      previewVisible: false,
      showAttachmentSpinner: false,
      currentAttachment: 0,
      currentRequirement: 0,
      currentDocUploaded: false,
      fileList: []
    };
  }

  handleCancel = () =>
    this.setState({ previewVisible: false, previewImage: null });

  updateRequirement = requirement => {
    let attachment = this.state.attachments[this.state.currentAttachment];
    attachment.requirements[this.state.currentRequirement] = requirement;
    let attachments = this.state.attachments;
    attachments[this.state.currentAttachment] = attachment;
    this.updateState({ attachments, currentDocUploaded: true });
  };

  onNextButtonClick = () => {
    let state = {
      currentAttachment: this.state.currentAttachment,
      currentRequirement: this.state.currentAttachment,
      currentDocUploaded: false,
      fileList: []
    };
    let attachment = this.state.attachments[this.state.currentAttachment];
    let index = this.state.currentRequirement;
    index++;
    if (attachment.requirements.length > index) {
      state.currentRequirement = index;
    } else {
      index = this.state.currentAttachment;
      index++;
      if (this.state.attachments.length > index) {
        state.currentAttachment = index;
        state.currentRequirement = 0;
      } else {
        state = null;
        if (typeof this.p.onDone === "function") {
          this.updateState({ showAttachmentSpinner: true }, () => {
            this.p.onDone(this.state.attachments);
          });
        }
      }
    }
    if (state) {
      this.updateState(state);
    }
  };
}
