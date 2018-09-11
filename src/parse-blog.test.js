import parseBlog from './parse-blog'

it('parses blog post file name properly', () => {
  expect(
    parseBlog(
      './src/_posts/2018-05-15-23-10-RuneLite-threatened-to-shutdown.md'
    )
  ).toEqual({
    id: '2018-05-15-RuneLite-threatened-to-shutdown',
    file: '2018-05-15-23-10-RuneLite-threatened-to-shutdown',
    date: new Date(Date.UTC(2018, 4, 15, 23, 10))
  })
})
