import React from "react";
import { BaseComponent } from "../base/BaseComponent";
import BannerComponent from "./banner/BannerComponent";
import WalletComponent from "./wallet/WalletComponent";
import ServicesComponent from "./services/ServicesComponent";
import HowItWorksComponent from "./howitworks/HowItWorksComponent";
import TradeBriefHistoryComponent from "./tradebriefhistory/TradeBriefHistoryComponent";
import MapComponent from "./map/MapComponent";
import { StaticHelper } from "../../../shared/static-helper";
import { SocketCustomEvents } from "../../../enums/socket";

export default class HomeComponent extends BaseComponent {
  render() {
    return (
      <>
        <BannerComponent {...this.props} />
        <WalletComponent {...this.props} />
        <ServicesComponent {...this.props} />
        <HowItWorksComponent {...this.props} />
        <TradeBriefHistoryComponent {...this.props} />
        <MapComponent {...this.props} />
      </>
    );
  }

  componentWillUnmount = () => {
    this.socket.unregisterEvent(
      SocketCustomEvents.SubscribeToBriefRecentHistory
    );
  };

  subscribedToBriefHistory = false;
  constructor(props) {
    super(props);
    this.subscribedToBriefHistory = this.SubscribeToBriefRecentHistory(this.subscribedToBriefHistory);
  }

  afterReceivingProps = () => {
    this.subscribedToBriefHistory = this.SubscribeToBriefRecentHistory(this.subscribedToBriefHistory);
  };
}
