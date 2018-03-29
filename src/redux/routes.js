import * as R from 'ramda'
import { getCommits, getReleases, getRepository } from './modules/git'
import {getSessionCount, getXpRange} from './modules/runelite'

const createThunk = (fns) => async (dispatch, getState) => R.reduce(
  (a, b) => a.then(() => dispatch(b(getState().location.payload))),
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
  BLOG_SHOW: createRoute('/blog/show/:id'),
  LOGGED_IN: createRoute('/logged-in'),
  XP_TRACKER: createRoute('/xp/:name/:start/:end', [ getXpRange ])
}
