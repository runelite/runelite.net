import { Component } from 'preact'

class Meta extends Component {
  componentDidMount () {
    const { title, description, author } = this.props
    document.querySelector('title').text = title || ''
    document
      .querySelector('meta[name=description]')
      .setAttribute('content', description || '')
    document
      .querySelector('meta[name=author]')
      .setAttribute('content', author || '')
  }

  render () {
    return null
  }
}

export default Meta
