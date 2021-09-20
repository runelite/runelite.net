import hero from './_data/hero'

// Return current URL
export const getCurrentUrl = () => {
  if (!window) {
    return hero.url
  }

  return hero.url + window.location.pathname
}

// Return base URL for site
export const getBaseUrl = () => {
  if (!window) {
    return hero.url
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

export const wikiURLForItem = ({ id, name }) => {
  // This should canonicalize the name, but the website doesn't have that information as of writing
  // It only really matters if there are noted items with ambiguous names, so I don't think it matters here
  return `https://oldschool.runescape.wiki/w/Special:Lookup?type=item&id=${id}&name=${encodeURIComponent(
    name
  )}&utm_source=runelite.net`
}

export const formatIcon = icon =>
  `https://static.runelite.net/cache/item/icon/${icon}.png`

export const range = (from, to, step = 1) => {
  let i = from
  const range = []

  while (i <= to) {
    range.push(i)
    i += step
  }

  return range
}

export const upperToTitleCase = string => {
  let sentence = string.toLowerCase().split('_')

  for (let i = 0; i < sentence.length; i++) {
    sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1)
  }

  return sentence.join(' ')
}

export const bytesToHexString = bytes => {
  if (!bytes) return null

  const uint = new Uint8Array(bytes)
  const hexBytes = []
  for (let i = 0; i < uint.length; ++i) {
    let byteString = uint[i].toString(16)

    if (byteString.length < 2) byteString = '0' + byteString

    hexBytes.push(byteString)
  }

  return hexBytes.join('')
}

export const digest = (data, callback) => {
  const isIE11 = !!window.MSInputMethodContext && !!document.documentMode

  if (isIE11) {
    window.msCrypto.subtle.digest(
      {
        name: 'SHA-256'
      },
      data
    ).oncomplete = e => {
      const sha256 = bytesToHexString(e.target.result)
      callback(sha256)
    }
  } else {
    window.crypto.subtle
      .digest(
        {
          name: 'SHA-256'
        },
        data
      )
      .then(hash => {
        const sha256 = bytesToHexString(hash)
        callback(sha256)
      })
  }
}
