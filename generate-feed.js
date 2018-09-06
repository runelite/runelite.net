const fs = require('fs')
const path = require('path')
const jstoxml = require('jstoxml')
const markdownIt = require('markdown-it')
const fm = require('front-matter')
const hero = require('./src/_data/hero')
const parseBlog = require('./src/parse-blog')

const postsFolder = path.join('src', '_posts')
const now = new Date()

// Prepare markdown renderer to be xhtml-compatible
const md = markdownIt({
  html: true,
  linkify: true,
  typographer: true,
  xhtmlOut: true
})

// Escape html
const escapeHtml = unsafe => {
  return unsafe.replace(/[&<"']/g, m => {
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
const posts = fs
  .readdirSync(postsFolder)
  .map(fileName => {
    // Setup path to file
    const filePath = path.join(postsFolder, fileName)

    // Read the content of the file
    const fileContent = fs.readFileSync(filePath, 'utf-8')

    // Extract front-matter context
    const frontMatterContext = fm(fileContent)

    // Parse blog metadata
    const parsed = parseBlog(fileName)
    const date = parsed.date

    // Extract front-matter metadata
    const title = escapeHtml(frontMatterContext.attributes.title)
    const description = escapeHtml(frontMatterContext.attributes.description)
    const author = escapeHtml(frontMatterContext.attributes.author)
    const body = frontMatterContext.body

    // Create required metadata
    const link = `${hero.url}/blog/show/${parsed.id}`

    // Build content from markdown
    const content = md.render(body)

    return {
      entry: [
        {
          id: parsed.id
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
          updated: date.toISOString()
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
const xml = jstoxml.toXML(
  {
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
            href:
              'https://raw.githubusercontent.com/runelite/runelite.net/gh-pages/atom.xml',
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
  },
  { header: true, indent: '  ' }
)

// Write feed to build folder
fs.writeFileSync(path.join('build', 'atom.xml'), xml)
