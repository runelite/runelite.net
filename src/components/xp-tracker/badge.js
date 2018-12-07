import { h } from 'preact'

const formatValue = value => {
  const formattedValue = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')

  return formattedValue >= 0 ? `+${formattedValue}` : formattedValue
}

export default ({ value, levelsGained, suffix = '' }) => {
  return (
    <div
      class={`badge badge-${value >= 0 ? 'success' : 'danger'} skill-badge `}
    >
      {formatValue(value)}
      {suffix}
      {levelsGained > 0 && ` (+${levelsGained})`}
    </div>
  )
}
