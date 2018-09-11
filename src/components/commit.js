import { h } from 'preact'
import ago from 's-ago'

const Commit = ({ url, message, author, date }) =>
  url ? (
    <div>
      <b>Latest commit:</b>{' '}
      <a href={url} style={{ color: 'cyan' }}>
        {message}
      </a>{' '}
      by{' '}
      <a href={author.url ? author.url : url} style={{ color: 'cyan' }}>
        {author.avatar ? (
          <span>
            <img src={author.avatar} alt="Avatar" class="rounded icon" />{' '}
          </span>
        ) : (
          <noscript />
        )}
        {author.name}
      </a>{' '}
      <span class="text-muted">{ago(date)}</span>
    </div>
  ) : (
    <noscript />
  )

export default Commit
