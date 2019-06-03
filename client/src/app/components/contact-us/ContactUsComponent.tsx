import React from "react";
import { BaseComponent } from "../base/BaseComponent";
import { Card } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ContactUs from "./ContactUs";

export default class ContactUsComponent extends BaseComponent {
  render() {
    return (
      <>
        <ContactUs />
        <Card className="gx-text-center">
          <h1 className="heading-big">
            {this.lang.Contact} {this.lang.Support}
          </h1>
          <br />
          <div className="text-medium">
            <p>
              {this.lang.Phone}: {this.lang.BitVelocityPhone}&nbsp;
              <FontAwesomeIcon icon="phone" />
            </p>

            <p>
              {this.lang.Mobile}: {this.lang.BitVelocityMobile}&nbsp;
              <FontAwesomeIcon icon="mobile-alt" />
            </p>
            <p>
              {this.lang.Email}: {this.lang.BitVelocityMail}&nbsp;
              <FontAwesomeIcon icon="envelope" />
            </p>
          </div>
        </Card>
      </>
    );
  }
}
