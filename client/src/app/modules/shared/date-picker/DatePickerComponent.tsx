import * as React from "react";
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import MomentLocaleUtils, {
    formatDate,
    parseDate,
} from 'react-day-picker/moment';
import * as moment from "moment";
import 'moment/locale/it';
import DefaultClassNames from "react-day-picker/lib/src/classNames";
import { BasicBaseComponent } from "../../../components/base/BasicBaseComponent";

export default class DatePickerComponent extends BasicBaseComponent {

    render() {
        this.initShorts();
        let classNames = {
            ...DefaultClassNames,
            container: `form-control DayPickerInput ${this.p.control.errors.length > 0 ? 'is-invalid' : ''}`,
            overlayWrapper: 'DayPickerInput-OverlayWrapper',
            overlay: 'DayPickerInput-Overlay'
        }
        return (
            <DayPickerInput
                formatDate={formatDate}
                parseDate={parseDate}
                placeholder={this.p.control.title}
                onDayChange={(e)=>{
                    this.log.debug(e);
                    if(!this.p.onInput)
                    {
                        return;
                    }
                    this.p.onInput({
                        target:{
                            value: e,
                        }
                    })}}
                value={this.p.control.value}
                format="DD/MM/YYYY"
                classNames={classNames}
                inputProps={{
                    className: 'daypicker-input',// `form-control ${this.p.control.errors.length > 0 ? 'is-invalid' : ''}`
                    readOnly: true,
                }}
            />
        );
    }

    constructor(props) {
        super(props);
        this.init();
    }

    init() {
    }

}