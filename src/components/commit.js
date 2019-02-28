import { h } from 'preact'
import ago from 's-ago'

const Commit = ({ url, message, author, date }) =>
  url ? (
    <div>
      <h6>Latest commit:</h6>
      <a href={url}>{message}</a>{' '}
      <span class="text-muted">
        by <a href={author.url ? author.url : url}>{author.name},</a>{' '}
        {ago(date)}
      </span>
    </div>
  ) : (
    <noscript />
  )

export default Commit
