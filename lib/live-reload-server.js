
module.exports = function(glob) {
  'use strict';

  if(!glob) {
    return;
  }

  var Gaze = require('gaze')
    , gaze = new Gaze(glob)
    , changedFiles = []
    , debounce = require('lodash.debounce')
    , uniq = require('lodash.uniq')
    , lr = require('tiny-lr')()
    , yw = require('chalk').yellow
    , gy = require('chalk').gray;

  lr.listen(35729, function(err) {
    if(err) { console.log(err); }
  });

  var reload = function(filepath) {
    changedFiles.push(filepath);
    live_reload();
  };

  var live_reload = debounce(function() {
    lr.changed({body: {files: uniq(changedFiles)}});
    changedFiles.length = 0;
  }, 250);

  gaze.on('all', function(evt, filepath) {
    console.log(yw(evt.toUpperCase()) + ' ' + gy(filepath));
    reload(filepath);
    //lr.changed({body: {files: [filepath]}});
  });

  gaze.on('error', function(err) {
    console.log('Boo! buttle hit a snag while watching your files.');
    console.log(err.message);
  });

};
