import React, { ChangeEvent, useState } from 'react'

interface Props {
  label: string
  value: string
  options: string[]
  onChange?: (value: string) => void
}

export default function InputSelect(props: Props) {
  const [value, setValue] = useState(props.value)

  function handleChange(event: ChangeEvent) {
    const element = event.target as HTMLSelectElement
    setValue(element.value)
    if (props.onChange) props?.onChange(element.value)
  }

  return (
    <label>
      {props.label}
      <select onChange={handleChange} value={value}>
        {props.options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  )
}
