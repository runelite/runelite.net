import { h } from 'preact'
import ago from 's-ago'
import Layout from '../components/layout'
import blog from '../blog'
import hero from '../_data/hero'
import Meta from '../components/meta'
import { Link } from 'preact-router'
import Async from '../components/async'
import './blog.scss'

const Blog = () => (
  <Layout>
    <Meta
      title={`Blog - ${hero.title}`}
      description="Latest RuneLite news and updates"
    />

    <section id="blog-list">
      <div class="content-section">
        <h1 class="page-header">Blog</h1>
        <ul class="list-group">
          {Array.from(blog.keys()).map(id => (
            <Async
              key={id}
              getComponent={() =>
                blog
                  .get(id)()
                  .then(({ id, date, title, description, author }) => (
                    <Link
                      key={id}
                      class="list-group-item list-group-item-action flex-column align-items-start"
                      activeClassName="active"
                      href={`/blog/show/${id}`}
                    >
                      <div class="d-flex w-100 justify-content-between">
                        <h5 class="mb-1">{title || id}</h5>
                        <small class="text-muted">
                          {ago(date)} by {author}
                        </small>
                      </div>
                      <p class="mb-1 text-muted">{description}</p>
                    </Link>
                  ))
              }
            />
          ))}
        </ul>
      </div>
    </section>
  </Layout>
)

export default Blog
