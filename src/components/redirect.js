import { Component } from 'preact'

export default class Redirect extends Component {
  componentWillMount() {
    window.location.replace(this.props.to)
  }

  render() {
    return null
  }
}
