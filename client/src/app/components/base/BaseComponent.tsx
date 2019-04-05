import * as React from "react";
import { mdProps, mdPropKeys, mdGlobalProps } from "../../../models/props";
import { Constants, StaticConstatns } from "../../../shared/constants";
import { mdFormControl } from "../../../shared/form-control";
import { ValidateParams, ValidationAttributeResponse, Validation } from "../../../shared/validations";
import { StaticHelper } from "../../../shared/static-helper";
import mdTransitions, { Transitions, mdTransition } from "../../../models/transitions";
import ReCAPTCHA from "react-google-recaptcha";
import { BasicBaseComponent } from "./BasicBaseComponent";
import { TransitionState } from "../../../enums/transition";
import history from '../../../shared/history';
import { InputTypes, NotificationTypes, SelectSizes } from "../../../enums/general";
import { NotificationManager } from "react-notifications";
import { mdCallResponse } from "../../../models/call-response";
import DatePickerComponent from "../../modules/shared/date-picker/DatePickerComponent";
import NBSpinnerComponent from "../../modules/shared/spinner/NBSpinnerComponent";
import { mdKeyValue } from "../../../models/key-value";
import moment from "moment";
import { Form, Input, Checkbox, Button, Icon, DatePicker, Select, InputNumber, Col } from "antd";
import { mdAnimControl } from "../../../models/anim-control";
import FontAwesome from "./FontAwesome";
import { IconName } from "@fortawesome/fontawesome-common-types";
import { SizeProp } from '@fortawesome/fontawesome-svg-core'
import { Link } from "react-router-dom";
const FormItem = Form.Item;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;
const InputGroup = Input.Group;
const TextArea = Input.TextArea;


export class BaseComponent extends BasicBaseComponent {

  constructor(props, extractFromProp?: boolean) {
    super(props);
    this.initClasses(extractFromProp);
    this.state = {
      ...this.state,
      currentWidth: this.getCurrentWidth()
    }
  }

  // componentWillMount = () => {
  //   this.timeouts = [];
  // }

  // setTimeout = (...args) => {
  //   this.timeouts.push(setTimeout.apply(this, ...args));
  // }

  // clearTimeouts = () => {
  //   this.timeouts.forEach(clearTimeout);
  // }

  // componentWillUnmount = () => {
  //   this.clearTimeouts();
  // }

  faicon(icon: IconName, size?: SizeProp) {
    return FontAwesome.faIcon(icon, size);
  }

