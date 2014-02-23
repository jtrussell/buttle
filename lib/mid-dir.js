
module.exports = function(dir, isDisabled) {
  'use strict';

  return isDisabled ?
    require('./mid-dummy')() :
    require('connect').directory(dir);
};
