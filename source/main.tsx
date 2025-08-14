import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import GameView from './app/interface/GameView/GameView'
import Editor from './editor/Editor'
import setupGame from './app/gameSetup'
import MainMenu from './app/interface/MainMenu'

import './app/interface/App.scss'

window.addEventListener('load', () => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <Root />
    </React.StrictMode>
  )
})

export enum Views { start, game, editor }

function Root() {
  const [view, setView] = useState(Views.start)

  switch (view) {
    case Views.game:
      setupGame()
      return <GameView />
    case Views.editor:
      return <Editor />
    case Views.start:
    default:
      return <MainMenu setView={setView} />
  }
}
