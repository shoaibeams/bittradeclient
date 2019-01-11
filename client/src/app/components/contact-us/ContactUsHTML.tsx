import { BaseComponent } from "../BaseComponent";
import * as React from 'react';
import { CSSProperties } from "@emotion/serialize";
import css from "@emotion/css";
import SharedComponent from "../SharedComponent";

export class ContactUsHTML extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {
            form: props.form
        }
    }

    render() {
        this.initShorts();
        return (
            <div className="mainpage clearfix">
                <section className="signupwrap clearfix">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6 col-md-offset-3 col-sm-12 ">
                                <p className="h3">{this.lang.ContactUs}</p>
                                <form onSubmit={this.p.onSubmit}>
                                    <div className="signupbox clearfix">
                                        <div className="tab-content">
                                            <div id="Individual" className="tab-pane fade in active">
                                                <div className="row">
                                                    <div className="col-sm-12">
                                                        {
                                                            SharedComponent.textFormControl(this.f.name, this.p.handleChange)
                                                        }
                                                    </div>
                                                    <div className="col-sm-12">
                                                        {
                                                            SharedComponent.textFormControl(this.f.contact_no, this.p.handleChange)
                                                        }
                                                    </div>
                                                    <div className="col-sm-12">
                                                        {
                                                            SharedComponent.textFormControl(this.f.email, this.p.handleChange)
                                                        }
                                                    </div>
                                                    <div className="col-sm-12">
                                                        {
                                                            SharedComponent.textareaFormControl(this.f.message, this.p.handleChange)
                                                        }
                                                    </div >
                                                    <div className="col-sm-12 form-group">
                                                        <button type="submit" className="btn-primary signup-btn " disabled={this.f.diableSubmitButton} >{this.lang.Submit}</button>
                                                    </div >
                                                    <div className="col-sm-12">
                                                    {
                                                        SharedComponent.getSubmitResponseDiv(this.f.submitResponseClass, 
                                                            this.f.submitResponse, this.f.showSubmitResponse)
                                                    }
                                                    </div >
                                                </div >
                                            </div >
                                        </div >
                                    </div >
                                </form >
                            </div >
                        </div >
                    </div >
                </section >
            </div >
        );
    }
}