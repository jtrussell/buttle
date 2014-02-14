/*jshint es5:true */

module.exports = function(opts) {
  'use strict';

  var port = opts.port || 8080
    , webroot = process.cwd();

  var connect = require('connect')
    , http = require('http');

  var indexes = [
    /index\.html/i,
    /readme\.md/i,
    /readme\.markdown/i
  ];

  var app = connect()
    .use(require('./lib/mid-normalize')(indexes))
    .use(require('./lib/mid-logger')())
    .use(require('./lib/mid-lr')(opts.watch))
    .use(require('./lib/mid-buttle')(webroot))
    .use(connect.static(webroot))
    .use(function(req, res){
      res.end('A thousand apologies, but there are none to be had.\n');
    });

  console.log('Listening on port ' + port);
  http.createServer(app).listen(port);

  require('./lib/live-reload-server')(opts.watch);
};

