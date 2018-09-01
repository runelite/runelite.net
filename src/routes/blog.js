/** @jsx h */
import { h } from 'preact'
import ago from 's-ago'
import Layout from '../components/layout'
import blog from '../blog'
import hero from '../_data/hero'
import Link from '../components/link'
import Meta from '../components/meta'

const Blog = () => (
  <Layout>
    <Meta title={`Blog - ${hero.title}`} />
    <h1>Blog</h1>
    <hr />
    <ul class='list-group'>
      {[...blog.keys()].map(id => {
        const { date, title, description, author } = blog.get(id)

        return (
          <Link
            key={id}
            class='list-group-item list-group-item-action flex-column align-items-start'
            routeName='blog-show'
            routeParams={{ id }}
          >
            <div class='d-flex w-100 justify-content-between'>
              <h5 class='mb-1'>{title || id}</h5>
              <small class='text-muted'>
                {ago(date)} by {author}
              </small>
            </div>
            <p class='mb-1 text-muted'>{description}</p>
          </Link>
        )
      })}
    </ul>
  </Layout>
)

export default Blog
