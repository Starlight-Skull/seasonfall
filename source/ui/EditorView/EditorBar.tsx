import React from 'react'
import NavButton from '../Components/NavButton'

import './EditorBar.scss'

interface Props {
  exit: () => void
}

export function EditorBar(props: Props) {
  return (
    <div id="EditorBar">
      <div>
        <NavButton onClick={props.exit}>Exit</NavButton>
      </div>
    </div>
  )
}
