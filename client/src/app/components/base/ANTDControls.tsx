import React from "react";
import { mdFormControl } from "../../../shared/form-control";
import { mdKeyValue } from "../../../models/key-value";
import {
  InputNumber,
  Select,
  DatePicker,
  Checkbox,
  Input,
  Form,
  Col,
  Modal
} from "antd";
import { InputTypes } from "../../../enums/general";
import moment from "moment";
import { StaticHelper } from "../../../shared/static-helper";
import { Constants } from "../../../shared/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { BasicBaseComponent } from "./BasicBaseComponent";
import NBSpinnerComponent from "../../modules/shared/spinner/NBSpinnerComponent";
import { LanguageBase } from "../../../language/language";
const FormItem = Form.Item;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;
const InputGroup = Input.Group;
const TextArea = Input.TextArea;

export default class ANTDControls {
  handleFormControlInput;
  instance: BasicBaseComponent;
  lang: LanguageBase;
  constructor(_instance: BasicBaseComponent, handleInput) {
    this.handleFormControlInput = handleInput;
    this.instance = _instance;
    this.lang = this.instance.lang;
  }

  private formItemInput = (
    control: mdFormControl,
    label: boolean = false,
    onInput?,
    formItemLayout: any = {},
    dropDownSource: mdKeyValue[] = [],
    showSpinner = false,
    format: string = Constants.Instance.DefaultDateFormat,
    formItem: boolean = true
  ) => {
    let id: string = control.name;
    let inputHandler = (e, ctrl: mdFormControl, ctrlInput = onInput) => {
      if (!e) {
        return;
      }
      if (!e.target) {
        return;
      }
      this.handleFormControlInput(ctrl.name, e, () => {
        if (ctrlInput) {
          if (!Array.isArray(ctrlInput)) {
            ctrlInput = [ctrlInput];
          }
          ctrlInput.forEach(f => {
            f(ctrl.name, e);
          });
        }
      });
    };
    let errors = control.errors.map((e, i) => {
      if (i > 0) {
        return (
          <React.Fragment key={i}>
            <br />
            {e}
          </React.Fragment>
        );
      }
      return <React.Fragment key={i}>{e}</React.Fragment>;
    });
    if (control.errors.length < 1) {
      errors = null;
    }
    let numberInput = (ctrl: mdFormControl, style?) => {
      if (!style) {
        style = formItemLayout.inputStyle;
      }
      if (!style) {
        style = { width: ctrl.width };
      }
      let classes = "";
      if (!StaticHelper.isNullOrEmpty(formItemLayout.inputClassName)) {
        classes = formItemLayout.inputClassName;
      }
      let value = ctrl.value;
      if (typeof value == "undefined" || value == null || isNaN(value)) {
        value = "";
      }
      return (
        <InputNumber
          id={id}
          className={classes}
          style={{ ...style }}
          placeholder={ctrl.placeholder}
          value={value}
          disabled={ctrl.disabled}
          min={ctrl.min}
          max={ctrl.max}
          step={ctrl.step}
          onChange={e => {
            inputHandler({ target: { value: e } }, ctrl);
          }}
        />
      );
    };
    let dropDownInput = (
      sControl: mdFormControl,
      ctrlSrc: mdKeyValue[],
      ctrlInput?,
      style?
    ) => {
      if (!style) {
        style = { width: sControl.width };
      }
      return (
        <Select
          showSearch
          style={{ ...style }}
          placeholder={sControl.placeholder}
          optionFilterProp="children"
          onChange={e => {
            inputHandler({ target: { value: e } }, sControl, ctrlInput);
          }}
          filterOption={(input, option) =>
            option.props.children
              .toString()
              .toLowerCase()
              .indexOf(input.toLowerCase()) >= 0
          }
          value={sControl.value}
          size={sControl.size}
          disabled={sControl.disabled}
        >
          {ctrlSrc.map((s: mdKeyValue, i) => {
            return (
              <Option key={i} value={s.value}>
                {s.key}
              </Option>
            );
          })}
        </Select>
      );
    };
    let numberWithDropdown = (ctrl: mdFormControl) => {
      control.type = InputTypes.Number;
      ctrl.type = InputTypes.Select;
      ctrl.dropDownControl.type = InputTypes.Select;
      return (
        <InputGroup compact style={{ width: ctrl.width, display: "flex" }}>
          {dropDownInput(
            control.dropDownControl,
            dropDownSource,
            ctrl.onDropDownInput,
            {}
          )}
          {numberInput(control, { flexGrow: 100 })}
        </InputGroup>
      );
    };
    let textWithDropdown = (ctrl: mdFormControl) => {
      control.type = InputTypes.Text;
      ctrl.type = InputTypes.Text;
      ctrl.dropDownControl.width = "auto";
      return (
        <InputGroup compact style={{ width: ctrl.width, display: "flex" }}>
          {InputElement(ctrl.dropDownControl)}
          {generalInput(ctrl)}
        </InputGroup>
      );
    };
    let dateInput = (ctrl: mdFormControl, style?) => {
      if (!style) {
        style = { width: ctrl.width };
      }
      return (
        <DatePicker
          id={id}
          style={{ ...style }}
          placeholder={ctrl.placeholder}
          value={ctrl.value ? moment(ctrl.value, format) : null}
          disabled={ctrl.disabled}
          onChange={e => {
            inputHandler({ target: { value: e } }, ctrl);
          }}
        />
      );
    };
    let checkboxInput = (ctrl: mdFormControl) => {
      return (
        <Checkbox
          onChange={e => {
            let ee = {};
            inputHandler(
              {
                target: {
                  value: e.target.checked
                }
              },
              ctrl
            );
          }}
          value={control.value ? control.value : ""}
          disabled={ctrl.disabled}
        >
          {control.placeholder}
        </Checkbox>
      );
    };
    let textAreaInput = (ctrl: mdFormControl) => {
      return (
        <TextArea
          id={id}
          onChange={e => {
            inputHandler(e, ctrl);
          }}
          placeholder={control.title}
          value={control.value ? control.value : ""}
          disabled={ctrl.disabled}
          rows={ctrl.rows}
        />
      );
    };
    let dateRangePicker = (ctrl: mdFormControl) => {
      return (
        <RangePicker
          id={id}
          style={{ width: ctrl.width }}
          onChange={e => {
            inputHandler({ target: { value: e } }, ctrl);
          }}
          value={ctrl.value ? ctrl.value : ""}
          disabled={ctrl.disabled}
        />
      );
    };
    let generalInput = (ctrl: mdFormControl) => {
      return (
        <Input
          id={id}
          style={{ width: ctrl.width }}
          onChange={e => {
            inputHandler(e, ctrl);
          }}
          placeholder={
            StaticHelper.isNullOrEmpty(ctrl.placeholder)
              ? ctrl.title
              : ctrl.placeholder
          }
          value={ctrl.value ? ctrl.value : ""}
          type={ctrl.type}
          disabled={ctrl.disabled}
          prefix={
            StaticHelper.isNullOrEmpty(ctrl.icon) ? null : (
              <FontAwesomeIcon icon={["fas", ctrl.icon as any]} />
            )
            // FontAwesome.faIcon(ctrl.icon as any)
          }
          // <Icon type={control.icon} style={{ color: 'rgba(0,0,0,.25)' }} />}
        />
      );
    };
    let InputElement = (ctrl: mdFormControl) => {
      if (!ctrl.width) {
        ctrl.width = "100%";
      }
      if (ctrl.type == InputTypes.Number) {
        return numberInput(ctrl);
      } else if (ctrl.type == InputTypes.Label) {
        if (typeof ctrl.render === "function") {
          return ctrl.render(ctrl);
        }
        return (
          <>
            <label id={id} style={{ width: ctrl.width }}>
              {ctrl.value ? ctrl.value : ""}
            </label>
            {/* <Input style={{ display: 'hidden' }}/> */}
          </>
        );
      } else if (ctrl.type == InputTypes.NumberWithDropdown) {
        return numberWithDropdown(ctrl);
      } else if (ctrl.type == InputTypes.TextWithChild) {
        return textWithDropdown(ctrl);
      } else if (ctrl.type == InputTypes.Date) {
        return dateInput(ctrl);
      } else if (ctrl.type == InputTypes.Checkbox) {
        return checkboxInput(ctrl);
      } else if (ctrl.type == InputTypes.TextArea) {
        return textAreaInput(ctrl);
      } else if (ctrl.type == InputTypes.Daterange) {
        return dateRangePicker(ctrl);
      } else if (ctrl.type == InputTypes.Select) {
        return dropDownInput(ctrl, dropDownSource);
      } else {
        return generalInput(ctrl);
      }
    };
    if (!formItem) {
      return InputElement(control);
    }
    return (
      <FormItem
        {...formItemLayout}
        help={errors}
        label={label ? control.title : ""}
        validateStatus={control.errors.length > 0 ? "error" : "success"}
      >
        {InputElement(control)}
        <NBSpinnerComponent params={{ show: showSpinner }} />
      </FormItem>
    );
  };

