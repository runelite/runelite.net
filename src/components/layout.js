import React from 'react'
import { Container } from 'reactstrap'

const Layout = ({ children }) => (
  <Container id='layout' style={{ paddingTop: 60, paddingBottom: 15 }}>
    {children}
  </Container>
)

export default Layout
