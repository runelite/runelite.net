/** @jsx h */
import { h } from 'preact'
import Footer from './footer'

const Layout = ({ children, fullWidth }) => (
  <div
    class='container'
    id='layout'
    style={{ maxWidth: fullWidth ? '100%' : '' }}
  >
    {children}
    <Footer />
  </div>
)

export default Layout
