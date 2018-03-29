import { handleActions } from 'redux-actions'
import { NOT_FOUND } from 'redux-first-router'

// Reducer
export default handleActions({
  [NOT_FOUND]: (state, { payload }) => ({
    ...state,
    component: '404',
    payload: payload
  }),
  HOME: (state, { payload }) => ({
    ...state,
    component: 'home',
    payload: payload
  }),
  BLOG: (state, { payload }) => ({
    ...state,
    component: 'blog',
    payload: payload
  }),
  FEATURES: (state, { payload }) => ({
    ...state,
    component: 'features',
    payload: payload
  }),
  BLOG_SHOW: (state, { payload }) => ({
    ...state,
    component: 'blog-show',
    payload: payload
  }),
  LOGGED_IN: (state, { payload }) => ({
    ...state,
    component: 'logged-in',
    payload: payload
  }),
  XP_TRACKER: (state, { payload }) => ({
    ...state,
    component: 'xp',
    payload: payload
  })
}, {
  component: 'home'
})
