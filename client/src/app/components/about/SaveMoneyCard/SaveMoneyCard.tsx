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
              <h1 className="heading-huge">
                {this.lang.Start} {this.lang.Saving} {this.lang.Money}&nbsp;
                {this.lang.Today}
              </h1>
              <ul className="list-big">
                <li>{this.lang.SaveMoney1}</li>
                <li>{this.lang.SaveMoney2}</li>
                <li>{this.lang.SaveMoney3}</li>
              </ul>
            </div>
          </div>

          <div className="col-right fade-in-bottom">
            <ImageAndCaption src={"/assets/images/save-money.svg"} caption="" />
          </div>
        </div>
      </Card>
    );
  }
}
