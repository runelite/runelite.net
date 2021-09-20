import './popup.css'

import { h } from 'preact'

const Popup = props => {
  return (
    <div className="popup-box">
      <span className="close-icon" onClick={props.handleClose}>
        x
      </span>
      <div className="box">{props.children}</div>
    </div>
  )
}

export default Popup
