'use strict'
const assert = require('assert')
const { EventEmitter } = require('events')

const ee = new EventEmitter()
ee.once('tick', listener)

let count = 0
setInterval(() => {
  ee.emit('tick')
}, 100)

function listener () {
  count++
  setTimeout(() => {
    assert.equal(count, 1)
    assert.equal(this, ee)
    console.log('passed!')
  }, 250)
}

