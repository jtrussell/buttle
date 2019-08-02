
// Should be used *after* connect.static

module.exports = function (docroot) {
  'use strict'

  var fs = require('fs')

  var join = require('path').join

  var norm = require('path').normalize

  return function (req, res, next) {
    if (/\.css$/i.test(req.url)) {
      var lessFile = norm(join(docroot, req.url.replace(/css$/i, 'less')))
      fs.exists(lessFile, function (exists) {
        if (exists) {
          var parser = new (require('less').Parser)({
            paths: [require('path').dirname(lessFile)],
            filename: lessFile
          })
          fs.readFile(lessFile, { encoding: 'utf8' }, function (err, data) {
            if (err) { return next(err) }
            parser.parse(data, function (err, tree) {
              if (err) { return next(err) }
              res.setHeader('Content-Type', 'text/css')
              res.end(tree.toCSS())
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
