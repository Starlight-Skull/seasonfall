import React, { useState } from 'react'

interface Props {
  label: string
  value: string
  options: string[]
  onChange?: (value: string) => void
}

export default function InputSelect(props: Props) {
  const [value, setValue] = useState(props.value)
  return (
    <InputSelectStateLess
      label={props.label}
      value={value}
      options={props.options}
      onChange={(val) => {
        setValue(val)
        props.onChange?.(val)
      }}
    />
  )
}

export function InputSelectStateLess(props: Props) {
  return (
    <label>
      {props.label}
      <select
        value={props.value}
        onChange={(e) => props.onChange?.(e.target.value)}
      >
        {props.options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  )
}
