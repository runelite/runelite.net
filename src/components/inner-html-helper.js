import { h } from 'preact'

const InnerHTMLHelper = ({ tagName, html }) =>
  h(tagName, { dangerouslySetInnerHTML: { __html: html } })

export default InnerHTMLHelper
