
module.exports = function(glob) {
  'use strict';

  if(!glob) {
    return;
  }

  var Gaze = require('gaze')
    , gaze = new Gaze(glob)
    , lr = require('tiny-lr')()
    , yw = require('chalk').yellow
    , gy = require('chalk').gray;

  lr.listen(35729, function(err) {
    if(err) { console.log(err); }
  });

  gaze.on('all', function(evt, filepath) {
    console.log(yw('CHANGED ') + gy(filepath));
    lr.changed({body: {files: [filepath]}});
  });

};
