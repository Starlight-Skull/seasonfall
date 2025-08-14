import React from 'react'
import MenuContainer from './PauseMenu/Components/MenuContainer'
import MenuContent from './PauseMenu/Components/MenuContent'
import MenuHeader from './PauseMenu/Components/MenuHeader'
import NavButton from './PauseMenu/Components/NavButton'
import { Views } from '../../main'
import { VERSION } from '../globals'

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
