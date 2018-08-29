import React from 'react'
import { Helmet } from 'react-helmet'
import universal from 'react-universal-component'
import ago from 's-ago'
import { NavLink } from 'redux-first-router-link'
import Layout from '../components/layout'
import blog from '../blog'
import hero from '../_data/hero'

const Blog = ({ children }) => (
  <Layout>
    <Helmet>
      <title>Blog - {hero.title}</title>
    </Helmet>
    <h1>Blog</h1>
    <hr />
    <ul className='list-group'>
      {[...blog.keys()].map(path => {
        const UniversalComponent = universal(() => blog.get(path).then(({date, title, description, author}) => (
          <NavLink className='list-group-item list-group-item-action flex-column align-items-start' to={`/blog/show/${path}`}>
            <div class='d-flex w-100 justify-content-between'>
              <h5 className='mb-1'>{title || path}</h5>
              <small className='text-muted'>{ago(date)} by {author}</small>
            </div>
            <p className='mb-1 text-muted'>{description}</p>
          </NavLink>
        )))

        return (<UniversalComponent />)
      })}
    </ul>
    {children}
  </Layout>
)

export default Blog
