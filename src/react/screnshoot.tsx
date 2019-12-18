
import React from 'react'
import { Screen } from '../core/screenIterface'
import ScreenShootComponent from './screenShootComponent'

class Screnshoot {
  navigationScreens: Screen[] = []

  public configure = loadNavigation => loadNavigation()

  public addNavigationScreen = (navigationScreen: Screen) => {
    this.navigationScreens.push(navigationScreen)
  }

  getApp = () => {
    return () => <ScreenShootComponent navigationScreens={this.navigationScreens}/>
  }
}


export default Screnshoot

