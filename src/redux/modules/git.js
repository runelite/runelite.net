import { createAction, handleActions } from 'redux-actions'
import { createRoutine } from 'redux-routines'
import { createSelector } from 'reselect'
import api from '../../api'
import git from '../../_data/git'

const githubApi = api('https://api.github.com/')

// Actions
export const getCommitsRoutine = createRoutine('react-ui/git/GET_COMMITS')
export const getReleasesRoutine = createRoutine('react-ui/git/GET_RELEASES')
export const getRepositoryRoutine = createRoutine('react-ui/git/GET_REPOSITORY')

// Reducer
export default handleActions({
  [getCommitsRoutine.SUCCESS]: (state, { payload }) => ({
    ...state,
    commits: payload
  }),
  [getReleasesRoutine.SUCCESS]: (state, { payload }) => ({
    ...state,
    releases: payload
  }),
  [getRepositoryRoutine.SUCCESS]: (state, { payload }) => ({
    ...state,
    repository: payload
  })
}, {
  commits: [],
  releases: [],
  repository: {}
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

export const getRepository = createAction(getCommitsRoutine.TRIGGER, (payload) => async (dispatch) => {
  try {
    dispatch(getRepositoryRoutine.request())
    const response = await githubApi.wrapFailure(dispatch, githubApi.fetch(
      `repos/${git.user}/${git.repository}`, { method: 'GET' }
    ))

    dispatch(getRepositoryRoutine.success(response))
    return response
  } catch (e) {
    dispatch(getRepositoryRoutine.failure(e))
  } finally {
    dispatch(getRepositoryRoutine.fulfill())
  }
})

// Selectors
const commitsSelector = state => state.git.commits
const releasesSelector = state => state.git.releases
const repositorySelector = state => state.git.repository

export const latestCommitSelector = createSelector(
  commitsSelector,
  commits => {
    const realCommits = commits.filter(commit => commit.parents.length <= 1)

    if (realCommits.length > 0) {
      const commit = realCommits[0]
      return {
        url: commit.html_url,
        message: (commit.commit.message.length >= 50
          ? commit.commit.message.substr(0, 50) + '...'
          : commit.commit.message
        ),
        date: commit.commit.committer.date,
        author: {
          name: commit.commit.author.name,
          url: commit.author ? commit.author.html_url : null,
          avatar: commit.author ? commit.author.avatar_url : null
        }
      }
    }

    return {}
  }
)

export const latestReleaseSelector = createSelector(
  releasesSelector,
  releases => {
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

export const stargazersSelector = createSelector(
  repositorySelector,
  repository => repository.stargazers_count
)
