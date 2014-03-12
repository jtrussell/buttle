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
    .use(require('./lib/mid-logger')())
    .use(require('./lib/mid-index')(webroot, opts.index))
    .use(require('./lib/mid-lr')(opts.watch))
    .use(require('./lib/mid-buttle')(webroot))
    .use(require('./lib/mid-dir')(webroot,opts.nodir))
    .use(connect.static(webroot))
    .use(require('./lib/mid-less')(webroot))
    .use(function(req, res){
      res.end('A thousand apologies, but there are none to be had.\n');
    });

  http.createServer(app).listen(port, function() {
    console.log('Listening on port ' + port);
    if(opts.open) {
      require('open')(
        require('url').resolve('http://localhost:' + port, opts.open)
      );
    }
  });

  require('./lib/live-reload-server')(opts.watch);
};

