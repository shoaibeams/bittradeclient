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
          <p className="gx-text-center text-medium">
            BitVelocity provides tokenized platform services for Security Token
            Offerings (STOs) on a global stock exchange. We aim to become an
            alternative to investments banks, giving companies and startups a
            cost-effective way to get access to global financing.
          </p>
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
                <p className="text-medium">
                  On BitVelocity, you can instantly deposit your funds without
                  any hassle during any time of the day.
                </p>
              </Card>
            )}

            {this.antd.colmd8(
              <Card className="security-feature-card">
                <img src="/assets/images/clock.svg" alt="DDOS Protection" />
                <h1 className="heading-medium">
                  {this.lang.TwentyFourHours} {this.lang.Approval}
                </h1>
                <p className="text-medium">
                  There is no hour of the day and no day of the week when your
                  investments cannot be approved.
                </p>
              </Card>
            )}

            {this.antd.colmd8(
              <Card className="security-feature-card">
                <img src="/assets/images/curriculum.svg" alt="Application" />
                <h1 className="heading-medium">
                  {this.lang.Easy} {this.lang.Application}
                </h1>
                <p className="text-medium">
                  We strive to make sure that our application process is as easy
                  as it can be for investors.
                </p>
              </Card>
            )}
          </Row>
        </Card>
        <Card className="gx-card">
          <h1
            className="gx-text-center heading-big"
            style={{ marginBottom: "30px" }}
          >
            Problems We Solve
          </h1>
          <hr className="heading-bottom-line gx-text-center" />
          <p className="gx-text-center text-medium">
            BitVelocity strives to solve problems raised by institutional,
            centeralized paradigm with the crypto investing paradigm, and is
            seeking partnerships with digital financial platforms and security,
            compliance, and risk-management service providers to work with the
            concerns of institutional investors, on its path to reinvent capital
            markets and giving an alternative to wallstreet for the first
            time—developed in accordance with most countries of the world.
          </p>
        </Card>
        <Card className="gx-card">
          <h1 className="logo-text heading-big gx-text-center">
            Types of Tokenization Platforms
          </h1>
          <hr className="heading-bottom-line gx-text-center" />
          <Row className="sto-row gx-text-center fade-in-bottom">
            {this.antd.colmd8(
              <Card>
                <img src="/assets/images/ico-coin.svg" alt="Secured" />
                <h1 className="heading-medium">ICO Token</h1>
                <p className="text-medium">
                  ICO tokens are utility tokens that are built as a way to raise
                  funds. These tokens can be build upon any blockchain platform
                  such as Hyperledger, EOS or stellar.
                </p>
              </Card>
            )}

            {this.antd.colmd8(
              <Card className="security-feature-card">
                <img src="/assets/images/security.svg" alt="DDOS Protection" />
                <h1 className="heading-medium">Security Token</h1>
                <p className="text-medium">
                  These tokens are regulated and are bound by federal law and
                  securities. They derive their value from external, tradable
                  assets. These tokens can be built on existing blockchain, or
                  can also be built on a custom-made blockchain platform.
                </p>
              </Card>
            )}

            {this.antd.colmd8(
              <Card className="security-feature-card">
                <img src="/assets/images/asset.svg" alt="Application" />
                <h1 className="heading-medium">Asset Tokenization</h1>
                <p className="text-medium">
                  Backed up by real world assets such as real estate, gold, or
                  art, anything can be converted into tokens. The token either
                  live on existing blockchain or on tailor-made blockchain
                  platform.
                </p>
              </Card>
            )}
          </Row>
        </Card>
        <Card className="gx-card">
          <h1
            className="gx-text-center heading-big"
            style={{ marginBottom: "30px" }}
          >
            Assets That Can Be Tokenized
          </h1>
          <p className="gx-text-center text-medium">
            Tokenization is a modern way of securing assets with blockchain. We
            can tokenize almost anything.
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
                  <h1 className="heading-big">Shareholding</h1>
                </div>
              </Card>
            )}

            {this.antd.colmd8(
              <Card>
                <img
                  src="/assets/images/crowdfunding.svg"
                  alt={this.lang.Shares}
                />
                <h1 className="heading-big">Equity Crowdfunding</h1>
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
                    For Financial Technology Startups
                  </h1>
                  <p className="text-medium">
                    We partner up with Fintech companies for STO only after
                    assessing their business with due diligence.
                  </p>
                </div>
              </Card>
            )}

            {this.antd.colmd12(
              <Card>
                <img src="/assets/images/ipo.svg" alt={this.lang.Shares} />
                <h1 className="heading-big">For Established Companies</h1>
                <p className="text-medium">
                  We provide our tokenization service for established companies
                  that are looking to go public through Initial Public Offering
                  (IPO).
                </p>
              </Card>
            )}
          </Row>
        </Card>
        <Card className="gx-card">
          <h1 className="gx-text-center">
            How Tokenization For Real Estate Works
          </h1>
          <hr className="heading-bottom-line gx-text-center" />
          <Row className="usecase">
            <img
              src="/assets/images/real-estate-usecase-explained.png"
              alt={this.lang.Shares}
            />
          </Row>
        </Card>
        <BigCard params={{ image: "/assets/images/automation.svg" }}>
          <h1 className="heading-huge">Automated Investment</h1>
          <p className="list-big">
            BitVelocity provides investors to create their own shares and bonds
            and instantly raise money through an investment platform that uses
            automated, smart contract algorithms. In future, we expect to
            implement machine learning and artificial intelligence features in
            our platform.
          </p>
        </BigCard>
        <BlogsCard />
        <ContactUs params={{ title: "Interested? Contact us today!" }} />
      </>
    );
  }
}
