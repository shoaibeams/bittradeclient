import { LanguageBase } from "./language";
import mdSpinnerConfig from "../models/spinner-config";
import { mdPropKeys } from "../models/props";

declare global {
    namespace NodeJS {
        interface Global {
            lang: LanguageBase;
            isDev: boolean;
            mainSpinnerConfig: mdSpinnerConfig;
            propKeys: mdPropKeys;
        }
    }
}