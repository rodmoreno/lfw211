'use strict'
const { spawnSync } = require('child_process')
const assert = require('assert')
const { status, stdout } = spawnSync(process.argv[0], [__dirname])

assert.notStrictEqual(status, 0, 'must exit with a non-zero code')
assert.match(stdout.toString(), /^(d|w|l|aix|.+bsd|sunos|gnu)/i, 'must output OS identifier')
console.log('passed!')

