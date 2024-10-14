import React from 'react'
import { settings } from '../../globals'
import InputBoolean from '../Components/InputBoolean'
import InputNumber from '../Components/InputNumber'
import { Menus } from './PauseMenu'
import MenuHeader from './Components/MenuHeader'
import MenuContent from './Components/MenuContent'
import MenuContainer from './Components/MenuContainer'
import MenuFooter from './Components/MenuFooter'

import './Settings.scss'

interface Props {
  setMenu: (menu: Menus) => void
}

export default function SettingsGeneral(props: Props) {
  return (
    <MenuContainer id="Settings">
      <MenuHeader
        nav={{
          General: Menus.settingsGeneral,
          API: Menus.settingsApi,
          Keybindings: Menus.settingsKeybindings
        }}
        active={0}
        setMenu={props.setMenu}
      />
      <MenuContent>
        <InputBoolean
          label="Show FPS"
          value={settings.showFPS}
          onChange={(val) => (settings.showFPS = val)}
        />
        <InputNumber
          label="Scale Factor"
          value={settings.scale}
          onChange={(val) => (settings.scale = val)}
          min={1}
        />
      </MenuContent>
      <MenuFooter
        nav={{
          Back: () => props.setMenu(Menus.pause)
        }}
      />
    </MenuContainer>
  )
}
