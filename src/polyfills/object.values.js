// IE11
// SCRIPT438: Object doesn't support property or method 'values'
// Use Object.values polyfill as it is still experimental and not supported on IE 11

if (!Object.values) {
  Object.values = (obj) => Object.keys(obj).map(key => obj[key])
}
