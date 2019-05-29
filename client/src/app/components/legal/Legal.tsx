import React from "react";
import { Card } from "antd";
import { BaseComponent } from "../base/BaseComponent";
import "./Legal.less";

export default class About extends BaseComponent {
  renderContent = () => {
    if (this.props) {
      const pathSelector = this.props.history.location.pathname.replace(
        "/legal/",
        ""
      );
      if (pathSelector === "terms") {
        return (
          <Card>
            <h1 className="gx-text-center" style={{ marginBottom: "30px" }}>
              {this.lang.TermsAndConditions}
            </h1>
            <p>{this.lang.TermsPara1}</p>
            <p>{this.lang.TermsPara2}</p>
            <p>{this.lang.TermsPara3}</p>
            <h1>{this.lang.TermsHeading1}</h1>
            <p>{this.lang.TermsPara4}</p>

            <h1>{this.lang.TermsHeading2}</h1>
            <p>{this.lang.TermsPara5}</p>

            <h1>{this.lang.TermsHeading3}</h1>
            <p>{this.lang.TermsPara6}</p>

            <h1>{this.lang.TermsHeading4}</h1>
            <p>{this.lang.TermsPara7}</p>
            <p>{this.lang.TermsPara8}</p>

            <h1>{this.lang.TermsHeading5}</h1>
            <h1>{this.lang.TermsHeading6}</h1>
            <p>{this.lang.TermsPara9}</p>

            <h1>{this.lang.TermsHeading7}</h1>
            <p>{this.lang.TermsPara10}</p>
            <p>{this.lang.TermsPara11}</p>
            <p>{this.lang.TermsPara12}</p>

            <h1>{this.lang.TermsHeading8}</h1>
            <p>{this.lang.TermsPara13}</p>

            <h1>{this.lang.TermsHeading9}</h1>
            <p>{this.lang.TermsPara14}</p>
            <p>{this.lang.TermsPara15}</p>
            <p>{this.lang.TermsPara16}</p>

            <h1>{this.lang.TermsHeading10}</h1>
            <h1>{this.lang.TermsHeading11}</h1>
            <p>{this.lang.TermsPara17}</p>
            <p>{this.lang.TermsPara18}</p>
            <p>{this.lang.TermsPara19}</p>

            <h1>{this.lang.TermsHeading12}</h1>
            <p>{this.lang.TermsPara20}</p>
            <p>{this.lang.TermsPara21}</p>
            <p>{this.lang.TermsPara22}</p>

            <h1>{this.lang.TermsHeading13}</h1>
            <h1>{this.lang.TermsHeading14}</h1>
            <p>{this.lang.TermsPara23}</p>

            <h1>{this.lang.TermsHeading15}</h1>
            <p>{this.lang.TermsPara24}</p>

            <h1>{this.lang.TermsHeading16}</h1>
            <p>{this.lang.TermsPara25}</p>

            <h1>{this.lang.TermsHeading17}</h1>
            <h1>{this.lang.TermsHeading18}</h1>
            <p>{this.lang.TermsPara26}</p>
            <p>{this.lang.TermsPara27}</p>

            <h1>{this.lang.TermsHeading19}</h1>
            <p>{this.lang.TermsPara28}</p>
            <p>{this.lang.TermsPara29}</p>

            <h1>{this.lang.TermsHeading20}</h1>
            <p>{this.lang.TermsPara30}</p>

            <h1>{this.lang.TermsHeading21}</h1>
            <p>{this.lang.TermsPara31}</p>

            <h1>{this.lang.TermsHeading22}</h1>
            <p>{this.lang.TermsPara32}</p>
            <p>{this.lang.TermsPara33}</p>
            <p>{this.lang.TermsPara34}</p>
            <p>{this.lang.TermsPara35}</p>

            <h1>{this.lang.TermsHeading23}</h1>
            <p>{this.lang.TermsPara36}</p>

            <h1>{this.lang.TermsHeading24}</h1>
            <p>{this.lang.TermsPara37}</p>

            <h1>{this.lang.TermsHeading25}</h1>
            <p>{this.lang.TermsPara38}</p>

            <h1>{this.lang.TermsHeading26}</h1>
            <p>{this.lang.TermsPara39}</p>

            <h1>{this.lang.TermsHeading27}</h1>
            <p>{this.lang.TermsPara40}</p>

            <h1>{this.lang.TermsHeading28}</h1>
            <p>{this.lang.TermsPara41}</p>

            <h1>{this.lang.TermsHeading29}</h1>
            <p>{this.lang.TermsPara42}</p>

            <h1>{this.lang.TermsHeading30}</h1>
            <p>{this.lang.TermsPara43}</p>

            <h1>{this.lang.TermsHeading31}</h1>
            <p>{this.lang.TermsPara44}</p>

            <h1>{this.lang.TermsHeading32}</h1>
            <p>{this.lang.TermsPara45}</p>

            <h1>{this.lang.TermsHeading33}</h1>
            <p>{this.lang.TermsPara46}</p>

            <h1>{this.lang.TermsHeading34}</h1>
            <p>{this.lang.TermsPara47}</p>

            <h1>{this.lang.TermsHeading35}</h1>
            <h1>{this.lang.TermsHeading36}</h1>
            <p>{this.lang.TermsPara48}</p>

            <h1>{this.lang.TermsHeading37}</h1>
            <p>{this.lang.TermsPara49}</p>

            <h1>{this.lang.TermsHeading38}</h1>
            <p>{this.lang.TermsPara50}</p>

            <h1>{this.lang.TermsHeading39}</h1>
            <p>{this.lang.TermsPara51}</p>

            <h1>{this.lang.TermsHeading40}</h1>
            <p>{this.lang.TermsPara52}</p>

            <h1>{this.lang.TermsHeading41}</h1>
            <p>{this.lang.TermsPara53}</p>

            <h1>{this.lang.TermsHeading42}</h1>
            <p>{this.lang.TermsPara54}</p>        

            <p>{this.lang.TermsContent}</p>
          </Card>
        );
      } else {
        return (
          <Card>
            <h1 className="gx-text-center" style={{ marginBottom: "30px" }}>
              {this.lang.PrivacyPolicy}
            </h1>
            <p>{this.lang.PrivacyPara11}</p>
            <p>{this.lang.PrivacyPara12}</p>
            <p>{this.lang.PrivacyPara13}</p>
            <h1>{this.lang.PrivacyHeading1}</h1>
            <h1>{this.lang.PrivacyHeading2}</h1>
            <div>
              <p>{this.lang.PrivacyPara21}</p>
              <p>{this.lang.PrivacyPara22}</p>
              <p>{this.lang.PrivacyPara23}</p>
              <p>{this.lang.PrivacyPara24}</p>
              <p>{this.lang.PrivacyPara25}</p>
              <h1>{this.lang.PrivacyHeading3}</h1>
              <p>{this.lang.PrivacyPara26}</p>
              <h1>{this.lang.PrivacyHeading4}</h1>
              <p>{this.lang.PrivacyPara27}</p>
            </div>
            <h1>{this.lang.PrivacyHeading5}</h1>
            <h1>{this.lang.PrivacyHeading6}</h1>
            <p>{this.lang.PrivacyPara3}</p>
            <h1>{this.lang.PrivacyHeading7}</h1>
            <p>{this.lang.PrivacyPara4}</p>
            <h1>{this.lang.PrivacyHeading8}</h1>
            <p>{this.lang.PrivacyPara5}</p>
            <h1>{this.lang.PrivacyHeading9}</h1>
            <p>{this.lang.PrivacyPara6}</p>
            <h1>{this.lang.PrivacyHeading10}</h1>
            <p>{this.lang.PrivacyPara7}</p>
            <h1>{this.lang.PrivacyHeading11}</h1>
            <p>{this.lang.PrivacyPara8}</p>
            <h1>{this.lang.PrivacyHeading12}</h1>
            <p>{this.lang.PrivacyPara9}</p>
          </Card>
        );
      }
    }
  };

  render() {
    return <>{this.renderContent()}</>;
  }
}
