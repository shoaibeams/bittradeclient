import React from "react";
import { Card, Row } from "antd";
import { BaseComponent } from "../../base/BaseComponent";
import { Link } from "react-router-dom";
import "./BlogsCard.less";

export default class BlogsCard extends BaseComponent {
  render() {
    return (
      <>
        <Card>
          <h1 className="logo-text heading-big gx-text-center">
            Blogs To Read
          </h1>
          <hr className="heading-bottom-line gx-text-center" />
          <Row className="sto-blog-row gx-text-center fade-in-bottom">
            {this.antd.colmd12(
              <Link
                to={this.getLink(this.constants.RoutePaths.RealEstate)}
                className="heading-small blog-card"
              >
                <Card
                  className=""
                  id="other"
                  cover={
                    <img
                      alt="RealEstate"
                      src="/assets/images/scotland-edinburgh.jpg"
                    />
                  }
                >
                  <h1 className="heading-small">{this.lang.ArticleHeading2}</h1>
                </Card>
              </Link>
            )}

            {this.antd.colmd12(
              <Link
                to={this.getLink(this.constants.RoutePaths.Travel)}
                className="heading-small blog-card"
              >
                <Card
                  cover={<img alt="Travel" src="/assets/images/travel.jpg" />}
                  className=""
                >
                  <h1 className="heading-small">{this.lang.ArticleHeading1}</h1>
                </Card>
              </Link>
            )}
          </Row>
        </Card>
      </>
    );
  }
}
