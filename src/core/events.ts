import { NavigationScreen } from "./screenIterface"

export enum NAVIGATION_EVENTS {
    SEND_NAVIGATION_DATA = 'SEND_NAVIGATION_DATA',
    SET_CURRENT_NAVIGATON_SCREEN = 'SET_CURRENT_NAVIGATON_SCREEN',
    TAKE_SCREENSHOT = 'TAKE_SCREENSHOT',
    UPDATE_SCREENSHOOTS = 'UPDATE_SCREENSHOOTS',
}

export interface NavigationEvent {
    type: string;
    toString: () => string;
}

export class TakeScreenShot implements NavigationEvent  {
    type = NAVIGATION_EVENTS.TAKE_SCREENSHOT

    public toString () : string {
        return JSON.stringify(this)
    }
}

export class SetCurrentNavigationScreenState implements NavigationEvent  {
    type = NAVIGATION_EVENTS.SET_CURRENT_NAVIGATON_SCREEN

    constructor(
        public selectedScreenIndex: number,
        public selectedScreenStateIndex: number,
    ) {}

    public toString () : string {
        return JSON.stringify(this)
    }
}

export class SendNavigationData implements NavigationEvent  {
    type = NAVIGATION_EVENTS.SEND_NAVIGATION_DATA

    constructor(public screens: NavigationScreen[]) {}

    public toString () : string {
        return JSON.stringify(this)
    }
}
