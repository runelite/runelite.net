const md = require('markdown-it')
const { html5Media } = require('markdown-it-html5-media')
const fm = require('front-matter')
const loaderUtils = require('loader-utils')

module.exports = function (source) {
  if (this.cacheable) {
    this.cacheable()
  }

  const options = loaderUtils.parseQuery(this.query)
  const frontMatterContext = fm(source)
  const obj = frontMatterContext.attributes
  const parser = md({
    html: true
  }).use(html5Media, {
    videoAttrs:
      'autoPlay=true muted=true loop=true playsInline=true preload="auto"'
  })

  obj.body = parser.render(frontMatterContext.body, options)

  // Fix links
  const regex = /<a\s+href="([^"]+)"\s*>/g
  const replace = '<a href="$1" native>'
  obj.body = obj.body.replace(regex, replace)

  return 'module.exports = ' + JSON.stringify(obj)
}
