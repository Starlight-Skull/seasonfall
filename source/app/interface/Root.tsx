import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import { element } from '../helpers'
import DebugMenu from './DebugMenu/DebugMenu'
import PauseMenu from './PauseMenu'
import Canvas from './Canvas'
import { world } from '../globals'

export default function initReact() {
  const root = ReactDOM.createRoot(element('root')!)
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
}

export function App() {
  const [debugVisible, setDebug] = useState(false)
  const [pauseVisible, setPause] = useState(true)

  useEffect(() => {
    const handleKeydown = (ev: KeyboardEvent) => {
      if (ev.code === 'Backquote') {
        setDebug(!debugVisible)
      }
      if (ev.code === 'Escape') {
        setPause(!pauseVisible)
      }
    }
    window.addEventListener('keydown', handleKeydown)
    return () => window.removeEventListener('keydown', handleKeydown)
  })

  useEffect(() => {
    world.paused = debugVisible || pauseVisible
  })

  function togglePause() {
    setPause(!pauseVisible)
  }

  return (
    <>
      {debugVisible && <DebugMenu />}
      {pauseVisible ? <PauseMenu close={togglePause} /> : <button onClick={() => togglePause()}>Pause</button>}
      <Canvas />
    </>
  )
}
