import React, { Component, type FormEvent } from 'react'

interface Props {
  label: string
  value: boolean
  onChange?: (value: boolean) => void
}
interface State {
  value: boolean
}

export default class InputBoolean extends Component<Props, State> {
  state = {
    value: this.props.value
  }

  onInput(event: FormEvent) {
    const element = event.target as HTMLInputElement
    this.setState({ value: element.checked })
    if (this.props.onChange) {
      this.props.onChange(element.checked)
    }
  }

  render() {
    return (
      <label>
        {this.props.label}
        <input
          onChange={(e) => this.onInput(e)}
          checked={this.state.value}
          type="checkbox"
        />
      </label>
    )
  }
}
