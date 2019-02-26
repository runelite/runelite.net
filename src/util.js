// Return base URL for site
export const getBaseUrl = () => {
  if (!window) {
    return 'https://runelite.net'
  }

  const getUrl = window.location
  return getUrl.protocol + '//' + getUrl.host
}

// Format number with commas
export const numberWithCommas = x =>
  x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')

// Flatten map to list of objects
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

// Convert number to MM:SS representation
export const toMMSS = s => {
  const minutes = Math.floor(s / 60)
  const seconds = s % 60
  const minutesStr = String(minutes).padStart(2, '0')
  const secondsStr = String(seconds).padStart(2, '0')
  return minutesStr + ':' + secondsStr
}
