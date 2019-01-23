import * as React from "react";
import { BaseComponent } from "../../../app/components/base/BaseComponent";
import "./progress-bar.component.css";

export default class ProgressBarComponent extends BaseComponent {

    render() {
        this.initShorts();
        return (
            <div className={`progress-container ${this.p.size ? '' + this.p.size : ''}`}>
                <div className={`progress-value ${status ? '' + status : ''}`} style={{ width: this.p.value + '%' }}>
                    {
                        this.p.displayValue ? (<span>{this.p.value}%</span>) : null
                    }

                </div>
            </div>
        );
    }

    constructor(props) {
        super(props);
        this.init();
    }

    init() {
    }

}