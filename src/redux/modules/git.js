import { createAction, combineActions, handleActions } from 'redux-actions'
import { createRoutine } from 'redux-routines'
import { createSelector } from 'reselect'
import api from '../../api'
import git from '../../_data/git'

const githubApi = api('https://api.github.com/')

// Actions
export const getCommitsRoutine = createRoutine('react-ui/git/GET_COMMITS')
export const getReleasesRoutine = createRoutine('react-ui/git/GET_RELEASES')

// Reducer
export default handleActions({
  [combineActions(getCommitsRoutine.SUCCESS)]: (state, { payload }) => ({
    ...state,
    commits: payload
  }),
  [combineActions(getReleasesRoutine.SUCCESS)]: (state, { payload }) => ({
    ...state,
    releases: payload
  })
}, {
  commits: [],
  releases: []
})

// Action creators
export const getCommits = createAction(getCommitsRoutine.TRIGGER, (payload) => async (dispatch) => {
  try {
    dispatch(getCommitsRoutine.request())
    const response = await githubApi.wrapFailure(dispatch, githubApi.fetch(
      `repos/${git.user}/${git.repository}/commits`, { method: 'GET' }
    ))

    dispatch(getCommitsRoutine.success(response))
    return response
  } catch (e) {
    dispatch(getCommitsRoutine.failure(e))
  } finally {
    dispatch(getCommitsRoutine.fulfill())
  }
})

export const getReleases = createAction(getCommitsRoutine.TRIGGER, (payload) => async (dispatch) => {
  try {
    dispatch(getReleasesRoutine.request())
    const response = await githubApi.wrapFailure(dispatch, githubApi.fetch(
      `repos/${git.user}/${git.repository}/tags`, { method: 'GET' }
    ))

    dispatch(getReleasesRoutine.success(response))
    return response
  } catch (e) {
    dispatch(getReleasesRoutine.failure(e))
  } finally {
    dispatch(getReleasesRoutine.fulfill())
  }
})

// Selectors
const commitsSelector = state => state.git.commits
const releasesSelector = state => state.git.releases

export const latestCommitSelector = createSelector(
  commitsSelector,
  commits => {
    const realCommits = commits.filter(commit => commit.parents.length <= 1)

    if (realCommits.length > 0) {
      const commit = realCommits[0]
      return {
        url: commit.html_url,
        message: commit.commit.message.substr(0, 50),
        date: commit.commit.committer.date,
        author: {
          name: commit.commit.author.name,
          url: commit.author.html_url,
          avatar: commit.author.avatar_url
        }
      }
    }

    return {}
  }
)

export const latestReleaseSelector = createSelector(
  releasesSelector,
  releases => {
    console.log(releases)
    if (releases.length > 0) {
      const release = releases[0]
      return {
        name: release.name.substr(
          release.name.lastIndexOf('-') + 1,
          release.name.length)
      }
    }

    return {}
  }
)
