import { h } from 'preact'

const PreSelect = ({ children }) => (
  <pre style={{ userSelect: 'all' }}>{children}</pre>
)

export default PreSelect
