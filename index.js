/*jshint es5:true */

module.exports = function(opts) {
  'use strict';

  var port = opts.port
    , webroot = process.cwd();

  var connect = require('connect')
    , serveStatic = require('serve-static')
    , http = require('http');

  var indexes = [
    /index\.html/i,
    /readme\.md/i,
    /index\.md/i,
    /readme\.markdown/i,
    /index\.markdown/i
  ];

  var app = connect()
    .use(require('./lib/mid-logger')())
    .use(require('./lib/mid-index')(webroot, opts.index))
    .use(require('./lib/mid-lr')(opts.watch))
    .use(require('./lib/mid-buttle')(webroot))
    .use(require('./lib/mid-dir')(webroot,opts.nodir))
    .use(require('./lib/mid-php')(webroot,opts.phpBin))
    .use(serveStatic(webroot))
    .use(require('./lib/mid-less')(webroot))
    .use(function(req, res){
      res.writeHead(404);
      res.end('Where you goin? NOWHERE!');
    });

  var server = http.createServer(app)
    , maxAttempts = opts.maxAttempts
    , portAttempts = 0;

  server.listen(port, function() {
    console.log('Listening on port ' + port);

    if(opts.open) {
      require('open')(
        require('url').resolve('http://localhost:' + port, opts.open)
      );
    }

    require('./lib/live-reload-server')(opts.watch);
  })
  .on('error', function (err) {
    console.log('Access to port '+ port + ' has been denied with error code: ' + err.code);
    portAttempts++;
    if (((err.code === 'EACCES') || (err.code === 'EADDRINUSE')) && (portAttempts <= maxAttempts)) {
      // Port attempted is busy or blocked
      port++;
      console.log('Attempting port ' + port + '. Attempt ' + (portAttempts+1) + ' out of ' + maxAttempts + '.');
      server.listen(port);
    } else if (portAttempts > maxAttempts) {
      // Maximum nuber of attempts reached
      console.log('Reached the maximum number of connection attempts.');
    }
  });

};
