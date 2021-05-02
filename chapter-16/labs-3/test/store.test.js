'use strict'

global.setTimeout = require('timers').setTimeout

const store = require('../store')
test('throw when inputs is not buffer', async () => {
    await expect(store(1))
        .rejects
        .toStrictEqual(Error('input must be a buffer'))

    await expect(store(true))
        .rejects
        .toStrictEqual(Error('input must be a buffer'))

    await expect(store('something'))
        .rejects
        .toStrictEqual(Error('input must be a buffer'))

    await expect(store({}))
        .rejects
        .toStrictEqual(Error('input must be a buffer'))

    await expect(store([]))
        .rejects
        .toStrictEqual(Error('input must be a buffer'))

    await expect(store(null))
        .rejects
        .toStrictEqual(Error('input must be a buffer'))
})

test('store a buffer', async () => {
    const data = await store(Buffer.from('rodrigo'))

    expect(typeof data === 'object').toBe(true)
    expect(typeof data.id === 'string').toBe(true)
    expect(data.id.length === 4).toBe(true)
})
