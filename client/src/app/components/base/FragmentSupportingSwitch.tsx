import { Switch } from "react-router";
import React = require("react");

export default function FragmentSupportingSwitch({ children }) {
    const flattenedChildren = [];
    flatten(flattenedChildren, children);
    return React.createElement.apply(React, [Switch, null].concat(flattenedChildren));
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
