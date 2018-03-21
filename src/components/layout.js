import React from 'react'
import { Container } from 'reactstrap'

const Layout = ({ children, fullWidth }) => {
  const style = { paddingTop: 60, paddingBottom: 15 }

  if (fullWidth) {
    style.maxWidth = '100%'
  }

  return (
    <Container id='layout' style={style}>
      {children}
    </Container>
  )
}

export default Layout
