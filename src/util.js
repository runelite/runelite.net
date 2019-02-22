// Return base URL for site
export const getBaseUrl = () => {
  if (!window) {
    return 'https://runelite.net'
  }

  const getUrl = window.location
  return getUrl.protocol + '//' + getUrl.host
}

export function insertScript(src, id, parentElement) {
  if (!window) {
    return
  }

  const script = window.document.createElement('script')
  script.async = true
  script.src = src
  script.id = id
  parentElement.appendChild(script)

  return script
}

export function removeScript(id, parentElement) {
  if (!window) {
    return
  }

  const script = window.document.getElementById(id)
  if (script) parentElement.removeChild(script)
}
