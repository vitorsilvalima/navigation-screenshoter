const WebSocket = require('ws')
const http = require('http')
const shell = require('shelljs')
const express = require('express')
const FormData = require('form-data')
const fs = require('fs')
const fetch = require('node-fetch')

const app = express()
const server = http.createServer(app)

app.use(express.static(`${__dirname}/public`))

const wss = new WebSocket.Server({
  // port: 5000
  server,
})

const events = {
  SEND_SCREENS: 'SEND_SCREENS',
  SET_SCREEN: 'SET_SCREEN',
  TAKE_SCREENSHOOT: 'TAKE_SCREENSHOOT',
  UPDATE_SCREENSHOOTS: 'UPDATE_SCREENSHOOTS',
}

let screens = []
let selectedIndex = 0

// flowName: nScreen.flowName,
//                   screenName: nScreen.screenName,

const uploadScreenshoot = async (screenData, filePath) => {
  const formData = new FormData()

  formData.append('image', fs.createReadStream(filePath))
  formData.append('screenName', screenData.screenName)
  formData.append('flowName', screenData.flowName)

  const res = await fetch('http://localhost:7000/add', {
    method: 'POST',
    body: formData,
  })

  return res.json()
}

wss.on('connection', (ws) => {
  const setScreen = () => {
    if (selectedIndex < screens.length) {
      ws.send(JSON.stringify({
        type: events.SET_SCREEN,
        selectedIndex,
      }))
    }
  }

  const updateScreenshoots = () => {
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({
          type: events.UPDATE_SCREENSHOOTS,
          screens,
        }))
      }
    })
  }

  updateScreenshoots()

  ws.on('message', (message) => {
    const messageObj = JSON.parse(message)

    switch (messageObj.type) {
      case events.SEND_SCREENS: {
        selectedIndex = 0
        screens = messageObj.screens.map(screen => ({
          ...screen,
          loading: true,
        }))
        updateScreenshoots()
        setScreen()
      }
      // eslint-disable-next-line no-fallthrough
      case events.TAKE_SCREENSHOOT: {
        const screen = screens[selectedIndex]

        const filePath = `${__dirname}/public/${screen.screenName}.png`
        shell.exec(`xcrun simctl io booted screenshot ${filePath}`, async (code, stdout, stderr) => {
          if (code === 0) {
            try {
              const response  = await uploadScreenshoot(screen, filePath)
              screens = screens.map((scre, index) => {
                if (index !== selectedIndex) {
                  return scre
                } else {
                  return { ...scre, loading: false }
                }
              })

              console.log(response)
              updateScreenshoots()
              selectedIndex += 1
              setScreen()
            } catch (error) {
              console.error(error)
            }
          }
        })
      }

      default:
        return null
    }
  })
})

server.listen(5000)
