'use strict'

const assert = require('assert')
const pkg = require('./package.json')
assert.doesNotThrow(() => {
  require('nonsynchronous')
}, 'nonsynchronous should be installed')
const { devDependencies = {} } = pkg
const devDeps = new Set(Object.keys(devDependencies))
assert(devDeps.has('nonsynchronous'), 'nonsynchronous should be specified as a devDependency')
console.log('passed')

