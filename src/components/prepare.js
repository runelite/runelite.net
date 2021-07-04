import { h, Component } from 'preact'
import Loading from './loading'

const prepare = prepareComponentData => WrappedComponent => {
  return class extends Component {
    constructor() {
      super()
      this.state = {
        loading: true
      }
    }

    componentDidMount() {
      const ret = prepareComponentData(this.props)
      if (ret instanceof Promise) {
        ret.then(() =>
          this.setState({
            loading: false
          })
        )
      } else {
        this.setState({
          loading: false
        })
      }
    }

    render(props) {
      const { loading } = this.state
      return loading ? <Loading /> : <WrappedComponent {...props} />
    }
  }
}

export default prepare
