import { createActions, handleActions } from 'redux-actions'
import { createSelector } from 'reselect'
import git from '../_data/git'
import api from '../api'

const githubApi = api('https://api.github.com/')

// Actions
export const {
  fetchCommits,
  fetchRepository,
  fetchReleases,
  setCommits,
  setReleases,
  setRepository
} = createActions(
  {
    FETCH_COMMITS: () => async dispatch => {
      const response = await githubApi(
        `repos/${git.user}/${git.repository}/commits`,
        { method: 'GET' }
      )

      dispatch(setCommits(response))
      return response
    },
    FETCH_REPOSITORY: () => async dispatch => {
      const response = await githubApi(`repos/${git.user}/${git.repository}`, {
        method: 'GET'
      })

      dispatch(setRepository(response))
      return response
    },
    FETCH_RELEASES: () => async (dispatch, getState) => {
      const state = getState()
      if (state.git.releases.length > 0) {
        return state.git.releases
      }

      const response = await githubApi(
        `repos/${git.user}/${git.repository}/tags`,
        { method: 'GET' }
      )

      dispatch(setReleases(response))
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
const getCommits = state => state.git.commits
const getReleases = state => state.git.releases
const getRepository = state => state.git.repository

export const getLatestCommit = createSelector(
  getCommits,
  commits => {
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
  }
)

export const getLatestRelease = createSelector(
  getReleases,
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

export const getStargazers = createSelector(
  getRepository,
  repository => repository.stargazers_count
)
