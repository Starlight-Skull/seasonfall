import './Input.scss'
import { useState } from 'react'

interface Props {
  label: string
  value: boolean
  onChange?: (value: boolean) => void
  disabled?: boolean
}

export default function InputBoolean(props: Props) {
  const [value, setValue] = useState(props.value)
  return (
    <InputBooleanStateLess
      disabled={props.disabled}
      label={props.label}
      value={value}
      onChange={(val) => {
        setValue(val)
        props.onChange?.(val)
      }}
    />
  )
}

export function InputBooleanStateLess(props: Props) {
  return (
    <label className={`Input ${props.disabled ? 'disabled' : ''}`}>
      {props.label}
      <input
        type="checkbox"
        value={props.value.toString()}
        checked={props.value}
        onChange={(e) => props.onChange?.(e.target.checked)}
      />
    </label>
  )
}
