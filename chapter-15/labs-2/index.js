'use strict'

const { spawn } = require('child_process')

function exercise (command, args) {
  return spawn(command, args, {
    stdio: ['ignore', 'inherit', 'pipe']
  })
}

module.exports = exercise

