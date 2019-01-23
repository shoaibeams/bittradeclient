import * as React from "react";
import { mdCallResponse } from "../../../models/call-response";
import { BaseComponent } from "../../../app/components/base/BaseComponent";
import { StaticHelper } from "../../../shared/static-helper";
import "./table.component.css"

export default class TableComponent extends BaseComponent {

    render() {
        this.initShorts();
        let cols = this.p.settings.columns;
        let renderComponent = (RComponent, props)=> {
            return <><RComponent {...props}/></>
        }
        return (
            <table {...this.p.settings.attr} className={this.p.settings.attr.className + ' smart-table'} >
                <thead>
                    <tr>
                        {
                            Object.keys(cols).map((m, i) => {
                                return <th key={i} style={cols[m].cellStyle}>{cols[m].title}</th>
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        this.p.data.map((d, i) => {
                            return <tr key={i}
                                className={this.p.settings.rowClassFunction ? this.p.settings.rowClassFunction() : ''}>
                                {
                                    Object.keys(cols).map((c, j) => {
                                        let value: any;
                                        if (cols[c].valuePrepareFunction) {
                                            value = cols[c].valuePrepareFunction(d[c], d, i);
                                        }
                                        else
                                        {
                                            value = d[c];
                                        }
                                        if(cols[c].renderComponent)
                                        {
                                            let RComponent = cols[c].renderComponent;
                                            return <td key={j}><RComponent {...this.props} params={{renderValue:value}}/></td>
                                        }
                                        return <td key={j} style={cols[c].cellStyle}>{value}</td>
                                    })
                                }
                            </tr>
                        })
                    }
                </tbody>
            </table>
        );
    }

    constructor(props) {
        super(props);
        this.init();
    }

    init() {
        this.state = {
            data: []
        }
    }

}