import { BaseComponent } from "../base/BaseComponent";
import * as React from "react";
import { Link } from "react-router-dom";
import { StaticHelper } from "../../../shared/static-helper";
import { mdFormControl } from "../../../shared/form-control";
import { Transitions } from "../../../models/transitions";

export default class WalletComponent extends BaseComponent {

    render() {
        this.initShorts();
        let sortedPairs: any[] = [];
        if (this.g.briefHistory) {
            sortedPairs = this.g.briefHistory.sort((a, b) => {
                if (a.volume > b.volume) {
                    return -1;
                }
                else {
                    return 1;
                }
            });
            this.firstPair = sortedPairs.length > 0 ? sortedPairs[0] : {};
            this.secondPair = sortedPairs.length > 1 ? sortedPairs[1] : {};
            this.thirdPair = sortedPairs.length > 2 ? sortedPairs[2] : {};
            this.fourthPair = sortedPairs.length > 3 ? sortedPairs[3] : {};
        }
        let getWalletBox = (pair: any, last: mdFormControl, volume: mdFormControl) => {
            return (
                <div className="col-md-3 col-sm-6">
                    <div className="walletbox">
                        <h2>
                            <img width="34" height="34" src={pair.fc_icon} />
                            {pair.fc_name}/{pair.tc_name}
                            <span>24h</span>
                        </h2>
                        <div className="p">{this.lang.Last}&nbsp;
                            {
                                this.animatedCSSDiv(
                                    <b>
                                        {(pair.tc_symbol ? pair.tc_symbol : "") + "" + (pair.last ? pair.last : "")}
                                    </b>, last)
                            }
                            <br />
                            {this.lang.Volume}
                            &nbsp;
                                {
                                this.animatedCSSDiv(
                                    <b>
                                        {(pair.volume ? pair.volume : "") + " " + (pair.tc_name ? pair.tc_name : "")}
                                    </b>, volume)
                            }
                        </div>
                    </div>
                </div>
            );
        }
        if (sortedPairs.length > 0) {
            if (this.old) {
                this.setAnimValuesForPair();
            }
            else {
                this.old = sortedPairs;
            }
        }
        // this.log.debug("render wallet");
        return (
            <section className="walletwrap clearfix">
                <div className="container">
                    <div className="row">
                        {
                            getWalletBox(this.firstPair, this.state.animValues.firstLast, this.state.animValues.firstVolume)
                        }
                        {
                            getWalletBox(this.secondPair, this.state.animValues.secondLast, this.state.animValues.secondVolume)
                        }
                        {
                            getWalletBox(this.thirdPair, this.state.animValues.thirdLast, this.state.animValues.thirdVolume)
                        }
                        {
                            getWalletBox(this.fourthPair, this.state.animValues.fourthLast, this.state.animValues.fourthVolume)
                        }
                    </div>
                </div>
            </section>
        );
    }

    constructor(props) {
        super(props);
        this.init();
    }

    firstPair: any = {};
    secondPair: any = {}
    thirdPair: any = {};
    fourthPair: any = {};
    old: any[];

    init() {
        this.state = {
            animValues: {
                firstLast: new mdFormControl(this.getTransisition(Transitions.origional), 'firstLast'),
                firstVolume: new mdFormControl(this.getTransisition(Transitions.origional), 'firstVolume'),
                secondLast: new mdFormControl(this.getTransisition(Transitions.origional), 'secondLast'),
                secondVolume: new mdFormControl(this.getTransisition(Transitions.origional), 'secondVolume'),
                thirdLast: new mdFormControl(this.getTransisition(Transitions.origional), 'thirdLast'),
                thirdVolume: new mdFormControl(this.getTransisition(Transitions.origional), 'thirdVolume'),
                fourthLast: new mdFormControl(this.getTransisition(Transitions.origional), 'fourthLast'),
                fourthVolume: new mdFormControl(this.getTransisition(Transitions.origional), 'fourthVolume'),
            }
        }
    }

