
import React, { ComponentType } from 'react'
import { NavigationScreen } from '../core/screenIterface'
import ScreenShootComponent from './screenShootComponent'

class Screnshoot {
  navigationScreens: NavigationScreen[] = []

  public configure = (loadNavigation: () => void): void => loadNavigation()

  public addNavigationScreen = (navigationScreen: NavigationScreen): void => {
    this.navigationScreens.push(navigationScreen)
  }

  getApp = () => {
    return () => <ScreenShootComponent navigationScreens={this.navigationScreens}/>
  }
}


export default Screnshoot

