import R from 'ramda'
import Cookie from 'js-cookie'
import {stringify} from 'qs'

const createToken = (response) => ({
  user: response.user,
  expiresIn: new Date().getTime() + response.expires_in * 1000,
  accessToken: response.access_token,
  refreshToken: response.refresh_token
})

const setToken = (token) => {
  Cookie.set('token', token)
}

const getToken = () => {
  return Cookie.getJSON('token')
}

const getAccessToken = () => {
  const token = getToken()
  return token ? token.accessToken : undefined
}

const getRefreshToken = () => {
  const token = getToken()
  return token ? token.refreshToken : undefined
}

const injectBaseHeaders = (options) => {
  const result = options || {}

  if (options.body) {
    result.body = JSON.stringify(options.body)
  }

  result.headers = {
    ...(options.headers || {}),
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json'
  }

  return result
}

const injectTokenToUrl = (url, accessToken) => {
  if (!accessToken) {
    return url
  }

  const data = {
    access_token: accessToken
  }

  return `${url}/?${stringify(data)}`
}

/**
 * Logouts user
 */
function logout () {
  if (getToken()) {
    Cookie.remove('token')
    return true
  }

  return false
}

/**
 * Wrap promise, in case of failure run error action
 *
 * @param {object} dispatch redux dispatcher
 * @param {Promise} promise js promise
 * @return {Promise}
 */
async function wrapFailure (dispatch, promise, errorAction) {
  try {
    const result = await promise
    return result
  } catch (error) {
    if (errorAction) dispatch(errorAction(error))
    throw error
  }
}

export default (base) => {
  /**
   * Logins user
   *
   * @param {object} object containing username and password
   * @return {Promise}
   */
  async function login ({username, password}) {
    logout()

    const query = {
      username,
      password,
      grant_type: 'password',
      scope: 'read'
    }

    const response = await fetch(`oauth/token?${stringify(query)}`, {
      method: 'POST',
      headers: {
        authorization: 'Basic c2NhZmZvbGQtY2xpZW50OnNlY3JldA=='
      }
    })

    const newToken = createToken({
      ...response,
      user: username
    })
    setToken(newToken)
    return newToken
  }

  /**
   * Re-logs using refresh token
   *
   * @return {Promise}
   */
  async function refresh () {
    const token = getToken()

    if (!token) {
      throw new Error('No token found')
    }

    logout()

    const query = {
      grant_type: 'refresh_token',
      refresh_token: token.refreshToken
    }

    const response = await fetch(`oauth/token?${stringify(query)}`, {
      crossDomain: true,
      method: 'POST',
      headers: {
        authorization: 'Basic c2NhZmZvbGQtY2xpZW50OnNlY3JldA=='
      }
    })

    const newToken = createToken({
      ...response,
      user: token.user
    })
    setToken(newToken)
    return token
  }

  /**
   * Fetch data, injecting oauth authorization in process
   *
   * @param {string} url url
   * @param {object} options fetch options
   * @return {Promise}
   */
  async function fetch (url, options) {
    const correctedOptions = injectBaseHeaders(options)
    const correctedUrl = `${base}${url}`
    const buildRequest = () => {
      const accessToken = getAccessToken()
      return window.fetch(injectTokenToUrl(correctedUrl, accessToken), correctedOptions)
    }

    let response = await buildRequest()

    if (!response.ok) {
      if (response.status === 401 && !!getRefreshToken()) {
        const refreshResponse = await refresh()
        console.log(refreshResponse)
        response = await buildRequest()
      } else {
        throw new Error(response.statusText)
      }
    }

    const headers = response.headers.get('Content-Type')
    const isJson = headers && R.contains('json', headers)
    response = isJson ? await response.json() : await response.text()

    if (response.error) {
      throw new Error(response.error)
    }

    return response
  }

  return { login, logout, refresh, fetch, wrapFailure }
}
