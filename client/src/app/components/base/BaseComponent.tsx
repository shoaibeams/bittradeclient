import * as React from "react";
import { mdProps, mdPropKeys, mdGlobalProps } from "../../../models/props";
import { Constants, StaticConstatns } from "../../../shared/constants";
import { mdFormControl } from "../../../shared/form-control";
import {
  ValidateParams,
  ValidationAttributeResponse,
  Validation
} from "../../../shared/validations";
import { StaticHelper } from "../../../shared/static-helper";
import mdTransitions, {
  Transitions,
  mdTransition
} from "../../../models/transitions";
import ReCAPTCHA from "react-google-recaptcha";
import { BasicBaseComponent } from "./BasicBaseComponent";
import { TransitionState } from "../../../enums/transition";
import history from "../../../shared/history";
import {
  InputTypes,
  NotificationTypes,
  SelectSizes
} from "../../../enums/general";
import { NotificationManager } from "react-notifications";
import { mdCallResponse } from "../../../models/call-response";
import DatePickerComponent from "../../modules/shared/date-picker/DatePickerComponent";
import NBSpinnerComponent from "../../modules/shared/spinner/NBSpinnerComponent";
import { mdKeyValue } from "../../../models/key-value";
import moment from "moment";
import { mdAnimControl } from "../../../models/anim-control";
import FontAwesome from "./FontAwesome";
import { IconName } from "@fortawesome/fontawesome-common-types";
import { SizeProp } from "@fortawesome/fontawesome-svg-core";
import { Link } from "react-router-dom";
import {
  Form,
  Input,
  Checkbox,
  Button,
  Icon,
  DatePicker,
  Select,
  InputNumber,
  Col
} from "antd";
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
    };
  }

  threeDots = () => {
    let dot = this.state.threeDots as string;
    if (!dot) {
      dot = " .";
    } else {
      if (dot.length < 3) {
        dot += ".";
      } else {
        dot = " ";
      }
    }

    this.updateState({
      threeDots: dot
    });
    setTimeout(() => {
      this.threeDots();
    }, 500);
  };

  updateAnimValue(
    animName: string,
    value: Transitions,
    tstate = TransitionState.NotStarted
  ) {
    let animValues = {
      ...this.state.animValues
    };

    animValues[animName].value = this.getTransition(value, tstate);
    this.updateState({
      animValues: animValues
    });
  }

  getTransition(
    transition: Transitions,
    tstate: TransitionState = TransitionState.NotStarted
  ) {
    let t = global.transitions[transition];
    t.state = tstate;
    return t;
  }

  runTransition(transition: Transitions) {
    return this.getTransition(transition, TransitionState.Running);
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
    } else {
      if (form.showErrors) {
        form[field] = this.validateFormControl(form[field]);
      }
    }
    let state = this.state;
    StaticHelper.assignPropertyOfObject(state, formName, form);
    this.updateState({ ...state });
  };

  validateForm(formName: string = this.defaultFormName) {
    let isValid = true;
    let form = this.state[formName];
    if (formName == this.defaultFormName) {
      this.showErrors = true;
    } else {
      form.showErros = true;
    }

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
      } else {
        this.log.debug("null control " + k);
      }
    });
    if (!isValid) {
      let targetObj = StaticHelper.assignPropertyOfObject({}, formName, form);
      this.updateState(targetObj);
    }
    return isValid;
  }

  getFormData(form) {

    let keys = Object.keys(form);
    let fd = {};
    keys.forEach(k => {
      fd = StaticHelper.assignPropertyOfObject(
        fd,
        k,
        form[k] ? form[k].value : null
      );
    });
    return fd;
  }

  animatedCSSDiv(content: any, control: mdAnimControl, callback?) {
    return this.animatedCSSDivInner(content, null, control, true, callback);
  }

  private animatedCSSDivInner(
    content: any,
    attr: any,
    control: mdAnimControl,
    contentOnly: boolean,
    callback?,
    props?
  ) {
    if (control) {
      let transition: mdTransition = control.value;
      let classes = "";
      if (transition.state == TransitionState.NotStarted) {
        classes = transition.before;
      } else if (transition.state == TransitionState.Running) {
        classes = transition.classes;
      } else if (transition.state == TransitionState.Completed) {
        classes = transition.after;
      }
      return (
        <div
          onAnimationEnd={e => {
            this.onAnimationEnd(control, callback, e);
          }}
          {...attr}
          className={`${contentOnly ? "content-only" : ""} ${classes}`}
          {...props}
        >
          {content}
        </div>
      );
    } else {
      return (
        <div className={`${contentOnly ? "content-only" : ""}`}>{content}</div>
      );
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
    };
    this.updateState({
      animValues: {
        ...animValues
      }
    });
    if (control.continousAnim) {
      setTimeout(() => {
        t.state = TransitionState.Running;
        control.value = t;
        let obj = StaticHelper.assignPropertyOfObject(
          {},
          control.name,
          control
        );
        let animValues = {
          ...this.state.animValues,
          ...obj
        };
        this.updateState({
          ...animValues
        });
      }, 500);
    }
  };

  animatedCSSDivWithAttr(
    content: any,
    attr: any,
    control: mdAnimControl,
    callback?
  ) {
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
    } else if (array.length == 1) {
      return array[0];
    }
    return (
      <ul className="bullet-dot">
        {array.map((m, i) => {
          return (
            <li key={i}>{StaticHelper.formatString(array[i], ...args)}</li>
          );
        })}
      </ul>
    );
  }

  getErrorsDiv(errors: any[]) {
    if (!errors) {
      return null;
    }
    return errors.length > 0 ? (
      <div className="invalid-feedback">
        <div key={0}>{errors[0]}</div>
      </div>
    ) : null;
  }

  textFormControl(
    control: mdFormControl,
    onInput?: any,
    formGroup: boolean = true,
    type: string = "text"
  ) {
    let inputHandler = onInput
      ? e => {
          if (!Array.isArray(onInput)) {
            onInput = [onInput];
          }
          onInput.forEach(f => {
            f(control.name, e);
          });
        }
      : null;
    let inputElement = () => {
      return (
        <>
          <input
            onInput={inputHandler}
            className={`form-control ${
              control.errors.length > 0 ? "is-invalid" : ""
            }`}
            placeholder={control.title}
            defaultValue={control.value}
            type={type}
          />
          {this.getErrorsDiv(control.errors)}
        </>
      );
    };

    if (!formGroup) {
      return inputElement();
    }
    return <div className="form-group">{inputElement()}</div>;
  }

  datePickerFormControl(
    control: mdFormControl,
    onInput?: any,
    formGroup: boolean = true
  ) {
    let inputHandler = onInput
      ? e => {
          if (!Array.isArray(onInput)) {
            onInput = [onInput];
          }
          onInput.forEach(f => {
            f(control.name, e);
          });
        }
      : null;
    let inputElement = () => {
      return (
        <>
          <DatePickerComponent
            {...this.props}
            params={{
              control: control,
              onInput: inputHandler
            }}
          />
          {this.getErrorsDiv(control.errors)}
        </>
      );
    };

    if (!formGroup) {
      return inputElement();
    }
    return <div className="form-group">{inputElement()}</div>;
  }

  passwordFormControl(
    control: mdFormControl,
    onInput?: any,
    formGroup: boolean = true
  ) {
    return this.textFormControl(control, onInput, formGroup, "password");
  }

  captchaFormControl(
    control: mdFormControl,
    onInput?,
    formGroup: boolean = true
  ) {
    let inputHandler = onInput
      ? e => {
          onInput(control.name, e);
        }
      : null;
    let inputElement = () => {
      return (
        <>
          <ReCAPTCHA
            className={`no-form-control ${
              control.errors.length > 0 ? "is-invalid" : ""
            }`}
            sitekey={StaticConstatns.RecaptchaSiteKey}
            onChange={inputHandler}
          />
          {this.getErrorsDiv(control.errors)}
        </>
      );
    };

    if (!formGroup) {
      return inputElement();
    }
    return <div className="form-group">{inputElement()}</div>;
  }

  textareaStyle = {
    height: "auto"
  };

  textareaFormControl(
    control: mdFormControl,
    onInput?,
    formGroup: boolean = true
  ) {
    let inputHandler = onInput
      ? e => {
          onInput(control.name, e);
        }
      : null;
    let inputElement = () => {
      return (
        <>
          <textarea
            onInput={inputHandler}
            className={`form-control ${
              control.errors.length > 0 ? "is-invalid" : ""
            }`}
            style={this.textareaStyle}
            rows={4}
            placeholder={control.title}
            defaultValue={control.value}
          />
          {this.getErrorsDiv(control.errors)}
        </>
      );
    };
    if (!formGroup) {
      return inputElement();
    }
    return <div className="form-group">{inputElement()}</div>;
  }

  getSubmitResponseDiv(clas: string, text: string, show: boolean) {
    if (!show) {
      return null;
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
      this.props.updateGlobalProperty(
        global.propKeys.selectedCurrencyPair,
        cps[0]
      );
      let histr = this.g.briefHistory;
      if (histr) {
        let sbh = histr.filter(m => m.id == id);
        if (sbh.length > 0) {
          let data = sbh[0];
          if (data.data) {
            data = data.data;
          }
          this.props.updateGlobalProperty(
            global.propKeys.selectedBriefHistory,
            data
          );
        }
      }
      return cps[0];
    }
    return null;
  };

  getCPDropDown = (currencyPairs, callback) => {
    return (
      <Select
        showSearch
        className="gx-w-100 mb-3 gx-vertical-align-middle"
        optionFilterProp="children"
        onChange={e => {
          let cp = this.setSelectedCurrencyPair(e, null);
          if (typeof callback == "function") {
            callback(cp);
          }
        }}
        filterOption={(input, option) =>
          option.props.children
            .toString()
            .toLowerCase()
            .indexOf(input.toLowerCase()) >= 0
        }
        value={
          this.g.selectedCurrencyPair ? this.g.selectedCurrencyPair.id : null
        }
        size={SelectSizes.large}
      >
        {currencyPairs.map((s: mdKeyValue, i) => {
          return (
            <Option key={i} value={s.value}>
              {s.key}
            </Option>
          );
        })}
      </Select>
    );
  };

  numberInput(
    instance,
    control: mdFormControl,
    onInput?,
    step?: number,
    min?: number,
    max?: number,
    placeholder?: string,
    scale?: number
  ) {
    let inputElement = () => {
      // console.log(control);
      return (
        <>
          <input
            className={`form-control ${
              control.errors.length > 0 ? "is-invalid" : ""
            }`}
            onKeyDown={e => {
              if (!this.isNumberd(e)) {
                e.preventDefault();
              }
            }}
            onChange={e => {
              onInput(control.name, e);
            }}
            min="0"
            max={max}
            type="number"
            step={step}
            value={control.value}
            // defaultValue={control.value}
            placeholder={placeholder ? placeholder : control.title}
          />
          {this.getErrorsDiv(control.errors)}
        </>
      );
    };
    // console.log(inputElement())
    return inputElement();
  }

  isNumberd(e) {
    if (!e.target) {
      return false;
    }
    let prev = e.target.value;
    let value = prev.concat(e.key);
    if (value.split(".").length > 2) {
      return false;
    }
    let specialKeys: Array<string> = [
      "Backspace",
      "Tab",
      "End",
      "Home",
      "-",
      "ArrowLeft",
      "ArrowRight",
      "ArrowUp",
      "ArrowDown",
      "Delete"
    ];
    if (specialKeys.indexOf(e.key) !== -1) {
      return true;
    }

    if (StaticHelper.isNullOrEmpty(value)) {
      return false;
    }

    if (
      StaticHelper.testRegex(Constants.Instance.Regex.NumberWithDecimal, value)
    ) {
      return true;
    }
    return false;
  }

  addNewLineHTML(text: string[]) {
    return (
      <>
        {text.map((m, i) => {
          return (
            <React.Fragment key={i}>
              {m}
              {i == text.length - 1 ? null : <br />}
            </React.Fragment>
          );
        })}
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
      } else {
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
    } else {
      return firstLetter + value.substring(1);
    }
  }

  formatEnumValue(
    enumValue: any,
    replace_: boolean = true,
    upperCase: boolean = true
  ) {
    if (!enumValue) {
      return "";
    }
    enumValue = enumValue.toString();
    if (replace_) {
      enumValue = enumValue.replace("_", " ");
    }
    if (upperCase) {
      enumValue = enumValue.toUpperCase();
    } else {
      let splitted = enumValue.split(" ");
      splitted = splitted.map(m => {
        return this.upperCaseFirstLetter(m);
      });
      enumValue = splitted.join(" ");
    }
    return enumValue;
  }

  getAlertDiv() {
    if (!this.state.displayAlert) {
      return null;
    }
    return (
      <div className={this.state.alertClass}>{this.state.alertMessage}</div>
    );
  }

  showAlertDiv(isSuccess: boolean, message: any) {
    let classs = "";
    if (isSuccess) {
      classs = "alert alert-success";
    } else {
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
    });
    setTimeout(() => {
      this.hideAlertDiv();
    }, this.constants.ResponseMessageTimeout * 1000);
  }

  hideAlertDiv() {
    this.updateState({
      displayAlert: false
    });
  }

  getLink(path: string) {
    return StaticHelper.getLink(path);
  }

  redirectToLogin = (timeout?: number) => {
    if (!timeout) {
      timeout = 10;
    }
    setTimeout(() => {
      window.location.replace(this.getLink(this.constants.RoutePaths.Login));
    }, timeout);
  };

  navigateToLogin() {
    let cons = Constants.Instance;
    let redirectURI = encodeURIComponent(window.location.href);
    if (window.location.href.indexOf(cons.RoutePaths.Login) > -1) {
      redirectURI = "";
    }
    history.push(
      this.getLink(
        cons.RoutePaths.Login +
          "?" +
          cons.QueryParams.redirectURI +
          "=" +
          redirectURI
      )
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
      className: classes
    };
    let comp = {
      ...component,
      props: props
    };
    return this.appendChildToComponent(
      comp,
      <NBSpinnerComponent
        key="NBSpinnerComponent"
        {...this.props}
        params={{ show: showSpinner }}
      />
    );
  }

  logout = e => {
    // this.showMainSpinner();
    this.http
      .get<mdCallResponse>(Constants.Instance.EndPoints.GetLogout)
      .then((res: mdCallResponse) => {
        window.location.href = this.getLink(Constants.Instance.RoutePaths.Home);
      })
      .catch(error => {
        this.log.info(error);
        window.location.href = this.getLink(Constants.Instance.RoutePaths.Home);
      });
  };

  errorNotification(
    content: any,
    title: any = this.lang.Error,
    timeout: number = 5000,
    callback?
  ) {
    return this.displayNotification(
      content,
      title,
      timeout,
      NotificationTypes.error,
      callback
    );
  }

  successNotification(
    content: any,
    title: any = this.lang.Success,
    timeout: number = 5000,
    callback?
  ) {
    return this.displayNotification(
      content,
      title,
      timeout,
      NotificationTypes.success,
      callback
    );
  }

  infoNotification(
    content: any,
    title: any,
    timeout: number = 5000,
    callback?
  ) {
    return this.displayNotification(
      content,
      title,
      timeout,
      NotificationTypes.info,
      callback
    );
  }

  warningNotification(
    content: any,
    title: any,
    timeout: number = 5000,
    callback?
  ) {
    return this.displayNotification(
      content,
      title,
      timeout,
      NotificationTypes.warning,
      callback
    );
  }

  //if timeout is -1, notification will not automaticaly dismiss
  displayNotification(
    content: any,
    title: any,
    timeout: number = 5000,
    type: NotificationTypes = NotificationTypes.info,
    callback?
  ) {
    if (timeout == -1) {
      timeout = 60 * 60 * 1000; //1 hour
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

  widthLessThanmd = () => {
    if (window.innerWidth < 768) {
      return true;
    }
    return false;
  };

  getCurrentWidth = () => {
    if (window.innerWidth < 576) {
      return "xs";
    } else if (window.innerWidth >= 576 && window.innerWidth < 768) {
      return "sm";
    } else if (window.innerWidth >= 768 && window.innerWidth < 992) {
      return "md";
    } else if (window.innerWidth >= 992 && window.innerWidth < 1200) {
      return "lg";
    } else if (window.innerWidth >= 1200 && window.innerWidth < 1600) {
      return "xl";
    } else {
      return "xxl";
    }
  };

  linkOrA = (href, routerLink, children, newTab: boolean = false) => {
    if (this.isNullOrEmpty(href) && this.isNullOrEmpty(routerLink)) {
      return children;
    } else if (this.isNullOrEmpty(href)) {
      return <Link to={this.getLink(routerLink)}>{children}</Link>;
    } else {
      let aProps = {};
      if (newTab) {
        aProps = {
          target: "_blank"
        };
      }
      return (
        <a href={href} {...aProps}>
          {children}
        </a>
      );
    }
  };

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
