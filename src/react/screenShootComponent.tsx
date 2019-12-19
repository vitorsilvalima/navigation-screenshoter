
import React, { useEffect, ComponentType } from 'react'
import {
  NAVIGATION_EVENTS,
  SendNavigationData,
  SetCurrentNavigationScreenState,
  TakeScreenShot,
  NavigationEvent,
} from '../core/events'
import { NavigationScreen } from '../core/screenIterface'

const MounHoC = (onMount: () => void, Component: ComponentType) => (props: any): ComponentType => {
  useEffect(() => {
      onMount()
  }, [])

  return (
      <Component {...props} />
  )
}

export interface ScrenshootComponentProps {
  navigationScreens: NavigationScreen[];
}

const ScrenshootComponent = ({
  navigationScreens,
}: ScrenshootComponentProps): JSX.Element => {
  const [screenObj, setScreen] = React
    .useState<{ screen: ComponentType | null }>({
      screen: null
    })

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:5000')

    const takeScreenShot = (): void => {
      const takeScreenShotEvent = new TakeScreenShot()
      ws.send(takeScreenShotEvent.toString())
    }

    ws.onopen = (): void => {
      setTimeout(() => {
        const screens = navigationScreens.map(screen => ({
          ...screen,
          states: screen.states.map(state => ({
            name: state.name,
          }))
        }))
        const sendNavigationData = new SendNavigationData(screens)
        ws.send(sendNavigationData.toString())
      }, 400)
    }

    ws.onmessage = (e) => {
      try {
        const event = JSON.parse(e.data) as NavigationEvent

        if (event.type === NAVIGATION_EVENTS.SET_CURRENT_NAVIGATON_SCREEN) {
          const setCurrentNavigationScreenStateEvent = event as SetCurrentNavigationScreenState

          const screen = navigationScreens[setCurrentNavigationScreenStateEvent.selectedScreenIndex]
          const state = screen.states[setCurrentNavigationScreenStateEvent.selectedScreenStateIndex]

          setScreen({
            screen: MounHoC(takeScreenShot, state.component as ComponentType),
          })
        }
      } catch (e) {
        console.error(e)
      }
    };

    ws.onerror = (e) => {
      // an error occurred
      console.error(e.message)
    };

    ws.onclose = (e) => {
      // connection closed
      console.log(e.code, e.reason)
    }
  }, [])

  return screenObj.screen ? (
    <screenObj.screen />
  ) : null
}

export default ScrenshootComponent

