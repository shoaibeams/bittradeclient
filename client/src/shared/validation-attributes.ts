import * as EmailValidator from 'email-validator';
import { StaticHelper } from './static-helper';
import LoggerService from './logger';

const log: LoggerService = LoggerService.Instance;
export interface ValidationAttribute {
    IsValid(value: any): boolean;
    GetErrorMessage(displayName: string): string;
}

export class RequiredValidator implements ValidationAttribute {
    constructor(errorMsgFormat: string) {
        this.errorMessageFormat = errorMsgFormat;
    }

    IsValid(value: any): boolean {

        try {
            if (value == null) {
                return false;
            }

            if (typeof value === 'undefined') {
                return false;
            }

            if (typeof value === 'string')// ||  || typeof value === 'string')
            {
                var valString = value.toString();
                if (valString.length < 1) {
                    return false;
                }
                else {
                    return true;
                }
            }
            else if (typeof value === 'number') {
                try {
                    var valNumber = Number(value.toString());
                    return true;
                }
                catch (err) {
                    return false;
                }
            }
            else if (typeof value === 'boolean') {
                var valBool = value.toString();
                if (valBool == 'true' || valBool == 'false') {
                    return true;
                }
                else {
                    return false;
                }
            }
            else {
                return false;
            }
        }
        catch (err) {
            log.error(__filename, err);
            return false;
        }
    }
    GetErrorMessage(displayName: string): string {
        this.errorMessage = StaticHelper.formatString(this.errorMessageFormat, displayName);
        return this.errorMessage;
    }
    errorMessage: string;
    errorMessageFormat: string;
}

export class MinLengthValidator implements ValidationAttribute {
    constructor(errorMsgFormat: string, minimumLength: number) {
        this.errorMessageFormat = errorMsgFormat;
        this.minlength = minimumLength;
    }

    IsValid(value: string): boolean {

        try {
            var length = value.length;
            if (length < this.minlength) {
                return false;
            }
            else {
                return true;
            }
        }
        catch (err) {
            log.error(__filename, err);
            return false;
        }
    }
    GetErrorMessage(displayName: string): string {
        this.errorMessage = StaticHelper.formatString(this.errorMessageFormat, displayName, this.minlength);
        return this.errorMessage;
    }
    errorMessage: string;
    attributeDisplayName: string;
    errorMessageFormat: string;
    minlength: number;
}

export class MaxLengthValidator implements ValidationAttribute {
    constructor(errorMsgFormat: string, maximumLength: number) {
        this.errorMessageFormat = errorMsgFormat;
        this.maxlength = maximumLength;
    }

    IsValid(value: string): boolean {

        try {
            if(!value)
            {
                return true;
            }
            var length = value.length;
            if (length > this.maxlength) {
                return false;
            }
            else {
                return true;
            }
        }
        catch (err) {
            log.error(__filename, err);
            return false;
        }
    }
    GetErrorMessage(displayName: string): string {
        this.errorMessage = StaticHelper.formatString(this.errorMessageFormat, displayName, this.maxlength);
        return this.errorMessage;
    }
    errorMessage: string;
    attributeDisplayName: string;
    errorMessageFormat: string;
    maxlength: number;
}

export class RangeLengthValidator implements ValidationAttribute {
    constructor(errorMsgFormat: string, minimumLength: number, maximumLength: number) {
        this.errorMessageFormat = errorMsgFormat;
        this.maxlength = maximumLength;
        this.minlength = minimumLength;
    }

    IsValid(value: string): boolean {

        try {
            var length = value.length;
            if (length > this.maxlength || length < this.minlength) {
                return false;
            }
            else {
                return true;
            }
        }
        catch (err) {
            log.error(__filename, err);
            return false;
        }
    }
    GetErrorMessage(displayName: string): string {
        this.errorMessage = StaticHelper.formatString(this.errorMessageFormat, displayName, this.minlength, this.maxlength);
        return this.errorMessage;
    }
    errorMessage: string;
    attributeDisplayName: string;
    errorMessageFormat: string;
    maxlength: number;
    minlength: number;
}

