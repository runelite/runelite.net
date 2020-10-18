import { h } from 'preact'

const Choice = ({ prefix, choices, value, onClick }) => (
  <div class="dropdown">
    <button
      class="dropdown-toggle btn btn-block btn-dark"
      id={'choice' + prefix}
    >
      {prefix} {value}
    </button>
    <div class="dropdown-menu">
      {choices.map(choice => (
        <button class="dropdown-item" onClick={() => onClick(choice)}>
          {prefix} {choice}
        </button>
      ))}
    </div>
  </div>
)

export default Choice
