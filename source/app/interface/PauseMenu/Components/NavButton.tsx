import React from 'react'

import './NavButton.scss'

interface Props {
  id?: string
  children?: any
  onClick?: () => void
  disabled?: boolean
}

export default function NavButton (props: Props) {
  return (
    <button id={props.id} onClick={props.onClick} disabled={props.disabled} className="NavButton">
      {props.children}
    </button>
  )
}