export class RequiredIfValidator implements ValidationAttribute {
    constructor(dependentAttrDisplayName: string,
        dependentAttrTargetValue: any, dependentAtrrValue: any, errorMsgFormat: string) {
        this.errorMessageFormat = errorMsgFormat;
        this.dependentAttributeDisplayName = dependentAttrDisplayName;
        this.dependentAttributeTargetValue = dependentAttrTargetValue;
        this.dependentAttributeValue = dependentAtrrValue;
        this.innerAttribute = new RequiredValidator("");
    }

    IsValid(value: any): boolean {

        if (!this.innerAttribute.IsValid(this.dependentAttributeTargetValue)) {
            return true;
        }

        if (this.dependentAttributeTargetValue != null) {
            if (typeof this.dependentAttributeTargetValue != 'undefined') {
                if (this.dependentAttributeValue != this.dependentAttributeTargetValue) {
                    return true;
                }
            }
        }

        try {
            if (value == null) {
                return false;
            }

            if (typeof value === 'undefined') {
                return false;
            }

            if (typeof value === 'string')// ||  || typeof value === 'string')
            {
                var valString = value.toString();
                if (valString.length < 1) {
                    return false;
                }
                else {
                    return true;
                }
            }
            else if (typeof value === 'number') {
                try {
                    var valNumber = Number(value.toString());
                    return true;
                }
                catch (err) {
                    return false;
                }
            }
            else if (typeof value === 'boolean') {
                var valBool = value.toString();
                if (valBool == 'true' || valBool == 'false') {
                    return true;
                }
                else {
                    return false;
                }
            }
            else {
                return false;
            }
        }
        catch (err) {
            log.error(__filename, err);
            return false;
        }
    }
    GetErrorMessage(displayName: string): string {
        this.errorMessage = StaticHelper.formatString(this.errorMessageFormat, displayName, this.dependentAttributeDisplayName);
        return this.errorMessage;
    }
    errorMessage: string;
    errorMessageFormat: string;
    attributeDisplayName: string;
    dependentAttributeDisplayName: string;
    dependentAttributeTargetValue: string;
    dependentAttributeValue: string;
    innerAttribute: RequiredValidator;
}

export class MinValidator implements ValidationAttribute {
    constructor(errorMsgFormat: string, minimum: number) {
        this.errorMessageFormat = errorMsgFormat;
        this.min = minimum;
    }

    IsValid(value: number): boolean {

        try {
            if (value < this.min) {
                return false;
            }
            else {
                return true;
            }
        }
        catch (err) {
            log.error(__filename, err);
            return false;
        }
    }
    GetErrorMessage(displayName: string): string {
        this.errorMessage = StaticHelper.formatString(this.errorMessageFormat, displayName, this.min);
        return this.errorMessage;
    }
    errorMessage: string;
    attributeDisplayName: string;
    errorMessageFormat: string;
    min: number;
}

export class MaxValidator implements ValidationAttribute {
    constructor(errorMsgFormat: string, maximum: number) {
        this.errorMessageFormat = errorMsgFormat;
        this.max = maximum;
    }

    IsValid(value: number): boolean {

        try {
            if (value > this.max) {
                return false;
            }
            else {
                return true;
            }
        }
        catch (err) {
            log.error(__filename, err);
            return false;
        }
    }
    GetErrorMessage(displayName: string): string {
        this.errorMessage = StaticHelper.formatString(this.errorMessageFormat, displayName, this.max);
        return this.errorMessage;
    }
    errorMessage: string;
    attributeDisplayName: string;
    errorMessageFormat: string;
    max: number;
}

export class RangeValidator implements ValidationAttribute {
    constructor(errorMsgFormat: string, minimum: number, maximum: number) {
        this.errorMessageFormat = errorMsgFormat;
        this.min = minimum;
        this.max = maximum;
    }

