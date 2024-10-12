import React from 'react'

import './NavButton.scss'

interface Props {
  children?: any
  onClick?: () => void
  disabled?: boolean
}

export default function NavButton (props: Props) {
  return (
    <button onClick={props.onClick} disabled={props.disabled} className="NavButton">
      {props.children}
    </button>
  )
}
