import * as React from "react";
import "./progress-bar.component.css";
import { BaseComponent } from "../../../components/base/BaseComponent";

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