  textFormItem = (
    control: mdFormControl,
    label: boolean = false,
    onInput?,
    formItemLayout = null
  ) => {
    control.type = InputTypes.Text;
    return this.formItemInput(control, label, onInput, formItemLayout);
  };

  textAreaFormItem = (
    control: mdFormControl,
    rows = 2,
    label: boolean = false,
    onInput?,
    formItemLayout = null
  ) => {
    control.type = InputTypes.TextArea;
    control.rows = rows;
    return this.formItemInput(control, label, onInput, formItemLayout);
  };

  checkboxFormItem = (
    control: mdFormControl,
    label: boolean = false,
    onInput?,
    placeholder: any = null
  ) => {
    control.type = InputTypes.Checkbox;
    if (placeholder) {
      control.placeholder = placeholder;
    }
    return this.formItemInput(control, label, onInput);
  };

  passwordFormItem = (
    control: mdFormControl,
    label: boolean = false,
    onInput?,
    formItemLayout = null
  ) => {
    control.type = InputTypes.Password;
    return this.formItemInput(control, label, onInput, formItemLayout);
  };

  dateFormItem = (
    control: mdFormControl,
    label: boolean = false,
    onInput?,
    formItemLayout = null,
    format: string = Constants.Instance.DefaultDateFormat,
    disabled: boolean = false
  ) => {
    control.type = InputTypes.Date;
    control.disabled = disabled;
    return this.formItemInput(
      control,
      label,
      onInput,
      formItemLayout,
      null,
      false,
      format
    );
  };

