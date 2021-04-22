'use strict'
const assert = require('assert')
const add = require('.')

assert(typeof add === 'function', 'function exported')

assert(add(15, 7) + add(11, 9) === 42, 'correct function exported')

console.log('passed!')

