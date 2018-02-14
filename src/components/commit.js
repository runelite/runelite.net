import React from 'react'
import TimeAgo from 'react-timeago'

const linkColor = 'cyan'

const Commit = ({ url, message, author, date }) => url ? (
  <div>
    <b>Latest commit:</b>{' '}
    <a href={url} style={{ color: linkColor }}>{message}</a> by{' '}
    <a href={author.url ? author.url : url} style={{ color: linkColor }}>
      {author.avatar
        ? (<span><img src={author.avatar} width='30' height='30' alt='Avatar' className='rounded' />{' '}</span>)
        : (<noscript />)}
      {author.name}
    </a>{' '}
    <span className='text-muted'><TimeAgo date={date} /></span>
  </div>
) : (<noscript />)

export default Commit
