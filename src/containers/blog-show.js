import 'github-markdown-css'
import React from 'react'
import { Helmet } from 'react-helmet'
import TimeAgo from 'react-timeago'
import Layout from '../components/layout'
import blog from '../blog'
import hero from '../_data/hero'

const BlogShow = ({ children, slug }) => {
  const post = blog.get(slug)
  const { date, title, description, author, __content } = post || {
    title: 'Blog post not found',
    date: '',
    description: '',
    __content: ''
  }

  return (
    <Layout>
      <Helmet>
        <title>{title} - {hero.title}</title>
        <meta name='description' content={description} />
      </Helmet>
      <h1>{title}</h1>
      <p className='text-muted'><TimeAgo date={date} /> by {author}</p>
      <hr />
      <div className='markdown-body' dangerouslySetInnerHTML={{__html: __content}} />
      {children}
    </Layout>
  )
}

export default BlogShow
