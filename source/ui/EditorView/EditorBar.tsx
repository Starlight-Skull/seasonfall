import './EditorBar.scss'
import React from 'react'
import loadWorld, { $worlds } from '../../app/data/world'
import InputSelect from '../Components/InputSelect'
import { saveWorld } from '../../app/data/world'
import InputBoolean from '../Components/InputBoolean'
import { $game } from '../../app/globals/game'

interface Props {
  exit: () => void
}

export function EditorBar(props: Props) {
  const worlds = Object.keys($worlds)

  return (
    <div id="EditorBar">
      <button onClick={props.exit}>Exit</button>
      <button onClick={() => saveWorld}>Download</button>
      <InputSelect
        label="World"
        options={worlds}
        onChange={(val) => loadWorld($worlds[val], val)}
        value={worlds[0]}
      />
      <InputBoolean
        label="Show Hit Boxes"
        onChange={(val) => ($game.showBoxes = val)}
        value={$game.showBoxes}
      />
    </div>
  )
}
