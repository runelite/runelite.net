import { h, Fragment } from 'preact'
import './home.scss'
import './pulse.scss'
import { connect } from 'react-redux'
import Layout from '../components/layout'
import {
  fetchCommits,
  fetchIssues,
  fetchPulls,
  fetchReleases,
  getClosedIssues,
  getCommits,
  getDetails,
  getLatestRelease,
  getMergedPullsSinceLastRelease,
  getOpenedIssues,
  getOpenedPullsSinceLastRelease
} from '../modules/git'
import hero from '../_data/hero'
import Meta from '../components/meta'
import { bindActionCreators } from 'redux'
import prepare from '../components/prepare'
import { numberWithCommas } from '../util'
import ago from 's-ago'
import { fetchBootstrap } from '../modules/bootstrap'

const typeMap = {
  merged: '#6f42c1',
  open: '#2cbe4e',
  draft: '#c6c6c6',
  closed: '#cb2431'
}

const buildLabels = pull =>
  pull.labels &&
  pull.labels.map(label => (
    <Fragment>
      {' '}
      <span
        class="badge"
        style={{ color: 'black', backgroundColor: '#' + label.color }}
      >
        {label.name}
      </span>
    </Fragment>
  ))

const buildPull = (pull, type) => (
  <a
    class="list-group-item list-group-item-action"
    style={{
      borderLeft: `5px solid ${
        !pull.mergedAt && pull.closedAt
          ? typeMap.closed
          : pull.draft
          ? typeMap.draft
          : typeMap[type]
      }`,
      color: 'white'
    }}
    href={pull.url}
  >
    {pull.title} {buildLabels(pull)}
    <br />
    <span class="text-muted">
      {ago(
        pull.mergedAt
          ? pull.mergedAt
          : pull.closedAt
          ? pull.closedAt
          : pull.createdAt
      )}
    </span>
  </a>
)

const Pulse = ({
  details,
  commits,
  release,
  mergedPulls,
  openedPulls,
  closedIssues,
  openedIssues
}) =>
  release.date && (
    <Layout>
      <Meta
        title={`Pulse - ${hero.title}`}
        description="Activity since last release"
      />

      <section id="pulse">
        <div
          class="content-section"
          style={{
            maxWidth: '100%'
          }}
        >
          <div class="page-header">
            <h1>Activity since the {release.name} release</h1>
            <p class="text-muted">
              From <b>{release.date.toDateString()}</b> to{' '}
              <b>{new Date().toDateString()}</b>
            </p>
          </div>

          <div
            class="progress page-header"
            title={`${
              openedIssues.length + openedPulls.length
            } open issues and pull requests`}
            style={{
              backgroundColor: typeMap.open
            }}
          >
            <div
              class="progress-bar"
              title={`${mergedPulls.length} merged pull requests`}
              style={{
                width:
                  (mergedPulls.length /
                    (mergedPulls.length +
                      openedPulls.length +
                      closedIssues.length +
                      openedIssues.length)) *
                    100 +
                  '%',
                backgroundColor: typeMap.merged
              }}
            />
            <div
              class="progress-bar"
              title={`${closedIssues.length} closed issues`}
              style={{
                width:
                  (closedIssues.length /
                    (mergedPulls.length +
                      openedPulls.length +
                      closedIssues.length +
                      openedIssues.length)) *
                    100 +
                  '%',
                backgroundColor: typeMap.closed
              }}
            />
          </div>

          <div class="page-header">
            Excluding merges, <b>{details.commits} commits</b> from{' '}
            <b>{details.authors} authors</b> have been pushed to master. On
            master, <b>{details.files} files</b> have changed and there have
            been{' '}
            <b>
              <span class="text-success">
                {numberWithCommas(details.additions)}
              </span>{' '}
              additions
            </b>{' '}
            and{' '}
            <b>
              <span class="text-danger">
                {numberWithCommas(details.deletions)}
              </span>{' '}
              deletions
            </b>
            .
          </div>

          <div class="row page-header">
            <div class="col-md-6">
              <h1 class="page-header">
                <b>{mergedPulls.length}</b> pull requests merged
              </h1>
              <ul class="list-group">
                {mergedPulls.map(pull => buildPull(pull, 'merged'))}
              </ul>
            </div>
            <div class="col-md-6">
              <h1 class="page-header">
                <b>{openedPulls.length}</b> pull requests opened
              </h1>
              <ul class="list-group">
                {openedPulls.map(pull => buildPull(pull, 'open'))}
              </ul>
            </div>
          </div>

          <div class="row page-header">
            <div class="col-md-6">
              <h1 class="page-header">
                <b>{closedIssues.length}</b> issues closed
              </h1>
              <ul class="list-group">
                {closedIssues.map(pull => buildPull(pull, 'closed'))}
              </ul>
            </div>
            <div class="col-md-6">
              <h1 class="page-header">
                <b>{openedIssues.length}</b> issues opened
              </h1>
              <ul class="list-group">
                {openedIssues.map(pull => buildPull(pull, 'open'))}
              </ul>
            </div>
          </div>

          <h1 class="page-header">
            <b>{commits.length}</b> new commits
          </h1>
          <ul class="list-group">
            {commits.map(commit => {
              return (
                <a
                  class="list-group-item list-group-item-action"
                  style={{
                    color: 'white'
                  }}
                  href={commit.url}
                >
                  {commit.title}
                  <br />
                  <span class="text-muted">by {commit.author.name}</span>
                </a>
              )
            })}
          </ul>
        </div>
      </section>
    </Layout>
  )

const mapStateToProps = state => ({
  commits: getCommits(state),
  mergedPulls: getMergedPullsSinceLastRelease(state),
  openedPulls: getOpenedPullsSinceLastRelease(state),
  closedIssues: getClosedIssues(state),
  openedIssues: getOpenedIssues(state),
  release: getLatestRelease(state),
  details: getDetails(state)
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchBootstrap,
      fetchCommits,
      fetchPulls,
      fetchReleases,
      fetchIssues
    },
    dispatch
  )

const prepareComponentData = async ({
  fetchBootstrap,
  fetchCommits,
  fetchPulls,
  fetchReleases,
  fetchIssues
}) => {
  await fetchBootstrap()
  await fetchReleases()
  fetchCommits()
  fetchPulls()
  fetchIssues()
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(prepare(prepareComponentData)(Pulse))
