import * as React from "react";
import { BaseComponent } from "../../base/BaseComponent";
import Widget from "../../../../components/Widget/index";
import "./map-component.less";
import { Row } from "antd";

export default class MapComponent extends BaseComponent {
  render() {
    this.initShorts();
    return (
      <Widget
        styleName="gx-order-history"
        title={
          <h2 className="h4 gx-text-capitalize gx-mb-0">{this.lang.Market}</h2>
        }
        extra={<p className="gx-text-primary gx-mb-0 gx-pointer">{""}</p>}
      >
        <div className="worldwrap">
          <div className="container gx-text-center">
            <h1>{this.lang.MapComponentHeading}</h1>
            <div className="world-txt">{this.lang.MapComponentPara}</div>
          </div>
          <div className="container-fluid">
            <img
              src="/assets/images/world-map.png"
              className="img-responsive"
              alt="World Map"
            />
          </div>
        </div>
        <Row className="servicewrap">
          {this.antd.colmd8(
            <>
              <h2>{this.lang.PartBuying}</h2>
              <p>{this.lang.PartBuyingPara}</p>
            </>
          )}
          {this.antd.colmd8(
            <>
              <h2>{this.lang.Support}</h2>
              <p>{this.lang.SupportPara}</p>
            </>
          )}
          {this.antd.colmd8(
            <>
              <h2>{this.lang.API}</h2>
              <p>{this.lang.APIPara}</p>
            </>
          )}
        </Row>
      </Widget>
    );
  }

  constructor(props) {
    super(props);
  }
}
