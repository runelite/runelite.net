import { h } from 'preact'
import Footer from './footer'

const Layout = ({ children, fullWidth, ...props }) => {
  props.class = props.class ? 'container ' + props.class : 'container'
  props.style = {
    ...(props.style || {}),
    maxWidth: fullWidth ? '100%' : ''
  }

  return (
    <div {...props} id="layout">
      {children}
      <Footer />
    </div>
  )
}

export default Layout
