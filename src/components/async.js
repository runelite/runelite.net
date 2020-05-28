import { h, Component } from 'preact'

class Async extends Component {
  constructor() {
    super()
    this.state = {
      componentData: null
    }
  }

  loadComponent() {
    const componentData = this.props.getComponent()

    // In case returned value was a promise
    if (componentData) {
      if (componentData.then) {
        componentData.then(component => {
          this.setState({
            componentData: component.default || component
          })
        })
      } else {
        this.setState({
          componentData: componentData.default || componentData
        })
      }
    }
  }

  componentWillMount() {
    this.loadComponent()
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.path && this.props.path !== nextProps.path) {
      this.setState(
        {
          componentData: null
        },
        () => {
          this.loadComponent()
        }
      )
    }
  }

  render() {
    if (this.state.componentData) {
      if (this.props.path || this.props.default) {
        return h(this.state.componentData, this.props)
      }

      return this.state.componentData
    } else {
      return <span>Loading....</span>
    }
  }
}

export default Async
