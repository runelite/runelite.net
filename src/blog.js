const webpackRequireContext = require.context('!markdown-with-front-matter-loader!./_posts', false, /.md$/)

const blog = webpackRequireContext.keys().sort().reverse().reduce((memo, fileName) => {
  // frontmatter and content (actual markdown is loaded on '__content', frontmatter is right on root)
  const frontMatterMarkdown = webpackRequireContext(fileName)
  // remove cd and extension
  fileName = fileName.match(/\.\/([\w\d-.]+)\.md/)[1]
  // extract year and path
  let tokenizedFilename = fileName.match(/^(\d{4}-\d{2}-\d{2})(.*)/)
  // validation
  if (!tokenizedFilename && !tokenizedFilename[1]) throw new Error('no ^YYYY-MM-DD date in blog filename')

  let date = tokenizedFilename[1]
  let name = tokenizedFilename[2]
  let path = date + name

  return memo.set(path, Object.assign({date: date}, frontMatterMarkdown))
}, new Map())

export const getLatest = () => blog.values().next().value
export default blog
