import React from "react";
import { Card, Row } from "antd";
import { BaseComponent } from "../base/BaseComponent";
import HeaderBanner from "./HeaderBanner/HeaderBanner";
import ContactUs from "../contact-us/ContactUsComponent";
import BlogsCard from "./BlogsCard/BlogsCard";
import BigCard from "../fees/BigCard/BigCard";
import "./STO.less";

export default class STO extends BaseComponent {
  componentWillMount = () => {
    document.body.style.backgroundColor = "white";
  };

  componentWillUnmount = () => {
    document.body.style.backgroundColor = "#f5f5f5";
  };

  render() {
    return (
      <>
        <HeaderBanner size={this.g.isLoggedIn ? "fat" : "thin"} />
        <Card className="placeholder-card" />
        <Card className="gx-card">
          <h1
            className="gx-text-center heading-big"
            style={{ marginBottom: "30px" }}
          >
            What is BitVelocity?
          </h1>
          <hr className="heading-bottom-line gx-text-center" />
          <p className="gx-text-center text-medium">{this.lang.STOintroPara}</p>
        </Card>
        <Card className="gx-card">
          <h1 className="logo-text heading-big gx-text-center">
            {this.lang.STOFeaturesHeading}
          </h1>
          <hr className="heading-bottom-line gx-text-center" />
          <Row className="sto-row gx-text-center fade-in-bottom">
            {this.antd.colmd8(
              <Card>
                <img src="/assets/images/flash.svg" alt="Secured" />
                <h1 className="heading-medium">
                  {this.lang.Instant} {this.lang.Funding}
                </h1>
                <p className="text-medium">{this.lang.STOFeature1}</p>
              </Card>
            )}

            {this.antd.colmd8(
              <Card className="security-feature-card">
                <img src="/assets/images/clock.svg" alt="DDOS Protection" />
                <h1 className="heading-medium">
                  {this.lang.TwentyFourHours} {this.lang.Approval}
                </h1>
                <p className="text-medium">{this.lang.STOFeature2}</p>
              </Card>
            )}

            {this.antd.colmd8(
              <Card className="security-feature-card">
                <img src="/assets/images/curriculum.svg" alt="Application" />
                <h1 className="heading-medium">
                  {this.lang.Easy} {this.lang.Application}
                </h1>
                <p className="text-medium">{this.lang.STOFeature3}</p>
              </Card>
            )}
          </Row>
        </Card>
        <Card className="gx-card">
          <h1
            className="gx-text-center heading-big"
            style={{ marginBottom: "30px" }}
          >
            {this.lang.STOHeading2}
          </h1>
          <hr className="heading-bottom-line gx-text-center" />
          <p className="gx-text-center text-medium">{this.lang.STOPara2}</p>
        </Card>
        <Card className="gx-card">
          <h1 className="logo-text heading-big gx-text-center">
            {this.lang.STOPlatformsHeading}
          </h1>
          <hr className="heading-bottom-line gx-text-center" />
          <Row className="sto-row gx-text-center fade-in-bottom">
            {this.antd.colmd8(
              <Card>
                <img src="/assets/images/ico-coin.svg" alt="Secured" />
                <h1 className="heading-medium">
                  {this.lang.ICO} {this.lang.Token}
                </h1>
                <p className="text-medium">{this.lang.STOPlatformPara1}</p>
              </Card>
            )}

            {this.antd.colmd8(
              <Card className="security-feature-card">
                <img src="/assets/images/security.svg" alt="DDOS Protection" />
                <h1 className="heading-medium">
                  {this.lang.Security} {this.lang.Token}
                </h1>
                <p className="text-medium">{this.lang.STOPlatformPara2}</p>
              </Card>
            )}

            {this.antd.colmd8(
              <Card className="security-feature-card">
                <img src="/assets/images/asset.svg" alt="Application" />
                <h1 className="heading-medium">
                  {this.lang.Asset} {this.lang.Tokenization}
                </h1>
                <p className="text-medium">{this.lang.STOPlatformPara3}</p>
              </Card>
            )}
          </Row>
        </Card>
        <Card className="gx-card">
          <h1
            className="gx-text-center heading-big"
            style={{ marginBottom: "30px" }}
          >
            {this.lang.STOAssetsHeading}
          </h1>
          <p className="gx-text-center text-medium">
            {this.lang.STOAssetsHeadingPara}
          </p>
          <hr className="heading-bottom-line gx-text-center" />

          <Row className="sto-row gx-text-center fade-in-bottom">
            {this.antd.colmd8(
              <Card>
                <div>
                  <img
                    src="/assets/images/shareholder.svg"
                    alt={this.lang.Loans}
                  />
                  <h1 className="heading-big">{this.lang.Shareholding}</h1>
                </div>
              </Card>
            )}

            {this.antd.colmd8(
              <Card>
                <img
                  src="/assets/images/crowdfunding.svg"
                  alt={this.lang.Shares}
                />
                <h1 className="heading-big">
                  {this.lang.Equity} {this.lang.Crowdfunding}
                </h1>
              </Card>
            )}

            {this.antd.colmd8(
              <Card>
                <img
                  src="/assets/images/house.svg"
                  alt={this.lang.RealEstate}
                />
                <h1 className="heading-big">{this.lang.RealEstate}</h1>
              </Card>
            )}
          </Row>

          <div className="line-container">
            <svg className="line-svg">
              <line x1="5" x2="5" y1="0" y2="100" />
            </svg>
          </div>

          <Row className="sto-row gx-text-center fade-in-bottom">
            {this.antd.colmd12(
              <Card>
                <div>
                  <img src="/assets/images/startup.svg" alt={this.lang.Loans} />
                  <h1 className="heading-big">
                    {this.lang.STOAssetsSubHeading1}
                  </h1>
                  <p className="text-medium">
                    {this.lang.STOAssetsSubHeadingPara1}
                  </p>
                </div>
              </Card>
            )}

            {this.antd.colmd12(
              <Card>
                <img src="/assets/images/ipo.svg" alt={this.lang.Shares} />
                <h1 className="heading-big">
                  {this.lang.STOAssetsSubHeading2}
                </h1>
                <p className="text-medium">
                  {this.lang.STOAssetsSubHeadingPara2}
                </p>
              </Card>
            )}
          </Row>
        </Card>
        <Card className="gx-card">
          <h1 className="gx-text-center">{this.lang.STOHowWorksHeading}</h1>
          <hr className="heading-bottom-line gx-text-center" />
          <Row className="usecase">
            <img
              src="/assets/images/real-estate-usecase-explained.png"
              alt={this.lang.Shares}
            />
          </Row>
        </Card>
        <BigCard params={{ image: "/assets/images/automation.svg" }}>
          <h1 className="heading-huge">
            {this.lang.Automated} {this.lang.Investment}
          </h1>
          <p className="list-big">{this.lang.STOAIPara}</p>
        </BigCard>
        <BlogsCard />
        <ContactUs params={{ title: "Interested? Contact us today!" }} />
      </>
    );
  }
}
