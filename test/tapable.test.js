const _Tapable = require('tapable')
const Tapable = require('../lib')

class A extends Tapable {
  constructor () {
    super()
  }

  asyncTest () {
    return this.applyPluginsAsync('banana', 'testArgument')
  }
}


test('tapable class', () => {
  let a = new A()
  expect(a).toBeInstanceOf(Tapable)
  // It should extend original Tapable
  expect(a).toBeInstanceOf(_Tapable)
})

test('applyPlugins* returns promise', () => {
  let a = new A()
  let result = a.asyncTest()
  expect(result).toBeInstanceOf(Promise)
  expect(result).resolves.toBeUndefined()
})

test('plugin waits for promise', async () => {
  let a = new A()
  let resolved = false
  a.plugin('banana', (testArgument) => new Promise((resolve, reject) => {
    expect(testArgument).toBe('testArgument')
    setTimeout(() => {
      resolved = true
      resolve()
    }, 1000)
  }))
  await a.asyncTest()
  expect(resolved).toBe(true)
})

test('plugin rejects promise', async () => {
  let a = new A()
  a.plugin('banana', async () => {
    throw 'I love kiwi'
  })
  expect(a.asyncTest()).rejects.toMatch('kiwi')
})

test('callback plugins', async () => {
  let a = new A()
  let resolved = false
  a.plugin('banana', (testArgument, callback) => {
    expect(testArgument).toBe('testArgument')
    setTimeout(() => {
      resolved = true
      callback()
    }, 1000)
  })
  await a.asyncTest()
  expect(resolved).toBe(true)
})

test('plugin without callback', async () => {
  let a = new A()
  let resolved = false
  a.plugin('banana', () => {
    resolved = true
  })
  await a.asyncTest()
  expect(resolved).toBe(true)
})
