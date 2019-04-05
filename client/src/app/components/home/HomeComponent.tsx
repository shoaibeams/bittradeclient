import * as React from "react";
import { BaseComponent } from "../base/BaseComponent";
import BannerComponent from "./banner/BannerComponent";
import WalletComponent from "./wallet/WalletComponent";
import ServicesComponent from "./services/ServicesComponent";
import HowItWorksComponent from "./howitworks/HowItWorksComponent";
import TradeBriefHistoryComponent from "./tradebriefhistory/TradeBriefHistoryComponent";
// import TrackRateComponent from "./TrackRateComponent";z
import MapComponent from "./map/MapComponent";

export default class HomeComponent extends BaseComponent {

  render() {
    return (
      <>
        <BannerComponent {...this.props} />
        <WalletComponent {...this.props} />
        <ServicesComponent {...this.props} />
        <HowItWorksComponent {...this.props} />
        <TradeBriefHistoryComponent {...this.props} />
        {/* <TrackRateComponent {...this.props} /> */}
        <MapComponent {...this.props} />
      </>
    );
  }


  constructor(props) {
    super(props);
    this.init();
  }

  init() {
    // this.loadCurrencies();
  }

}
