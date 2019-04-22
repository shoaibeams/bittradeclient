import * as React from "react";
import { library, IconProp, SizeProp } from "@fortawesome/fontawesome-svg-core";
import * as brandsSVGIcons from "@fortawesome/free-brands-svg-icons";
import * as solidSVGIcons from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconName, IconLookup } from "@fortawesome/fontawesome-common-types";
import { StaticHelper } from "../../../shared/static-helper";
library.add(
  brandsSVGIcons.faFacebook,
  brandsSVGIcons.faFacebookF,
  brandsSVGIcons.faTwitter,
  solidSVGIcons.faPlus,
  solidSVGIcons.faMoneyBillWave,
  solidSVGIcons.faAngleDoubleUp,
  solidSVGIcons.faAngleDoubleDown,
  solidSVGIcons.faUser,
  solidSVGIcons.faExchangeAlt,
  solidSVGIcons.faEnvelope,
  solidSVGIcons.faEnvelopeSquare,
  solidSVGIcons.faEnvelopeOpen,
  solidSVGIcons.faEnvelopeOpenText,
  solidSVGIcons.faBriefcase,
  solidSVGIcons.faLock,
  solidSVGIcons.faWalking,
  solidSVGIcons.faBuilding,
  solidSVGIcons.faInfo,
  solidSVGIcons.faQuestion,
  solidSVGIcons.faFileSignature,
  solidSVGIcons.faArrowLeft,
  solidSVGIcons.faInbox
);

export default class FontAwesome {
  static faIcon = (icon: IconName, size?: SizeProp) => {
    let values = StaticHelper.objectToValuesArray(brandsSVGIcons);
    values = values.filter(m => m.iconName == icon);
    let value = values.length > 0 ? values[0] : null;
    if (value == null) {
      values = StaticHelper.objectToValuesArray(solidSVGIcons);
      values = values.filter(m => m.iconName == icon);
      value = values.length > 0 ? values[0] : null;
    }
    if (value == null) {
      return;
    }
    let lookup = {
      prefix: value.prefix,
      iconName: icon
    } as IconLookup;
    return <FontAwesomeIcon icon={lookup} size={size} />;
  };
}
