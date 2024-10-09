import React, { Component } from 'react'
import DebugTools from './DebugTools'
import DebugWeather from './DebugWeather'


export default class DebugMenu extends Component {
  render() {
    return (
      <div id="debugMenu">
        <DebugTools />
        <DebugWeather />
      </div>
    )
  }

  style: React.CSSProperties = {}
}
