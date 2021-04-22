'use strict'

const assert = require('assert')
const semver = require('semver')
const pkg = require('./package.json')
assert.doesNotThrow(() => {
  require('fastify')
}, 'fastify should be installed')
assert.doesNotThrow(() => {
  require('rfdc')
}, 'rfdc should be installed')
const { dependencies = {} } = pkg
const deplist = Object.entries(dependencies)
const fastify = deplist.find(([name]) => name === 'fastify').pop()
const rfdc = deplist.find(([name]) => name === 'rfdc').pop()
assert(rfdc === '1.1.3', 'rfdc should be at exactly 1.1.3')
const { range } = new semver.Range(fastify)
assert(range === '>=2.0.0 <3.0.0-0', 'fastify should be greater than or equal to 2.0.0, while accepting all future MINOR and PATCH versions')
console.log('passed')
