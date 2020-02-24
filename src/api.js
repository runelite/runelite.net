import { contains } from 'ramda'

export default base => {
  /**
   * Fetch data, using proper JSON headers and base
   *
   * @param {string} url url
   * @param {object} options fetch options
   * @param {boolean} returnRaw should it return the raw response object
   * @return {Promise}
   */
  async function fetchFunc(url, options, returnRaw) {
    const correctedOptions = options || {}

    if (options.body) {
      correctedOptions.body = JSON.stringify(options.body)
    }

    const correctedUrl = `${base}${url}`

    let response = await window.fetch(correctedUrl, correctedOptions)

    if (!response.ok) {
      throw new Error(response.statusText)
    }

    if (returnRaw) {
      return response
    }

    const headers = response.headers.get('Content-Type')
    const isJson = headers && contains('json', headers)
    response = isJson ? await response.json() : await response.text()

    if (response.error) {
      throw new Error(response.statusText)
    }

    return response
  }

  return fetchFunc
}
