import 'github-markdown-css'
import React from 'react'
import { Helmet } from 'react-helmet'
import TimeAgo from 'react-timeago'
import Layout from '../components/layout'
import blog from '../blog'
import hero from '../_data/hero'

const BlogShow = ({ slug }) => {
  const post = blog.get(slug)
  const { date, title, description, __content } = post

  return (
    <Layout>
      <Helmet>
        <title>{title} - {hero.title}</title>
        <meta name='description' content={description} />
      </Helmet>
      <h1>{title} <small className='text-muted'><TimeAgo date={date} /></small></h1>
      <hr />
      <div className='markdown-body' dangerouslySetInnerHTML={{__html: __content}} />
    </Layout>
  )
}

export default BlogShow
