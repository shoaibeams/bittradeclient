import { mdGlobalProps } from "../../models/props";

export const updateGlobalInstance = (instance: mdGlobalProps) => {
    return {
        type: "UPDATE_GLBOALS_INSTANCE",
        payload: instance
    };
}

export const updateGlobalProperty = (property, value) => {
    return {
        type: property,
        payload: value
    };
}
