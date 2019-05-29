import React from "react";
import WithIconTimeLineItem from "../../../components/timeline/WithIconTimeLineItem";
import "./Roadmap.less";
import { BaseComponent } from "../base/BaseComponent";

export default class Roadmap extends BaseComponent {
  render() {
    return (
      <>
        <h1 className="road-map-heading gx-text-center heading-big">
          {this.lang.Company}
          &nbsp;
          {this.lang.Roadmap}
        </h1>

        <div className="gx-timeline-secion gx-timeline-center">
          <WithIconTimeLineItem
            styleName="gx-timeline-not-inverted text-medium"
            color="blue"
            timeLine={{
              time: `${this.lang.quater2} ${this.lang.twoThousandSixteen}`,
              title: `${this.lang.Company} ${this.lang.Incorporated}`
            }}
          >
            <i className="icon icon-company gx-p-2" />
          </WithIconTimeLineItem>
          <WithIconTimeLineItem
            styleName={"gx-timeline-inverted text-medium"}
            color="green"
            timeLine={{
              time: `${this.lang.quater2} ${this.lang.twoThousandSeventeen}`,
              title: `${this.lang.SeedFundingCompleted}`
            }}
          >
            <i className="icon icon-chart-tree gx-p-2" />
          </WithIconTimeLineItem>

          <WithIconTimeLineItem
            styleName="gx-timeline-not-inverted text-medium"
            color="red"
            timeLine={{
              time: `${this.lang.quater3} ${this.lang.twoThousandSeventeen}`,
              title: `${this.lang.ExchangeDesign}`
            }}
          >
            <i className="icon icon-map-google gx-p-2" />
          </WithIconTimeLineItem>
          <WithIconTimeLineItem
            styleName={"gx-timeline-inverted text-medium"}
            color="purple"
            timeLine={{
              time: `${this.lang.quater1} ${this.lang.twoThousandEighteen}`,
              title: `${this.lang.TechnicalDesign}`
            }}
          >
            <i className="icon icon-map-google gx-p-2" />
          </WithIconTimeLineItem>

          <WithIconTimeLineItem
            styleName="gx-timeline-not-inverted text-medium"
            color="orange"
            timeLine={{
              time: `${this.lang.quater1} ${this.lang.twoThousandEighteen}`,
              title: `${this.lang.LiquidityPartners}`
            }}
          >
            <i className="icon icon-feedback gx-p-2" />
          </WithIconTimeLineItem>
          <WithIconTimeLineItem
            styleName={"gx-timeline-inverted text-medium"}
            color="yellow"
            timeLine={{
              time: `${this.lang.quater3} ${this.lang.twoThousandEighteen}`,
              title: `${this.lang.SecurityTokenOffering}`
            }}
          >
            <i className="icon icon-bitcoin gx-p-2" />
          </WithIconTimeLineItem>
          <WithIconTimeLineItem
            styleName="gx-timeline-not-inverted text-medium"
            color="blue"
            timeLine={{
              time: `${this.lang.quater3} ${this.lang.twoThousandEighteen}`,
              title: `${this.lang.Development}`
            }}
          >
            <i className="icon icon-setting gx-p-2" />
          </WithIconTimeLineItem>
          <WithIconTimeLineItem
            styleName={"gx-timeline-inverted text-medium"}
            color="red"
            timeLine={{
              time: `${this.lang.quater1} ${this.lang.twoThousandNineteen}`,
              title: `${this.lang.DigitalAssetTrading}`
            }}
          >
            <i className="icon icon-data-display gx-p-2" />
          </WithIconTimeLineItem>
          <WithIconTimeLineItem
            styleName="gx-timeline-not-inverted text-medium"
            color="green"
            timeLine={{
              time: `${this.lang.quater2} ${this.lang.twoThousandNineteen}`,
              title: `${this.lang.DATPlatformAvailable}`
            }}
          >
            <i className="icon icon-alert gx-p-2" />
          </WithIconTimeLineItem>
          <WithIconTimeLineItem
            styleName={"gx-timeline-inverted text-medium"}
            color="purple"
            timeLine={{
              time: `${this.lang.quater2} ${this.lang.twoThousandNineteen}`,
              title: `${this.lang.EMoneyLicense}`
            }}
          >
            <i className="icon icon-localeprovider gx-p-2" />
          </WithIconTimeLineItem>
          <WithIconTimeLineItem
            styleName="gx-timeline-not-inverted text-medium"
            color="orange"
            timeLine={{
              time: `${this.lang.quater3} ${this.lang.twoThousandNineteen}`,
              title: `${this.lang.STOPlatformDevelopment}`
            }}
          >
            <i className="icon icon-data-display gx-p-2" />
          </WithIconTimeLineItem>
          <WithIconTimeLineItem
            styleName={"gx-timeline-inverted text-medium"}
            color="red"
            timeLine={{
              time: `${this.lang.quater1} ${this.lang.twoThousandTwenty}`,
              title: `${this.lang.STOPlatformDevelopmentLive}`
            }}
          >
            <i className="icon icon-alert gx-p-2" />
          </WithIconTimeLineItem>
        </div>
      </>
    );
  }
}
