import { Switch } from "react-router";
import * as React from "react";
import { StaticHelper } from "../../../shared/static-helper";

export default function FragmentSupportingSwitch({ children }) {
    const flattenedChildren = [];
    flatten(flattenedChildren, children);
    return React.createElement.apply(React, [Switch, null].concat(flattenedChildren));;
}

function checkAllProps(tag) {
    if (tag.props) {
        let props = StaticHelper.objectToValuesArray(tag.props);
        props.forEach(element => {
            if (element["computedMatch"]) {
                console.log("computedMatch", element, "'" + element["computedMatch"] + "'");
            }
        });
        // if (tag.props.children) {
        //     let children = StaticHelper.objectToValuesArray(tag.props.children);
        //     children.forEach(child => {
        //         checkAllProps(child);
        //     })
        // }
    }
}

function flatten(target, children) {
    React.Children.forEach(children, child => {
        if (React.isValidElement(child)) {
            if (child.type === React.Fragment) {
                flatten(target, child.props["children"]);
            } else {
                target.push(child);
            }
        }
    });
}
