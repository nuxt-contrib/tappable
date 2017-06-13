# tapable-promise
> Extends [tapable](https://www.npmjs.com/package/tapable) with promise support.

[![CircleCI](https://img.shields.io/circleci/project/github/pi0/tapable-promise.svg?style=flat-square)](https://circleci.com/gh/pi0/tapable-promise)
[![npm](https://img.shields.io/npm/v/codemeli.svg?style=flat-square)](https://www.npmjs.com/package/codemeli)

## Setup
Get package
```bash
yarn add tapable-promise # or npm install -s tapable-promise
```

Require it
```js
const Tapable = require('tapable-promise')
```

## Usage
For basic usage please see [tapable](https://github.com/webpack/tapable) docs.

# `applyPlugins*`
This functions are wrapped with [pify](https://www.npmjs.com/package/pify) 
and return promise too.

```js
const tapable = require('Tapa')

// Using async/await
await this.applyPluginsAsync('init')

// Using Promise
this.applyPluginsAsync('init')
.then(() => {
  // Applied
})
.catch(err => {
  // Some error happened
})
```

# `apply(names, callback)`
Adds returning promise support to `callback` function so that plugins can apply async functions.

```js
webpack.plugin('init', async () => {
  // You can use async/await here  
})

// or
webpack.plugin('init', () => new Promise((resolve, reject) => {
  // ...
}))
```

# License

MIT
