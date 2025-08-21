import './EditorView.scss'
import React, { useEffect, useState } from 'react'
import GameCanvas, { canvas } from '../GameView/GameCanvas'
import setupEditor from '../../app/editorSetup'
import { EditorBar } from './EditorBar'
import { $editor } from '../../app/globals/editor'
import { $render } from '../../app/rendering/common'
import { $world } from '../../app/globals/world'
import { $game } from '../../app/globals/game'
import Tile from '../../app/classes/Tile'
import EditorProperties from './EditorProperties'

interface Props {
  exit: () => void
}

export default function EditorView(props: Props) {
  const [selected, setSelected] = useState(new Tile())

  useEffect(setupEditor)

  useEffect(() => {
    canvas.addEventListener('mousedown', setWorldFocus)
    return () => {
      canvas.removeEventListener('mousedown', setWorldFocus)
    }
  })

  function setWorldFocus(event: MouseEvent) {
    if (event.button === 0) {
      $editor.selectedX = $render.mouseX
      $editor.selectedY = $render.mouseY
      let tile = $editor.foreground
        ? $world.foreground[$render.mouseY][$render.mouseX]
        : $world.background[$render.mouseY][$render.mouseX]
      setSelected(tile ?? new Tile())

    } else if (event.button === 1) {
      let tile = $editor.fill === 'none' ? undefined : new Tile($editor.fill)
      if ($editor.foreground) {
        $world.foreground[$render.mouseY][$render.mouseX] = tile
      } else {
        $world.background[$render.mouseY][$render.mouseX] = tile
      }

    } else if (event.button === 2) {
      $game.focusX = $render.mouseX
      $game.focusY = $render.mouseY
    }
  }

  return (
    <>
      <EditorBar exit={props.exit} />
      <div id="EditorView">
        <EditorProperties selected={selected} />
        <GameCanvas />
      </div>
    </>
  )
}
