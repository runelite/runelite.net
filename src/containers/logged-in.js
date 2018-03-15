import React from 'react'
import { Helmet } from 'react-helmet'
import Layout from '../components/layout'
import hero from '../_data/hero'

const LoggedIn = ({ children }) => (
  <div>
    <Helmet>
      <title>Successfully logged in - {hero.title}</title>
    </Helmet>
    <Layout>
      <h1>Congratulations!</h1>
      <hr />
      <div>
        You have successfully logged into RuneLite. You may now close this window.
      </div>
      {children}
    </Layout>
  </div>
)

export default LoggedIn
