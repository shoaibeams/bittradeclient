import * as React from 'react';
import { mdFormControl } from '../../shared/form-control';
import { mdGlobalProps } from '../../models/props';

export default class SharedComponent {

    static getErrosDiv(errors: any[]) {
        if (!errors) {
            return (null);
        }
        return (errors.length > 0 ? (
            <div className="invalid-feedback">
                <div key={0}>{errors[0]}</div>
            </div>
        ) : (null)
        );
    }

    static textFormControl(control: mdFormControl, onInput?, formGroup: boolean = true) {
        let inputHandler = onInput ? (e) => { onInput(control.name, e) } : null;
        let inputElement = () => {
            return (
                <>
                    <input
                        onInput={inputHandler}
                        className={`form-control ${control.errors.length > 0 ? 'is-invalid' : ''}`}
                        placeholder={control.title}
                        defaultValue={control.value}
                    />
                    {
                        SharedComponent.getErrosDiv(control.errors)
                    }
                </>
            )
        };


        if (!formGroup) {
            return inputElement();
        }
        return (
            <div className="form-group">
                {inputElement()}
            </div>
        );
    }

    static textareaStyle = {
        height: 'auto',
    };

    static textareaFormControl(control: mdFormControl, onInput?, formGroup: boolean = true) {
        let inputHandler = onInput ? (e) => { onInput(control.name, e) } : null;
        let inputElement = () => {
            return (
                <>
                    <textarea
                        onInput={inputHandler}
                        className={`form-control ${control.errors.length > 0 ? 'is-invalid' : ''}`}
                        style={this.textareaStyle}
                        rows={4}
                        placeholder={control.title}
                        defaultValue={control.value}></textarea>
                    {
                        SharedComponent.getErrosDiv(control.errors)
                    }
                </>
            )
        };


        if (!formGroup) {
            return inputElement();
        }
        return (
            <div className="form-group">
                {inputElement()}
            </div>
        );
    }

    static getSubmitResponseDiv(clas: string, text: string, show: boolean) {
        if (!show) {
            return (null);
        }

        return (
            <strong>
                <div className={`${clas} text-bold`}>{text}</div>
            </strong>
        );
    }

    static getCurrencyPairDropDown(instance, globals: mdGlobalProps, currencyPairChangeCallback, showLabel: boolean = false) {
        return (
            <ul>
                {showLabel ? <li className="inline-block cp-label">Currency Pair</li> : null}
                <li className="dropdown inline-block">
                    <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                        <span>{globals.selectedCurrencyPair.fc_name}</span>
                        <span className="cp-splitter">/</span>
                        <b>{globals.selectedCurrencyPair.tc_name}</b>
                        <i className="fa fa-angle-down" aria-hidden="true"></i>
                    </a>
                    <ul className="dropdown-menu mymenu">
                        {
                            globals.currencyPairs.map((cp, i) => {
                                return (
                                    <li key={i} onClick={currencyPairChangeCallback.bind(instance, cp.id)}>
                                        <a>{cp.fc_name}<span className="cp-splitter">/</span><b>{cp.tc_name}</b></a>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </li>
            </ul>
        );
    }

}