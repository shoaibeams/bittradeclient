import * as React from "react";
import { Card } from "antd";
import { BaseComponent } from "../base/BaseComponent";

export default class About extends BaseComponent {
  render() {
    return (
      <>
        <Card>
          <h1>
            {this.lang.Coming} {this.lang.Soon}
          </h1>
          <p>{this.lang.STOPlaceholder}</p>
        </Card>
      </>
    );
  }
}
