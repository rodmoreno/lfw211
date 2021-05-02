'use strict'
const assert = require('assert')
const { equal } = assert.strict
const exercise = require('.')

let sp = null
try {
  sp = exercise('is set')
  assert(sp, 'exercise function should return a child process instance')
  if (Buffer.isBuffer(sp)) {
    equal(sp.toString().trim(), 'passed!', 'child process misconfigured')
    process.stdout.write(sp)
    return
  }
} catch (err) {
  const { status} = err
  if (status == null) throw err
  equal(status, 0, 'exit code should be 0')
  return
}

if (!sp.on) {
  const { stdout, stderr } = sp
  if (stderr.length > 0) process.stderr.write(stderr)
  if (stdout.length > 0) process.stdout.write(stdout)
  equal(sp.status, 0, 'exit code should be 0')
  equal(stdout.toString().trim(), 'passed!', 'child process misconfigured')
  return
}

let out = ''
if (sp.stderr) sp.stderr.pipe(process.stderr)
if (sp.stdout) {
  sp.stdout.once('data', (data) => { out = data })
  sp.stdout.pipe(process.stdout)
} else {
  // stdio may be misconfigured, or fork method may be used,
  // allow benefit of the doubt since in either case
  // exit code check will still fail:
  out = 'passed!'
}
const timeout = setTimeout(() => {
  equal(out.toString().trim(), 'passed!', 'child process misconfigured')
}, 1000)

sp.once('exit', (status) => {
  equal(status, 0, 'exit code should be 0')
  equal(out.toString().trim(), 'passed!', 'child process misconfigured')
  clearTimeout(timeout)
})

