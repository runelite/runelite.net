import { createActions, handleActions } from 'redux-actions'
import { createSelector } from 'reselect'
import { getLatestRelease as getLatestBootstrapRelease } from './bootstrap'
import git from '../_data/git'
import api from '../api'

const githubApi = api('https://api.github.com/')

// Actions
export const {
  fetchCommits,
  fetchReleases,
  fetchPulls,
  fetchIssues,
  fetchHashes,
  setCommits,
  setLatestCommit,
  setReleases,
  setPulls,
  setDetails,
  setIssues,
  setHashes,
  setFileNames
} = createActions(
  {
    FETCH_COMMITS: () => async (dispatch, getState) => {
      const version = getLatestBootstrapRelease(getState())

      // find the commits in master not in the last tag
      const response = await githubApi(
        `repos/${git.user}/${git.repository}/compare/${git.repository}:runelite-parent-${version}...${git.repository}:master`,
        {
          method: 'GET'
        }
      )

      let createCommit = commit => {
        const message = commit.commit.message
        const split = message.split('\n')
        const title = split.shift()
        const body = split.join('\n')

        return {
          title,
          body,
          url: commit.html_url,
          date: new Date(commit.commit.committer.date),
          author: {
            name: commit.commit.author ? commit.commit.author.name : '',
            url: commit.author ? commit.author.html_url : null,
            avatar: commit.author ? commit.author.avatar_url : null
          }
        }
      }

      const commits = response.commits
        .filter(
          commit => !commit.commit.message.startsWith('Merge pull request #')
        )
        .map(createCommit)
        .reverse()

      let latestCommit
      if (commits.length > 0) {
        latestCommit = commits[0]
      } else {
        // If master has been merged into the last tag, there are no commit differences, and so use the merge base instead.
        // This is the most recent commit in both the tag and master.
        latestCommit = createCommit(response.merge_base_commit)
      }

      const details = response.files.reduce(
        (a, b) => {
          return {
            additions: a.additions + b.additions,
            deletions: a.deletions + b.deletions,
            changes: a.changes + b.changes
          }
        },
        {
          additions: 0,
          deletions: 0,
          changes: 0
        }
      )

      details.files = response.files.length
      details.authors = new Set(commits.map(commit => commit.author.name)).size
      details.commits = commits.length

      dispatch(setDetails(details))
      dispatch(setCommits(commits))
      dispatch(setLatestCommit(latestCommit))
      return commits
    },
    FETCH_RELEASES: () => async dispatch => {
      const response = await githubApi(
        `repos/${git.user}/${git.repository}/tags`,
        {
          method: 'GET'
        }
      )

      const latest = response[0]
      const commitId = latest.commit.sha

      const commit = await githubApi(
        `repos/${git.user}/${git.repository}/commits/${commitId}`,
        {
          method: 'GET'
        }
      )

      latest['date'] = new Date(commit.commit.committer.date)

      const releases = response.map(release => {
        const name = release.name.substr(
          release.name.lastIndexOf('-') + 1,
          release.name.length
        )

        return {
          name,
          date: release.date,
          url: release.html_url
        }
      })

      if (releases.length === 0) {
        return releases
      }

      dispatch(setReleases(releases))
      return releases
    },
    FETCH_PULLS: () => async (dispatch, getState) => {
      const release = getLatestRelease(getState())

      const response = await Promise.all(
        [...Array(5).keys()].map(page =>
          githubApi(
            `repos/${git.user}/${git.repository}/pulls?page=${
              page + 1
            }&state=all&sort=updated&direction=desc&since=${release.date.toISOString()}`,
            {
              method: 'GET'
            }
          )
        )
      )

      const pulls = response.flat().map(pull => {
        return {
          url: pull.html_url,
          title: pull.title,
          draft: pull.draft,
          mergedAt: pull.merged_at ? new Date(pull.merged_at) : null,
          createdAt: pull.created_at ? new Date(pull.created_at) : null,
          closedAt: pull.closed_at ? new Date(pull.closed_at) : null,
          labels: pull.labels.map(label => ({
            name: label.name,
            color: label.color
          }))
        }
      })

      if (pulls.length === 0) {
        return pulls
      }

      dispatch(setPulls(pulls))
      return pulls
    },
    FETCH_ISSUES: () => async (dispatch, getState) => {
      const release = getLatestRelease(getState())

      const response = await Promise.all(
        [...Array(5).keys()].map(page =>
          githubApi(
            `repos/${git.user}/${git.repository}/issues?page=${
              page + 1
            }&state=all&sort=updated&direction=desc&since=${release.date.toISOString()}`,
            {
              method: 'GET'
            }
          )
        )
      )

      const issues = response
        .flat()
        .filter(issue => !issue.pull_request)
        .map(issue => {
          return {
            url: issue.html_url,
            title: issue.title,
            draft: issue.draft,
            createdAt: issue.created_at ? new Date(issue.created_at) : null,
            closedAt: issue.closed_at ? new Date(issue.closed_at) : null,
            labels: issue.labels.map(label => ({
              name: label.name,
              color: label.color
            }))
          }
        })

      if (issues.length === 0) {
        return issues
      }

      dispatch(setIssues(issues))
      return issues
    },
    FETCH_HASHES: () => async (dispatch, getState) => {
      const response = await githubApi(`repos/${git.user}/launcher/releases`, {
        method: 'GET'
      })

      const hashes = {}
      const names = {}

      const regex = new RegExp(
        /([a-zA-Z0-9]{64})\s+\*?(([\w-]+)?RuneLite[.\w-]+)/gi
      )

      response.forEach(release => {
        if (!release.body) {
          return
        }

        let line = regex.exec(release.body)
        while (line) {
          hashes[line[1]] = 1
          names[line[2].toLowerCase()] = 1

          line = regex.exec(release.body)
        }
      })

      dispatch(setHashes(hashes))
      dispatch(setFileNames(names))

      return hashes
    }
  },
  'SET_COMMITS',
  'SET_LATEST_COMMIT',
  'SET_RELEASES',
  'SET_PULLS',
  'SET_DETAILS',
  'SET_ISSUES',
  'SET_HASHES',
  'SET_FILE_NAMES'
)

