import * as R from 'ramda'
import createRouter from 'router5'
import browserPlugin from 'router5/plugins/browser'
import { reduxPlugin } from 'redux-router5'
import routerMiddleware from './middleware/router-middleware'

const createThunk = fns => params => async dispatch =>
  R.reduce((a, b) => a.then(() => dispatch(b(params))), Promise.resolve(), fns)

export const createRoute = (name, path, fns) => ({
  name,
  path,
  onActivate: createThunk(fns || [])
})

export default routes => store =>
  createRouter(routes, { allowNotFound: true })
    .setDependency('store', store)
    .useMiddleware(routerMiddleware(routes))
    .usePlugin(
      browserPlugin({
        useHash: false
      }),
      reduxPlugin(store.dispatch)
    )
