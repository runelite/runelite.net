/** @jsx h */
import { h } from 'preact'
import Footer from './footer'

const Layout = ({ children, fullWidth }) => (
  <div
    class='container'
    id='layout'
    style={{
      paddingTop: 60,
      paddingBottom: 15,
      maxWidth: fullWidth ? '100%' : ''
    }}
  >
    {children || <noscript />}
    <Footer />
  </div>
)

export default Layout
