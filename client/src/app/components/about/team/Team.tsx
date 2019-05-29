import React from "react";
import { Card } from "antd";
import { BaseComponent } from "../../base/BaseComponent";
import "./Team.less";

export default class Team extends BaseComponent {
  render() {
    return (
      <Card className="gx-text-center">
        <div className="team-container">
          <h1 className="heading-big">
            {this.lang.Founder} &#38; {this.lang.CEO}
          </h1>
          <img
            src="/assets/images/fahad.jpeg"
            width={250}
            className="founder-img"
            alt={this.lang.FahadSheikh}
          />

          <h1 className="heading-big">{this.lang.FahadSheikh}</h1>
          <p className="text-medium">{this.lang.CEOPara}</p>
          <h1 className="heading-big">
            {this.lang.Our} {this.lang.Team}
          </h1>
          <p className="text-medium">{this.lang.TeamPara}</p>

          <div className="dev-container">
            <figure>
              <img
                src="/assets/images/inaam.jpeg"
                width={200}
                alt={this.lang.Inaam}
                id="inaam"
              />
              <h1>{this.lang.Inaam}</h1>
              <figcaption>{this.lang.TeamDescription1}</figcaption>
            </figure>
            <figure>
              <img
                src="/assets/images/shoaib.jpg"
                width={200}
                alt={this.lang.Shoaib}
              />
              <h1>{this.lang.Shoaib}</h1>
              <figcaption>{this.lang.TeamDescription2}</figcaption>
            </figure>
          </div>
        </div>
      </Card>
    );
  }
}
