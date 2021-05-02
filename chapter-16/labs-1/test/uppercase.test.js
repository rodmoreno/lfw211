'use strict'

const uppercase = require('../uppercase')

test('throw when input is string', async () => {
  expect(() => uppercase(1)).toThrowError(
    Error('input must be a string')
  )

  expect(() => uppercase(true)).toThrowError(
    Error('input must be a string')
  )

  expect(() => uppercase({})).toThrowError(
    Error('input must be a string')
  )

  expect(() => uppercase([])).toThrowError(
    Error('input must be a string')
  )

  expect(() => uppercase(null)).toThrowError(
    Error('input must be a string')
  )
})

test('uppercase a string', async () => {
  expect(uppercase('rodrigo')).toStrictEqual('RODRIGO')
})
