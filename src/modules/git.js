import { createActions, handleActions } from 'redux-actions'
import { createSelector } from 'reselect'
import git from '../_data/git'
import api from '../api'
import { startLoading, stopLoading } from './app'

const githubApi = api('https://api.github.com/')

// Actions
export const {
  getCommits,
  getReleases,
  getRepository,
  setCommits,
  setReleases,
  setRepository
} = createActions(
  {
    GET_COMMITS: () => async dispatch => {
      dispatch(startLoading())
      const response = await githubApi(
        `repos/${git.user}/${git.repository}/commits`,
        { method: 'GET' }
      )

      dispatch(setCommits(response))
      dispatch(stopLoading())
      return response
    },
    GET_REPOSITORY: () => async dispatch => {
      dispatch(startLoading())
      const response = await githubApi(`repos/${git.user}/${git.repository}`, {
        method: 'GET'
      })

      dispatch(setRepository(response))
      dispatch(stopLoading())
      return response
    },
    GET_RELEASES: () => async dispatch => {
      dispatch(startLoading())
      const response = await githubApi(
        `repos/${git.user}/${git.repository}/tags`,
        { method: 'GET' }
      )

      dispatch(setReleases(response))
      dispatch(stopLoading())
      return response
    }
  },
  'SET_COMMITS',
  'SET_RELEASES',
  'SET_REPOSITORY'
)

// Reducer
export default handleActions(
  {
    [setCommits]: (state, { payload }) => ({
      ...state,
      commits: payload
    }),
    [setReleases]: (state, { payload }) => ({
      ...state,
      releases: payload
    }),
    [setRepository]: (state, { payload }) => ({
      ...state,
      repository: payload
    })
  },
  {
    commits: [],
    releases: [],
    repository: {}
  }
)

// Selectors
const commitsSelector = state => state.git.commits
const releasesSelector = state => state.git.releases
const repositorySelector = state => state.git.repository

export const latestCommitSelector = createSelector(commitsSelector, commits => {
  const realCommits = commits.filter(commit => commit.parents.length <= 1)

  if (realCommits.length > 0) {
    const commit = realCommits[0]
    return {
      url: commit.html_url,
      message:
        commit.commit.message.length >= 50
          ? commit.commit.message.substr(0, 50) + '...'
          : commit.commit.message,
      date: new Date(commit.commit.committer.date),
      author: {
        name: commit.commit.author.name,
        url: commit.author ? commit.author.html_url : null,
        avatar: commit.author ? commit.author.avatar_url : null
      }
    }
  }

  return {}
})

export const latestReleaseSelector = createSelector(
  releasesSelector,
  releases => {
    if (releases.length > 0) {
      const release = releases[0]
      return {
        name: release.name.substr(
          release.name.lastIndexOf('-') + 1,
          release.name.length
        )
      }
    }

    return {}
  }
)

export const stargazersSelector = createSelector(
  repositorySelector,
  repository => repository.stargazers_count
)
