const path = require('path')
const PrerenderSPAPlugin = require('prerender-spa-plugin')
const rewirePreact = require('react-app-rewire-preact')

/* config-overrides.js */
module.exports = function override (config, env) {
  config = rewirePreact(config, env)

  config.plugins.push(
    new PrerenderSPAPlugin({
      // Required - The path to the webpack-outputted app to prerender.
      staticDir: path.join(__dirname, 'build'),
      // Required - Routes to render.
      routes: ['/', '/features', '/blog']
    })
  )

  return config
}
