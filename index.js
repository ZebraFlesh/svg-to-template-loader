var loaderUtils = require('loader-utils');

module.exports = function (source) {
  this.cacheable && this.cacheable();
  var callback = this.async();

  console.log('helllllloooo');
  if (callback) {
    return callback(null, source);
  } else {
    return source;
  }
};
