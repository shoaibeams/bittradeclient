import { BaseComponent } from "../base/BaseComponent";
import * as React from "react";
import { Row } from "antd";
import { Link } from "react-router-dom";
import "./mainfooter.less";
import FontAwesome from "../base/FontAwesome";

export default class MainFooter extends BaseComponent {
  render() {
    this.initShorts();
    return (
      <>
        <div className="gx-header-horizontal-dark main-footer">
          <div className="gx-container gx-mt-5 gx-mb-5 footer">
            <Row>
              {this.links.map((l, i) => {
                return (
                  <React.Fragment key={i}>
                    {this.antd.colmd6(
                      <>
                        <p className="h2">{l.heading}</p>
                        <ul>
                          {l.children.map((c, i) => {
                            return (
                              <li key={i}>
                                <Link to={c.link}>{c.title}</Link>
                              </li>
                            );
                          })}
                        </ul>
                      </>
                    )}
                  </React.Fragment>
                );
              })}
              {this.antd.colmd6(
                <div className="social">
                  <p className="h2">{this.lang.Social}</p>
                  <ul>
                    <li>
                      <a href="#" className="fb">
                        {FontAwesome.faIcon("facebook-f")}
                      </a>
                    </li>
                    <li>
                      <a href="https://twitter.com/bit_velocity" className="tw">
                        {FontAwesome.faIcon("twitter")}
                        {/* <i className="fa fa-twitter" aria-hidden="true"></i> */}
                      </a>
                    </li>
                    <li>
                      <a href="#" className="yt">
                        {FontAwesome.faIcon("youtube")}
                      </a>
                    </li>
                    <li>
                      <a href="#" className="insta">
                        {FontAwesome.faIcon("instagram")}
                      </a>
                    </li>
                  </ul>
                  <p className="p">
                    <Link to={this.getLink(this.constants.RoutePaths.Home)}>
                      {
                        <img
                          src="/assets/images/logo.png"
                          className="img-responsive"
                          alt="BitVelocity"
                        />
                      }
                    </Link>
                  </p>
                </div>
              )}
            </Row>
          </div>
        </div>
        <div className="copyright">
          <div className="container">{`${this.lang.Copyrights} ${
            this.lang.SiteCompanyName
          } © ${new Date().getFullYear()}`}</div>
        </div>
      </>
    );
  }

  links: any[];
  constructor(props) {
    super(props);
    this.init();
  }

  init() {
    this.links = [
      {
        heading: this.lang.Features,
        children: [
          {
            title: this.lang.TradeDemo,
            link: this.getLink(this.constants.RoutePaths.Trading)
          },
          {
            title: this.lang.InvestorsZone,
            link: this.getLink(this.constants.RoutePaths.InvestorsZone)
          },
          {
            title: this.lang.OurFees,
            link: this.getLink(this.constants.RoutePaths.OurFees)
          }
        ]
      },
      {
        heading: this.lang.Explore,
        children: [
          {
            title: this.lang.MarketStatistics,
            link: this.getLink(this.constants.RoutePaths.Market)
          },
          {
            title: this.lang.Security,
            link: this.getLink(this.constants.RoutePaths.Security)
          },

          {
            title: this.lang.AboutUs,
            link: this.getLink(this.constants.RoutePaths.AboutUs)
          }
        ]
      },
      {
        heading: this.lang.Support,
        children: [
          {
            title: this.lang.SupportCenter,
            link: this.getLink(this.constants.RoutePaths.Support)
          },
          {
            title: this.lang.KnowledgeBase,
            link: this.getLink(this.constants.RoutePaths.KnowledgeBase)
          },
          {
            title: this.lang.FAQ,
            link: this.getLink(this.constants.RoutePaths.FAQ)
          }
        ]
      }
    ];
  }
}
