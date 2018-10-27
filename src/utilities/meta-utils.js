export const setMetaDetails = ({ title, description, author }) => {
  document.querySelector('title').text = title || ''
  document
    .querySelector('meta[name=description]')
    .setAttribute('content', description || '')
  document
    .querySelector('meta[name=author]')
    .setAttribute('content', author || '')
  return true
}
