import './GameView.scss'
import icon from '../../textures/icon.png'
import { useEffect, useState } from 'react'
import DebugMenu from './DebugMenu/DebugMenu'
import PauseMenu from './PauseMenu/PauseMenu'
import GameCanvas from './GameCanvas'
import { $game } from '../../app/globals/game'
import NavButton from '../Components/NavButton'
import setupGameLoop from '../../app/gameSetup'

interface Props {
  exit: () => void
}

export default function GameView(props: Props) {
  const [debugVisible, setDebug] = useState(false)
  const [pauseVisible, setPause] = useState(false)
  const [pauseButtonVisible, setPauseButton] = useState(false)

  useEffect(setupGameLoop)

  useEffect(() => {
    const handleKeydown = (ev: KeyboardEvent) => {
      if (ev.code === 'Backquote') {
        setDebug(!debugVisible)
      } else if (ev.code === 'Escape') {
        setPause(!pauseVisible)
      }
    }
    const touchSafety = (ev: TouchEvent) => {
      if (pauseButtonVisible === false) {
        setPauseButton(true)
      }
    }
    window.addEventListener('keydown', handleKeydown)
    window.addEventListener('touchend', touchSafety)
    return () => {
      window.removeEventListener('keydown', handleKeydown)
      window.removeEventListener('touchend', touchSafety)
    }
  })

  useEffect(() => {
    $game.paused = debugVisible || pauseVisible
    return () => {
      $game.paused = false
    }
  }, [debugVisible, pauseVisible])

  function toggle() {
    setPause(!pauseVisible)
  }

  return (
    <>
      <GameCanvas />
      {debugVisible && <DebugMenu />}
      {pauseVisible && <PauseMenu close={toggle} exit={props.exit} />}
      {pauseButtonVisible && (
        <NavButton id="MenuToggle" onClick={toggle}>
          <img src={icon} width={50} height={50} />
        </NavButton>
      )}
    </>
  )
}
