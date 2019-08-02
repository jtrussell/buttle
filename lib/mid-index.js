
module.exports = function (dir, indexes) {
  'use strict'

  var fs = require('fs')

  var j = require('path').join

  var numIndexes = indexes.length

  if (!numIndexes) {
    return require('./mid-dummy')()
  }

  return function (req, res, next) {
    var url = req.url

    // If the requested path exists, is a directory, and has an "index" file,
    // *redirect* to that file (lets buttle do it's thing)
    fs.readdir(j(dir, url), function (err, files) {
      if (err) {
        return err.code === 'ENOENT' || err.code === 'ENOTDIR'
          ? next() : next(err)
      }
      for (var i = 0; i < numIndexes; i++) {
        if (files.indexOf(indexes[i]) > -1) {
          /**
           * @todo fix this super hack!
           */
          req.url = j(url, indexes[i])
          return next()
        }
      }
      next()
    })
  }
}
