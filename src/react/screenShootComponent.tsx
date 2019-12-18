
import React, { useEffect, ComponentType } from 'react'
import { SCREEN_SHOTS_EVENTS } from '../core/events'
import { Screen } from '../core/screenIterface'

const MounHoC = (onMount, Component: ComponentType<{}>) => (props) => {
    useEffect(() => {
        onMount()
    }, [])

    return (
        <Component {...props} />
    )
}

export interface ScrenshootComponentProps {
    navigationScreens: Screen[]
}

const ScrenshootComponent = ({
    navigationScreens,
}: ScrenshootComponentProps) => {
    const [screenObj, setScreen] = React.useState<{ screen: ComponentType } | null>({
      screen: null
    })

    useEffect(() => {
      const ws = new WebSocket('ws://localhost:5000')

      const takeScreenShoot = () => ws.send(JSON.stringify({
        type: SCREEN_SHOTS_EVENTS.TAKE_SCREENSHOOT,
      }))

      ws.onopen = () => {
        setTimeout(() => {
          ws.send(
            JSON.stringify({
              type: SCREEN_SHOTS_EVENTS.SEND_SCREENS,
              screens: this.navigationScreens.map(screen => ({
                ...screen,
                states: screen.states.map(state => ({
                  name: state.name,
                }))
              }))
            })
          )
        }, 400)
      }

      // ws.onmessage = (e) => {
      //   try {
      //     const event = JSON.parse(e.data)

      //     if (event.type === SCREEN_SHOTS_EVENTS.SET_SCREEN) {
      //       const { screen } = this.navigationScreens[event.selectedIndex]

      //       setScreen({
      //         screen: MounHoC(takeScreenShoot, screen),
      //       })
      //     }
      //   } catch (e) {
      //     console.error(e)
      //   }
      // };

      // ws.onerror = (e) => {
      //   // an error occurred
      //   console.error(e.message)
      // };

      // ws.onclose = (e) => {
      //   // connection closed
      //   console.log(e.code, e.reason)
      // }
    }, [])

    return screenObj.screen ? (
      <screenObj.screen />
    ) : null
  }

export default ScrenshootComponent

