import React, { useEffect, useState } from 'react'
import { settings } from '../globals'
import { toStorage } from '../helpers'
import Pause from './PauseMenu/Pause'
import Load from './PauseMenu/Load'
import New from './PauseMenu/New'
import SettingsGeneral from './PauseMenu/SettingsGeneral'
import SettingsApi from './PauseMenu/SettingsApi'
import SettingsKeybindings from './PauseMenu/SettingsKeybindings'
import Stats from './PauseMenu/Stats'

/**
 * Saves most settings from the global settings to storage.
 */
// function saveSettings (): void {
//   // keybindings are saved automatically
//   toStorage('settings', settings)
// }

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

  useEffect(() => {
    console.log(currentMenu)
  })

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

  return <div id="pauseMenu">{getMenu()}</div>
}
