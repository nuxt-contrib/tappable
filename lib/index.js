const Tapable = require('tapable')
const pify = require('pify')

/***
 * Extended Tapable with promise support
 */
class TapablePromise extends Tapable {
  plugin (names, handler) {
    return Tapable.prototype.plugin.call(this, names, function () {
      const result = handler.apply(this, arguments)

      // Check if callback provided
      const callback = arguments.length ? arguments[arguments.length - 1] : null
      if (typeof callback !== 'function') {
        return
      }

      // Check if result is not promise
      if (!result || typeof result.then !== 'function') {
        // If handler has no arguments call callabck() to prevent pending promises
        if (handler.length === 0) {
          callback()
        }
        return
      }

      return result.then(() => {
        callback()
      }).catch(err => {
        callback(err)
      })
    })
  }
}

[
  'applyPluginsAsync',
  'applyPluginsAsyncWaterfall',
  'applyPluginsAsyncSeries',
  'applyPluginsParallel',
  'applyPluginsParallelBailResult'
].forEach(key => {
  TapablePromise.prototype[key] = pify(TapablePromise.prototype[key])
})

module.exports = TapablePromise
