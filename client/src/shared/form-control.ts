import { ValidationAttribute } from "./validation-attributes";

export class mdFormControl
{
    value: any;
    title: string;
    validators: ValidationAttribute[];
    errors:any[];
    name: string;
    interval: any;//controls the setinterval on mouse down and up
    continousAnim: boolean;
    constructor(_value?, _name?, _title?, _validators?, _errors?, _interval?, _continousAnim: boolean = false)
    {
        this.value = _value;
        this.title = _title;
        this.validators = _validators;
        this.errors = _errors;
        this.name = _name;
        this.interval = _interval;
        this.continousAnim = _continousAnim;
        if(!this.errors)
        {
            this.errors = [];
        }
    }
}