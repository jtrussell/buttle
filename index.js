/*jshint es5:true */

module.exports = function(opts) {
  'use strict';

  var connect = require('connect')
    , http = require('http');

  var app = connect()
    .use(require('./lib/mid-logger')())
    .use(require('./lib/mid-butle')(process.cwd()))
    .use(connect.static(process.cwd()))
    .use(function(req, res){
      res.end('A thousand apologies, but there are none to be had.\n');
    });

  console.log('Listening on port ' + opts.port);
  http.createServer(app).listen(opts.port);
};
