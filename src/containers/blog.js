import 'github-markdown-css'
import React from 'react'
import { Helmet } from 'react-helmet'
import universal from 'react-universal-component'
import TimeAgo from 'react-timeago'
import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap'
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
    <ListGroup>
      {[...blog.keys()].map(path => {
        const UniversalComponent = universal(() => blog.get(path).then(({date, title, description, author}) => (
          <ListGroupItem key={title} tag={NavLink} to={`/blog/show/${path}`}>
            <ListGroupItemHeading>{title || path} <small className='text-muted'><TimeAgo date={date} /> by {author}</small></ListGroupItemHeading>
            <ListGroupItemText className='text-muted'>
              {description}
            </ListGroupItemText>
          </ListGroupItem>
        )))

        return (<UniversalComponent />)
      })}
    </ListGroup>
    {children}
  </Layout>
)

export default Blog
