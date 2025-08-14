import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import EditorView from './EditorView/EditorView'
import GameView from './GameView/GameView'
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
      return <GameView exit={() => setView(Views.start)} />
    case Views.editor:
      return <EditorView exit={() => setView(Views.start)} />
    case Views.start:
    default:
      return <MainMenu setView={setView} />
  }
}
