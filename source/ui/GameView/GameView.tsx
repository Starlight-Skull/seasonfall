import React, { useEffect, useState } from 'react'
import DebugMenu from './DebugMenu/DebugMenu'
import PauseMenu from './PauseMenu/PauseMenu'
import GameCanvas from './GameCanvas'
import { $game } from '../../app/globals/game'
import NavButton from '../Components/NavButton'
import setupGameLoop from '../../app/gameSetup'
import icon from '../../textures/icon.png'

import './GameView.scss'

interface Props {
  exit: () => void
}

export default function GameView(props: Props) {
  const [debugVisible, setDebug] = useState(false)
  const [pauseVisible, setPause] = useState(false)

  useEffect(setupGameLoop)

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
    $game.paused = debugVisible || pauseVisible
    return () => { $game.paused = false }
  }, [debugVisible, pauseVisible])

  function toggle() {
    setPause(!pauseVisible)
  }

  return (
    <>
      <GameCanvas />
      {debugVisible && <DebugMenu />}
      {pauseVisible && <PauseMenu close={toggle} exit={props.exit} />}
      <NavButton id='MenuToggle' onClick={toggle}>
        <img src={icon} width={50} height={50} />
      </NavButton>
    </>
  )
}
