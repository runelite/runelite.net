// Return base URL for site
export const getBaseUrl = () => {
  if (!window) {
    return 'https://runelite.net'
  }

  const getUrl = window.location
  return getUrl.protocol + '//' + getUrl.host
}
