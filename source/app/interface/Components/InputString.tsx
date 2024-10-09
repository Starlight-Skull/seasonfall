import React, {
  Component,
  type FormEvent,
  type HTMLInputTypeAttribute
} from 'react'

interface Props {
  label: string
  type?: HTMLInputTypeAttribute | undefined
  value: string
  onChange?: (value: string) => void
}
interface State {
  value: string
}

export default class InputString extends Component<Props, State> {
  state = {
    value: this.props.value
  }

  onInput(event: FormEvent) {
    const element = event.target as HTMLInputElement
    this.setState({ value: element.value })
    if (this.props.onChange) {
      this.props.onChange(element.value)
    }
  }

  render() {
    return (
      <label>
        {this.props.label}
        <input
          onChange={(e) => this.onInput(e)}
          value={this.state.value}
          type={this.props.type ?? 'text'}
        />
      </label>
    )
  }
}
