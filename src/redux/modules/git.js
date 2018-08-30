import { createAction, handleActions } from 'redux-actions'
import { createRoutine } from 'redux-routines'
import { createSelector } from 'reselect'
import { startLoading, stopLoading } from './app'
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
export const getCommits = createAction(getCommitsRoutine.TRIGGER, () => async (dispatch) => {
  dispatch(startLoading())
  const response = await githubApi(
    `repos/${git.user}/${git.repository}/commits`, { method: 'GET' }
  )

  dispatch(getCommitsRoutine.success(response))
  dispatch(stopLoading())
  return response
})

export const getReleases = createAction(getReleasesRoutine.TRIGGER, () => async (dispatch) => {
  dispatch(startLoading())
  const response = await githubApi(
    `repos/${git.user}/${git.repository}/tags`, { method: 'GET' }
  )

  dispatch(getReleasesRoutine.success(response))
  dispatch(stopLoading())
  return response
})

export const getRepository = createAction(getRepositoryRoutine.TRIGGER, () => async (dispatch) => {
  dispatch(startLoading())
  const response = await githubApi(
    `repos/${git.user}/${git.repository}`, { method: 'GET' }
  )

  dispatch(getRepositoryRoutine.success(response))
  dispatch(stopLoading())
  return response
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
        date: new Date(commit.commit.committer.date),
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
