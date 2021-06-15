#!/usr/bin/env node
const lockfile = require('@yarnpkg/lockfile')

const merge = require('./merge')
const removeTransitive = require('./remove-transitive')
const pick = require('./pick')

const [,, command, ...args] = process.argv

function runCmd (cmdFn, args) {
  const newLockObj = cmdFn(args)
  const newLockStr = lockfile.stringify(newLockObj)
  console.log(newLockStr)
}

// TODO: Use commander or yargs
switch (command) {
  case 'merge':
    runCmd(merge, args)
    break
  case 'remove-transitive':
    runCmd(removeTransitive, args)
    break
  case 'pick':
    runCmd(pick, args)
    break
  default:
    console.error('Invalid command')
    break
}
