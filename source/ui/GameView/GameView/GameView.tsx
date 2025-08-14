import React, { useEffect, useState } from 'react'
import DebugMenu from '../DebugMenu/DebugMenu'
import PauseMenu from '../PauseMenu/PauseMenu'
import Canvas from './Canvas'
import { world } from '../../../app/globals/world'
import NavButton from '../../Components/NavButton'
import icon from '../../../textures/icon.png'

import './GameView.scss'

export default function GameView() {
  const [debugVisible, setDebug] = useState(false)
  const [pauseVisible, setPause] = useState(world.paused)

  useEffect(() => {
    const handleKeydown = (ev: KeyboardEvent) => {
      if (ev.code === 'Backquote') {
        setDebug(!debugVisible)
      } else if (ev.code === 'Escape') {
        setPause(!pauseVisible)
      }
    }
    window.addEventListener('keydown', handleKeydown)
    return () => window.removeEventListener('keydown', handleKeydown)
  })

  useEffect(() => {
    world.paused = debugVisible || pauseVisible
  }, [debugVisible, pauseVisible])

  return (
    <>
      <Canvas />
      {debugVisible && <DebugMenu />}
      {pauseVisible && <PauseMenu close={() => setPause(!pauseVisible)} />}
      <NavButton id='MenuToggle' onClick={() => setPause(!pauseVisible)}>
        <img src={icon} width={50} height={50} />
      </NavButton>
    </>
  )
}
