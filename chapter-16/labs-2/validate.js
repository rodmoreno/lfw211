'use strict'
const assert = require('assert').strict
const { spawnSync } = require('child_process')
const { writeFileSync } = require('fs')
const store = require.resolve('./store')
const storeCode = Buffer.from('2775736520737472696374270a6d6f64756c652e6578706f727473203d202876616c75652c20636229203d3e207b0a2020696620284275666665722e69734275666665722876616c756529203d3d3d2066616c736529207b0a202020206362284572726f722827696e707574206d7573742062652061206275666665722729290a2020202072657475726e0a20207d0a202073657454696d656f7574282829203d3e207b0a20202020636f6e7374206964203d204d6174682e72616e646f6d28292e746f537472696e67283336292e73706c697428272e27295b315d2e736c69636528302c2034290a202020206362286e756c6c2c207b206964207d290a20207d2c20333030290a7d0a', 'hex')

try {
  {
    writeFileSync(store, storeCode)

    const sp = spawnSync(process.platform === 'win32' ? 'npm.cmd' : 'npm', ['test'], {
      stdio: 'ignore'
    })

    assert.equal(sp.status, 0, 'tests should be successful (is package.json test script configured?)')
  }

  {
    const badOutput = `'use strict'
      module.exports = (value, cb) => {
        if (Buffer.isBuffer(value) === false) {
          cb(Error('input must be a buffer'))
          return
        }
        setTimeout(() => {
          const id = Math.random().toString(36).split('.')[1].slice(0, 2)
          cb(null, { id })
        }, 300)
      }

    `

    writeFileSync(store, badOutput)

    const sp = spawnSync(process.platform === 'win32' ? 'npm.cmd' : 'npm', ['test'], {
      stdio: 'ignore'
    })

    assert.equal(sp.status, 1, 'output should be tested (id length)')
  }

  {
    const badValidation = `'use strict'
    module.exports = (value, cb) => {
      if (Buffer.isBuffer(value) === true) {
        cb(Error('input must be a buffer'))
        return
      }
      setTimeout(() => {
        const id = Math.random().toString(36).split('.')[1].slice(0, 4)
        cb(null, { id })
      }, 300)
    }

    `

    writeFileSync(store, badValidation)

    const sp = spawnSync(process.platform === 'win32' ? 'npm.cmd' : 'npm', ['test'], {
      stdio: 'ignore'
    })

    assert.equal(sp.status, 1, 'error case should be tested')
  }

  {
    const unexpectedError = `'use strict'
    module.exports = (value, cb) => {
      cb(Error('input must be a buffer'), {id: '1234'})
    }
    `

    writeFileSync(store, unexpectedError)

    const sp = spawnSync(process.platform === 'win32' ? 'npm.cmd' : 'npm', ['test'], {
      stdio: 'ignore'
    })

    assert.equal(sp.status, 1, 'unexpected errors should be guarded - e.g. ifError')
  }

  console.log('passed!')
} finally {
  writeFileSync(store, storeCode)
}

