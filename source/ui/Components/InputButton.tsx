import './Input.scss'

interface Props {
  label: string
  children?: any
  onClick?: () => void
  disabled?: boolean
}

export default function InputButton(props: Props) {
  return (
    <label className={`Input ${props.disabled ? 'disabled' : ''}`}>
      {props.label}
      <button onClick={props.onClick} disabled={props.disabled}>
        {props.children}
      </button>
    </label>
  )
}
