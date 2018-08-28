import React from 'react'

const Layout = ({ children, fullWidth }) => (
  <div className='container' id='layout' style={{
    paddingTop: 60,
    paddingBottom: 15,
    maxWidth: fullWidth ? '100%' : ''
  }}>
    {children}
  </div>
)

export default Layout
