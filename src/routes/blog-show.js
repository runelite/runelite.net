import { h } from 'preact'
import ago from 's-ago'
import Layout from '../components/layout'
import { getBlog } from '../blog'
import hero from '../_data/hero'
import Meta from '../components/meta'
import Async from '../components/async'
import NotFound from '../components/not-found'
import './blog.scss'
import InnerHTMLHelper from '../components/inner-html-helper'

const buildPost = ({ date, title, description, author, body, image }) => {
  if (!body) {
    return <NotFound />
  }

  return (
    <Layout>
      <Meta
        title={`${title} - ${hero.title}`}
        description={description}
        author={author}
        image={image}
        type={'article'}
      />
      <section id="blog">
        <div class="content-section">
          <div class="page-header">
            <h1>{title}</h1>
            <p class="text-muted">
              <span title={date}>{ago(date)}</span> by {author}
            </p>
          </div>

          <div class="markdown-body news-page">
            <InnerHTMLHelper tagName="div" html={body} />
          </div>
        </div>
      </section>
    </Layout>
  )
}

const BlogShow = ({ id }) => (
  <Async getComponent={() => getBlog(id).then(buildPost)} />
)

export default BlogShow
