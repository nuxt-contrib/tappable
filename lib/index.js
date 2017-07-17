var Tapable = require('tapable')
var pify = require('pify')

// Base Constructor
function TapablePromise () {
  Tapable.call(this);
}

// Extend class
TapablePromise.prototype = Object.create(Tapable.prototype);

// Mixin
function copyProperties (from, to) {
  for (var key in from)
    to[key] = from[key];
  return to;
}

TapablePromise.mixin = function mixinTapablePromise (pt) {
  copyProperties(TapablePromise.prototype, pt);
};

// Unpromisify handler for Tapable
TapablePromise.prototype.plugin = function plugin (names, handler) {
  return Tapable.prototype.plugin.call(this, names, function () {
    var result = handler.apply(this, arguments)

    // Check if callback provided
    var callback = arguments.length ? arguments[arguments.length - 1] : null
    if (typeof callback !== 'function') {
      return result
    }

    // Check if result is not promise
    if (!result || typeof result.then !== 'function') {
      // If handler has no arguments call callabck() to prevent pending promises
      if (handler.length === 0 || getFnParamNames(handler).indexOf('callback') === -1) {
        callback()
      }
      return result
    }

    return result.then(function () {
      callback()
    }).catch(function (err) {
      callback(err)
    })
  })
}

function getFnParamNames(fn){
  const match = fn.toString().match(/\(.*?\)/) 
  return match ? match[0].replace(/[()]/gi,'').replace(/\s/gi,'').split(',') : [];
}

var asyncMethods = [
  'applyPluginsAsync',
  'applyPluginsAsyncWaterfall',
  'applyPluginsAsyncSeries',
  'applyPluginsParallel',
  'applyPluginsParallelBailResult'
]

asyncMethods.forEach(function (key) {
  TapablePromise.prototype[key] = pify(TapablePromise.prototype[key])
})


module.exports = TapablePromise
