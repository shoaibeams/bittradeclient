import React = require("react");
import { mdProps, mdPropKeys, mdGlobalProps } from "../../../models/props";
import { Constants, StaticConstatns } from "../../../shared/constants";
import { mdFormControl } from "../../../shared/form-control";
import { ValidateParams, ValidationAttributeResponse, Validation } from "../../../shared/validations";
import { StaticHelper } from "../../../shared/static-helper";
import mdTransitions, { Transitions, mdTransition } from "../../../models/transitions";
import ReCAPTCHA from "react-google-recaptcha";
import DatePickerComponent from "../../../modules/shared/date-picker/DatePickerComponent";
import { BasicBaseComponent } from "./BasicBaseComponent";
import { TransitionState } from "../../../enums/transition";
import history from '../../../shared/history';


export class BaseComponent extends BasicBaseComponent {

    constructor(props, extractFromProp?: boolean) {
        super(props);
        this.initClasses(extractFromProp);
    }

    // componentWillReceiveProps(nextProps) {
    //     this.setState({ form: nextProps.form });
    //     this.initShorts();
    // }

    // shouldComponentUpdate(nextProps, nextState) {
    //     return this.state.form != nextState.form;
    // }

    updateAnimValue(animName: string, value: Transitions, tstate = TransitionState.NotStarted) {
        let animValues = {
            ...this.state.animValues,
        }

        animValues[animName].value = this.getTransisition(value, tstate);
        this.updateState({
            animValues: animValues
        })
    }

    getTransisition(transition: Transitions, tstate: TransitionState = TransitionState.NotStarted) {
        let t = global.transitions[transition];
        t.state = tstate;
        return t;
    }

    runTransition(transition: Transitions) {
        return this.getTransisition(transition, TransitionState.Running);
    }

    handleFormControlInput = (field, e, formName: string = null) => {
        if (!e) {
            return;
        }
        if(this.isNullOrEmpty(formName))
        {
            formName = this.defaultFormName;
        }
        let form = this.state[formName];
        form[field].value = e.target.value;
        if (formName == this.defaultFormName) {
            if (this.showErrors) {
                form[field] = this.validateFormControl(form[field]);
            }
        }
        else {
            if(form.showErrors)
            {
                form[field] = this.validateFormControl(form[field]);
            }
        }
        let state = this.state;
        StaticHelper.assignPropertyOfObject(state, formName, form);
        this.updateState({ ...state });
    }

    handleCaptchaInput = (field, e, formName: string = null) => {
        this.log.debug("captcha value: ", field);
        if (!e) {
            return;
        }
        if(this.isNullOrEmpty(formName))
        {
            formName = this.defaultFormName;
        }
        let form = this.state[formName];
        form[field].value = e;
        if (formName == this.defaultFormName) {
            if (this.showErrors) {
                form[field] = this.validateFormControl(form[field]);
            }
        }
        else {
            if(form.showErrors)
            {
                form[field] = this.validateFormControl(form[field]);
            }
        }
        let state = this.state;
        StaticHelper.assignPropertyOfObject(state, formName, form);
        this.updateState({ ...state });
    }

    validateFormControl(control: mdFormControl) {
        let params: ValidateParams = new ValidateParams(control.value, control.title, control.validators);
        let response: ValidationAttributeResponse = Validation.Validate([params]);
        if (!response.isValid) {
            control.errors = [...response.errors];
        }
        else {
            control.errors = [];
        }
        return control;
    }

    validateForm(formName: string) {
        let isValid = true;
        let form = this.state[formName];

        let keys = Object.keys(form);
        keys.forEach(k => {
            let control = form[k] as mdFormControl;
            if (control) {
                if (control.validators != null) {
                    control = this.validateFormControl(form[k]);
                    form[k] = control;
                    if (control.errors.length > 0) {
                        isValid = false;
                    }
                }
            }
            else {
                this.log.debug("null control " + k);
            }
        });
        if (!isValid) {
            let targetObj = StaticHelper.assignPropertyOfObject({}, formName, form);
            this.updateState(targetObj);
        }
        return isValid;
    }

    getFormData(form: any) {
        let keys = Object.keys(form);
        let fd = {};
        keys.forEach(k => {
            fd = StaticHelper.assignPropertyOfObject(fd, k, form[k] ? form[k].value : null);
        });
        return fd;
    }

    isNullOrEmpty(value: any): boolean {
        return StaticHelper.isNullOrEmpty(value);
    }

