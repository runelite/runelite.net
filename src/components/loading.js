import { h } from 'preact'

const Loading = () => (
  <div
    style={{
      display: 'table',
      width: '100%',
      height: '100%'
    }}
  >
    <div
      style={{
        display: 'table-cell',
        verticalAlign: 'middle'
      }}
    >
      <div
        style={{
          marginLeft: 'auto',
          marginRight: 'auto',
          textAlign: 'center',
          fontWeight: 700,
          color: 'white'
        }}
      >
        <div class="fa-4x">
          <i class="fas fa-spinner fa-spin"></i>
        </div>
      </div>
    </div>
  </div>
)

export default Loading
