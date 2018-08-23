const jstoxml = require('jstoxml')
const fs = require('fs')
const path = require('path')
const MarkdownIt = require('markdown-it')
const frontmatter = require('front-matter')
const hero = require('./src/_data/hero')

const postsFolder = path.join('src', '_posts')
const now = new Date()

// Prepare markdown renderer to be xhtml-compatible
const md = MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  xhtmlOut: true
})

// Escape html
const escapeHtml = (unsafe) => {
  return unsafe.replace(/[&<"']/g, (m) => {
    switch (m) {
      case '&':
        return '&amp;'
      case '<':
        return '&lt;'
      case '"':
        return '&quot;'
      default:
        return '&#039;'
    }
  })
}

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
    const tokenizedFilename = fileName.match(/^(\d{4}-\d{2}-\d{2})-(\d{2}-\d{2})(.*)/)

    // validation
    if (!tokenizedFilename &&
      !tokenizedFilename[1] &&
      !tokenizedFilename[2] &&
      !tokenizedFilename[3]) {
      throw new Error('no ^YYYY-MM-DD-HH-mm date in blog filename')
    }

    // extract date
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

    // extract metadata
    const title = escapeHtml(frontMatterContext.attributes.title)
    const description = escapeHtml(frontMatterContext.attributes.description)
    const author = escapeHtml(frontMatterContext.attributes.author)

    // create required metadata
    const link = `${hero.url}/blog/show/${pathString}`

    // build content from markdown
    const content = md.render(frontMatterContext.body)

    return {
      entry: [
        {
          id: link
        },
        {
          link: {
            _attrs: {
              href: link
            }
          }
        },
        {
          title
        },
        {
          summary: description
        },
        {
          updated: dateObject.toISOString()
        },
        {
          author: {
            name: author
          }
        },
        {
          _name: 'content',
          _attrs: {
            type: 'xhtml'
          },
          _content: [
            {
              div: {
                _attrs: {
                  xmlns: 'http://www.w3.org/1999/xhtml'
                },
                div: content
              }
            }
          ]
        }
      ]
    }
  })
  // Order from newest to oldest
  .reverse()

// Build the Atom XML from JSON
const xml = jstoxml.toXML({
  _name: 'feed',
  _attrs: {
    xmlns: 'http://www.w3.org/2005/Atom'
  },
  _content: [
    {
      title: hero.title
    },
    {
      subtitle: hero.description
    },
    {
      link: {
        _attrs: {
          href: hero.url
        }
      }
    },
    {
      link: {
        _attrs: {
          href: 'https://raw.githubusercontent.com/runelite/runelite.net/gh-pages/atom.xml',
          rel: 'self'
        }
      }
    },
    {
      id: hero.url + '/'
    },
    {
      updated: now.toISOString()
    }
  ].concat(posts)
}, {header: true, indent: '  '})

// Write feed to build folder
fs.writeFileSync(path.join('build', 'atom.xml'), xml)
