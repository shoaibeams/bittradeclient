import * as React from "react";
import "./spinner.component.css"
import { BasicBaseComponent } from "../../../components/base/BasicBaseComponent";

export default class NBSpinnerComponent extends BasicBaseComponent {

    render() {
        this.initShorts();
        return (
            <>
                {
                    this.p.show ? (
                        <div className="medium-spinner active-spinner nb-spinner" >
                            <span className="spin-circle"></span>
                            <span className="message">{this.p.title}</span>
                        </div>
                    ) : null
                }
            </>
        );
    }

    constructor(props) {
        super(props);
        this.init();
    }

    init() {
    }

}