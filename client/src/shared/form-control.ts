import { ValidationAttribute } from "./validation-attributes";

export class mdFormControl
{
    value: any;
    title: string;
    validators: ValidationAttribute[];
    errors:any[];
    name: string;
    constructor(_value?, _name?, _title?, _validators?, _errors?)
    {
        this.value = _value;
        this.title = _title;
        this.validators = _validators;
        this.errors = _errors;
        this.name = _name;
        if(!this.errors)
        {
            this.errors = [];
        }
    }
}