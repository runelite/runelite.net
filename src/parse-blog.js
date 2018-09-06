module.exports = (file) => {
  // Remove cd and extension
  file = file.match(/([\w\d-.]+)\.md/)[1]

  // Extract year and path
  const tokenizedFilename = file.match(
    /^(\d{4}-\d{2}-\d{2})-(\d{2}-\d{2})(.*)/
  )

  // Validation
  if (
    !tokenizedFilename &&
    !tokenizedFilename[1] &&
    !tokenizedFilename[2] &&
    !tokenizedFilename[3]
  ) {
    throw new Error('no ^YYYY-MM-DD-HH-mm date in blog filename')
  }

  // Extract date
  const dateString = tokenizedFilename[1]
  const timeString = tokenizedFilename[2]
  const title = tokenizedFilename[3]
  const id = dateString + title
  const dateTime = dateString + '-' + timeString
  const dateArray = dateTime.split('-')

  // Parse date
  const date = new Date(
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

  return {
    date,
    id,
    file
  }
}
