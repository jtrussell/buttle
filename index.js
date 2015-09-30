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
    .use(require('./lib/mid-php')(webroot,opts.phpBin))
    .use(connect.static(webroot))
    .use(require('./lib/mid-less')(webroot))
    .use(function(req, res){
      res.writeHead(404);
      res.end('Where you goin? NOWHERE!');
    });

  var server = http.createServer(app)
    , maxAttempts = opts.maxAttempts || 5
    , portAttempts = 0;

  server.listen(port, function() {
    openDoc(port, opts);
  })
  .on('error', function (err) {
    portAttempts++;
    console.log('Access to port '+ port + ' has been denied with error code: ' + err.code);

    if ((err.code === 'EACCES') || (err.code === 'EADDRINUSE') && (portAttempts < maxAttempts)) {
      port++;
      
      console.log('Attempting port ' + port + '. Attempt ' + portAttempts + ' out of ' + maxAttempts)
      
      setTimeout(function () {
          server.listen(port, function() {
            openDoc(port, opts);
          });
        }, 250);
    }
    else if (portAttempts == maxAttempts) {
      console.log('Attempted to open ' + maxAttempts + ' ports but access was denied to all');
    }
  });

  require('./lib/live-reload-server')(opts.watch);
};

/**
 * If an opening document has been specified, open it
 *
 * <description>
 *
 * @param {<type>} <name> <description>
 * @return {<type>}
 */
var openDoc = function(port, opts) {
  console.log('Listening on port ' + port);
    if(opts.open) {
      require('open')(
        require('url').resolve('http://localhost:' + port, opts.open)
      );
    }
}

