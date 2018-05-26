const webpackRequireContext = require.context('!markdown-with-front-matter-loader!./_posts', false, /.md$/)

const blog = webpackRequireContext.keys().sort().reverse().reduce((memo, fileName) => {
  // frontmatter and content (actual markdown is loaded on '__content', frontmatter is right on root)
  const frontMatterMarkdown = webpackRequireContext(fileName)

  // remove cd and extension
  fileName = fileName.match(/\.\/([\w\d-.]+)\.md/)[1]

  // extract date and path
  const tokenizedFilename = fileName.match(/^(\d{4}-\d{2}-\d{2})-(\d{2}-\d{2})(.*)/)

  // validation
  if (!tokenizedFilename ||
    !tokenizedFilename[1] ||
    !tokenizedFilename[2] ||
    !tokenizedFilename[3]) {
    throw new Error('no ^YYYY-MM-DD-HH-mm date in blog filename')
  }

  const date = tokenizedFilename[1]
  const time = tokenizedFilename[2]
  const name = tokenizedFilename[3]
  const pathString = date + name
  const dateTime = date + '-' + time
  const dateArray = dateTime.split('-')

  // parse date
  const dateObject = new Date(Date.UTC(
    // Year
    parseInt(dateArray[0]),
    // Month
    parseInt(dateArray[1]) - 1,
    // Day
    parseInt(dateArray[2]),
    // Hour
    parseInt(dateArray[3]),
    // Minute
    parseInt(dateArray[4])))

  return memo.set(pathString, Object.assign({date: dateObject}, frontMatterMarkdown))
}, new Map())

export const getLatest = () => blog.values().next().value
export default blog
