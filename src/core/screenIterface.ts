import { ComponentType } from "react";

export interface ScreenState {
    name: String,
    component?: ComponentType,
}

export interface Screen {
    flowName: String
    screenName: String,
    actions: {
        [key: string]: string,
    },
    states: ScreenState[],
}