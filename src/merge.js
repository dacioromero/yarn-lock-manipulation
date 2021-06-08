const fs = require('fs')
const lockfile = require('@yarnpkg/lockfile')

module.exports = function merge (files) {
  const newLockObj = {}

  for (const file of files) {
    const lockObj = lockfile.parse(fs.readFileSync(file, 'utf8')).object

    Object.assign(newLockObj, lockObj)
  }

  return newLockObj
}
