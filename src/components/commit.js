import { h, Fragment } from 'preact'
import ago from 's-ago'

const Commit = ({ url, title, author, date }) =>
  url && (
    <Fragment>
      <h6>Latest commit:</h6>
      <a href={url}>{title}</a>{' '}
      <span class="text-muted">
        by <a href={author.url ? author.url : url}>{author.name},</a>{' '}
        {ago(date)}
      </span>
    </Fragment>
  )

export default Commit
