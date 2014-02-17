
module.exports = function(dir) {
  'use strict';

  var fs = require('fs')
    , j = require('path').join;

  var wrapInHtml = function(snip) {
    return [
      '<!DOCTYPE HTML>',
      '<html>',
      '<head></head>',
      '<body>',
      snip,
      '</body>',
      '</html>'
    ].join('\n');
  };

  var anchorFiles = function(fileNames, url){
    var result = [];
    for (var i = 0; i < fileNames.length; i++){
      result.push('<a href='+url+fileNames[i]+'>'+fileNames[i]+'</a>');
    }
    return result;
  };

  return function(req, res, next) {
    var url = req.url;
    if(/\/$/.test(url)) {
      fs.exists(j(dir, url), function(exists) {
        if(exists) {
          fs.readdir(j(dir, url), function(err, fileNames) {
            if(err) { return res.end(err.message); }
            res.end(wrapInHtml(anchorFiles(fileNames,url).join('<br>')));
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
