import React = require("react");
import { BaseComponent } from "../base/BaseComponent";
import { mdFormControl } from "../../../shared/form-control";
import { StaticHelper } from "../../../shared/static-helper";
import { mdCallResponse } from "../../../models/call-response";
import BannerComponent from "./BannerComponent";
import WalletComponent from "./WalletComponent";
import ServicesComponent from "./ServicesComponent";
import HowItWorksComponent from "./HowItWorksComponent";
import TradeBriefHistoryComponent from "./TradeBriefHistoryComponent";
import TrackRateComponent from "./TrackRateComponent";
import MapComponent from "./MapComponent";

export default class HomeComponent extends BaseComponent {

    render() {
        return (
            <>
                <BannerComponent {...this.props} />
                <WalletComponent {...this.props} />
                <ServicesComponent {...this.props} />
                <HowItWorksComponent {...this.props}/>
                <TradeBriefHistoryComponent {...this.props} />
                <TrackRateComponent {...this.props}/>
                <MapComponent {...this.props} />
            </>
        );
    }


    // componentDidMount() {
    //     this.updateState({
    //         ...this.state
    //     });
    // }

    constructor(props) {
        super(props);
        this.init();
    }

    init() {
        // this.loadCurrencies();
    }

}
