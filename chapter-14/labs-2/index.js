'use strict'

const os = require('os')

setTimeout(() => {
  console.log(process.uptime())
  console.log(os.uptime())
  console.log(os.totalmem())
  console.log(process.memoryUsage().heapTotal)
  
  
}, 1000)

