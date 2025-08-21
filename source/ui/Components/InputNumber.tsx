import { useState } from 'react'

interface Props {
  label: string
  value: number
  min?: number
  max?: number
  step?: number
  onChange?: (value: number) => void
}

export default function InputNumber(props: Props) {
  const [value, setValue] = useState(props.value)
  return (
    <InputNumberStateLess
      label={props.label}
      value={value}
      min={props.min}
      max={props.max}
      step={props.step}
      onChange={(val) => {
        setValue(val)
        props.onChange?.(val)
      }}
    />
  )
}

export function InputNumberStateLess(props: Props) {
  return (
    <label>
      {props.label}
      <input
        onChange={(e) =>
          props.onChange?.(parseFloat(e.target.value) || (props.min ?? 0))
        }
        value={props.value}
        min={props.min}
        max={props.max}
        step={props.step}
        type="number"
      />
    </label>
  )
}
