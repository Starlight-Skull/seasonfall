import React, {
  Component,
  type FormEvent
} from 'react'

interface Props {
  label: string
  value: number
  min?: number
  max?: number
  onChange?: (value: number) => void
}
interface State {
  value: number
}

export default class InputNumber extends Component<Props, State> {
  state = {
    value: this.props.value
  }

  onInput(event: FormEvent) {
    const element = event.target as HTMLInputElement
    const reset = this.props.min ?? 0
    const value = parseFloat(element.value ?? reset)
    this.setState({ value })
    if (this.props.onChange) {
      this.props.onChange(value)
    }
  }

  render() {
    return (
      <label>
        {this.props.label}
        <input
          onChange={(e) => this.onInput(e)}
          value={this.state.value}
          min={this.props.min}
          max={this.props.max}
          type='number'
        />
      </label>
    )
  }
}