  labelFormItem = (
    control: mdFormControl,
    label: boolean = false,
    formItemLayout: any = {},
    render?
  ) => {
    control.type = InputTypes.Label;
    control.render = render;
    return this.formItemInput(control, label, InputTypes.Text, formItemLayout);
  };

  numberFormItem = (
    control: mdFormControl,
    label: boolean = false,
    step: number = 1,
    min: number = 0,
    max: number = 9999999999,
    onInput?,
    formItemLayout: any = {},
    placeholder: string = ""
  ) => {
    control.type = InputTypes.Number;
    control.min = isNaN(min) ? 0 : min;
    control.max = isNaN(max) ? 0 : max;
    control.step = isNaN(step) ? 1 : step;
    control.placeholder = placeholder;
    return this.formItemInput(control, label, onInput, formItemLayout);
  };

  numberWithoutFormItem = (
    control: mdFormControl,
    label: boolean = false,
    step: number = 1,
    min: number = 0,
    max: number = 9999999999,
    onInput?,
    formItemLayout: any = {},
    placeholder: string = ""
  ) => {
    control.type = InputTypes.Number;
    control.min = min;
    control.max = max;
    control.placeholder = placeholder;
    if (isNaN(step)) {
      step = 1;
    }
    control.step = step;
    return this.formItemInput(
      control,
      label,
      onInput,
      formItemLayout,
      [],
      false,
      null,
      false
    );
  };

  textWithChildFormItem = (
    control: mdFormControl,
    dropDownControl: mdFormControl,
    dropDownSource: mdKeyValue[],
    onDropDownInput,
    label: boolean = false,
    onInput?,
    formItemLayout = null
  ) => {
    control.type = InputTypes.TextWithChild;
    control.onDropDownInput = onDropDownInput;
    control.dropDownControl = dropDownControl;
    return this.formItemInput(
      control,
      label,
      onInput,
      formItemLayout,
      dropDownSource
    );
  };

