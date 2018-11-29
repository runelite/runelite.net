import { h, Component } from 'preact'

export default class Badge extends Component {
  formatValue() {
    const { value } = this.props

    const formattedValue = value
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')

    return formattedValue >= 0 ? `+${formattedValue}` : formattedValue
  }

  render({ value, levelsGained, suffix = '' }) {
    return (
      <div
        class={`badge badge-${value >= 0 ? 'success' : 'danger'} skill-badge `}
      >
        {this.formatValue()}
        {suffix}
        {levelsGained > 0 && ` (+${levelsGained})`}
      </div>
    )
  }
}