    animatedCSSDiv(content: any, control: mdFormControl, callback?) {
        return this.animatedCSSDivInner(content, null, control, true, callback);
    }

    private animatedCSSDivInner(content: any, attr: any, control: mdFormControl, contentOnly: boolean, callback?, props?) {
        if (control) {
            let transition: mdTransition = control.value;
            let classes = '';
            if (transition.state == TransitionState.NotStarted) {
                classes = transition.before;
            }
            else if (transition.state == TransitionState.Running) {
                classes = transition.classes;
            }
            else if (transition.state == TransitionState.Completed) {
                classes = transition.after;
            }
            return (
                <div onAnimationEnd={(e) => { this.onAnimationEnd(control, callback, e); }}
                    {...attr}
                    className={`${contentOnly ? 'content-only' : ''} ${classes}`}
                    {...props}>
                    {content}
                </div>
            );
        }
        else {
            return <div
                className={`${contentOnly ? 'content-only' : ''}`}>
                {content}
            </div>;
        }
    }

    onAnimationEnd = (control: mdFormControl, callback, e: any) => {
        if (callback) {
            callback(e);
            return;
        }
        let t: mdTransition = control.value as mdTransition;
        t.state = TransitionState.Completed;
        control.value = t;
        let obj = StaticHelper.assignPropertyOfObject({}, control.name, control);
        let animValues = {
            ...this.state.animValues,
            ...obj
        }
        this.updateState({
            animValues: {
                ...animValues
            }
        });
        if(control.continousAnim)
        {
            setTimeout(() => {
                t.state = TransitionState.Running;
                control.value = t;
                let obj = StaticHelper.assignPropertyOfObject({}, control.name, control);
                let animValues = {
                    ...this.state.animValues,
                    ...obj,
                }
                this.updateState({
                    ...animValues
                });
            }, 500);
        }
    }

    animatedCSSDivWithAttr(content: any, attr: any, control: mdFormControl, callback?) {
        return this.animatedCSSDivInner(content, attr, control, false, callback);
    }

    showMainSpinner() {
        this.props.updateGlobalProperty(global.propKeys.showMainLoader, true);
    }

    hideMainSpinner() {
        this.props.updateGlobalProperty(global.propKeys.showMainLoader, false);
    }

    displayMessage(message: string): void {
        alert(message);
    }

    bulletList(array: string[], ...args) {
        // The string containing the format items (e.g. "{0}")
        // will and always has to be the first argument.
        if (array.length == 0) {
            return null;
        }
        return (
            <ul className="bullet-dot">
                {
                    array.map((m, i) => {
                        return (<li key={i}>{StaticHelper.formatString(array[i], ...args)}</li>);
                    })
                }
            </ul>
        );
    }

