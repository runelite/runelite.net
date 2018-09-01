import { h, Component } from 'preact'

class Link extends Component {
  constructor (props, context) {
    super(props, context)
    this.router = context.router
    this.isActive = this.isActive.bind(this)
    this.clickHandler = this.clickHandler.bind(this)
    this.callback = this.callback.bind(this)
    this.state = { active: this.isActive() }
  }

  buildUrl (routeName, routeParams) {
    if (this.router.buildUrl) {
      return this.router.buildUrl(routeName, routeParams)
    }

    return this.router.buildPath(routeName, routeParams)
  }

  isActive () {
    return this.router.isActive(
      this.props.routeName,
      this.props.routeParams,
      this.props.activeStrict,
      this.props.ignoreQueryParams
    )
  }

  callback (err, state) {
    if (!err && this.props.successCallback) {
      this.props.successCallback(state)
    }

    if (err && this.props.errorCallback) {
      this.props.errorCallback(err)
    }
  }

  clickHandler (evt) {
    if (this.props.onClick) {
      this.props.onClick(evt)

      if (evt.defaultPrevented) {
        return
      }
    }

    const comboKey = evt.metaKey || evt.altKey || evt.ctrlKey || evt.shiftKey

    if (evt.button === 0 && !comboKey) {
      evt.preventDefault()
      this.router.navigate(
        this.props.routeName,
        this.props.routeParams,
        this.props.routeOptions,
        this.callback
      )
    }
  }

  render ({
    routeName,
    routeParams,
    class: className,
    ignoreQueryParams,
    children,
    ...linkProps
  }) {
    const active = this.isActive()
    const href = this.buildUrl(routeName, routeParams)
    const linkclassName = (active ? ['active'] : [])
      .concat(className ? className.split(' ') : [])
      .join(' ')

    return h(
      'a',
      {
        ...linkProps,
        href,
        class: linkclassName,
        onClick: this.clickHandler
      },
      children
    )
  }
}

export default Link
