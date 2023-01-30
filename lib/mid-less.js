// Should be used *after* connect.static

module.exports = function (docroot) {
  'use strict'

  const fs = require('fs')
  const join = require('path').join
  const norm = require('path').normalize
  const less = require('less')

  return function (req, res, next) {
    if (/\.css$/i.test(req.url)) {
      const lessFile = norm(join(docroot, req.url.replace(/css$/i, 'less')))
      fs.access(lessFile, function (err) {
        if (!err) {
          fs.readFile(lessFile, { encoding: 'utf8' }, function (err, data) {
            if (err) {
              return next(err)
            }
            return less.render(data).then((output) => {
              res.setHeader('Content-Type', 'text/css')
              res.end(output.css)
            })
          })
        } else {
          next()
        }
      })
    } else {
      next()
    }
  }
}
