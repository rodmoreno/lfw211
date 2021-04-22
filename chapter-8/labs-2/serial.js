'use strict'
const { promisify } = require('util')

const print = (err, contents) => {
  if (err) console.error(err)
  else console.log(contents)
}

const opA = (cb) => {
  setTimeout(() => {
    cb(null, 'A')
  }, 500)
}

const opB = (cb) => {
  setTimeout(() => {
    cb(null, 'B')
  }, 250)
}

const opC = (cb) => {
  setTimeout(() => {
    cb(null, 'C')
  }, 125)
}

const a = promisify(opA)
const b = promisify(opB)
const c = promisify(opC)

async function run() {
  print(await a())
  print(await b())
  print(await c())
}

run()