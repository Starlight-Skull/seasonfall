import { useState } from 'react'

interface Props {
  label: string
  value: boolean
  onChange?: (value: boolean) => void
}

export default function InputBoolean(props: Props) {
  const [value, setValue] = useState(props.value)
  return (
    <InputBooleanStateLess
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
    <label>
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
