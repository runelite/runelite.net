const fs = require('fs')
const path = require('path')
const PrerenderSPAPlugin = require('prerender-spa-plugin')
const SitemapPlugin = require('sitemap-webpack-plugin').default
const rewirePreact = require('react-app-rewire-preact')
const rewireEslint = require('react-app-rewire-eslint')
const hero = require('./src/_data/hero')

module.exports = function override (config, env) {
  config = rewirePreact(config, env)
  config = rewireEslint(config, env)

  const posts = fs.readdirSync(path.join('src', '_posts'))
  const routes = ['/', '/features', '/blog'].concat(
    posts.map(p => '/blog/show/' + p.replace('.md', ''))
  )

  if (!process.env.NOW) {
    config.plugins.push(
      new PrerenderSPAPlugin({
        // Required - The path to the webpack-outputted app to prerender.
        staticDir: path.join(__dirname, 'build'),
        // Required - Routes to render.
        routes
      })
    )
  }

  config.plugins.push(
    new SitemapPlugin(hero.url, routes.map(path => ({ path })), {
      lastMod: true,
      changeFreq: 'weekly'
    })
  )

  return config
}