    IsValid(value: number): boolean {

        try {
            if (value < this.min || value > this.max) {
                return false;
            }
            else {
                return true;
            }
        }
        catch (err) {
            log.error(__filename, err);
            return false;
        }
    }
    GetErrorMessage(displayName: string): string {
        this.errorMessage = StaticHelper.formatString(this.errorMessageFormat, displayName, this.min, this.max);
        return this.errorMessage;
    }
    errorMessage: string;
    attributeDisplayName: string;
    errorMessageFormat: string;
    min: number;
    max: number;
}

export class MailValidator implements ValidationAttribute {
    constructor(errorMsgFormat: string) {
        this.errorMessageFormat = errorMsgFormat;
    }

    IsValid(value: string): boolean {
        try {
            if (EmailValidator.validate(value)) {
                return true;
            }
            else {
                return false;
            }
        }
        catch (err) {
            log.error(__filename, err);
            return false;
        }
    }
    GetErrorMessage(displayName: string): string {
        this.errorMessage = StaticHelper.formatString(this.errorMessageFormat, displayName);
        return this.errorMessage;
    }
    errorMessage: string;
    errorMessageFormat: string;
}

export class RegexValidator implements ValidationAttribute {
    constructor(errorMsgFormat: string, regexString: string, ...args) {
        this.errorMessageFormat = errorMsgFormat;
        this.argss = args;
        this.regex = new RegExp(StaticHelper.formatString(regexString, ...this.argss));
        this.innerAttribute = new RegexpValidator(this.errorMessageFormat, this.regex, ...this.argss);
    }

    IsValid(value: string): boolean {
        try {
            if (this.innerAttribute.IsValid(value)) {
                return true;
            }
            else {
                return false;
            }
        }
        catch (err) {
            log.error(__filename, err);
            return false;
        }
    }
    GetErrorMessage(displayName: string): string {
        this.errorMessage = StaticHelper.formatString(this.errorMessageFormat, displayName, ...this.argss);
        return this.errorMessage;
    }
    errorMessage: string;
    errorMessageFormat: string;
    regex: RegExp;
    private innerAttribute: RegexpValidator;
    argss: any[];
}

export class RegexpValidator implements ValidationAttribute {
    constructor(errorMsgFormat: string, regexp: RegExp, ...args) {
        this.errorMessageFormat = errorMsgFormat;
        this.regex = regexp;
        this.argss = args;
    }

    IsValid(value: string): boolean {
        try {
            if (this.regex.test(value)) {
                return true;
            }
            else {
                return false;
            }
        }
        catch (err) {
            log.error(__filename, err);
            return false;
        }
    }
    GetErrorMessage(displayName: string): string {
        this.errorMessage = StaticHelper.formatString(this.errorMessageFormat, displayName, ...this.argss);
        return this.errorMessage;
    }
    errorMessage: string;
    errorMessageFormat: string;
    regex: RegExp;
    argss: any[];
}

export class IfExistsInObjectValidator implements ValidationAttribute {
    constructor(errorMsgFormat: string, obj: object, ...args) {
        this.errorMessageFormat = errorMsgFormat;
        this.argss = args;
        this.jsonObject = obj;
    }

    IsValid(value: string): boolean {
        try {
            if (!this.jsonObject) {
                return false;
            }
            var valuesArray = Object.keys(this.jsonObject).map((valueNamedIndex) => {
                return this.jsonObject[valueNamedIndex];
            });
            if (valuesArray.indexOf(value) == -1) {
                return false;
            }
            else {
                return true;
            }
        }
        catch (err) {
            log.error(__filename, err);
            return false;
        }
    }
    GetErrorMessage(displayName: string): string {
        this.errorMessage = StaticHelper.formatString(this.errorMessageFormat, displayName, ...this.argss);
        return this.errorMessage;
    }
    errorMessage: string;
    errorMessageFormat: string;
    argss: any[];
    jsonObject: object;
}
