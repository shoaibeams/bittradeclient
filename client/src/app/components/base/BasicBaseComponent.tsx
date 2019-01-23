import React = require("react");
import { mdProps, mdGlobalProps, mdPropKeys } from "../../../models/props";
import { Constants } from "../../../shared/constants";
import LoggerService from "../../../shared/logger";
import HttpClientService from "../../../shared/http-client.service";
import { LanguageBase } from "../../../shared/language";
import mdSpinnerConfig from "../../../models/spinner-config";
import mdTransitions from "../../../models/transitions";
import * as Enums from "../../../enums/general";
import * as queryString from 'query-string';

export class BasicBaseComponent extends React.Component<mdProps, any>{

    constants: Constants;
    log: LoggerService;
    http: HttpClientService;
    lang: LanguageBase;
    f?: any;
    p: any;
    g: mdGlobalProps;
    showErrors = false;
    parsedLocation: any;
    componentMountedFirstTime = false;
    defaultFormName = "form";
    parsedLoc: any;
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
            global.transitions = new mdTransitions();
        }
        this.log = LoggerService.getInstance();
        this.http = HttpClientService.getInstance();
        this.lang = global.lang;
        this.initShorts(extractFromProp);
        this.parsedLocation = queryString.parse(location.search);
        // this.parsedLoc = queryString.parseUrl(location);
    }

    updateState(state, callback?) {
        if(!this.componentMountedFirstTime)
        {
            this.state = {
                ...this.state,
                ...state,
            }
        }
        
        this.setState({
            ...this.state,
            ...state,
            old: { ...this.state }
        }, callback);
    }

    initShorts(extractFromProp: boolean = false) {
        this.g = this.props.globals;
        if (!extractFromProp) {
            if (this.state) {
                this.f = this.state.form;
            }
        }
        else {
            this.f = this.props.form;
        }
        this.p = this.props.params;
    }

}