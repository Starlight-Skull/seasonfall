import React, { useState, type FormEvent } from 'react'

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

  function handleChange(event: FormEvent) {
    const element = event.target as HTMLInputElement
    const reset = props.min ?? 0
    const value = parseFloat(element.value ?? reset)
    setValue(value)
    if (props.onChange) {
      props.onChange(value)
    }
  }

  return (
    <label>
      {props.label}
      <input
        onChange={handleChange}
        value={value}
        min={props.min}
        max={props.max}
        step={props.step}
        type="number"
      />
    </label>
  )
}
