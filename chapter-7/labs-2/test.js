'use strict'
const labs1Path = require.resolve('../labs-1')
const assert = require('assert')
let logged = false
const { log } = console
console.log = (out) => {
  logged = true
  assert(+out === 42, 'correct value logged')
}

require('.')
assert(labs1Path in require.cache, 'module from labs-1 was correctly loaded')
assert(logged, 'value was sent to console.log')
log('passed!')

