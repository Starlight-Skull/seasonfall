import React from 'react'
import loadWorld, { $worlds } from '../../app/data/world'
import InputSelect from '../Components/InputSelect'

import './EditorBar.scss'

interface Props {
  exit: () => void
}

export function EditorBar(props: Props) {
  const worlds = Object.keys($worlds)

  function load(name: string) {
    console.log(name)
    loadWorld($worlds[name], name)
  }

  return (
    <div id="EditorBar">
      <div>
        <button onClick={props.exit}>Exit</button>
        <InputSelect label='World' options={worlds} onChange={load} value={worlds[0]} />
      </div>
    </div>
  )
}
