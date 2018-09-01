import transitionPath from 'router5-transition-path'

export default routes => (router, dependencies) => (
  toState,
  fromState,
  done
) => {
  const { toActivate } = transitionPath(toState, fromState)

  toActivate.forEach(segment => {
    const routeSegment = routes.find(r => r.name === segment)
    if (routeSegment && routeSegment.onActivate) {
      dependencies.store.dispatch(routeSegment.onActivate(toState.params))
    }
  })

  done()
}
