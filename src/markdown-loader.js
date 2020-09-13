const md = require('markdown-it')
const { html5Media } = require('markdown-it-html5-media')
const fm = require('front-matter')
const loaderUtils = require('loader-utils')

module.exports = function (source) {
  if (this.cacheable) {
    this.cacheable()
  }

  let options
  try {
    options = loaderUtils.parseQuery(this.query)
  } catch (e) {
    options = {}
  }

  const frontMatterContext = fm(source)
  const obj = frontMatterContext.attributes
  const parser = md({
    html: true
  }).use(html5Media, {
    videoAttrs:
      'autoPlay=true muted=true loop=true playsInline=true preload="auto"'
  })

  const defaultRender =
    parser.renderer.rules.link_open ||
    ((tokens, idx, options, env, self) =>
      self.renderToken(tokens, idx, options))

  parser.renderer.rules.link_open = function (tokens, idx, options, env, self) {
    tokens[idx].attrPush(['native', ''])
    return defaultRender(tokens, idx, options, env, self)
  }

  obj.body = parser.render(frontMatterContext.body, options)

  return 'module.exports = ' + JSON.stringify(obj)
}
