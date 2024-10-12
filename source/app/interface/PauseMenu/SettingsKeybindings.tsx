import React from "react"
import { Menus } from "./PauseMenu"
import MenuHeader from "./Components/MenuHeader"
import MenuContent from "./Components/MenuContent"
import MenuContainer from "./Components/MenuContainer"
import MenuFooter from "./Components/MenuFooter"

import './Settings.scss'

// const keys = element('keybindingsContainer')
// keys?.replaceChildren()
// for (const key in settings.keybindings) {
//   const div = document.createElement('div')
//   const label = document.createElement('label')
//   label.textContent = key
//   div.appendChild(label)
//   const button = document.createElement('button')
//   button.dataset.action = 'changeKey'
//   button.dataset.key = key
//   button.textContent = settings.keybindings[key]
//   div.appendChild(button)
//   keys?.appendChild(div)
// }

interface Props {
  setMenu: (menu: Menus) => void
}

export default function SettingsKeybindings(props: Props) {
  return (
    <MenuContainer>
      <MenuHeader
        nav={{ General: Menus.settingsGeneral, API: Menus.settingsApi, Keybindings: Menus.settingsKeybindings }}
        active={2}
        setMenu={props.setMenu}
      />
      <MenuContent></MenuContent>
      <MenuFooter
        nav={{
          Back: () => props.setMenu(Menus.pause)
        }}
      />
    </MenuContainer>
  )
}
