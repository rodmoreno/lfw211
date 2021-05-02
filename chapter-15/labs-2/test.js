'use strict'
const exercise = require('.')
const cp = require('child_process')
const assert = require('assert')
const { equal } = assert.strict
const { SCENARIO } = process.env
const [ node ] = process.argv

const stdoutCheck = () => { exercise(node, [`-p`, `'test'`]) }
const stderrCheck = () => {
  const sp = exercise(node, [`-e`, `console.error('test')`])
  if (sp.stderr) sp.stderr.pipe(process.stderr)
}
const stdinCheck = () => {
  exercise(node, [`-e`, `
      process.stdout.write(Buffer.from([0]))
      process.stdin.pipe(process.stdout)
      setTimeout(() => {
        process.stdout.write(Buffer.from([1]))
      }, 100)
  `])
}

function test (scenario = 0) {

  switch (scenario) {
    case 1: return stdoutCheck()
    case 2: return stderrCheck()
    case 3: return stdinCheck()
  }

  const s1 = cp.spawnSync(node, [__filename], {
    env: {SCENARIO: 1},
  })

  equal(s1.stdout.toString().trim(), 'test', 'should inherit stdout')

  const s2 = cp.spawnSync(node, [__filename], {
    env: {SCENARIO: 2},
  })

  equal(s2.stderr.toString().trim(), 'test', 'should expose stderr stream')


  const s3 = cp.spawnSync(node, [__filename], {
    input: 'some input',
    env: {SCENARIO: 3},
  })

  equal(s3.stdout.length, 2, 'stdin should be ignored')

  console.log('passed!')

}

test(Number(SCENARIO))

