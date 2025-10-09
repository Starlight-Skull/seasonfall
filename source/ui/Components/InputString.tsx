import './Input.scss'
import { useState, HTMLInputTypeAttribute } from 'react'

interface Props {
  label?: string
  type?: HTMLInputTypeAttribute
  value: string
  onChange?: (value: string) => void
  disabled?: boolean
}

export default function InputString(props: Props) {
  const [value, setValue] = useState(props.value)
  return (
    <InputStringStateLess
      disabled={props.disabled}
      label={props.label}
      value={value}
      type={props.type}
      onChange={(val) => {
        setValue(val)
        props.onChange?.(val)
      }}
    />
  )
}

export function InputStringStateLess(props: Props) {
  return (
    <label className={`Input ${props.disabled ? 'disabled' : ''}`}>
      {props.label}
      <input
        onChange={(e) => props.onChange?.(e.target.value)}
        value={props.value}
        type={props.type ?? 'text'}
      />
    </label>
  )
}
