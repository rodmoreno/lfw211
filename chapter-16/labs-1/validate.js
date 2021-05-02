'use strict'
const assert = require('assert').strict
const { spawnSync } = require('child_process')
const { writeFileSync } = require('fs')
const uppercase = require.resolve('./uppercase')
const uppercaseCode = Buffer.from('2775736520737472696374270a66756e6374696f6e20757070657263617365202873747229207b0a202069662028747970656f662073747220213d3d2027737472696e672729207468726f77204572726f722827696e707574206d757374206265206120737472696e6727290a202072657475726e207374722e746f55707065724361736528290a7d0a0a6d6f64756c652e6578706f727473203d20757070657263617365', 'hex')

try {
  {
    writeFileSync(uppercase, uppercaseCode)

    const sp = spawnSync(process.platform === 'win32' ? 'npm.cmd' : 'npm', ['test'], {
      stdio: 'ignore'
    })

    assert.equal(sp.status, 0, 'tests should be successful (is package.json test script configured?)')
  }

  {
    const badOutput = `'use strict'
    function uppercase (str) {
      if (typeof str !== 'string') throw Error('input must be a string')
      return 'bad output'
    }

    module.exports = uppercase
    `

    writeFileSync(uppercase, badOutput)

    const sp = spawnSync(process.platform === 'win32' ? 'npm.cmd' : 'npm', ['test'], {
      stdio: 'ignore'
    })

    assert.equal(sp.status, 1, 'output should be tested')
  }

  {
    const badValidation = `'use strict'
    function uppercase (str) {
      return str.toUpperCase()
    }

    module.exports = uppercase
    `

    writeFileSync(uppercase, badValidation)

    const sp = spawnSync(process.platform === 'win32' ? 'npm.cmd' : 'npm', ['test'], {
      stdio: 'ignore'
    })

    assert.equal(sp.status, 1, 'error case should be tested')
  }
  console.log('passed!')
} finally {
  writeFileSync(uppercase, uppercaseCode)
}

