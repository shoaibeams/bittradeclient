import React from "react";
import { BaseComponent } from "../base/BaseComponent";
import "./Blockchain.less";
import ImageAndCaption from "./ImageAndCaption";
import TextAndHeading from "./TextAndHeading";

class Blockchain extends BaseComponent {
  renderContent = () => {
    const {
      BlockChainPageCaption,
      Introduction,
      TravelPaperPara1,
      TravelPaperPara2,
      TravelPaperPara3,
      TravelPaperPara4,
      TravelPaperHeading1,
      TravelPaperHeading2,
      TravelPaperHeading3,
      TravelPaperHeading4,
      RealEstatePaperHeading1,
      RealEstatePaperHeading2,
      RealEstatePaperHeading3,
      RealEstatePaperHeading4,
      RealEstatePaperHeading5,
      RealEstatePaperPara1,
      RealEstatePaperPara2,
      RealEstatePaperPara3,
      RealEstatePaperPara4,
      RealEstatePaperPara5
    } = this.lang;

    if (this.props) {
      const blockchainSelector = this.props.history.location.pathname.replace(
        "/blockchain/",
        ""
      );
      if (blockchainSelector === "travel") {
        return (
          <>
            <div className="row">
              <div className="col-left">
                <div className="paper-container">
                  <TextAndHeading
                    heading={TravelPaperHeading1}
                    para={TravelPaperPara1}
                  >
                    <h1>{Introduction}</h1>
                  </TextAndHeading>
                </div>
              </div>

              <div className="col-right">
                <ImageAndCaption
                  src={"/assets/images/travel.jpg"}
                  caption={BlockChainPageCaption}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-right">
                <ImageAndCaption src={"/assets/images/problem.jpg"} />
              </div>

              <div className="col-left">
                <TextAndHeading
                  heading={TravelPaperHeading2}
                  para={TravelPaperPara2}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-left">
                <div className="paper-container">
                  <TextAndHeading
                    heading={TravelPaperHeading3}
                    para={TravelPaperPara3}
                  />
                </div>
              </div>

              <div className="col-right">
                <div className="paper-container image scale-in-center">
                  <ImageAndCaption src={"/assets/images/coins.webp"} />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-right">
                <div className="paper-container image scale-in-center">
                  <ImageAndCaption src={"/assets/images/plans.jpg"} />
                </div>
              </div>

              <div className="col-left">
                <div className="paper-container">
                  <TextAndHeading
                    heading={TravelPaperHeading4}
                    para={TravelPaperPara4}
                  />
                </div>
              </div>
            </div>
          </>
        );
      } else {
        return (
          <>
            <div className="row">
              <div className="col-left">
                <TextAndHeading
                  heading={RealEstatePaperHeading1}
                  para={RealEstatePaperPara1}
                />
              </div>

              <div className="col-right">
                <ImageAndCaption
                  src={"/assets/images/scotland-edinburgh.webp"}
                  caption={BlockChainPageCaption}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-right">
                <ImageAndCaption src={"/assets/images/scotland-edinburgh-city-centre.webp"} />
              </div>

              <div className="col-left">
                <div className="paper-container">
                  <TextAndHeading
                    heading={RealEstatePaperHeading2}
                    para={RealEstatePaperPara2}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-left">
                <div className="paper-container">
                  <TextAndHeading
                    heading={RealEstatePaperHeading3}
                    para={RealEstatePaperPara3}
                  />
                </div>
              </div>

              <div className="col-right">
                <div className="paper-container image scale-in-center">
                  <ImageAndCaption src={"/assets/images/chain.jpg"} />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-right">
                <div className="paper-container image scale-in-center">
                  <ImageAndCaption src={"/assets/images/emergence.webp"} />
                </div>
              </div>

              <div className="col-left">
                <div className="paper-container">
                  <TextAndHeading
                    heading={RealEstatePaperHeading4}
                    para={RealEstatePaperPara4}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-left">
                <div className="paper-container">
                  <TextAndHeading
                    heading={RealEstatePaperHeading5}
                    para={RealEstatePaperPara5}
                  />
                </div>
              </div>

              <div className="col-right">
                <div className="paper-container">
                  <div className="paper-container image scale-in-center">
                    <ImageAndCaption src={"/assets/images/outside-london-office.webp"} />
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      }
    }
  };

  render() {
    return <>{this.renderContent()}</>;
  }
}
export default Blockchain;
