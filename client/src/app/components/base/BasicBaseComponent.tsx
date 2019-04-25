import * as React from "react";
import { mdProps, mdGlobalProps, mdPropKeys } from "../../../models/props";
import { Constants } from "../../../shared/constants";
import LoggerService from "../../../shared/logger";
import HttpClientService from "../../../shared/http-client.service";
import { LanguageBase } from "../../../language/language";
import mdSpinnerConfig from "../../../models/spinner-config";
import mdTransitions from "../../../models/transitions";
import * as Enums from "../../../enums/general";
import * as queryString from "query-string";
import Socket from "../../../shared/socket";
import { StaticHelper } from "../../../shared/static-helper";
import ANTDControls from "./ANTDControls";
import { mdFormControl } from "../../../shared/form-control";
import {
  ValidateParams,
  ValidationAttributeResponse,
  Validation
} from "../../../shared/validations";

export class BasicBaseComponent extends React.Component<mdProps, any> {
  constants: Constants;
  log: LoggerService;
  http: HttpClientService;
  lang: LanguageBase;
  f?: any;
  p: any;
  g: mdGlobalProps;
  showErrors = false;
  parsedLocation: any;
  // componentMountedFirstTime = false;
  defaultFormName = "form";
  // parsedLoc: any;
  socket: Socket;
  timeouts: any[];
  isComponentMounted: boolean;
  antd: ANTDControls;
  afterReceivingProps;
  constructor(props, extractFromProp?: boolean) {
    super(props);
    this.initClasses(extractFromProp);
  }

  initClasses(extractFromProp?: boolean) {
    this.constants = Constants.getInstance();
    if (!global.mainSpinnerConfig) {
      global.isDev = this.constants.IsDev;
      global.propKeys = new mdPropKeys();
      global.mainSpinnerConfig = new mdSpinnerConfig();
      global.mainSpinnerConfig.bdColor = "rgba(51, 51, 51, 0.8)";
      global.mainSpinnerConfig.size = Enums.SpinnerSize.medium;
      global.mainSpinnerConfig.color = "rgb(243, 103, 93)";
      global.mainSpinnerConfig.type = "ball-fussion";
      global.langKey = this.g ? this.g.langKey : null;
      global.transitions = new mdTransitions();
    }
    this.log = LoggerService.getInstance();
    this.http = HttpClientService.getInstance();
    this.lang = global.lang;
    this.initShorts(this.props, extractFromProp);
    this.parsedLocation = queryString.parse(location.search);
    this.socket = Socket.Instance;
    this.timeouts = [];
    this.antd = new ANTDControls(this, this.handleFormControlInput);
    // this.parsedLoc = queryString.parseUrl(location);
  }

  updateState(state, callback?) {
    let count = this.state.count;
    if (!count) {
      count = 1;
    } else {
      count++;
    }
    if (!this.isComponentMounted) {
      this.state = {
        ...this.state,
        ...state,
        count
      };
      if (typeof callback === "function") {
        callback();
      }
    } else {
      this.setState(
        {
          ...this.state,
          ...state,
          count,
          old: { ...this.state }
        },
        callback
      );
    }
  }

  componentWillUnmount = () => {
    this.isComponentMounted = false;
  };

  componentDidMount = () => {
    this.isComponentMounted = true;
  };

  updateStateWEvent(state, e = null, callback?) {
    if (!this.isComponentMounted || !e) {
      this.state = {
        ...this.state,
        ...state
      };
      return;
    }

    this.setState(
      {
        ...this.state,
        ...state,
        old: { ...this.state }
      },
      callback
    );
  }

  componentWillReceiveProps(nextProps: mdProps) {
    this.initShorts(nextProps);
    this.log.debug("afterReceivingProps", typeof this.afterReceivingProps);
    if (typeof this.afterReceivingProps === "function") {
      this.afterReceivingProps(nextProps != this.props);
    }
  }

  initShorts = (
    props: mdProps = this.props,
    extractFromProp: boolean = false
  ) => {
    this.g = props.globals;
    if (!extractFromProp) {
      if (this.state) {
        this.f = this.state.form;
      }
    } else {
      this.f = props.form;
      if (this.f) {
        this.f = {};
      }
    }
    this.p = props.params;
    if (!this.p) {
      this.p = {};
    }
  };

  appendChildToComponent(component, child) {
    if (!child) {
      return <>{component}</>;
    }
    let children = component.props.children;
    if (!children) {
      children = [];
    } else {
      if (!Array.isArray(children)) {
        children = [children];
      }
    }
    let childKey = child.key;
    if (!childKey) {
      childKey = children.length + 1;
      child = {
        ...child,
        key: childKey
      };
    }
    children = [...children, child];
    let props = {
      ...component.props,
      children: children
    };
    let comp = {
      ...component,
      props: props
    };
    return <>{comp}</>;
  }

  isNullOrEmpty(value: any): boolean {
    return StaticHelper.isNullOrEmpty(value);
  }

  emptyNaN(value: any): any | string {
    return StaticHelper.emptyNaN(value);
  }

  handleFormControlInput = (field, e, callback) => {
    if (!e) {
      return;
    }
    return this.handleFormControlInputWithValue(
      field,
      e.target.value,
      callback
    );
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
  };

  handleFormControlInputWithValue = (field, value, callback?) => {
    let formName = this.defaultFormName;
    let form = this.state[formName];
    let control = form[field] as mdFormControl;
    if (control.type == Enums.InputTypes.Number) {
      if (!this.isNullOrEmpty(value)) {
        value = parseFloat(value);
      }
    }
    form[field].value = value;
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
    this.updateState({ ...state }, callback);
  };

  validateFormControl(control: mdFormControl) {
    let params: ValidateParams = new ValidateParams(
      control.value,
      control.title,
      control.validators
    );
    let response: ValidationAttributeResponse = Validation.Validate([params]);
    if (!response.isValid) {
      control.errors = [...response.errors];
    } else {
      control.errors = [];
    }
    return control;
  }

  generateDynamicKey = (prefix: string = "id") => {
    prefix += StaticHelper.getUUID();
    return prefix;
  };
}
