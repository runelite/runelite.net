import { h } from 'preact'
import ago from 's-ago'
import Layout from '../components/layout'
import { getBlog } from '../blog'
import hero from '../_data/hero'
import Meta from '../components/meta'
import Async from '../components/async'
import NotFound from '../components/not-found'

const InnerHTMLHelper = ({ tagName, html }) =>
  h(tagName, { dangerouslySetInnerHTML: { __html: html } })

const buildPost = ({ date, title, description, author, body }) => {
  if (!body) {
    return <NotFound />
  }

  return (
    <Layout>
      <Meta
        title={`${title} - ${hero.title}`}
        description={description}
        author={author}
      />
      <h1>{title}</h1>
      <p class="text-muted">
        {ago(date)} by {author}
      </p>
      <hr />
      <div class="markdown-body">
        <InnerHTMLHelper tagName="div" html={body} />
      </div>
    </Layout>
  )
}

const BlogShow = ({ id }) => (
  <Async getComponent={() => getBlog(id).then(buildPost)} />
)

export default BlogShow
