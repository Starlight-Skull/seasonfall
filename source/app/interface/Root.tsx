import React, { createRef, RefObject } from 'react'
import ReactDOM from 'react-dom/client'
import { element } from '../helpers'
import DebugMenu from './DebugMenu'
import PauseMenu from './PauseMenu'
import Canvas from './Canvas'
import { UIState } from '../globals'


export default function initReact() {
  const root = ReactDOM.createRoot(element('root')!)
  console.log(UIState);

  root.render(
    <React.StrictMode>
      { UIState.debugMenuVisible && <DebugMenu /> }
      { UIState.pauseMenuVisible && <PauseMenu /> }
      <Canvas />
    </React.StrictMode>
  )
}
