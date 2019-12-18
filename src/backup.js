
import React, { PureComponent } from 'react'
import { getApp, configure } from './core'
import { loadNavigation } from './loader'

configure(() => loadNavigation())

const App = getApp()

class NavitationApp extends PureComponent {
  render = () => <App />
}

export default NavitationApp

