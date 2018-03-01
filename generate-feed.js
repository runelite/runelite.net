import * as jstoxml from 'jstoxml'
import fs from 'fs'
import path from 'path'
import MarkdownIt from 'markdown-it'
import frontmatter from 'front-matter'
import hero from './src/_data/hero'

const postsFolder = path.join('src', '_posts')

const now = new Date().toISOString()

const md = MarkdownIt({
  html: true,
  linkify: true,
  typographer: true
})

// Read each file in posts folder and convert it to json-formatted meta tags
const posts = fs.readdirSync(postsFolder)
  .map(fileName => {
    // setup path to file
    const filePath = path.join(postsFolder, fileName)

    // read the content of the file
    const fileContent = fs.readFileSync(filePath, 'utf-8')

    // extract front-matter context
    const frontMatterContext = frontmatter(fileContent)

    // remove cd and extension
    fileName = fileName.match(/([\w\d-.]+)\.md/)[1]

    // extract year and path
    const tokenizedFilename = fileName.match(/^(\d{4}-\d{2}-\d{2})(.*)/)

    // validation
    if (!tokenizedFilename && !tokenizedFilename[1]) throw new Error('no ^YYYY-MM-DD date in blog filename')

    // extract date, title and description
    const dateString = tokenizedFilename[1]
    const pathString = tokenizedFilename[2]
    const title = frontMatterContext.attributes.title
    const description = frontMatterContext.attributes.description

    // create required metadata
    const date = new Date(dateString)
    const link = `${hero.url}/blog/show/${dateString + pathString}`

    // build content from markdown
    const content = md.render(frontMatterContext.body)

    return {
      item: {
        title,
        link,
        content,
        description,
        pubDate: date.toISOString(),
        timestamp: date.getTime()
      }
    }
  })

const xml = jstoxml.toXML({
  _name: 'rss',
  _attrs: {
    version: '2.0'
  },
  _content: {
    channel: [
      {
        title: hero.title
      },
      {
        description: hero.description
      },
      {
        link: hero.url
      },
      {
        lastBuildDate: now
      },
      {
        pubDate: now
      },
      {language: 'en'}
    ].concat(posts)
  }
}, {header: true, indent: '  '})

fs.writeFileSync(path.join('build', 'rss.xml'), xml)
