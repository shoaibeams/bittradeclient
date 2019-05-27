import React from "react";
import { Card } from "antd";
import { BaseComponent } from "../../base/BaseComponent";
import ImageAndCaption from "../../blockchain/ImageAndCaption";
import "./BigCard.less";

export default class BigCard extends BaseComponent {
  render() {
    return (
      <Card>
        <div className="big-card">
          {this.antd.colmd12(
            <div className="col-left">{this.props.children}</div>
          )}
          {this.antd.colmd12(
            <div className="col-right">
              <ImageAndCaption src={this.p.image} />
            </div>
          )}
        </div>
      </Card>
    );
  }
}
