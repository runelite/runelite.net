/** @jsx h */
import { h } from 'preact'
import ago from 's-ago'
import Layout from '../components/layout'
import blog from '../blog'
import hero from '../_data/hero'
import Meta from '../components/meta'

const BlogShow = ({ id }) => {
  const { date, title, description, author, __content } = blog.get(id) || {
    title: 'Blog post not found',
    date: new Date(),
    description: '',
    __content: ''
  }

  return (
    <Layout>
      <Meta title={`${title} - ${hero.title}`} description={description} />
      <h1>{title}</h1>
      <p class='text-muted'>
        {ago(date)} by {author}
      </p>
      <hr />
      <div
        class='markdown-body'
        dangerouslySetInnerHTML={{ __html: __content }}
      />
    </Layout>
  )
}

export default BlogShow
