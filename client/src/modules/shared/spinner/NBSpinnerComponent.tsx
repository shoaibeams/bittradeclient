import * as React from "react";
import { mdCallResponse } from "../../../models/call-response";
import { BaseComponent } from "../../../app/components/base/BaseComponent";
import { StaticHelper } from "../../../shared/static-helper";
import "./spinner.component.css"

export default class NBSpinnerComponent extends BaseComponent {

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