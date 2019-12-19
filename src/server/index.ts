import WebSocket from 'ws'
import http from 'http'
import shell from 'shelljs'
import FormData from 'form-data'
import fs from 'fs'
import fetch from 'node-fetch'
import {
  NAVIGATION_EVENTS,
  SendNavigationData,
  NavigationEvent,
  SetCurrentNavigationScreenState,
} from '../core/events'
import { NavigationScreen } from '../core/screenIterface'

const server = http.createServer()

const wss = new WebSocket.Server({
  // port: 5000
  server,
})

let screens: NavigationScreen[] = []
let selectedScreenIndex = 0
let selectedScreenStateIndex = 0

// flowName: nScreen.flowName,
//                   screenName: nScreen.screenName,

// const uploadScreenshoot = async (screenData, filePath) => {
//   const formData = new FormData()

//   formData.append('image', fs.createReadStream(filePath))
//   formData.append('screenName', screenData.screenName)
//   formData.append('flowName', screenData.flowName)

//   const res = await fetch('http://localhost:7000/add', {
//     method: 'POST',
//     body: formData,
//   })

//   return res.json()
// }

const hasReachedEnd = (): boolean => {
  return selectedScreenIndex === screens.length
}


const updateCurrentSelectedIndexes = (): void => {
  selectedScreenStateIndex += 1

  if (!hasReachedEnd()) {
    const screen = screens[selectedScreenIndex]

    if (selectedScreenStateIndex === screen.states.length) {
      selectedScreenIndex += 1
      selectedScreenStateIndex = 0
    }
  }
}

wss.on('connection', (ws) => {
  const setScreen = (): void => {
    if (!hasReachedEnd()) {
      console.log('settings screen')
      const setCurrentNavigationScreenState = new SetCurrentNavigationScreenState(
        selectedScreenIndex,
        selectedScreenStateIndex,
      )

      ws.send(setCurrentNavigationScreenState.toString())
    } else {
      console.log('has reached end')
    }
  }

  ws.on('message', (message) => {
    const eventObj = <NavigationEvent>JSON.parse(message.toString())

    switch (eventObj.type) {
      case NAVIGATION_EVENTS.SEND_NAVIGATION_DATA: {
        const sendNavigationData = <SendNavigationData> eventObj
        selectedScreenIndex = 0
        selectedScreenStateIndex = 0
        screens = sendNavigationData.screens.map((screen: NavigationScreen) => ({
          ...screen,
        }))
        console.log(screens)
        setScreen()
        break;
      }
      case NAVIGATION_EVENTS.TAKE_SCREENSHOT: {
        console.log('should take screen shoot')
        const screen = screens[selectedScreenIndex]
        const state = screen.states[selectedScreenStateIndex]

        const filePath = `${__dirname}/public/${screen.flowName}_${screen.screenName}_${state.name}.png`
        shell.exec(`xcrun simctl io booted screenshot ${filePath}`, async (code, stdout, stderr) => {
          if (code === 0) {
            try {
              // const response  = await uploadScreenshoot(screen, filePath)
              updateCurrentSelectedIndexes()
              setScreen()
            } catch (error) {
              console.error(error)
            }
          }
        })
        break;
      }

      default:
        return null
    }
  })
})

server.listen(5000)
