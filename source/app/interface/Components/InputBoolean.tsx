import React, { useState, type FormEvent } from 'react'

interface Props {
  label: string
  value: boolean
  onChange?: (value: boolean) => void
}

export default function InputBoolean(props: Props) {
  const [value, setValue] = useState(props.value)

  function handleChange(event: FormEvent) {
    const element = event.target as HTMLInputElement
    setValue(element.checked)
    if (props.onChange) {
      props.onChange(element.checked)
    }
  }

  return (
    <label>
      {props.label}
      <input onChange={handleChange} value={`${value}`} checked={value} type="checkbox" />
    </label>
  )
}
