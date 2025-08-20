import './EditorBar.scss'
import React from 'react'
import loadWorld, { $worlds } from '../../app/data/world'
import InputSelect from '../Components/InputSelect'
import { saveWorld } from '../../app/data/world'
import InputBoolean from '../Components/InputBoolean'
import { $editor } from '../../app/globals/editor'
import { $game } from '../../app/globals/game'

interface Props {
  exit: () => void
}

export function EditorBar(props: Props) {
  const worlds = Object.keys($worlds)

  function load(name: string) {
    loadWorld($worlds[name], name)
  }

  function download() {
    saveWorld()
  }

  return (
    <div id="EditorBar">
      <div>
        <button onClick={props.exit}>Exit</button>
        <button onClick={download}>Download</button>
        <InputSelect
          label="World"
          options={worlds}
          onChange={load}
          value={worlds[0]}
        />
        <InputBoolean
          label="Foreground"
          onChange={val => ($editor.foreground = val)}
          value={$editor.foreground}
        />
        <InputBoolean
          label="Show Hit Boxes"
          onChange={val => ($game.showBoxes = val)}
          value={$game.showBoxes}
        />
      </div>
    </div>
  )
}
