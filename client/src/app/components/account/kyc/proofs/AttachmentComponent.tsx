import React from "react";
import { Card, Upload, Row, Col, Button, Alert, Modal } from "antd";
import { BaseComponent } from "../../../base/BaseComponent";
import { mdCallResponse } from "../../../../../models/call-response";
import { StaticHelper } from "../../../../../shared/static-helper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


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
        <FontAwesomeIcon icon={["fas", "plus"]} />
        <div className="ant-upload-text">{this.lang.Upload}</div>
      </div>
    );
    const draggerProps = {
      multiple: requirement.noOfFiles > 1,
      accept: requirement.types.join(","),
      action:
        this.constants.BaseURL +
        this.constants.EndPoints.PostDigitalEvidence +
        attachment.value,
      withCredentials: true,
      showUploadList: true,
      onChange: ({ file, fileList }) => {
        //we got file upload response now
        if (fileList.length > requirement.noOfFiles) {
          fileList.splice(0, fileList.length - requirement.noOfFiles);
          this.updateState({ fileList: fileList }, () => {
            // this.errorNotification(
            //   StaticHelper.formatString(
            //     this.lang.MaximumFilesCanBeUploadedFormat,
            //     requirement.noOfFiles
            //   )
            // );
          });
          return;
        }
        this.setState({ fileList: fileList }, () => {
          let res = file.response as mdCallResponse;
          if (res) {
            if (res.isSuccess) {
              if (!Array.isArray(requirement.de)) {
                requirement.de = [];
              }
              // if (res.extras.length > 0) {
              //   let uploadedFile = res.extras[0];
              //   uploadedFile = StaticHelper.assignPropertyOfObject(
              //     uploadedFile,
              //     "uid",
              //     file.uid
              //   );
              //   let stateFileList = this.state.fileList;
              //   this.log.debug("fileList", this.state.fileList);
              //   requirement.de.push(uploadedFile);
              //   this.updateRequirement(requirement);
              // }
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
      beforeUpload: (file, fileList) => {
        return new Promise((resolve, reject) => {
          let name = file.name as string;
          let index = name.lastIndexOf(".");
          let ext = name.substr(index);
          if (requirement.types.indexOf(ext) < 0) {
            reject();
            this.errorNotification(
              StaticHelper.formatString(
                this.lang.AllowFileTypesAreFormat,
                requirement.types.join(", ")
              )
            );
            return;
          }
          if (file.size > this.constants.MaxFileUploadSize * 1024 * 1024) {
            reject();
            this.errorNotification(
              StaticHelper.formatString(
                this.lang.MaxAttachmentSizeFormat,
                this.constants.MaxFileUploadSize + "MB"
              )
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
      // onRemove: file => {
      //   let fileList = this.state.fileList;
      //   let files = fileList.filter(m => m.uid == file.uid);
      //   let state = {};
      //   if (files.length > 0) {
      //     let index = fileList.indexOf(files[0]);
      //     fileList.splice(index, 1);
      //     state = { fileList: fileList };
      //   }
      //   this.updateState(state, () => {
      //     let des = requirement.de.filter(m => m.uid == file.uid);
      //     if (des.length > 0) {
      //       let index = requirement.de.indexOf(des[0]);
      //       requirement.de.splice(index, 1);
      //       this.updateRequirement(requirement);
      //     }
      //   });
      //   return true;
      // }
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
    let anyAttachmentUploaded = false;
    let uploaded = this.state.fileList.filter(
      m => !this.isNullOrEmpty(m.response)
    );
    if (uploaded.length > 0) {
      if (uploaded[0].response) {
        if (uploaded[0].response.extras) {
          if (uploaded[0].response.extras.length > 0) {
            anyAttachmentUploaded = true;
          }
        }
      }
    }
    return (
      <>
        {/* <Spin spinning={this.state.showAttachmentSpinner} size={"large"}> */}
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
                  disabled={!anyAttachmentUploaded}
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
        {/* </Spin> */}
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
      errorMessage: "",
      showAttachmentSpinner: false,
      currentAttachment: 0,
      currentRequirement: 0,
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
    this.updateState({ attachments });
  };

  onNextButtonClick = () => {
    let attachment = this.state.attachments[this.state.currentAttachment];
    let requirement = attachment.requirements[this.state.currentRequirement];
    requirement.de = this.state.fileList;
    attachment.requirements[this.state.currentRequirement] = requirement;
    let attachments = this.state.attachments;
    attachments[this.state.currentAttachment] = attachment;
    this.updateState({ attachments }, () => {
      let state = {
        currentAttachment: this.state.currentAttachment,
        currentRequirement: this.state.currentAttachment,
        fileList: []
      };
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
    });
  };
}
