import * as React from "react";
import { Card } from "antd";
import Roadmap from "./Roadmap";
import { BaseComponent } from "../base/BaseComponent";
import ContactUsComponent from "../contact-us/ContactUsComponent";

export default class InvestorZone extends BaseComponent {
  render() {
    const { InvestorsZone, InvestorZonePara } = this.lang;
    return (
      <div>
        <Card>
          <h1 className="heading-big gx-text-center">{InvestorsZone}</h1>
          <p className="text-medium">{InvestorZonePara}</p>
        </Card>
        <Card>
          <ContactUsComponent params={{ title: this.lang.ContactUs }} />
        </Card>
        <Card>
          <Roadmap />
        </Card>
      </div>
    );
  }
}
