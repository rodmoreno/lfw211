'use strict'
module.exports = (value, cb) => {
  if (Buffer.isBuffer(value) === false) {
    cb(Error('input must be a buffer'))
    return
  }
  setTimeout(() => {
    const id = Math.random().toString(36).split('.')[1].slice(0, 4)
    cb(null, { id })
  }, 300)
}
