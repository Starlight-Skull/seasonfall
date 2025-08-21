import './EditorProperties.scss'
import { useEffect, useState } from 'react'
import Tile, { Collision } from '../../app/classes/Tile'
import InputBoolean, { InputBooleanStateLess } from '../Components/InputBoolean'
import { $editor } from '../../app/globals/editor'
import { InputNumberStateLess } from '../Components/InputNumber'
import { InputSelectStateLess } from '../Components/InputSelect'

interface Props {
  selected: Tile
}

export default function EditorProperties(props: Props) {
  const [collision, setCollision] = useState(props.selected.collision)
  const [rotation, setRotation] = useState(props.selected.rotation)
  const [mirrored, setMirrored] = useState(props.selected.mirrored)

  useEffect(() => {
    setMirrored(props.selected?.mirrored ?? false)
    setRotation(props.selected?.rotation ?? 0)
    setCollision(props.selected?.collision ?? Collision.all)
  }, [props.selected])

  return (
    <div id="EditorProperties">
      <InputBoolean
        label="Foreground"
        onChange={(val) => ($editor.foreground = val)}
        value={$editor.foreground}
      />
      <p>Value: {props.selected?.toString()}</p>
      <p>
        Location: {$editor.selectedX},{$editor.selectedY}
      </p>
      <p>
        Size: {props.selected.width},{props.selected.height}
      </p>
      <InputSelectStateLess
        label="Collision"
        value={collision}
        options={Object.keys(Collision)}
        onChange={(val) => {
          props.selected.collision = val as Collision
          setCollision(val as Collision)
        }}
      />
      <InputNumberStateLess
        label="Rotation"
        value={rotation}
        step={15}
        min={0}
        max={360}
        onChange={(val) => {
          props.selected.rotation = val
          setRotation(val)
        }}
      />
      <InputBooleanStateLess
        label="Mirrored"
        value={mirrored}
        onChange={(val) => {
          props.selected.mirrored = val
          setMirrored(val)
        }}
      />
    </div>
  )
}
