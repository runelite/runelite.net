const {
  override,
  addWebpackAlias,
  useBabelRc,
  useEslintRc,
  babelInclude
} = require('customize-cra')

const fs = require('fs')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const PrerenderSPAPlugin = require('prerender-spa-plugin')
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer
const SitemapPlugin = require('sitemap-webpack-plugin').default
const md = require('markdown-it')
const fm = require('front-matter')
const parser = require('fast-xml-parser')
const hero = require('./src/_data/hero')
const parseBlog = require('./src/parse-blog')
const redirectConfig = require('./redirect')

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
  const mdParser = md({
    html: true,
    xhtmlOut: true
  })

  // Extract metadata
  const title = escapeHtml(frontMatterContext.attributes.title)
  const description = escapeHtml(frontMatterContext.attributes.description)
  const author = escapeHtml(frontMatterContext.attributes.author)
  const body = mdParser.render(frontMatterContext.body)
  const url = `${hero.url}/blog/show/${id}`

  // Validate xml
  const result = parser.validate('<div>' + body + '</div>')

  if (result !== true) {
    throw result
  }

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
  const routes = [
    '/',
    '/features',
    '/blog',
    '/tag',
    '/tile',
    '/plugin-hub',
    '/verify'
  ]
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

  config.plugins.push(
    new PrerenderSPAPlugin({
      // Required - The path to the webpack-outputted app to prerender.
      staticDir: path.join(__dirname, 'build'),
      // Required - Routes to render.
      routes: routes.map(({ path }) => path),
      // Make prerendering more stable
      renderer: new Renderer({
        maxConcurrentRoutes: 1,
        renderAfterTime: 1000
      })
    })
  )

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
      minify: false,
      inject: false,
      xhtml: false
    })
  )

  for (let key in redirectConfig) {
    if (!redirectConfig.hasOwnProperty(key)) {
      continue
    }

    const link = redirectConfig[key]

    config.plugins.push(
      new HtmlWebpackPlugin({
        redirect: {
          url: link
        },
        template: 'redirect.html',
        filename: key + '/index.html',
        inject: false,
        xhtml: false
      })
    )
  }

  return config
}

module.exports = override(
  useBabelRc(),
  useEslintRc(),
  addWebpackAlias({
    react: 'preact/compat',
    'react-dom': 'preact/compat'
  }),
  addSitePlugins(),
  babelInclude([
    path.resolve(__dirname, 'src'),
    path.resolve(__dirname, 'node_modules/react-leaflet'),
    path.resolve(__dirname, 'node_modules/@react-leaflet')
  ])
)
