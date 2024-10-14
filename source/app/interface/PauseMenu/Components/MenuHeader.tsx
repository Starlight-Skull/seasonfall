import React from 'react'
import { Menus } from '../PauseMenu'

import './MenuHeader.scss'
import NavButton from './NavButton'

interface Props {
  children?: any
  nav?: Record<string, Menus>
  active?: number
  setMenu?: (menu: Menus) => void
}

export default function MenuHeader(props: Props) {
  return (
    <div className="MenuHeader">
      {props.children && <h3>{props.children}</h3>}
      {props.nav &&
        Object.entries(props.nav).map((element, i) => {
          return i === props.active ? (
            <NavButton key={i} disabled>{element[0]}</NavButton>
          ) : (
            <NavButton key={i} onClick={() => props.setMenu?.(element[1])}>
              {element[0]}
            </NavButton>
          )
        })}
    </div>
  )
}
