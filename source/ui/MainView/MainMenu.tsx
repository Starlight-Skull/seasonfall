import React from 'react'
import MenuContainer from '../GameView/PauseMenu/Components/MenuContainer'
import MenuContent from '../GameView/PauseMenu/Components/MenuContent'
import MenuHeader from '../GameView/PauseMenu/Components/MenuHeader'
import NavButton from '../GameView/PauseMenu/Components/NavButton'
import { Views } from '../Root'
import { VERSION } from '../../app/globals'

import './MainMenu.scss'

export default function MainMenu(props: { setView: (view: Views) => void }) {
  function setView(view: Views) {
    return () => props.setView(view)
  }

  return (
    <div id="MainMenu">
      <MenuContainer>
        <MenuHeader>Seasonfall</MenuHeader>
        <MenuContent>
          <NavButton onClick={setView(Views.game)}>Play Game</NavButton>
          <NavButton onClick={setView(Views.editor)}>Editor</NavButton>
        </MenuContent>
        <span className="Version">{VERSION}</span>
      </MenuContainer>
    </div>
  )
}
