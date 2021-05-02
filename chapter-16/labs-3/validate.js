'use strict'
const assert = require('assert').strict
const { spawnSync } = require('child_process')
const { writeFileSync } = require('fs')
const store = require.resolve('./store')
const storeCode = Buffer.from('2775736520737472696374270a636f6e7374207b2070726f6d6973696679207d203d207265717569726528277574696c27290a636f6e73742074696d656f7574203d2070726f6d69736966792873657454696d656f7574290a6d6f64756c652e6578706f727473203d206173796e63202876616c756529203d3e207b0a2020696620284275666665722e69734275666665722876616c756529203d3d3d2066616c736529207b0a202020207468726f77204572726f722827696e707574206d75737420626520612062756666657227290a20207d0a202061776169742074696d656f757428333030290a2020636f6e7374206964203d204d6174682e72616e646f6d28292e746f537472696e67283336292e73706c697428272e27295b315d2e736c69636528302c2034290a202072657475726e207b206964207d0a7d0a', 'hex')

try {
  {
    writeFileSync(store, storeCode)

    const sp = spawnSync(process.platform === 'win32' ? 'npm.cmd' : 'npm', ['test'], {
      env: { ...process.env, NODE_OPTIONS: '--unhandled-rejections=strict' },
      stdio: 'ignore'
    })

    assert.equal(sp.status, 0, 'tests should be successful (is package.json test script configured?)')
  }

  {
    const badOutput = `'use strict'
      const { promisify } = require('util')
      const timeout = promisify(setTimeout)
      module.exports = async (value) => {
        if (Buffer.isBuffer(value) === false) {
          throw Error('input must be a buffer')
        }
        await timeout(300)
        const id = Math.random().toString(36).split('.')[1].slice(0, 2)
        return { id }
      }
    `

    writeFileSync(store, badOutput)

    const sp = spawnSync(process.platform === 'win32' ? 'npm.cmd' : 'npm', ['test'], {
      env: { ...process.env, NODE_OPTIONS: '--unhandled-rejections=strict' },
      stdio: 'ignore'
    })
    assert.equal(sp.status, 1, 'output should be tested (id length)')
  }

  {
    const badValidation = `'use strict'
      const { promisify } = require('util')
      const timeout = promisify(setTimeout)
      module.exports = async (value) => {
        await timeout(300)
        const id = Math.random().toString(36).split('.')[1].slice(0, 4)
        return { id }
      }
    `

    writeFileSync(store, badValidation)

    const sp = spawnSync(process.platform === 'win32' ? 'npm.cmd' : 'npm', ['test'], {
      env: { ...process.env, NODE_OPTIONS: '--unhandled-rejections=strict' },
      stdio: 'ignore'
    })

    assert.equal(sp.status, 1, 'error case should be tested')
  }

  console.log('passed!')
} finally {
  writeFileSync(store, storeCode)
}