    setAnimValuesForPair() {
        let animValues = {
            ...this.state.animValues
        };
        if (this.old != null) {
            let old = this.old.filter(m => m.id == this.firstPair.id)[0];
            let index = this.old.indexOf(old);
            //setting last
            if (old.last > this.firstPair.last) {
                animValues.firstLast = new mdFormControl(this.runTransition(Transitions.lesser), 'firstLast')
            }
            else if (old.last < this.firstPair.last) {
                animValues.firstLast = new mdFormControl(this.runTransition(Transitions.greater), 'firstLast')
            }
            else {
                animValues.firstLast = new mdFormControl(this.runTransition(Transitions.origional), 'firstLast')
            }

            //setting volume
            if (old.volume > this.firstPair.volume) {
                animValues.firstVolume = new mdFormControl(this.runTransition(Transitions.lesser), 'firstVolume')
            }
            else if (old.volume < this.firstPair.volume) {
                animValues.firstVolume = new mdFormControl(this.runTransition(Transitions.greater), 'firstVolume')
            }
            else {
                animValues.firstVolume = new mdFormControl(this.runTransition(Transitions.origional), 'firstVolume')
            }
            if(animValues.firstLast.value != 'origional' || animValues.firstVolume.value != 'origional')
            {
                this.old[index] = this.firstPair;
            }

            old = this.old.filter(m => m.id == this.secondPair.id)[0];
            index = this.old.indexOf(old);
            //setting last
            if (old.last > this.secondPair.last) {
                animValues.secondLast = new mdFormControl(this.runTransition(Transitions.lesser), 'secondLast')
            }
            else if (old.last < this.secondPair.last) {
                animValues.secondLast = new mdFormControl(this.runTransition(Transitions.greater), 'secondLast')
            }
            else {
                animValues.secondLast = new mdFormControl(this.runTransition(Transitions.origional), 'secondLast')
            }

            //setting volume
            if (old.volume > this.secondPair.volume) {
                animValues.secondVolume = new mdFormControl(this.runTransition(Transitions.lesser), 'secondVolume')
            }
            else if (old.volume < this.secondPair.volume) {
                animValues.secondVolume = new mdFormControl(this.runTransition(Transitions.greater), 'secondVolume')
            }
            else {
                animValues.secondVolume = new mdFormControl(this.runTransition(Transitions.origional), 'secondVolume')
            }
            if(animValues.secondLast.value != 'origional' || animValues.secondVolume.value != 'origional')
            {
                this.old[index] = this.secondPair;
            }

            old = this.old.filter(m => m.id == this.thirdPair.id)[0];
            index = this.old.indexOf(old);
            //setting last
            if (old.last > this.thirdPair.last) {
                animValues.thirdLast = new mdFormControl(this.runTransition(Transitions.lesser), 'thirdLast')
            }
            else if (old.last < this.thirdPair.last) {
                animValues.thirdLast = new mdFormControl(this.runTransition(Transitions.greater), 'thirdLast')
            }
            else {
                animValues.thirdLast = new mdFormControl(this.runTransition(Transitions.origional), 'thirdLast')
            }

            //setting volume
            if (old.volume > this.thirdPair.volume) {
                animValues.thirdVolume = new mdFormControl(this.runTransition(Transitions.lesser), 'thirdVolume')
            }
            else if (old.volume < this.thirdPair.volume) {
                animValues.thirdVolume = new mdFormControl(this.runTransition(Transitions.greater), 'thirdVolume')
            }
            else {
                animValues.thirdVolume = new mdFormControl(this.runTransition(Transitions.origional), 'thirdVolume')
            }
            if(animValues.thirdLast.value != 'origional' || animValues.thirdVolume.value != 'origional')
            {
                this.old[index] = this.thirdPair;
            }

            old = this.old.filter(m => m.id == this.fourthPair.id)[0];
            index = this.old.indexOf(old);
            //setting last
            if (old.last > this.fourthPair.last) {
                animValues.fourthLast = new mdFormControl(this.runTransition(Transitions.lesser), 'fourthLast')
            }
            else if (old.last < this.fourthPair.last) {
                animValues.fourthLast.value = new mdFormControl(this.runTransition(Transitions.greater), 'fourthLast')
            }
            else {
                animValues.fourthLast.value = new mdFormControl(this.runTransition(Transitions.origional), 'fourthLast')
            }

            //setting volume
            if (old.volume > this.fourthPair.volume) {
                animValues.fourthVolume = new mdFormControl(this.runTransition(Transitions.lesser), 'fourthVolume')
            }
            else if (old.volume < this.fourthPair.volume) {
                animValues.fourthVolume.value = new mdFormControl(this.runTransition(Transitions.greater), 'fourthVolume')
            }
            else {
                animValues.fourthVolume.value = new mdFormControl(this.runTransition(Transitions.lesser), 'fourthVolume')
            }
            if(animValues.fourthLast.value != 'origional' || animValues.fourthVolume.value != 'origional')
            {
                this.old[index] = this.fourthPair;
            }
        }

        this.state = {
            ...this.state,
            animValues: animValues,
        }
    }

}