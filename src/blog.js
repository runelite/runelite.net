import parseBlog from './parse-blog'

const blog = require
  .context('!null-loader!./_posts', false, /.md$/)
  .keys()
  .sort()
  .reverse()
  .reduce((memo, fileName) => {
    // Parse blog metadata
    const parsed = parseBlog(fileName)

    const resolver = () => {
      const mapper = md => {
        return {
          date: parsed.date,
          body: md.__content,
          ...md
        }
      }

      return import(`!markdown-with-front-matter-loader!./_posts/${
        parsed.file
      }.md`).then(mapper)
    }

    return memo.set(parsed.id, resolver)
  }, new Map())

export const latest = blog.values().next().value
export default blog
