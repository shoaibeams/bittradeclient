import { ValidationAttribute } from "./validation-attributes";
import { InputTypes, SelectSizes } from "../enums/general";

export class mdFormControl {
  value: any;
  title: string;
  validators: ValidationAttribute[];
  errors: any[];
  name: string;
  interval: any; //controls the setinterval on mouse down and up
  continousAnim: boolean;
  type?: InputTypes;
  disabled?: boolean;
  placeholder?: any;
  min?: number;
  max?: number;
  size?: SelectSizes;
  step?: number;
  icon?: string;
  dropDownControl?: mdFormControl;
  onDropDownInput?: any;
  rows?: number;
  width?: any;
  render?;
  constructor(_value?, _name?, _title?, _validators?, _icon?: string) {
    this.value = _value;
    this.title = _title;
    this.validators = _validators;
    this.name = _name;
    if (!this.errors) {
      this.errors = [];
    }
    this.icon = _icon;
  }
}
