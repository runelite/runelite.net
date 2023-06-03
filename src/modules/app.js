import { createActions, handleActions } from 'redux-actions'
import heroModule from '../_data/hero'
import { randInt } from '../util'

export const {
  startLoading,
  stopLoading,
  makeNavbarDark,
  makeNavbarDefault,
  nextHeroImage
} = createActions(
  'START_LOADING',
  'STOP_LOADING',
  'MAKE_NAVBAR_DARK',
  'MAKE_NAVBAR_DEFAULT',
  'NEXT_HERO_IMAGE'
)

export default handleActions(
  {
    [startLoading]: state => ({
      ...state,
      loading: state.loading + 1
    }),
    [stopLoading]: state => ({
      ...state,
      loading: state.loading - 1
    }),
    [makeNavbarDark]: state => ({
      ...state,
      navbarDark: true
    }),
    [makeNavbarDefault]: state => ({
      ...state,
      navbarDark: false
    }),
    [nextHeroImage]: (state, { payload }) => ({
      ...state,
      heroImage: (state.heroImage + 1) % payload
    })
  },
  {
    loading: 0,
    navbarDark: false,
    heroImage: randInt(0, heroModule.images.length - 1)
  }
)
