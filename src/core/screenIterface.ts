import { ComponentType } from 'react'

export interface ScreenState {
    name: string;
    component?: ComponentType;
}

export interface NavigationScreen {
    flowName: string;
    screenName: string;
    actions: {
        [key: string]: string;
    };
    states: ScreenState[];
}
