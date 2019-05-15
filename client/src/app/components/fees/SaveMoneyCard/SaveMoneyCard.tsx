import * as React from "react";
import { Card } from "antd";
import { BaseComponent } from "../../base/BaseComponent";
import ImageAndCaption from "../../blockchain/ImageAndCaption";
import "./SaveMoneyCard.less";

export default class SaveCardMoney extends BaseComponent {
  render() {
    return (
      <Card>
        <div className="card-saving">
          <div className="col-left">
            <div>
              <h1>
                {this.lang.Our} {this.lang.Fees}
              </h1>
              <ul>
                <li>{this.lang.FeeLine1}</li>
                <li>{this.lang.FeeLine2}</li>
                <li>{this.lang.FeeLine3}</li>
                <li>{this.lang.FeeLine4}</li>
              </ul>
            </div>
          </div>

          <div className="col-right">
            <ImageAndCaption
              src={"/assets/images/save-money.svg"}
              caption="  "
            />
          </div>
        </div>
      </Card>
    );
  }
}
