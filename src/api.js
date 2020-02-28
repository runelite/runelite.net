import { contains } from 'ramda'

export default base => {
  /**
   * Fetch data, using proper JSON headers and base
   *
   * @param {string} url url
   * @param {object} options fetch options
   * @param {boolean} returnRaw should it return the raw array buffer
   * @return {Promise}
   */
  async function fetchFunc(url, options, returnRaw = false) {
    const correctedOptions = options || {}

    if (options.body) {
      correctedOptions.body = JSON.stringify(options.body)
    }

    const correctedUrl = `${base}${url}`

    let response = await window.fetch(correctedUrl, correctedOptions)

    if (!response.ok) {
      throw new Error(response.statusText)
    }

    const headers = response.headers.get('Content-Type')
    const isJson = headers && contains('json', headers)
    response = returnRaw
      ? await response.arrayBuffer()
      : isJson
      ? await response.json()
      : await response.text()

    if (response.error) {
      throw new Error(response.statusText)
    }

    return response
  }

  return fetchFunc
}
