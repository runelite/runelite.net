import React from 'react'
import { Helmet } from 'react-helmet'
import universal from 'react-universal-component'
import ago from 's-ago'
import Layout from '../components/layout'
import blog from '../blog'
import hero from '../_data/hero'

const BlogShow = ({ children, id }) => {
  const UniversalComponent = universal(() => blog.get(id).then(post => {
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
        <p className='text-muted'>{ago(date)} by {author}</p>
        <hr />
        <div className='markdown-body' dangerouslySetInnerHTML={{__html: __content}} />
        {children}
      </Layout>
    )
  }))

  return (<UniversalComponent />)
}

export default BlogShow
