import React from 'react'
import { Helmet } from 'react-helmet'
import Layout from '../components/layout'
import hero from '../_data/hero'

const LoggedIn = ({ commit }) => (
  <div>
    <Helmet>
      <title>Succesfully logged in - {hero.title}</title>
    </Helmet>
    <Layout>
      <h1>Congratulations!</h1>
      <hr />
      <div>
        You succesfully logged into the RuneLite. You can now close this window.
      </div>
    </Layout>
  </div>
)

export default LoggedIn
