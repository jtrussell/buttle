
module.exports = function(glob) {
  'use strict';

  // If there are no files to watch we weon't bother with the life reload stuff
  if(!glob) {
    return function(req, res, next) {
      next();
    };
  }

  var connectlr = require('connect-livereload')({
    port: 35729
  });

  return function(req, res, next) {
    // A little trickly - we're sticking this *before* the static middleware so
    // only use the actual connect-livereload if this is an html-like (md, ...)
    // request
    var url = req.url;
    if(/\.html$/i.test(url) || /\.md/i.test(url) || /\.markdown/i.test(url)) {
      connectlr(req, res, next);
    } else {
      next();
    }
  };
};
