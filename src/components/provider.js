import { Component } from 'preact'

class Provider extends Component {
  getChildContext () {
    const { children, ...context } = this.props
    return context
  }

  render ({ children }) {
    return children ? children[0] : null
  }
}

export default Provider
