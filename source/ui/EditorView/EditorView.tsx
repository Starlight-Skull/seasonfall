import React, { useEffect } from 'react'
import GameCanvas from '../GameView/GameCanvas'
import setupEditor from '../../app/editorSetup'
import { EditorBar } from './EditorBar'

interface Props {
  exit: () => void
}

export default function EditorView(props: Props) {
  useEffect(setupEditor)

  return (
    <>
      <GameCanvas />
      <EditorBar exit={props.exit} />
    </>
  )
}


