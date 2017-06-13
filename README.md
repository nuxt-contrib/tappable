[![CircleCI](https://img.shields.io/circleci/project/github/pi0/tappable.svg?style=flat-square)](https://circleci.com/gh/pi0/tappable)
[![Codecov](https://img.shields.io/codecov/c/github/pi0/tappable.svg?style=flat-square)](https://codecov.io/gh/pi0/tappable)
[![npm](https://img.shields.io/npm/v/tappable.svg?style=flat-square)](https://www.npmjs.com/package/tappable)

# Tappable
> [Tapable](https://www.npmjs.com/package/tapable) with promise support.

## Setup
```bash
yarn add tappable
# or
npm install --save tappable
```
```js
// Require module
const Tapable = require('tappable')
```

## Usage
For basic usage please see [tapable](https://github.com/webpack/tapable) docs.

### `applyPlugins*`
This functions are wrapped with [pify](https://www.npmjs.com/package/pify) 
and return promise too.

```js
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

### `plugin(names, handler)`
When register plugins `handler` function can also return promise instead of calling `callback` argument.

```js
webpack.plugin('init', async () => {
  // You can use async/await here  
})

// or
webpack.plugin('init', () => new Promise((resolve, reject) => {
  // Call resolve() or rejcet() when finished or chain promise
}))
```

# License

MIT
