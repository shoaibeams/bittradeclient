import * as ValidationAttributes from "./validation-attributes";

export class Validation {
    static Validate(params: ValidateParams[]): ValidationAttributeResponse {
        var resposne = new ValidationAttributeResponse();
        for (var i = 0; i < params.length; i++) {
            var param = params[i];
            if (param.validationAttributes) {
                for (var j = 0; j < param.validationAttributes.length; j++) {
                    var attr = param.validationAttributes[j];
                    if (!attr.IsValid(param.value)) {
                        resposne.isValid = false;
                        let errors = attr.GetErrorMessage(param.name);
                        if(!Array.isArray(errors))
                        {
                            errors = [errors];
                        }
                        resposne.errors = [...resposne.errors, ...errors];
                    }
                }
            }
        }
        return resposne;
    }

}

export class ValidateParams {
    constructor(currentValue: any, displayName: string,
        validationAttrs: ValidationAttributes.ValidationAttribute[]) {
        this.value = currentValue;
        this.validationAttributes = validationAttrs;
        this.name = displayName;
    }
    public value: any;
    public validationAttributes: ValidationAttributes.ValidationAttribute[];
    public name: string;
}

export class ValidationAttributeResponse {
    constructor() {
        this.isValid = true;
        this.errors = new Array();
    }
    public isValid: boolean;
    public errors: string[];
}