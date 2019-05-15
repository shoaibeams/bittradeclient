import * as React from "react";
import { Card } from "antd";
import { BaseComponent } from "../../base/BaseComponent";
import "./Team.less";

export default class Team extends BaseComponent {
  render() {
    return (
      <Card className="team-card gx-text-center">
        <h1
          className="gx-text-center heading-big"
          style={{ marginBottom: "30px" }}
        >
          {this.lang.Founder} &#38; {this.lang.CEO}
        </h1>
        <img
          src="/assets/images/placeholder.jpg"
          className="founder-img"
          alt=""
        />
        <h1 className="gx-text-center heading-big">{this.lang.FahadSheikh}</h1>
        {/* <img src="/assets/images/founder.jpg" alt="Fahah Sheikh, Founder & CEO" /> */}
        <p className="gx-text-center text-medium">{this.lang.CEOPara}</p>
        <h1 className="heading-big">
          {this.lang.Our} {this.lang.Team}
        </h1>
        <p className="gx-text-center text-medium">{this.lang.TeamPara}</p>
        <div className="team-container">
          <figure>
            <img src="/assets/images/placeholder.jpg" alt="" />
            <figcaption>Developer #1</figcaption>
          </figure>
          <figure>
            <img src="/assets/images/placeholder.jpg" alt="" />
            <figcaption>Developer #2</figcaption>
          </figure>
          <figure>
            <img src="/assets/images/placeholder.jpg" alt="" />
            <figcaption>Developer #3</figcaption>
          </figure>
        </div>
      </Card>
    );
  }
}
