import { BaseComponent } from "../base/BaseComponent";
import * as React from "react";
import { Link } from "react-router-dom";
import { StaticHelper } from "../../../shared/static-helper";
import { mdFormControl } from "../../../shared/form-control";

export default class TrackRateComponent extends BaseComponent {

    render() {
        this.initShorts();
        return (
            <section className="trackratewrap clearfix">
                <div className="container">
                    <ul className="nav nav-tabs">
                        <li><a data-toggle="tab" href="#home">Day <i></i></a></li>
                        <li><a data-toggle="tab" href="#menu1">Week <i></i></a></li>
                        <li className="active"><a data-toggle="tab" href="#menu2">Month <i></i></a></li>
                    </ul>
                    <div className="tab-content">
                        <div id="home" className="tab-pane fade">

                            <img src="assets/images/graph.png" className="img-responsive" alt="Graph" />

                        </div>
                        <div id="menu1" className="tab-pane fade">
                            <p>Some content in menu 1.</p>
                        </div>
                        <div id="menu2" className="tab-pane fade in active">

                            <img src="assets/images/graph.png" className="img-responsive" alt="Graph" />

                            <div className="text-center"> <a href="#" className="track-btn">Track this Exchange Rate</a> </div>
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