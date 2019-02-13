import { h, Component } from 'preact'

const prepare = prepareComponentData => WrappedComponent => {
  return class extends Component {
    componentDidMount() {
      prepareComponentData(this.props)
    }

    render(props) {
      return <WrappedComponent {...props} />
    }
  }
}

export default prepare
