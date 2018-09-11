import { h } from 'preact'
import './loader.css'

const Loader = ({ loading }) => (
  <div
    class="fixed-top animated loader"
    style={{ display: loading ? 'block' : 'none' }}
  />
)

export default Loader
