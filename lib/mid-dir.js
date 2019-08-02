
var serveIndex = require('serve-index')

module.exports = function (dir, isDisabled) {
  'use strict'

  return isDisabled
    ? require('./mid-dummy')()
    : serveIndex(dir)
}
