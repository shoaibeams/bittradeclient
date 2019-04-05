import * as React from "react";
import { Link } from "react-router-dom";
import { BaseComponent } from "../base/BaseComponent";
import { StaticHelper } from "../../../shared/static-helper";
import './not-found.component.css';


export default class NotFoundComponent extends BaseComponent {

    render() {
        this.initShorts();
        return (
            <div className="signupwrap not-found" style={{height:'100%'}}>
                <h1 style={{color:'#92a4ad', fontSize:'2em'}}>{this.pageNotFoundText}</h1>
                <section className="error-container">
                    <span>4</span>
                    <span><span className="screen-reader-text">0</span></span>
                    <span>4</span>
                </section>
                <div className="link-container">
                    <Link to={this.getLink(this.constants.RoutePaths.Home)} className="more-link">{this.lang.BackToHome}</Link>
                </div>
            </div>
        );
    }

    pageNotFoundText: string;
    constructor(props) {
        super(props);
        this.init();
    }

    init() {
        this.pageNotFoundText = StaticHelper.formatString(this.lang.NotFoundFormat, this.lang.Page);
    }

}