
module.exports = function() {
  'use strict';
  var gn = require('chalk').green
    , gy = require('chalk').gray;
  return function(req, res, next) {
    if(!/^\/favicon\.ico$/.test(req.url)) {
      console.log(gn(req.method) + ' ' + gy(req.url));
    }
    next();
  };
};
