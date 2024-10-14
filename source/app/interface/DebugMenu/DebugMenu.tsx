import React from 'react'
import DebugTools from './DebugTools'
import DebugWeather from './DebugWeather'

import './DebugMenu.scss'

interface Props {}

export default function DebugMenu(props: Props) {
  return (
    <div id="debugMenu">
      <DebugTools />
      <DebugWeather />
    </div>
  )
}