    getErrosDiv(errors: any[]) {
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

    textFormControl(control: mdFormControl, onInput?: any, formGroup: boolean = true, type: string = "text") {
        let inputHandler = onInput ? (e) => {
            if (!Array.isArray(onInput)) {
                onInput = [onInput];
            }
            onInput.forEach(f => {
                f(control.name, e);
            });
        } : null;
        let inputElement = () => {
            return (
                <>
                    <input
                        onInput={inputHandler}
                        className={`form-control ${control.errors.length > 0 ? 'is-invalid' : ''}`}
                        placeholder={control.title}
                        defaultValue={control.value}
                        type={type}
                    />
                    {
                        this.getErrosDiv(control.errors)
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

    datePickerFormControl(control: mdFormControl, onInput?: any, formGroup: boolean = true) {
        let inputHandler = onInput ? (e) => {
            if (!Array.isArray(onInput)) {
                onInput = [onInput];
            }
            onInput.forEach(f => {
                f(control.name, e);
            });
        } : null;
        let inputElement = () => {
            return (
                <>
                    <DatePickerComponent {...this.props} params={{
                        control: control,
                        onInput: inputHandler
                    }} />
                    {
                        this.getErrosDiv(control.errors)
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

    passwordFormControl(control: mdFormControl, onInput?: any, formGroup: boolean = true) {
        return this.textFormControl(control, onInput, formGroup, "password");
    }

    captchaFormControl(control: mdFormControl, onInput?, formGroup: boolean = true) {
        let inputHandler = onInput ? (e) => { onInput(control.name, e) } : null;
        let inputElement = () => {
            return (
                <>
                    <ReCAPTCHA
                        className={`no-form-control ${control.errors.length > 0 ? 'is-invalid' : ''}`}
                        sitekey={StaticConstatns.RecaptchaSiteKey}
                        onChange={inputHandler} />
                    {
                        this.getErrosDiv(control.errors)
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

    textareaStyle = {
        height: 'auto',
    };

    textareaFormControl(control: mdFormControl, onInput?, formGroup: boolean = true) {
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
                        this.getErrosDiv(control.errors)
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

    getSubmitResponseDiv(clas: string, text: string, show: boolean) {
        if (!show) {
            return (null);
        }

        return (
            <strong>
                <div className={`${clas} text-bold`}>{text}</div>
            </strong>
        );
    }

    getCurrencyPairDropDown(instance, globals: mdGlobalProps, currencyPairChangeCallback, showLabel: boolean = false) {
        return (
            <ul>
                {showLabel ? <li className="inline-block cp-label">Currency Pair</li> : null}
                <li className="dropdown inline-block">
                    <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                        <span>{globals.selectedCurrencyPair ? globals.selectedCurrencyPair.fc_name : ""}</span>
                        <span className="cp-splitter">/</span>
                        <b>{globals.selectedCurrencyPair ? globals.selectedCurrencyPair.tc_name : ""}</b>
                        <i className="fa fa-angle-down" aria-hidden="true"></i>
                    </a>
                    <ul className="dropdown-menu mymenu">
                        {
                            globals.currencyPairs ? (
                                globals.currencyPairs.map((cp, i) => {
                                    return (
                                        <li key={i} onClick={currencyPairChangeCallback.bind(instance, cp.id)}>
                                            <a>{cp.fc_name}<span className="cp-splitter">/</span><b>{cp.tc_name}</b></a>
                                        </li>
                                    )
                                })
                            ) : (null)
                        }
                    </ul>
                </li>
            </ul>
        );
    }

    numberInput(instance, control: mdFormControl, onInput?, step?: number, min?: number, max?: number, placeholder?: string, scale?: number) {

        let inputElement = () => {
            // console.log(control);
            return (
                <>
                    <input className={`form-control ${control.errors.length > 0 ? 'is-invalid' : ''}`}
                        onKeyDown={(e) => { if (!this.isNumberd(e)) { e.preventDefault(); } }}
                        onChange={(e) => { onInput(control.name, e) }}
                        min="0"
                        max={max}
                        type="number"
                        step={step}
                        value={control.value}
                        // defaultValue={control.value}
                        placeholder={placeholder ? placeholder : control.title}
                    />
                    {
                        this.getErrosDiv(control.errors)
                    }
                </>
            );
        }
        // console.log(inputElement())
        return inputElement();
        // let updownArrowsClick = (isAdd: boolean, isClick: boolean) => {
        //     if (!isClick) {
        //         let timer = instance.state.form[control.name].interval;
        //         if (!timer) {
        //             return;
        //         }
        //     }
        //     if (!step) {
        //         return;
        //     }
        //     if (step <= 0) {
        //         return;
        //     }
        //     let value = instance.state.form[control.name].value;
        //     if (StaticHelper.isNullOrEmpty(value)) {
        //         value = 0;
        //     }
        //     if (isAdd) {
        //         value += step;
        //     }
        //     else {
        //         value -= step;
        //     }
        //     value = StaticHelper.roundNumber(value, scale);
        //     if (max != null) {
        //         if (value > max) {
        //             value = max;
        //         }
        //     }
        //     if (min != null) {
        //         if (value < min) {
        //             value = min;
        //         }
        //     }
        //     onInput(control.name, {
        //         target: {
        //             value: value,
        //         }
        //     });
        // }
        // if (!step) {
        //     // return inputElement();
        // }
        // let removeInterval = () => {
        //     let ctrl = instance.state.form[control.name];
        //     clearInterval(ctrl.interval);
        //     // ctrl.interval = null;
        //     instance.updateState({
        //         form: {
        //             ...instance.state.form,
        //             ctrl
        //         }
        //     })
        // }
        // let placeInterval = (isAdd: boolean) => {
        //     let ctrl = instance.state.form[control.name];
        //     ctrl.interval = setInterval(() => {
        //         updownArrowsClick(isAdd, false);
        //     }, 100);
        //     instance.updateState({
        //         form: {
        //             ...instance.state.form,
        //             ctrl
        //         }
        //     })
        // }
        // return (
        //     <>
        //         <table className="number-input">
        //             <tbody>
        //                 <tr>
        //                     <td rowSpan={2}>
        //                         {
        //                             // inputElement()
        //                         }
        //                     </td>
        //                     <td className="up-arrow"
        //                         onMouseUp={removeInterval}
        //                         onMouseLeave={removeInterval}
        //                         onClick={(e) => { updownArrowsClick(true, true); }}
        //                     // onMouseDown={(e) =>{console.log("mousedonw");placeInterval(true)}}
        //                     >
        //                         <img src="assets/images/dropdown1-hover.png" />
        //                     </td>
        //                 </tr>
        //                 <tr>
        //                     <td className="down-arrow"
        //                         onMouseUp={removeInterval}
        //                         onMouseLeave={removeInterval}
        //                         onClick={(e) => { updownArrowsClick(false, true); }}
        //                     // onMouseDown={(e) =>{placeInterval(false);}}
        //                     >
        //                         <img src="assets/images/dropdown1.png" />
        //                     </td>
        //                 </tr>
        //             </tbody>
        //         </table>

        //     </>
        // );
    }

    isNumberd(e) {
        if (!e.target) {
            return false;
        }
        let prev = e.target.value;
        let value = prev.concat(e.key);
        if (value.split('.').length > 2) {
            return false;
        }
        let specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home', '-', "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Delete"];
        if (specialKeys.indexOf(e.key) !== -1) {
            return true;
        }

        if (StaticHelper.isNullOrEmpty(value)) {
            return false;
        }

        if (StaticHelper.testRegex(Constants.Instance.Regex.NumberWithDecimal, value)) {
            return true;
        }
        return false;
    }

    addNewLineHTML(text: string[]) {
        return (
            <>
                {
                    text.map((m, i) => {
                        return <React.Fragment key={i}>{m}{i == text.length - 1 ? (null) : <br />}</React.Fragment>
                    })
                }
            </>
        );
    }

    compareEnum(type, enumValue, value) {
        if (enumValue == value) {
            return true;
        }

        let val = type[enumValue];
        if (!this.isNullOrEmpty(val)) {
            if (val == value) {
                return true;
            }
            else {
                return false;
            }
        }
        val = type[value];
        if (!this.isNullOrEmpty(val)) {
            return true;
        }
        return false;
    }

    upperCaseFirstLetter(value: string) {
        if (this.isNullOrEmpty(value)) {
            return value;
        }
        let firstLetter = value.charAt(0).toUpperCase();
        if (value.length < 2) {
            return firstLetter;
        }
        else {
            return firstLetter + value.substring(1);
        }
    }

    formatEnumValue(enumValue: any, replace_: boolean = true, upperCase: boolean = true) {
        enumValue = enumValue.toString();
        if (replace_) {
            enumValue = enumValue.replace('_', ' ');
        }
        if (upperCase) {
            enumValue = enumValue.toUpperCase();
        }
        else {
            let splitted = enumValue.split(' ');
            splitted = splitted.map(m => {
                return this.upperCaseFirstLetter(m);
            })
            enumValue = splitted.join(" ");
        }
        return enumValue;
    }

    getAlertDiv() {
        if (!this.state.displayAlert) {
            return null;
        }
        return (<div className={this.state.alertClass}>{this.state.alertMessage}</div>);
    }

    showAlertDiv(isSuccess: boolean, message: any) {
        let classs = "";
        if (isSuccess) {
            classs = "alert alert-success";
        }
        else {
            classs = "alert alert-danger";
        }
        if (message) {
            if (!Array.isArray(message)) {
                message = message.split("\n");
            }
            message = this.bulletList(message);
        }
        this.updateState({
            alertMessage: message,
            displayAlert: true,
            alertClass: classs
        })
        setTimeout(() => {
            this.hideAlertDiv();
        }, this.constants.ResponseMessageTimeout * 1000);
    }

    hideAlertDiv() {
        this.updateState({
            displayAlert: false,
        })
    }

    getLink(path: string)
    {
        if(!this.isNullOrEmpty(path))
        {
            if(path[0] != "/")
            {
                path = "/" + path;
            }
        }
        return "/" + this.g.langKey + path;
    }

    navigateToLogin() {
        let cons = Constants.Instance;
        let redirectURI = window.location.href;
        if(window.location.href.indexOf(cons.RoutePaths.Login) > -1)
        {
            redirectURI = '';
        }
        history.push(this.getLink(cons.RoutePaths.Login +
            "?" + cons.QueryParams.redirectURI + "=" + redirectURI));
        // router.navigateByUrl(cons.RoutePaths.Login +
        //     "?" + cons.QueryParams.redirectURI + "=" + redirectURI,
        //     { skipLocationChange: false });
    }

}