// Reducer
export default handleActions(
  {
    [setCommits]: (state, { payload }) => ({
      ...state,
      commits: payload
    }),
    [setLatestCommit]: (state, { payload }) => ({
      ...state,
      latestCommit: payload
    }),
    [setReleases]: (state, { payload }) => ({
      ...state,
      releases: payload
    }),
    [setPulls]: (state, { payload }) => ({
      ...state,
      pulls: payload
    }),
    [setDetails]: (state, { payload }) => ({
      ...state,
      details: payload
    }),
    [setIssues]: (state, { payload }) => ({
      ...state,
      issues: payload
    }),
    [setHashes]: (state, { payload }) => ({
      ...state,
      hashes: payload
    }),
    [setFileNames]: (state, { payload }) => ({
      ...state,
      fileNames: payload
    })
  },
  {
    commits: [],
    pulls: [],
    releases: [],
    issues: [],
    details: {
      additions: 0,
      deletions: 0,
      changes: 0,
      authors: 0,
      commits: 0,
      files: 0
    },
    hashes: {},
    fileNames: {}
  }
)

// Selectors
const getPulls = state => state.git.pulls
const getReleases = state => state.git.releases
const getIssues = state => state.git.issues
export const getCommits = state => state.git.commits
export const getDetails = state => state.git.details
export const getLatestCommit = state => state.git.latestCommit

export const getHashes = state => state.git.hashes
export const getFileNames = state => state.git.fileNames

export const getLatestRelease = createSelector(getReleases, releases => {
  if (releases.length > 0) {
    return releases[0]
  }

  return {}
})

export const getMergedPullsSinceLastRelease = createSelector(
  getLatestRelease,
  getPulls,
  (release, pulls) => {
    return pulls
      ? pulls
          .filter(pull => pull.mergedAt && pull.mergedAt >= release.date)
          .sort((a, b) => b.mergedAt - a.mergedAt)
      : []
  }
)

export const getOpenedPullsSinceLastRelease = createSelector(
  getLatestRelease,
  getPulls,
  (release, pulls) => {
    return pulls
      ? pulls
          .filter(
            pull =>
              !pull.mergedAt && !pull.closedAt && pull.createdAt >= release.date
          )
          .sort((a, b) => b.createdAt - a.createdAt)
      : []
  }
)

export const getClosedIssues = createSelector(
  getLatestRelease,
  getIssues,
  (release, issues) => {
    return issues
      ? issues
          .filter(issue => issue.closedAt && issue.closedAt >= release.date)
          .filter(
            issue =>
              !issue.labels.some(
                label => label.name === 'invalid' || label.name === 'duplicate'
              )
          )
          .sort((a, b) => b.closedAt - a.closedAt)
      : []
  }
)

export const getOpenedIssues = createSelector(
  getLatestRelease,
  getIssues,
  (release, issues) => {
    return issues
      ? issues
          .filter(issue => !issue.closedAt && issue.createdAt >= release.date)
          .sort((a, b) => b.createdAt - a.createdAt)
      : []
  }
)
