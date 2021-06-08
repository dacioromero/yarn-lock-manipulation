const fs = require('fs')
const lockfile = require('@yarnpkg/lockfile')

module.exports = function removeTransitive ([lockPath, ...packagePaths]) {
  const lockObj = lockfile.parse(fs.readFileSync(lockPath, 'utf8')).object
  const allDeps = new Set()

  const parseDep = ([name, version]) => {
    allDeps.add(`${name}@${version}`)
  }

  for (const packagePath of packagePaths) {
    const {
      dependencies = {},
      devDependencies = {}
    } = JSON.parse(fs.readFileSync(packagePath, 'utf8'))

    Object.entries(dependencies).forEach(parseDep)
    Object.entries(devDependencies).forEach(parseDep)
  }

  const newLockObj = Object.fromEntries(Object.entries(lockObj).filter(([dep]) => allDeps.has(dep)))

  return newLockObj
}
