import * as R from 'ramda'
import { getCommits, getReleases, getRepository } from './modules/git'
import {getSessionCount} from './modules/runelite'

const createThunk = (fns) => async (dispatch, getState) => R.reduce(
  (a, b) => a.then(() => dispatch(b(getState().location.payload.slug))),
  Promise.resolve(),
  fns)

const createRoute = (path, fns) => ({
  path,
  thunk: createThunk(fns || [])
})

export default {
  HOME: createRoute('/', [ getCommits, getReleases, getRepository, getSessionCount ]),
  BLOG: createRoute('/blog'),
  FEATURES: createRoute('/features'),
  BLOG_SHOW: createRoute('/blog/show/:slug'),
  LOGGED_IN: createRoute('/logged-in')
}