  numberWithDropDownFormItem = (
    control: mdFormControl,
    dropDownControl: mdFormControl,
    dropDownSource: mdKeyValue[],
    onDropDownInput,
    label: boolean = false,
    step: number = 1,
    min: number = 0,
    max: number = 9999999999,
    showSpinner: boolean = false,
    onControlInput?,
    formItemLayout: any = {}
  ) => {
    control.type = InputTypes.NumberWithDropdown;
    control.onDropDownInput = onDropDownInput;
    control.dropDownControl = dropDownControl;
    control.min = min;
    control.max = max;
    if (isNaN(step)) {
      step = 1;
    }
    control.step = step;
    return this.formItemInput(
      control,
      label,
      onControlInput,
      formItemLayout,
      dropDownSource,
      showSpinner
    );
  };

  selectFormItem = (
    control: mdFormControl,
    source: mdKeyValue[],
    label: boolean = false,
    showSpinner: boolean = false,
    onInput?,
    formItemLayout: any = {}
  ) => {
    control.type = InputTypes.Select;
    return this.formItemInput(
      control,
      label,
      onInput,
      formItemLayout,
      source,
      showSpinner
    );
  };

  daterangeFormItem = (
    control: mdFormControl,
    label: boolean = false,
    onInput,
    formItemLayout: any = {}
  ) => {
    control.type = InputTypes.Daterange;
    return this.formItemInput(control, label, onInput, formItemLayout);
  };

  colmd1(children) {
    return (
      <Col
        //key={this.instance.generateDynamicKey()}
        xs="12"
        sm="2"
        md="1"
        lg="1"
        xl="1"
      >
        {children}
      </Col>
    );
  }

  colmd3(children, className?) {
    return (
      <Col
        className={className}
        //key={this.instance.generateDynamicKey()}
        xs={24}
        sm={24}
        md={3}
        lg={3}
        xl={3}
      >
        {children}
      </Col>
    );
  }

  colmd4(children) {
    return (
      <Col
        //key={this.instance.generateDynamicKey()}
        xs={12}
        sm={8}
        md={4}
        lg={4}
        xl={4}
      >
        {children}
      </Col>
    );
  }

  colmd10(children, className?) {
    return (
      <Col
        className={className}
        //key={this.instance.generateDynamicKey()}
        xs={24}
        sm={24}
        md={10}
        lg={10}
        xl={10}
      >
        {children}
      </Col>
    );
  }

  colmd12(
    children,
    noPaddingLeft = false,
    noPaddingRight = true,
    style = null,
    className = ""
  ) {
    if (!style) {
      style = {};
    }
    let cw = this.instance.state.currentWidth;
    if (!(cw == "xs" || cw == "sm")) {
      if (noPaddingLeft) {
        style["paddingLeft"] = 1;
      }
      if (noPaddingRight) {
        style["paddingRight"] = 1;
      }
    } else {
      if (noPaddingLeft || noPaddingRight) {
        style["paddingLeft"] = 1;
        style["paddingRight"] = 1;
      }
    }
    return (
      <Col
        style={{ ...style }}
        xs={24}
        sm={24}
        md={12}
        lg={12}
        xl={12}
        className={className}
      >
        {children}
      </Col>
    );
  }

  colmd6(
    children,
    noPaddingLeft = false,
    noPaddingRight = true,
    style = null,
    className = ""
  ) {
    if (!style) {
      style = {};
    }
    let cw = this.instance.state.currentWidth;
    if (!(cw == "xs" || cw == "sm")) {
      if (noPaddingLeft) {
        style["paddingLeft"] = 1;
      }
      if (noPaddingRight) {
        style["paddingRight"] = 1;
      }
    } else {
      if (noPaddingLeft || noPaddingRight) {
        style["paddingLeft"] = 1;
        style["paddingRight"] = 1;
      }
    }
    return (
      <Col
        //key={this.instance.generateDynamicKey()}
        style={{ ...style }}
        xs={24}
        sm={12}
        md={6}
        lg={6}
        xl={6}
        className={className}
      >
        {children}
      </Col>
    );
  }

