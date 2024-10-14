import React, { useState } from 'react'
import Pause from './Pause'
import Load from './Load'
import New from './New'
import SettingsGeneral from './SettingsGeneral'
import SettingsApi from './SettingsApi'
import SettingsKeybindings from './SettingsKeybindings'
import Stats from './Stats'

import './PauseMenu.scss'

export enum Menus {
  pause,
  load,
  new,
  settingsGeneral,
  settingsApi,
  settingsKeybindings,
  stats
}

interface Props {
  close: () => void
}

export default function PauseMenu(props: Props) {
  const [currentMenu, setCurrentMenu] = useState(Menus.pause)

  function getMenu() {
    switch (currentMenu) {
      case Menus.pause:
        return <Pause setMenu={setCurrentMenu} close={props.close} />
      case Menus.load:
        return <Load setMenu={setCurrentMenu} />
      case Menus.new:
        return <New setMenu={setCurrentMenu} />
      case Menus.settingsGeneral:
        return <SettingsGeneral setMenu={setCurrentMenu} />
      case Menus.settingsApi:
        return <SettingsApi setMenu={setCurrentMenu} />
      case Menus.settingsKeybindings:
        return <SettingsKeybindings setMenu={setCurrentMenu} />
      case Menus.stats:
        return <Stats setMenu={setCurrentMenu} />
    }
  }

  return <div id="PauseMenu">{getMenu()}</div>
}
