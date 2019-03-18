import { TransitionState } from "../enums/transition";

export class mdTransition{
    before: string;
    classes: string;
    after: string;
    state: TransitionState;
}

export default class mdTransitions{
    greater: mdTransition;
    lesser: mdTransition;
    origional: mdTransition;
    bounseOutHide2s: mdTransition;
    fadeIn2s: mdTransition;
    flipInY: mdTransition;
    fadeInUp2s: mdTransition;
    flipOutX2s: mdTransition;
    pulse: mdTransition;
    constructor()
    {
        
        this.lesser = {
            before: '',
            classes: 'shake animated slower-4s anim-lesser',
            after: '',
            state: TransitionState.NotStarted,
        };
        this.greater = {
            before: '',
            classes: 'flash animated slower-4s anim-greater',
            after: '',
            state: TransitionState.NotStarted,
        };
        this.origional = {
            before: '',
            classes: '',
            after: '',
            state: TransitionState.Completed,
        };
        this.bounseOutHide2s = {
            before: '',
            classes: 'bounceOut animated slower-2s',
            after: 'hidden',
            state: TransitionState.NotStarted,
        };
        this.fadeIn2s = {
            before: '',
            classes: 'fadeIn animated slower-2s',
            after: '',
            state: TransitionState.NotStarted,
        };
        this.flipInY = {
            before: '',
            classes: 'flipInY animated slower-2s',
            after: '',
            state: TransitionState.NotStarted,
        };
        this.fadeInUp2s = {
            before: 'hidden',
            classes: 'fadeInUp animated slower-2s',
            after: '',
            state: TransitionState.NotStarted,
        };
        this.flipOutX2s = {
            before: '',
            classes: 'flipOutX animated slower-2s',
            after: 'hidden',
            state: TransitionState.NotStarted,
        };
        this.pulse = {
            before: '',
            classes: 'pulse animated slower-2s',
            after: '',
            state: TransitionState.NotStarted,
        };
    }
}
export enum Transitions{
    greater = 'greater',
    lesser = 'lesser',
    origional = 'origional',
    bounseOutHide2s = 'bounseOutHide2s',
    fadeIn2s = 'fadeIn2s',
    flipInY = 'flipInY',
    fadeInUp2s = 'fadeInUp2s',
    flipOutX2s = 'flipOutX2s',
    pulse = 'pulse',
}