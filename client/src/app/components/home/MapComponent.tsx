import { BaseComponent } from "../base/BaseComponent";
import * as React from "react";
import { Link } from "react-router-dom";
import { StaticHelper } from "../../../shared/static-helper";
import { mdFormControl } from "../../../shared/form-control";

export default class MapComponent extends BaseComponent {

    render() {
        this.initShorts();
        return (
            <section className="worldwrap clearfix">
                <div className="container">
                    <h2>Covering major Eurpeon countries and US</h2>
                    <div className="world-txt text-center">We offer easy and simple steps to buy crypto taking hassle away from our
                        clients
                        letting them focus on things that actually matter the cryptocurrency marketcap is always
                increasing and is expected to reach multi trillion dollar industry </div>
                </div>
                <div className="container-fluid">
                    <img src="assets/images/world-map.png" className="img-responsive" alt="World Map" />
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-4">
                            <h3>Part Buying</h3>
                            <p>Schedule weekly or monthly direct debits from your account for buying cryptocurrency in parts.</p>
                        </div>
                        <div className="col-sm-4">
                            <h3>Support</h3>
                            <p>We target to ensure that your query is answered in best possible way with guidance on Account
                        verification, KYC, Fiat deposits, Security and Trading</p>
                        </div>
                        <div className="col-sm-4">
                            <h3>API</h3>
                            <p>Our restful APIs will be available soon for integration.</p>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    constructor(props) {
        super(props);
    }

}