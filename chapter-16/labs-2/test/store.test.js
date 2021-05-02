'use strict'

const store = require('../store')
test('throw when inputs is not buffer', (done) => {
    store(1, (err) => {
        expect(err).toStrictEqual(Error('input must be a buffer'))
        done()
    })

    store(true, (err) => {
        expect(err).toStrictEqual(Error('input must be a buffer'))
        done()
    })

    store('something', (err) => {
        expect(err).toStrictEqual(Error('input must be a buffer'))
        done()
    })

    store({}, (err) => {
        expect(err).toStrictEqual(Error('input must be a buffer'))
        done()
    })

    store([], (err) => {
        expect(err).toStrictEqual(Error('input must be a buffer'))
        done()
    })

    store(null, (err) => {
        expect(err).toStrictEqual(Error('input must be a buffer'))
        done()
    })
})

test('store a buffer', (done) => {
    store(Buffer.from('rodrigo'), (err, data) => {
        expect(err == null).toBe(true)
        expect(typeof data === 'object').toBe(true)
        expect(typeof data.id === 'string').toBe(true)
        expect(data.id.length === 4).toBe(true)
        done()
    })
})
