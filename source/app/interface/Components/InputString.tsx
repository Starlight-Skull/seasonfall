import React, {
  useState,
  type FormEvent,
  type HTMLInputTypeAttribute
} from 'react'

interface Props {
  label: string
  type?: HTMLInputTypeAttribute | undefined
  value: string
  onChange?: (value: string) => void
}

export default function InputString(props: Props) {
  const [value, setValue] = useState(props.value)

  function handleChange(event: FormEvent) {
    const element = event.target as HTMLInputElement
    setValue(element.value)
    if (props.onChange) {
      props.onChange(element.value)
    }
  }

  return (
    <label>
      {props.label}
      <input
        onChange={handleChange}
        value={value}
        type={props.type ?? 'text'}
      />
    </label>
  )
}
