import './EditorBar.scss'
import React from 'react'
import loadWorld, { $worlds } from '../../app/data/world'
import InputSelect from '../Components/InputSelect'
import { saveWorld } from '../../app/data/world'

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
      </div>
    </div>
  )
}
