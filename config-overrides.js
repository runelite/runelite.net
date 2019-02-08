const {
  override,
  addWebpackAlias,
  useBabelRc,
  useEslintRc
} = require('customize-cra')

const fs = require('fs')
const path = require('path')
const { injectBabelPlugin } = require('react-app-rewired')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const PrerenderSPAPlugin = require('prerender-spa-plugin')
const SitemapPlugin = require('sitemap-webpack-plugin').default
const marked = require('marked')
const fm = require('front-matter')
const libxmljs = require('libxmljs')
const hero = require('./src/_data/hero')
const parseBlog = require('./src/parse-blog')

// Escape html
const escapeHtml = unsafe => {
  return unsafe.replace(/[&<"']/g, m => {
    switch (m) {
      case '&':
        return '&amp;'
      case '<':
        return '&lt;'
      case '"':
        return '&quot;'
      default:
        return '&#039;'
    }
  })
}

const feedMapper = fileName => {
  // Setup path to file
  const filePath = path.join(path.join('src', '_posts'), fileName)

  // Read the content of the file
  const fileContent = fs.readFileSync(filePath, 'utf-8')

  // Extract front-matter context
  const frontMatterContext = fm(fileContent)

  // Parse blog metadata
  const { id, date } = parseBlog(fileName)

  // Make marked generate valid XHTML
  marked.setOptions({
    xhtml: true
  })

  // Extract metadata
  const title = escapeHtml(frontMatterContext.attributes.title)
  const description = escapeHtml(frontMatterContext.attributes.description)
  const author = escapeHtml(frontMatterContext.attributes.author)
  const body = marked(frontMatterContext.body)
  const url = `${hero.url}/blog/show/${id}`

  // Validate xml
  libxmljs.parseXml('<div>' + body + '</div>')

  return {
    url,
    title,
    author,
    content: body,
    summary: description,
    updated: date.toISOString()
  }
}

const addSitePlugins = () => config => {
  if (process.env.NODE_ENV !== 'production') {
    return config
  }

  const posts = fs.readdirSync(path.join('src', '_posts'))
  const routes = ['/', '/features', '/blog', '/tag']
    .map(path => ({ path }))
    .concat(
      posts.map(fileName => {
        // Parse blog metadata
        const { id, date } = parseBlog(fileName)
        return {
          path: '/blog/show/' + id,
          lastMod: date.toISOString().slice(0, 10)
        }
      })
    )

  if (process.env.NODE_ENV !== 'development') {
    config.plugins.push(
      new PrerenderSPAPlugin({
        // Required - The path to the webpack-outputted app to prerender.
        staticDir: path.join(__dirname, 'build'),
        // Required - Routes to render.
        routes: routes.map(({ path }) => path)
      })
    )
  }

  config.plugins.push(
    new SitemapPlugin(hero.url, routes, {
      lastMod: true,
      changeFreq: 'weekly'
    })
  )

  config.plugins.push(
    new HtmlWebpackPlugin({
      feed: {
        url: hero.url,
        title: hero.title,
        subtitle: hero.description,
        entries: posts.map(feedMapper).reverse()
      },
      template: 'public/atom.html',
      filename: 'atom.xml',
      inject: false,
      xhtml: false
    })
  )

  return config
}

module.exports = override(
  useBabelRc(),
  useEslintRc(),
  addWebpackAlias({
    react: 'preact-compat',
    'react-dom': 'preact-compat',
    'mobx-react': 'mobx-preact'
  }),
  addSitePlugins()
)
