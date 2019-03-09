import { LanguageBase } from "../language/language";
import mdSpinnerConfig from "../models/spinner-config";
import { mdPropKeys } from "../models/props";
import mdTransitions from "../models/transitions";

declare global {
    namespace NodeJS {
        interface Global {
            lang: LanguageBase;
            isDev: boolean;
            mainSpinnerConfig: mdSpinnerConfig;
            propKeys: mdPropKeys;
            transitions: mdTransitions;
            langKey: string;
        }
    }
}