  colmd9(children) {
    return (
      <Col
        //key={this.instance.generateDynamicKey()}
        xs={12}
        sm={12}
        md={9}
        lg={9}
        xl={9}
      >
        {children}
      </Col>
    );
  }

  colsm12(
    children,
    noPaddingLeft = false,
    noPaddingRight = true,
    style = null
  ) {
    if (!style) {
      style = {};
    }
    let cw = this.instance.state.currentWidth;
    if (!(cw == "xs" || cw == "sm")) {
      if (noPaddingLeft) {
        style["paddingLeft"] = 1;
      }
      if (noPaddingRight) {
        style["paddingRight"] = 1;
      }
    } else {
      if (noPaddingLeft || noPaddingRight) {
        style["paddingLeft"] = 1;
        style["paddingRight"] = 1;
      }
    }
    return (
      <Col
        //key={this.instance.generateDynamicKey()}
        style={{ ...style }}
        xs={12}
        sm={12}
        md={12}
        lg={12}
        xl={12}
      >
        {children}
      </Col>
    );
  }

  colsm6(children) {
    return (
      <Col
        //key={this.instance.generateDynamicKey()}
        xs={6}
        sm={6}
        md={6}
        lg={6}
        xl={6}
      >
        {children}
      </Col>
    );
  }

  colsm8(children, className = "") {
    return (
      <Col
        //key={this.instance.generateDynamicKey()}
        className={className}
        xs={8}
      >
        {children}
      </Col>
    );
  }

  colsm16(children) {
    return (
      <Col
        //key={this.instance.generateDynamicKey()}
        xs={16}
      >
        {children}
      </Col>
    );
  }

  colsm18(children) {
    return (
      <Col
        //key={this.instance.generateDynamicKey()}
        xs={18}
      >
        {children}
      </Col>
    );
  }

  colmd24(children, className?) {
    return (
      <Col
        className={className}
        //key={this.instance.generateDynamicKey()}
        xs={24}
        sm={24}
        md={24}
        lg={24}
        xl={24}
      >
        {children}
      </Col>
    );
  }

  colmd48(children) {
    return (
      <Col
        //key={this.instance.generateDynamicKey()}
        xs={48}
        sm={48}
        md={48}
        lg={48}
        xl={48}
      >
        {children}
      </Col>
    );
  }

  colmd16(children) {
    return (
      <Col
        //key={this.instance.generateDynamicKey()}
        xs={24}
        sm={24}
        md={16}
        lg={16}
        xl={16}
      >
        {children}
      </Col>
    );
  }

  colmd18(children) {
    return (
      <Col
        //key={this.instance.generateDynamicKey()}
        xs={24}
        sm={24}
        md={18}
        lg={18}
        xl={18}
      >
        {children}
      </Col>
    );
  }

  collg16(children) {
    return (
      <Col
        //key={this.instance.generateDynamicKey()}
        xs={24}
        sm={24}
        md={24}
        lg={16}
        xl={16}
      >
        {children}
      </Col>
    );
  }

  colmd8(children, props: any = {}) {
    return (
      <Col {...props} xs={24} sm={24} md={8} lg={8} xl={8}>
        {children}
      </Col>
    );
  }

  collg8(children) {
    return (
      <Col
        //key={this.instance.generateDynamicKey()}
        xs={24}
        sm={24}
        md={12}
        lg={8}
        xl={8}
      >
        {children}
      </Col>
    );
  }

  collg12(children) {
    return (
      <Col xs={24} sm={24} md={24} lg={12} xl={12}>
        {children}
      </Col>
    );
  }

  colxl12(children) {
    return (
      <Col xs={24} sm={24} md={24} lg={24} xl={12}>
        {children}
      </Col>
    );
  }

  modalInfo = (body, title = this.lang.Alert) => {
    Modal.info({
      title: title,
      content: body
    });
  };

  modalSuccess = (body, title = this.lang.Alert) => {
    Modal.success({
      title: title,
      content: body
    });
  };

  modalWarning = (body, title = this.lang.Warning) => {
    Modal.warning({
      title: title,
      content: body
    });
  };

  modalError = (body, title = this.lang.Error) => {
    Modal.error({
      title: title,
      content: body
    });
  };
}