  threeDots = () => {
    let dot = this.state.threeDots as string;
    if (!dot) {
      dot = " .";
    }
    else {
      if (dot.length < 3) {
        dot += ".";
      }
      else {
        dot = " ";
      }
    }

    this.updateState({
      threeDots: dot
    });
    setTimeout(() => {
      this.threeDots();
    }, 500);
  }

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
    this.handleFormControlInputWithValue(field, e.target.value);
    // if (this.isNullOrEmpty(formName)) {
    //   formName = this.defaultFormName;
    // }
    // let form = this.state[formName];
    // form[field].value = e.target.value;
    // if (formName == this.defaultFormName) {
    //   if (this.showErrors) {
    //     form[field] = this.validateFormControl(form[field]);
    //   }
    // }
    // else {
    //   if (form.showErrors) {
    //     form[field] = this.validateFormControl(form[field]);
    //   }
    // }
    // let state = this.state;
    // StaticHelper.assignPropertyOfObject(state, formName, form);
    // this.updateState({ ...state });
  }

  handleFormControlInputWithValue = (field, value, formName: string = null) => {
    if (this.isNullOrEmpty(formName)) {
      formName = this.defaultFormName;
    }
    let form = this.state[formName];
    let control = form[field] as mdFormControl;
    if (control.type == InputTypes.Number) {
      if (!this.isNullOrEmpty(value)) {
        value = parseInt(value);
      }
    }
    form[field].value = value;
    if (formName == this.defaultFormName) {
      if (this.showErrors) {
        form[field] = this.validateFormControl(form[field]);
      }
    }
    else {
      if (form.showErrors) {
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
    if (this.isNullOrEmpty(formName)) {
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
      if (form.showErrors) {
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

  animatedCSSDiv(content: any, control: mdAnimControl, callback?) {
    return this.animatedCSSDivInner(content, null, control, true, callback);
  }

  private animatedCSSDivInner(content: any, attr: any, control: mdAnimControl, contentOnly: boolean, callback?, props?) {
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

  onAnimationEnd = (control: mdAnimControl, callback, e: any) => {
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
    if (control.continousAnim) {
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

  animatedCSSDivWithAttr(content: any, attr: any, control: mdAnimControl, callback?) {
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
    else if (array.length == 1) {
      return array[0];
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

  // getCurrencyPairDropDown = (globals: mdGlobalProps, currencyPairChangeCallback, showLabel: boolean = false) => {
  //   return (
  //     <ul>
  //       {showLabel ? <li className="inline-block cp-label">Currency Pair</li> : null}
  //       <li className="dropdown inline-block">
  //         <a href="#" className="dropdown-toggle" data-toggle="dropdown">
  //           <span>{globals.selectedCurrencyPair ? globals.selectedCurrencyPair.fc_name : ""}</span>
  //           <span className="cp-splitter">/</span>
  //           <b>{globals.selectedCurrencyPair ? globals.selectedCurrencyPair.tc_name : ""}</b>
  //           <i className="fa fa-angle-down" aria-hidden="true"></i>
  //         </a>
  //         <ul className="dropdown-menu mymenu">
  //           {
  //             globals.currencyPairs ? (
  //               globals.currencyPairs.map((cp, i) => {
  //                 return (
  //                   <li key={i} onClick={currencyPairChangeCallback.bind(instance, cp.id)}>
  //                     <a>{cp.fc_name}<span className="cp-splitter">/</span><b>{cp.tc_name}</b></a>
  //                   </li>
  //                 )
  //               })
  //             ) : (null)
  //           }
  //         </ul>
  //       </li>
  //     </ul>
  //   );
  // }

  setSelectedCurrencyPair = (id: any, e) => {
    if (!id) {
      return;
    }
    let cps = this.g.currencyPairs.filter(m => m.id == id);
    if (cps.length > 0) {
      this.props.updateGlobalProperty(global.propKeys.selectedCurrencyPair, cps[0]);
      // this.orderHistoryRef.current.recievedNewChanges(cps[0]);
      return cps;
    }
    return null;
  }

  getCPDropDown = (currencyPairs, callback) => {
    return (
      <Select
        showSearch
        className="gx-w-100 mb-3 gx-vertical-align-middle"
        optionFilterProp="children"
        onChange={(e) => {
          let cp = this.setSelectedCurrencyPair(e, null);
          if (typeof callback == "function") {
            callback(cp);
          }
        }}
        filterOption={(input, option) => option.props.children.toString().toLowerCase().indexOf(input.toLowerCase()) >= 0}
        value={this.g.selectedCurrencyPair ? this.g.selectedCurrencyPair.id : null}
        size={SelectSizes.large}
      >
        {
          currencyPairs.map((s: mdKeyValue, i) => {
            return <Option key={i} value={s.value}>{s.key}</Option>
          })
        }
      </Select>
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
    if (!enumValue) {
      return '';
    }
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

  getLink(path: string) {
    if (!this.isNullOrEmpty(path)) {
      if (path[0] != "/") {
        path = "/" + path;
      }
    }
    else
    {
      path = "/";
    }
    let langPart = "";
    if (this.g.langKey != this.constants.DefaultLangKey) {
      langPart = "/" + this.g.langKey;
    }
    return langPart + path;
  }

  navigateToLogin() {
    let cons = Constants.Instance;
    let redirectURI = window.location.href;
    if (window.location.href.indexOf(cons.RoutePaths.Login) > -1) {
      redirectURI = '';
    }
    history.push(this.getLink(cons.RoutePaths.Login +
      "?" + cons.QueryParams.redirectURI + "=" + redirectURI));
    // router.navigateByUrl(cons.RoutePaths.Login +
    //     "?" + cons.QueryParams.redirectURI + "=" + redirectURI,
    //     { skipLocationChange: false });
  }

  textFormItem(control: mdFormControl, label: boolean = false, onInput?) {
    control.type = InputTypes.Text;
    return this.formItemInput(control, label, onInput);
  }

  textAreaFormItem(control: mdFormControl, rows = 2, label: boolean = false, onInput?) {
    control.type = InputTypes.TextArea;
    control.rows = rows;
    return this.formItemInput(control, label, onInput);
  }

  checkboxFormItem(control: mdFormControl, placeholder: any = null, label: boolean = false, onInput?) {
    control.type = InputTypes.Checkbox;
    control.placeholder = placeholder;
    return this.formItemInput(control, label, onInput);
  }

  passwordFormItem(control: mdFormControl, label: boolean = false, onInput?) {
    control.type = InputTypes.Password;
    return this.formItemInput(control, label, onInput);
  }

  dateFormItem(control: mdFormControl, label: boolean = false, formItemLayout = null,
    format: string = this.constants.DefaultDateFormat, onInput?, disabled: boolean = false) {
    control.type = InputTypes.Date;
    return this.formItemInput(control, label, onInput, formItemLayout,
      disabled, null, false, format);
  }

  labelFormItem(control: mdFormControl, label: boolean = false, formItemLayout: any = {}) {
    control.type = InputTypes.Label;
    return this.formItemInput(control, label, InputTypes.Text, formItemLayout);
  }

  numberFormItem(control: mdFormControl, label: boolean = false, step: number = 1,
    min: number = 0, max: number = 9999999999, onInput?, formItemLayout: any = {},
    placeholder: string = "") {
    control.type = InputTypes.Number;
    control.min = min;
    control.max = max;
    control.placeholder = placeholder;
    if (isNaN(step)) {
      step = 1;
    }
    control.step = step;
    return this.formItemInput(control, label, onInput, formItemLayout);
  }

  numberWithoutFormItem(control: mdFormControl, label: boolean = false, step: number = 1,
    min: number = 0, max: number = 9999999999, onInput?, formItemLayout: any = {},
    placeholder: string = "") {
    control.type = InputTypes.Number;
    control.min = min;
    control.max = max;
    control.placeholder = placeholder;
    if (isNaN(step)) {
      step = 1;
    }
    control.step = step;
    return this.formItemInput(control, label, onInput, formItemLayout, false, [], false, null, false);
  }

  numberWithDropDownFormItem(control: mdFormControl, dropDownControl: mdFormControl, dropDownSource: mdKeyValue[],
    onDropDownInput, label: boolean = false, step: number = 1, min: number = 0, max: number = 9999999999,
    showSpinner: boolean = false, onControlInput?, formItemLayout: any = {}) {
    control.type = InputTypes.NumberWithDropdown;
    control.onDropDownInput = onDropDownInput;
    control.dropDownControl = dropDownControl;
    control.min = min;
    control.max = max;
    if (isNaN(step)) {
      step = 1;
    }
    control.step = step;
    return this.formItemInput(control, label, onControlInput, formItemLayout,
      false, dropDownSource, showSpinner);

  }

  private formItemInput(control: mdFormControl, label: boolean = false, onInput?,
    formItemLayout: any = {}, disabled: boolean = false, dropDownSource: mdKeyValue[] = [],
    showSpinner = false, format: string = this.constants.DefaultDateFormat, formItem: boolean = true) {
    let id: string = control.name;
    let inputHandler = (e, ctrl: mdFormControl, ctrlInput = onInput) => {
      if (!e) {
        return;
      }
      if (!e.target) {
        return;
      }
      this.handleFormControlInput(ctrl.name, e);
      if (ctrlInput) {
        if (!Array.isArray(ctrlInput)) {
          ctrlInput = [ctrlInput];
        }
        ctrlInput.forEach(f => {
          f(ctrl.name, e);
        });
      }
    };
    let errors = control.errors.map((e, i) => {
      if (i > 0) {
        return <><br />{e}</>;
      }
      return <>{e}</>;
    });
    if (control.errors.length < 1) {
      errors = null;
    }
    let numberInput = (ctrl: mdFormControl, style?) => {
      if (!style) {
        style = formItemLayout.inputStyle;
      }
      if (!style) {
        style = { width: '100%' };
      }
      let classes = "";
      if (!this.isNullOrEmpty(formItemLayout.inputClassName)) {
        classes = formItemLayout.inputClassName;
      }
      return (
        <InputNumber
          id={id}
          className={classes}
          style={{ ...style }}
          placeholder={ctrl.placeholder}
          value={ctrl.value ? ctrl.value : ''}
          disabled={disabled}
          min={ctrl.min}
          max={ctrl.max}
          step={ctrl.step}
          onChange={(e) => { inputHandler({ target: { value: e } }, ctrl); }} />
      );
    }
    let dropDownInput = (sControl: mdFormControl, ctrlSrc: mdKeyValue[], ctrlInput?, style?) => {
      if (!style) {
        style = { width: '100%' };
      }
      return (
        <Select
          showSearch
          style={{ ...style }}
          placeholder={sControl.placeholder}
          optionFilterProp="children"
          onChange={(e) => { inputHandler({ target: { value: e } }, sControl, ctrlInput) }}
          filterOption={(input, option) => option.props.children.toString().toLowerCase().indexOf(input.toLowerCase()) >= 0}
          value={sControl.value}
          size={sControl.size}
        >
          {
            ctrlSrc.map((s: mdKeyValue, i) => {
              return <Option key={i} value={s.value}>{s.key}</Option>
            })
          }
        </Select>
      );
    }
    let numberWithDropdown = (ctrl: mdFormControl) => {
      control.type = InputTypes.Number;
      ctrl.type = InputTypes.Select;
      ctrl.dropDownControl.type = InputTypes.Select;
      return (
        <InputGroup compact
          style={{ width: "100%", display: 'flex' }}>
          {
            dropDownInput(control.dropDownControl, dropDownSource, ctrl.onDropDownInput, {})
          }
          {
            numberInput(control, { flexGrow: 100 })
          }
        </InputGroup>
      );
    }
    let dateInput = (ctrl: mdFormControl, style?) => {
      if (!style) {
        style = { width: '100%' };
      }
      return (
        <DatePicker
          id={id}
          style={{ ...style }}
          placeholder={ctrl.placeholder}
          value={ctrl.value ? moment(ctrl.value, format) : null}
          disabled={disabled}
          onChange={(e) => { inputHandler({ target: { value: e } }, ctrl); }} />
      );
    }
    let checkboxInput = (ctrl: mdFormControl) => {
      return (
        <Checkbox
          onChange={(e) => {
            let ee = {};
            inputHandler({
              target: {
                value: e.target.checked
              }
            }, ctrl);
          }}
          value={control.value ? control.value : ''}
          disabled={disabled}
        >{control.placeholder}</Checkbox>
      );
    }
    let textAreaInput = (ctrl: mdFormControl) => {
      return (
        <TextArea
          id={id}
          onChange={(e) => {
            inputHandler(e, ctrl);
          }}
          placeholder={control.title}
          value={control.value ? control.value : ''}
          disabled={disabled}
          rows={ctrl.rows}
        />
      );
    }
    let generalInput = (ctrl: mdFormControl) => {
      return (
        <Input
          id={id}
          style={{ width: "100%" }}
          onChange={(e) => {
            inputHandler(e, ctrl);
          }}
          placeholder={control.title}
          value={control.value ? control.value : ''}
          type={ctrl.type}
          disabled={disabled}
          prefix={this.isNullOrEmpty(control.icon) ? null :
            this.faicon(control.icon as any)}
        // <Icon type={control.icon} style={{ color: 'rgba(0,0,0,.25)' }} />}
        />
      );
    }
    let InputElement = () => {
      if (control.type == InputTypes.Number) {
        return numberInput(control);
      }
      else
        if (control.type == InputTypes.Label) {
          return (
            <>
              <label
                id={id}
                style={{ width: "100%" }}>{control.value ? control.value : ''}</label>
              {/* <Input style={{ display: 'hidden' }}/> */}
            </>
          );
        }
        else
          if (control.type == InputTypes.NumberWithDropdown) {
            return numberWithDropdown(control);
          }
          else
            if (control.type == InputTypes.Date) {
              return dateInput(control);
            }
            else
              if (control.type == InputTypes.Checkbox) {
                return checkboxInput(control);
              }
              else
                if (control.type == InputTypes.TextArea) {
                  return textAreaInput(control);
                }
              else {
                return generalInput(control);
              }
    }
    if (!formItem) {
      return InputElement();
    }
    return (
      <FormItem
        {...formItemLayout}
        help={errors}
        label={label ? control.title : ""}
        validateStatus={control.errors.length > 0 ? "error" : "success"}>
        {
          InputElement()
        }
        <NBSpinnerComponent {...this.props} params={{ show: showSpinner }} />
      </FormItem>
    );
  }

  spinnerComponent(component, showSpinner) {
    let classes = component.props.className;
    if (this.isNullOrEmpty(classes)) {
      classes = "";
    }
    if (classes.indexOf("nb-spinner-container") < 0) {
      classes += " nb-spinner-container";
    }
    let props = {
      ...component.props,
      className: classes,
    }
    let comp = {
      ...component,
      props: props
    }
    return this.appendChildToComponent(comp,
      <NBSpinnerComponent key="NBSpinnerComponent" {...this.props} params={{ show: showSpinner }} />);
  }

  logout = (e) => {
    // this.showMainSpinner();
    this.http.get<mdCallResponse>(Constants.Instance.EndPoints.GetLogout).then((res: mdCallResponse) => {
      window.location.href = this.getLink(Constants.Instance.RoutePaths.Home);
    }).catch(error => {
      this.log.info(error);
      window.location.href = this.getLink(Constants.Instance.RoutePaths.Home);
    });
  }

  errorNotification(content: any, title: any = this.lang.Error, timeout: number = 5000, callback?) {
    return this.displayNotification(content, title, timeout, NotificationTypes.error, callback);
  }

  successNotification(content: any, title: any = this.lang.Success, timeout: number = 5000, callback?) {
    return this.displayNotification(content, title, timeout, NotificationTypes.success, callback);
  }

  infoNotification(content: any, title: any, timeout: number = 5000, callback?) {
    return this.displayNotification(content, title, timeout, NotificationTypes.info, callback);
  }

  warningNotification(content: any, title: any, timeout: number = 5000, callback?) {
    return this.displayNotification(content, title, timeout, NotificationTypes.warning, callback);
  }

  //if timeout is -1, notification will not automaticaly dismiss
  displayNotification(content: any, title: any, timeout: number = 5000, type: NotificationTypes = NotificationTypes.info, callback?) {
    if (timeout == -1) {
      timeout = 60 * 60 * 1000;//1 hour
    }
    if (content) {
      if (!Array.isArray(content)) {
        content = content.split("\n");
      }
      content = this.bulletList(content);
    }
    switch (type) {
      case NotificationTypes.info:
        NotificationManager.info(content, title, timeout, callback);
        break;
      case NotificationTypes.error:
        NotificationManager.error(content, title, timeout, callback);
        break;
      case NotificationTypes.success:
        NotificationManager.success(content, title, timeout, callback);
        break;
      case NotificationTypes.warning:
        NotificationManager.warning(content, title, timeout, callback);
        break;

    }
  }

  // selectFormItem = (control: mdFormControl, source: mdKeyValue[], showSpinner: boolean = false,
  //   label: boolean = false, onInput: any = null, size: SelectSizes = SelectSizes.default) => {
  //   control.type = InputTypes.Select;
  //   control.size = size;
  //   return this.inputGroup(control, label, onInput, source, showSpinner);
  // }

  // private inputGroup = (control: mdFormControl, label: boolean = false, onInput: any = null,
  //   source: mdKeyValue[] = [], showSpinner: boolean = false, resetButton = false, startDateControl?: mdFormControl,
  //   endDateControl?: mdFormControl, textareaRows: number = 2) => {
  //   let id: string = control.name;
  //   let inputHandler = (e, ctrl: mdFormControl = control, ctrlInput: any = onInput) => {
  //     this.log.debug(e);
  //     this.handleFormControlInput(ctrl.name, e);
  //     if (ctrlInput) {
  //       if (!Array.isArray(ctrlInput)) {
  //         ctrlInput = [ctrlInput];
  //       }
  //       ctrlInput.forEach(f => {
  //         f(ctrl.name, e);
  //       });
  //     }
  //   };
  //   let daterangeOnApply = (e, picker) => {
  //     this.handleFormControlInput(control.name, {
  //       target: {
  //         value: StaticHelper.shortDateFormat(picker.startDate._d) + ' - ' +
  //           StaticHelper.shortDateFormat(picker.endDate._d)
  //       }
  //     });
  //     if (startDateControl) {
  //       this.handleFormControlInput(startDateControl.name, {
  //         target: {
  //           value: picker.startDate._d
  //         }
  //       });
  //     }
  //     if (endDateControl) {
  //       this.handleFormControlInput(endDateControl.name, {
  //         target: {
  //           value: picker.endDate._d
  //         }
  //       });
  //     }
  //   }
  //   let rangePicker = () => {
  //     return (
  //       <RangePicker
  //         value={control.value ? [control.value.start, control.value.end] : []}
  //         ranges={{ Today: [moment(), moment()], 'This Month': [moment(), moment().endOf('month')] }}
  //         onChange={(e) => { inputHandler(e, control) }} />
  //     )
  //   }
  //   let select = (sControl: mdFormControl, sSource: mdKeyValue[], ctrlInput: any = null) => {
  //     return (
  //       <Select
  //         showSearch
  //         style={{ width: '100%' }}
  //         placeholder={sControl.placeholder}
  //         optionFilterProp="children"
  //         onChange={(e) => { inputHandler({ target: { value: e } }, sControl, ctrlInput) }}
  //         filterOption={(input, option) => option.props.children.toString().toLowerCase().indexOf(input.toLowerCase()) >= 0}
  //         value={sControl.value}
  //         size={sControl.size}
  //       >
  //         {
  //           sSource.map((s, i) => {
  //             return <Option key={i} value={s.value}>{s.key}</Option>
  //           })
  //         }
  //       </Select>
  //     )
  //   }
  //   let inputNumber = (ctrl: mdFormControl) => {
  //     return (
  //       <InputNumber
  //         id={id}
  //         placeholder={ctrl.placeholder}
  //         value={ctrl.value ? ctrl.value : ''}
  //         disabled={ctrl.disabled}
  //         min={ctrl.min}
  //         max={ctrl.max}
  //         style={{ width: '100%' }}
  //         onChange={(e) => { inputHandler({ target: { value: e } }, ctrl) }}
  //       />
  //     );
  //   }
  //   let generalInput = () => {
  //     return (
  //       <Input
  //         id={id}
  //         onChange={(e) => { inputHandler({ target: { value: e } }, control) }}
  //         className={`form-control ${control.errors.length > 0 ? 'is-invalid' : ''}`}
  //         placeholder={control.placeholder}
  //         value={control.value ? control.value : ''}
  //         type={control.type}
  //         disabled={control.disabled}
  //         min={control.min}
  //         max={control.max}
  //       >
  //       </Input>
  //     );
  //   }
  //   let numberWithDropdown = (ctrl: mdFormControl) => {
  //     ctrl.type = InputTypes.Number;
  //     ctrl.dropDownControl.type = InputTypes.Select;
  //     return (
  //       <InputGroup compact>
  //         {
  //           select(control.dropDownControl, source, ctrl.onDropDownInput)
  //         }
  //         {
  //           inputNumber(control)
  //         }
  //       </InputGroup>
  //     );
  //   }
  //   let inputOnly = () => {
  //     if (control.type == InputTypes.Daterange) {
  //       return rangePicker();
  //     }
  //     else if (control.type == InputTypes.Select) {
  //       return select(control, source);
  //     }
  //     else if (control.type == InputTypes.Number) {
  //       return inputNumber(control);
  //     }
  //     else if (control.type == InputTypes.NumberWithDropdown) {
  //       return numberWithDropdown(control);
  //     }
  //     else {
  //       return generalInput();
  //     }
  //   }
  //   let inputElementInner = () => {
  //     return (
  //       <>
  //         {
  //           inputOnly()
  //         }
  //         {
  //           this.getErrosDiv(control.errors)
  //         }
  //       </>
  //     );
  //   }
  //   let getLabel = () => {
  //     return !label ? null : <label htmlFor={id}>{control.title}</label>
  //   }

  //   let inputElement = () => {
  //     return (
  //       <>
  //         {
  //           resetButton ? null : getLabel()
  //         }
  //         {
  //           !showSpinner ? inputElementInner() :
  //             <div className={showSpinner ? 'nb-spinner-container' : ''}>
  //               {
  //                 inputElementInner()
  //               }
  //             </div>
  //         }
  //       </>
  //     );

  //   };

  //   let errors = "";
  //   control.errors.map((e, i) => {
  //     if (i > 0) {
  //       errors += <br />;
  //     }
  //     errors += e;
  //   });

  //   return (
  //     <FormItem
  //       help={errors}
  //       // label={label ? control.title : ""}
  //       validateStatus={control.errors.length > 0 ? "error" : "success"}>
  //       {inputElement()}
  //       {
  //         <NBSpinnerComponent {...this.props} params={{ show: showSpinner }} />
  //       }
  //     </FormItem>
  //   );

  // }

  widthLessThanmd = () =>{
    if(window.innerWidth < 768)
    {
      return true;
    }
    return false;
  }

  getCurrentWidth = () => {
    if (window.innerWidth < 576) {
      return "xs";
    }
    else
      if (window.innerWidth >= 576 && window.innerWidth < 768) {
        return "sm";
      }
      else
        if (window.innerWidth >= 768 && window.innerWidth < 992) {
          return "md";
        }
        else
          if (window.innerWidth >= 992 && window.innerWidth < 1200) {
            return "lg";
          }
          else
            if (window.innerWidth >= 1200 && window.innerWidth < 1600) {
              return "xl";
            }
            else {
              return "xxl";
            }
  }

  colmd1(children) {
    return (
      <Col xs="12" sm="2" md="1" lg="1" xl="1">
        {children}
      </Col>
    );
  }

  colmd4(children) {
    return (
      <Col xs={12} sm={8} md={4} lg={4} xl={4}>
        {children}
      </Col>
    );
  }

  colmd12(children, noPaddingLeft = false, noPaddingRight = true, style = null, className = "") {
    if (!style) {
      style = {};
    }
    let cw = this.state.currentWidth;
    if (!(cw == "xs" || cw == "sm")) {
      if (noPaddingLeft) {
        style["paddingLeft"] = 1;
      }
      if (noPaddingRight) {
        style["paddingRight"] = 1;
      }
    }
    else {
      if (noPaddingLeft || noPaddingRight) {
        style["paddingLeft"] = 1;
        style["paddingRight"] = 1;
      }
    }
    return (
      <Col style={{ ...style }} xs={24} sm={24} md={12} lg={12} xl={12} className={className}>
        {children}
      </Col>
    );
  }

  colmd6(children, noPaddingLeft = false, noPaddingRight = true, style = null, className = "") {
    if (!style) {
      style = {};
    }
    let cw = this.state.currentWidth;
    if (!(cw == "xs" || cw == "sm")) {
      if (noPaddingLeft) {
        style["paddingLeft"] = 1;
      }
      if (noPaddingRight) {
        style["paddingRight"] = 1;
      }
    }
    else {
      if (noPaddingLeft || noPaddingRight) {
        style["paddingLeft"] = 1;
        style["paddingRight"] = 1;
      }
    }
    return (
      <Col style={{ ...style }} xs={24} sm={12} md={6} lg={6} xl={6} className={className}>
        {children}
      </Col>
    );
  }

  colsm12(children, noPaddingLeft = false, noPaddingRight = true, style = null) {
    if (!style) {
      style = {};
    }
    let cw = this.state.currentWidth;
    if (!(cw == "xs" || cw == "sm")) {
      if (noPaddingLeft) {
        style["paddingLeft"] = 1;
      }
      if (noPaddingRight) {
        style["paddingRight"] = 1;
      }
    }
    else {
      if (noPaddingLeft || noPaddingRight) {
        style["paddingLeft"] = 1;
        style["paddingRight"] = 1;
      }
    }
    return (
      <Col style={{ ...style }} xs={12} sm={12} md={12} lg={12} xl={12}>
        {children}
      </Col>
    );
  }

  colmd24(children) {
    return (
      <Col xs={24} sm={24} md={24} lg={24} xl={24}>
        {children}
      </Col>
    );
  }

  colmd48(children) {
    return (
      <Col xs={48} sm={48} md={48} lg={48} xl={48}>
        {children}
      </Col>
    );
  }

  colmd16(children) {
    return (
      <Col xs={24} sm={24} md={16} lg={16} xl={16}>
        {children}
      </Col>
    );
  }

  colmd8(children) {
    return (
      <Col xs={24} sm={24} md={8} lg={8} xl={8}>
        {children}
      </Col>
    );
  }

  linkOrA = (href, routerLink, children) => {
    if (this.isNullOrEmpty(href) && this.isNullOrEmpty(routerLink)) {
      return children;
    }
    else if (this.isNullOrEmpty(href)) {
      return (
        <Link to={this.getLink(routerLink)}>{children}</Link>
      );
    }
    else {
      return <a href={href}>{children}</a>
    }
  }
  
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
