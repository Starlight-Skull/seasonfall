import React from 'react'

import './MenuContainer.scss'

interface Props {
  children?: any
  id?: string
}

export default function MenuContainer (props: Props) {
  return (
    <section id={props.id} className="MenuContainer">
      {props.children}
    </section>
  )
}
