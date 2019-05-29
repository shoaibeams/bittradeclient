import React from "react";
import { Card } from "antd";
import { BaseComponent } from "../../base/BaseComponent";
import "./SaveMoneyCard.less";

export default class SaveCardMoney extends BaseComponent {
  render() {
    return (
      <Card>
        <div className="card-saving">
          {this.antd.colmd12(
            <div className="text-col">
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
          )}

          {this.antd.colmd12(
            <div className="image-col">
              <img src={"/assets/images/save-money.svg"} />
            </div>
          )}
        </div>
      </Card>
    );
  }
}
