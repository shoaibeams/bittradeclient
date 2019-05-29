import * as React from "react";
import { mdButtonCellSmartTableRenderValue } from "./button-cell-smart-table-render-value";
import { BaseComponent } from "../../../components/base/BaseComponent";

export class ButtonCellSmartTableRendererComponent extends BaseComponent {
  render() {
    let renderValue: mdButtonCellSmartTableRenderValue = this.p.renderValue;
    return (
      <>
        {this.p.renderValue.displayValue}
        {renderValue.show ? (
          <button
            onClick={this.p.onClick}
            disabled={renderValue.disabled}
            className={`${renderValue.class} ${
              renderValue.disabled ? "btn-pulse" : ""
            } full-width`}
          >
            {renderValue.text}
          </button>
        ) : null}
      </>
    );
  }

  constructor(props) {
    super(props);
  }
}
