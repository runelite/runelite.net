import { Component } from 'preact'
import { getCurrentUrl } from '../util'
import hero from '../_data/hero'

const meta = (selector, content) =>
  document.querySelector(`meta[${selector}]`).setAttribute('content', content)

class Meta extends Component {
  render({ title, description, author, image, type }) {
    const currentUrl = getCurrentUrl()

    title = title || ''
    description = description || ''
    author = author || ''
    image = image || hero.url + hero.logo
    type = type || 'website'

    if (image.startsWith('/')) {
      image = hero.url + image
    }

    document.querySelector('title').text = title
    meta('name=description', description)
    meta('name=author', author)
    meta("property='og:url'", currentUrl)
    meta("property='og:title'", title)
    meta("property='og:description'", description)
    meta("property='og:image'", image)
    meta("property='og:type'", type)
    return null
  }
}

export default Meta
