import React from 'react'
import { Alert } from 'reactstrap'
import TimeAgo from 'react-timeago'

const Commit = ({ url, message, author, date }) => url ? (
  <Alert className='text-center' color='info'>
    <b>Latest commit:</b>{' '}
    <a href={url}>{message}</a> by{' '}
    <a href={author.url}>
      <img src={author.avatar} width='30' height='30' alt='Avatar' className='rounded' />{' '}
      {author.name}
    </a>{' '}
    <span className='text-muted'><TimeAgo date={date} /></span>
  </Alert>
) : (<noscript />)

export default Commit
