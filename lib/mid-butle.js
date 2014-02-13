
module.exports = function(dir) {
  'use strict';

  var fs = require('fs')
    , j = require('path').join;

  var md = require('marked');
  md.setOptions({
    gfm: true
  });

  return function(req, res, next) {
    var url = req.url;
    if(/\.md$/i.test(url) || /\.markdown/i.test(url)) {
      fs.exists(j(dir, url), function(exists) {
        if(exists) {
          fs.readFile(j(dir, url), {encoding: 'utf8'}, function(err, data) {
            if(err) { return res.end(err.message); }
            res.end(md(data));
          });
        } else {
          next();
        }
      });
    } else {
      next();
    }
  };
};
