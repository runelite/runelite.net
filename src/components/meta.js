import { Component } from 'preact'

class Meta extends Component {
  componentDidMount () {
    const { title, description } = this.props
    document.querySelector('title').text = title
    document
      .querySelector('meta[name=description]')
      .setAttribute('content', description)
  }

  render () {
    return null
  }
}

export default Meta
