import * as React from "react";
import CustomScrollbars from "../../util/CustomScrollbars";
import { Constants } from "../../shared/constants";
import { StaticHelper } from "../../shared/static-helper";
import { mdProps } from "../../models/props";

const LanguageMenu = (props: mdProps) => {
  let languageData = [];
  let en = {
    key: Constants.Instance.LanguageKey.ENUS,
    url: Constants.Instance.LanguageKey.ENUS == Constants.Instance.DefaultLangKey ? ''
      : Constants.Instance.LanguageKey.ENUS,
    name: global.lang.English,
    icon: 'us'
  }
  let de = {
    key: Constants.Instance.LanguageKey.DE,
    url: Constants.Instance.LanguageKey.DE == Constants.Instance.DefaultLangKey ? ''
      : Constants.Instance.LanguageKey.DE,
    name: global.lang.German,
    icon: 'de'
  }
  languageData.push(en);
  languageData.push(de);
  let current = languageData.filter(m => m.key == props.globals.langKey)[0];
  if (!current) {
    current = en;
  }
  let menu = () => {
    return (
      <CustomScrollbars className="gx-popover-lang-scroll" style={{ minHeight: "45px !important", maxHeight: "220px !important" }}>
      {/* <CustomScrollbars className="gx-popover-lang-scroll" style={{ minHeight: "45px !important", maxHeight: "220px !important" }}> */}
        <ul className="gx-sub-popover">
          {
            languageData.map(language =>
              <li className="gx-media gx-pointer" key={JSON.stringify(language)} onClick={(e) => {
                if (language.key == global.langKey) {
                  return;
                }
                let loc = window.location.href.split('/');
                let langKeys = StaticHelper.objectToValuesArray(Constants.Instance.LanguageKey);
                if (loc.length < 4) {
                  if (!StaticHelper.isNullOrEmpty(language.url)) {
                    loc.push(language.url);
                  }
                }
                else {
                  if (langKeys.indexOf(loc[3]) > -1) {
                    if (StaticHelper.isNullOrEmpty(language.url)) {
                      loc = [...loc.slice(0, 3), ...loc.slice(4)];
                    }
                    else {
                      loc = [...loc.slice(0, 3), language.url, ...loc.slice(4)];
                    }
                  }
                  else {
                    if (StaticHelper.isNullOrEmpty(language.url)) {
                      loc = loc;//[...loc.slice(0, 3), ...loc.slice(3)];
                    }
                    else {
                      loc = [...loc.slice(0, 3), language.url, ...loc.slice(3)];
                    }
                  }
                  if (StaticHelper.isNullOrEmpty(loc[loc.length - 1])) {
                    loc.pop();
                  }

                  // if (langKeys.indexOf(loc[1]) > -1) {
                  // }
                  // else {
                  //   loc = ["", language.key, ...loc.slice(2)];
                  // }
                }
                window.location.replace(loc.join("/") + location.search);
              }}>
                <i className={`flag flag-24 gx-mr-2 flag-${language.icon}`} />
                <span className="gx-language-text">{language.name}</span>
              </li>
            )}
        </ul>
      </CustomScrollbars>);
  }
  return {
    menu: menu(),
    current: current,
  }
}
export default LanguageMenu