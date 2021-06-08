#!/usr/bin/env node
const lockfile = require('@yarnpkg/lockfile')

const merge = require('./merge')
const removeTransitive = require('./remove-transitive')
const regenerateTransitive = require('./regenerate-transitive')

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
  case 'regenerate-transitive':
    runCmd(regenerateTransitive, args)
    break
  default:
    console.error('Invalid command')
    break
}
