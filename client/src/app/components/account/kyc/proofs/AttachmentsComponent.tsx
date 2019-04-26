import * as React from "react";
import { BaseComponent } from "../../../base/BaseComponent";
import { Row } from "antd";
import Widget from "../../../../../components/Widget";
import { AccountTypes } from "../../../../../enums/general";
import { mdFormControl } from "../../../../../shared/form-control";
import { DocumentTypesWithNames, ProofTypes } from "../../../../../enums/kyc";
import AttachmentComponent from "./AttachmentComponent";

export default class AttachmentsComponent extends BaseComponent {
  render() {
    this.initShorts();
    let docsRequired = 1;
    let headerStyle = {};
    if (["xs", "sm"].indexOf(this.getCurrentWidth()) < 0) {
      headerStyle = {
        // paddingLeft: 55
      };
    }
    return (
      <div className="attachments">
        {this.state.selectedDocs.length < 1 ? (
          <Row>
            {this.antd.colmd24(
              <h2 className="gx-mb-3" style={headerStyle}>
                {this.lang.SelectDocumentType}
              </h2>
            )}
            {this.p.docs.map((d, i) => {
              return (
                <React.Fragment key={i}>
                  {this.antd.colmd6(
                    <Widget styleName="gx-ch-capitalize gx-card-sm-px doc-type">
                      <div
                        className="gx-text-center gx-pt-sm-3"
                        onClick={() => {
                          let selectedDocs = this.state.selectedDocs;
                          selectedDocs.push(d);
                          this.updateState({ selectedDocs });
                        }}
                      >
                        <img className="gx-size-60 gx-mb-3" src={d.icon} />
                        <h2 className="gx-mb-1 gx-mb-sm-1">{d.title}</h2>
                      </div>
                    </Widget>
                  )}
                </React.Fragment>
              );
            })}
          </Row>
        ) : (
          <AttachmentComponent
            {...this.props}
            params={{
              attachments: this.state.selectedDocs,
              onDone: this.onAttachmentDone
            }}
          />
        )}
      </div>
    );
  }

  formItemLayout = {
    labelCol: { xs: 24, sm: 6 },
    wrapperCol: { xs: 24, sm: 14, md: 12 }
  };
  accountType: AccountTypes;
  proof: ProofTypes;
  steps = {
    docSelection: 1,
    attachments: 2
  };
  constructor(pps) {
    super(pps);
    this.init();
  }

  init() {
    this.accountType = this.p.accountType;
    let docs: any[] = this.p.docs;
    let doc1: mdFormControl = new mdFormControl("", "doc1");
    let doc2: mdFormControl = new mdFormControl("", "doc2");
    let doc3: mdFormControl = new mdFormControl("", "doc3");
    if (docs.length > 0) {
      doc1.placeholder = docs[0].title;
    }
    if (docs.length > 1) {
      doc2.placeholder = docs[1].title;
    }
    if (docs.length > 2) {
      doc3.placeholder = docs[2].title;
    }
    this.state = {
      form: {
        doc1,
        doc2,
        doc3
      },
      selectedDocs: []
    };
  }

  onAttachmentDone = attachments => {
    this.updateState({ selectedDocs: attachments }, () => {
      if (typeof this.p.onNext === "function") {
        this.p.onNext(attachments);
      }
    });
  };
}
