// Return base URL for site
export const getBaseUrl = () => {
  if (!window) {
    return 'https://runelite.net'
  }

  const getUrl = window.location
  return getUrl.protocol + '//' + getUrl.host
}

export const numberWithCommas = x =>
  x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')

export const flattenMap = map => {
  if (map instanceof Map) {
    return [...map.keys()].map(key => ({
      name: key,
      ...map.get(key)
    }))
  }

  return Object.keys(map).map(key => ({
    name: key,
    ...map[key]
  }))
}
