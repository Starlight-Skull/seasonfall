import React from 'react'
import NavButton from '../Components/NavButton'

export default function Editor(props: { exit: () => void }) {
  console.log('editor mode')
  return <NavButton onClick={props.exit}>Exit</NavButton>
}
