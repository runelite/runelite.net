import {createAction, handleActions} from 'redux-actions'
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
  XP_SHOW: (state, { payload }) => ({
    ...state,
    component: 'xp/show',
    payload: payload
  }),
  START_LOADING: (state) => ({
    ...state,
    loading: true
  }),
  STOP_LOADING: (state) => ({
    ...state,
    loading: false
  }),
  SET_TITLE: (state, { payload }) => ({
    ...state,
    title: payload
  }),
  SET_DESCRIPTION: (state, { payload }) => ({
    ...state,
    description: payload
  })
}, {
  component: 'home',
  loading: false,
  title: 'RuneLite',
  description: ''
})

export const startLoading = createAction('START_LOADING')
export const stopLoading = createAction('STOP_LOADING')
export const setTitle = createAction('SET_TITLE')
export const setDescription = createAction('SET_DESCRIPTION')
