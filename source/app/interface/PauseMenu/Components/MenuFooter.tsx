import React from 'react'
import NavButton from './NavButton'

import './MenuFooter.scss'

interface Props {
  nav: Record<string, () => void>
}

export default function MenuFooter(props: Props) {
  return (
    <div className="MenuFooter">
      {Object.entries(props.nav).map((element, i) => {
        return (
          <NavButton key={i} onClick={() => element[1]()}>
            {element[0]}
          </NavButton>
        )
      })}
    </div>
  )
}
