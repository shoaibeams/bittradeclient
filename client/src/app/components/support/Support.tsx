import React from "react";
import { Card } from "antd";
import { BaseComponent } from "../base/BaseComponent";
import ContactUsComponent from "../contact-us/ContactUsComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BlogsCard from "../sto/BlogsCard/BlogsCard";

export default class Support extends BaseComponent {
  render() {
    return (
      <>
        <Card className="gx-text-center">
          {/*------------------CARD HEADING-----------------------------*/}
          <h1 className="heading-big">{this.lang.SupportIntro}</h1>
          <p className="gx-text-center text-medium">
            {this.lang.SupportIntroPara}
          </p>
        </Card>
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
        <Card>
          <ContactUsComponent params={{ title: this.lang.SubmitAComplaint }} />
        </Card>
        <BlogsCard />
      </>
    );
  }
}
