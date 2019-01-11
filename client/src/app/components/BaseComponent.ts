import React = require("react");
import { mdProps, mdPropKeys } from "../../models/props";
import { Constants } from "../../shared/constants";
import { LanguageBase } from "../../shared/language";
import { mdFormControl } from "../../shared/form-control";
import { ValidateParams, ValidationAttributeResponse, Validation } from "../../shared/validations";
import { StaticHelper } from "../../shared/static-helper";
import LoggerService from "../../shared/logger";
import HttpClientService from "../../shared/http-client.service";
import mdSpinnerConfig from "../../models/spinner-config";
import * as Enums from "../../enums/general";


export class BaseComponent extends React.Component<mdProps, any>{

    constants: Constants;
    log: LoggerService;
    http: HttpClientService;
    lang: LanguageBase;
    f?: any;
    p: any;
    showErrors = false;
    constructor(props) {
        super(props);
        this.initClasses();
    }

    initClasses() {
        this.constants = Constants.getInstance();
        if (!global.mainSpinnerConfig) {
            global.isDev = this.constants.IsDev;
            global.propKeys = new mdPropKeys();
            global.mainSpinnerConfig = new mdSpinnerConfig();
            global.mainSpinnerConfig.bdColor = "rgba(51, 51, 51, 0.8)";
            global.mainSpinnerConfig.size = Enums.SpinnerSize.medium;
            global.mainSpinnerConfig.color = "rgb(243, 103, 93)";
            global.mainSpinnerConfig.type = "ball-fussion";
        }
        this.log = LoggerService.getInstance();
        this.http = HttpClientService.getInstance();
        this.lang = global.lang;
        this.initShorts();
    }

    initShorts() {
        this.f = this.props.form;
        this.p = this.props.params;
    }

    // componentWillReceiveProps(nextProps) {
    //     this.setState({ form: nextProps.form });
    //     this.initShorts();
    // }

    // shouldComponentUpdate(nextProps, nextState) {
    //     return this.state.form != nextState.form;
    // }

    handleFormControlInput = (field, e) => {
        if (!e) {
            return;
        }
        let form = this.state.form;
        form[field].value = e.target.value;
        if (this.showErrors) {
            form[field] = this.validateFormControl(form[field]);
        }
        this.setState({ form: form });
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
            if (control.validators != null) {
                control = this.validateFormControl(form[k]);
                form[k] = control;
                if (control.errors.length > 0) {
                    isValid = false;
                }
            }
        });
        if (!isValid) {
            let targetObj = StaticHelper.assignPropertyOfObject({}, formName, form);
            this.setState(targetObj);
        }
        return isValid;
    }

    getFormData(form: any) {
        let keys = Object.keys(form);
        let fd = {};
        keys.forEach(k => {
            fd = StaticHelper.assignPropertyOfObject(fd, k, form[k].value);
        });
        return fd;
    }

    isNullOrEmpty(value: any): boolean
    {
        return StaticHelper.isNullOrEmpty(value);
    }

}