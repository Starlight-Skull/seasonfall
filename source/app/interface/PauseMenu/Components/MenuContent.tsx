import React from 'react'

import './MenuContent.scss'

interface Props {
  children?: any
}

export default function MenuContent (props: Props) {
  return (
    <div className="MenuContent">
      {props.children}
    </div>
  )
}
