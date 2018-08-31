const context = require.context(
  '!markdown-with-front-matter-loader!./_posts',
  false,
  /.md$/
)

const blog = context
  .keys()
  .sort()
  .reverse()
  .reduce((memo, fileName) => {
    // Get data
    const md = context(fileName)

    // Remove cd and extension
    fileName = fileName.match(/\.\/([\w\d-.]+)\.md/)[1]

    // Extract date and path
    const tokenizedFilename = fileName.match(
      /^(\d{4}-\d{2}-\d{2})-(\d{2}-\d{2})(.*)/
    )

    // Validation
    if (
      !tokenizedFilename ||
      !tokenizedFilename[1] ||
      !tokenizedFilename[2] ||
      !tokenizedFilename[3]
    ) {
      throw new Error('no ^YYYY-MM-DD-HH-mm date in blog filename')
    }

    const date = tokenizedFilename[1]
    const time = tokenizedFilename[2]
    const name = tokenizedFilename[3]
    const pathString = date + name

    // Frontmatter and content (actual markdown is loaded on '__content', frontmatter is right on root)
    const dateTime = date + '-' + time
    const dateArray = dateTime.split('-')

    // Parse date
    const dateObject = new Date(
      Date.UTC(
        // Year
        parseInt(dateArray[0], 10),
        // Month
        parseInt(dateArray[1], 10) - 1,
        // Day
        parseInt(dateArray[2], 10),
        // Hour
        parseInt(dateArray[3], 10),
        // Minute
        parseInt(dateArray[4], 10)
      )
    )

    const data = {
      date: dateObject,
      ...md
    }

    return memo.set(pathString, data)
  }, new Map())

export const getLatest = () => blog.values().next().value
export default blog
