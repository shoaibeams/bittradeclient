import React from "react";
import "./searchable-dropdown.component.css";
import NBSpinnerComponent from "../spinner/NBSpinnerComponent";
import { BaseComponent } from "../../../components/base/BaseComponent";
import { mdFormControl } from "../../../../shared/form-control";

export default class SearchableDropdownComponent extends BaseComponent {
  render() {
    this.initShorts();
    this.recievedNewChanges();
    return (
      <div className="dropdown dropdown-scroll sadd">
        <button
          onClick={this.dropdownButtonClicked}
          style={{ textAlign: "left", width: "100%" }}
          className="btn btn-default dropdown-toggle"
          type="button"
          id="dropdownMenu1"
          data-toggle="dropdown"
        >
          <table className="col-md-12">
            <tbody>
              <tr style={{ height: this.p.settings.imageHeight + "px" }}>
                <td style={{ verticalAlign: "middle" }}>
                  {this.state.selectedValue == null ? (
                    <span>{this.state.buttonText}</span>
                  ) : (
                    <span>
                      {this.p.settings.image ? (
                        <img
                          width={this.p.settings.imageWidth}
                          height={this.p.settings.imageHeight}
                          src={this.state.selectedValue.image}
                        />
                      ) : null}
                      &nbsp;{this.state.selectedValue.text}
                    </span>
                  )}
                </td>
                <td style={{ verticalAlign: "middle", textAlign: "right" }}>
                  &nbsp;
                  <img src="/assets/images/up-down-arrow.png" />
                </td>
              </tr>
            </tbody>
          </table>
        </button>
        <ul
          className="dropdown-menu col-md-12"
          role="menu"
          aria-labelledby="dropdownMenu1"
        >
          {this.p.settings.searchable ? (
            <li role="presentation">
              <div className="input-group input-group-sm search-control">
                <span className="input-group-addon">
                  <span className="glyphicon glyphicon-search" />
                </span>
                {this.textFormControl(this.f.searchText, [
                  this.handleFormControlInput,
                  this.applySearch
                ])}
              </div>
            </li>
          ) : null}
          {this.state.appliedSource
            ? this.state.appliedSource.map((s, i) => {
                return (
                  <li
                    key={i}
                    role="presentation"
                    onClick={e => {
                      this.selectionChanged(s);
                    }}
                  >
                    <a>
                      {this.p.settings.image ? (
                        <img
                          width={this.p.settings.imageWidth}
                          height={this.p.settings.imageHeight}
                          src={s.image}
                        />
                      ) : null}
                      &nbsp;{s.text}
                    </a>
                  </li>
                );
              })
            : null}
        </ul>
        <NBSpinnerComponent
          {...this.props}
          params={{ show: this.p.showSpinner }}
        />
      </div>
    );
  }

  constructor(props) {
    super(props);
    this.init();
  }

  init() {
    this.state = {
      form: {
        searchText: new mdFormControl(
          "",
          "searchText",
          this.p.settings.searchBoxPlaceholder
        )
      },
      selectedValue: null,
      appliedSource: null,
      buttonText: this.p.settings.placeholder,
      showSpinner: false
    };
  }

  recievedNewChanges() {
    this.state = {
      ...this.state,
      showSpinner: this.p.showSpinner,
      buttonText: this.state.selectedValue
        ? this.state.buttonText
        : this.p.settings.placeholder
    };
    // if (changes.settings) {
    //     if (changes.settings.currentValue != null) {
    //         this.settings.setSettings(changes.settings.currentValue);
    //     }
    // }
    // if (changes.selectedValue != null) {
    //     state = {
    //         ...this.state,
    //         selectedValue
    //     }
    //     this.selectedValue = changes.selectedValue.currentValue;
    // }
    // if (changes.selectedValue) {
    //     if (changes.selectedValue != null) {
    //         this.selectedValue = changes.selectedValue.currentValue;
    //     }
    // }
    // if (changes.showSpinner) {
    //     if (changes.showSpinner != null) {
    //         this.showSpinner = changes.showSpinner.currentValue;
    //     }
    // }
    this.applySearch(null);
  }

  selectionChanged(value) {
    if (this.state.selectedValue != value) {
      this.p.onChange({
        newValue: value,
        previousValue: this.state.selectedValue
      });
    }
    this.updateState(
      {
        selectedValue: value
      },
      () => {
        this.log.debug(this.state.selectedValue);
      }
    );
  }

  applySearch = ev => {
    let st = "";
    if (this.f.searchText.value != null) {
      st = this.f.searchText.value;
    }

    let newAppliedSource;
    if (st != "") {
      if (this.p.settings.searchCaseSensitive) {
        newAppliedSource = this.p.source.filter(m => m.text == st);
      } else {
        st = st.toUpperCase();
        newAppliedSource = this.p.source.filter(
          m => m.text.toUpperCase().indexOf(st) > -1
        );
      }
    } else {
      newAppliedSource = this.p.source;
    }
    let state = {
      ...this.state,
      appliedSource: newAppliedSource
    };
    if (ev) {
      this.updateState(state);
    } else {
      this.state = {
        ...state
      };
    }
  };

  preventDefaultForAnchor = event => {
    alert(JSON.stringify(event));
    event.preventDefault();
  };

  dropdownButtonClicked = e => {
    this.updateState({
      searchText: ""
    });
  };
}
