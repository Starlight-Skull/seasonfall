import './EditorView.scss'
import { useEffect, useState } from 'react'
import GameCanvas, { canvas } from '../GameView/GameCanvas'
import setupEditor from '../../app/editorSetup'
import { EditorBar } from './EditorBar'
import { $editor, EditorMode } from '../../app/globals/editor'
import { $render } from '../../app/rendering/common'
import { $world } from '../../app/globals/world'
import Tile from '../../app/classes/Tile'
import EditorProperties from './EditorProperties'

interface Props {
  exit: () => void
}

export default function EditorView(props: Props) {
  const [selected, setSelected] = useState(new Tile())

  useEffect(setupEditor)

  useEffect(() => {
    canvas.addEventListener('mousedown', selectTile)
    canvas.addEventListener('touchstart', selectTile)
    return () => {
      canvas.removeEventListener('mousedown', selectTile)
      canvas.removeEventListener('touchstart', selectTile)
    }
  })

  function selectTile(event: MouseEvent | TouchEvent) {
    // TODO a little buggy in touch mode
    if ((event.type === 'mousedown') && (event as MouseEvent).button !== 0) return
    if ($editor.mode !== EditorMode.edit) return
    $editor.selectedX = $render.mouseX
    $editor.selectedY = $render.mouseY
    let tile = $editor.foreground
      ? $world.foreground[$render.mouseY][$render.mouseX]
      : $world.background[$render.mouseY][$render.mouseX]
    setSelected(tile ?? new Tile())
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
