const fs = require('fs')
const lockfile = require('@yarnpkg/lockfile')
const { execSync } = require('child_process')

module.exports = function regenerateTransitive ([lockPath, packagePath]) {
  const packageObj = JSON.parse(fs.readFileSync(packagePath, 'utf8'))
  const lockObj = lockfile.parse(fs.readFileSync(lockPath, 'utf8')).object

  function* flatDepsObj (depsObj, depsTraversed = new Set()) {
    if (!depsObj) return

    for (const [depName, depVer] of Object.entries(depsObj)) {
      const dep = `${depName}@${depVer}`

      if (depsTraversed.has(dep)) continue

      depsTraversed.add(dep)

      let depLockObj = lockObj[dep]

      if (!depLockObj) {
        console.error(`${dep} is missing!`)

        const {
          version,
          dist: {
            tarball: resolved,
            integrity
          },
          dependencies
        } = JSON.parse(execSync(`npm view "${dep}" -json`, { encoding: 'utf8' }))

        depLockObj = {
          version,
          resolved,
          integrity,
          dependencies
        }
      }

      yield [dep, depLockObj]
      yield* flatDepsObj(depLockObj.dependencies, depsTraversed)
    }
  }

  const newLockObj = Object.fromEntries(flatDepsObj({
    ...packageObj.dependencies,
    ...packageObj.devDependencies
  }))

  return newLockObj
}

