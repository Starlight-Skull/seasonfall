import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import setupGame from '../app/gameSetup'
import Editor from './EditorView/Editor'
import GameView from './GameView/GameView/GameView'
import MainMenu from './MainView/MainMenu'
import './Root.scss'

export enum Views { start, game, editor }

export default function initUI() {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <Root />
    </React.StrictMode>
  )
}

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
