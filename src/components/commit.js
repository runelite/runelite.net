import { h } from 'preact'
import ago from 's-ago'

const Commit = ({ url, message, author, date }) =>
  url ? (
    <div>
      <div style="color: #e6a32e; line-height: 10px;">Latest commit:</div>{' '}
      <a href={url} style={{ color: 'white' }}>
        {message}
      </a>{' '}
      <span style="color: gray">
        | by{' '}
        <a href={author.url ? author.url : url} style={{ color: 'gray' }}>
          {author.name}
        </a>{' '}
      </span>
      <span class="text-muted">| {ago(date)}</span>
    </div>
  ) : (
    <noscript />
  )

export default Commit
