import * as React from "react";
import { Card } from "antd";
import { BaseComponent } from "../../base/BaseComponent";
import ImageAndCaption from "../../blockchain/ImageAndCaption";
import "./FeeCard.less";

export default class SaveCardMoney extends BaseComponent {
  render() {
    return (
      <Card>
        <div className="fee-card">
          {this.antd.colmd12(
            <div className="col-left">
              <h1 className="heading-huge">
                {this.lang.Our} {this.lang.Fees}
              </h1>
              <ul className="list-big">
                <li >{this.lang.FeeLine1}</li>
                <li>{this.lang.FeeLine2}</li>
                <li>{this.lang.FeeLine3}</li>
                <li>{this.lang.FeeLine4}</li>
              </ul>
            </div>
          )}

          {this.antd.colmd12(
            <div className="col-right">
              <ImageAndCaption src={"/assets/images/save-money.svg"} />
            </div>
          )}
        </div>
      </Card>
    );
  }
}
