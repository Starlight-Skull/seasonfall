import React, { Component } from 'react'
import ReactDOM from 'react-dom/client'
import { element } from '../helpers'
import DebugMenu from './DebugMenu'
import PauseMenu from './PauseMenu'
import Canvas from './Canvas'
import { world } from '../globals'


export default function initReact() {
  const root = ReactDOM.createRoot(element('root')!)
  root.render(<App />)
}

class App extends Component {
  state = {
    debugMenuVisible: false,
    pauseMenuVisible: false
  }

  componentDidMount(): void {
      window.addEventListener('keydown', e => {
        if (e.code === 'Backquote') {
          this.setState({ debugMenuVisible: !this.state.debugMenuVisible })
        }
        if (e.code === 'Escape') {
          this.setState({ pauseMenuVisible: !this.state.pauseMenuVisible })
        }
        world.paused = this.state.debugMenuVisible || this.state.pauseMenuVisible
      })
  }

  render() {
    return (
      <React.StrictMode>
        { this.state.debugMenuVisible && <DebugMenu /> }
        { this.state.pauseMenuVisible && <PauseMenu /> }
        <Canvas />
      </React.StrictMode>
    )
  }
}
