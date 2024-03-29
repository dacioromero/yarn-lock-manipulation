# Yarn Lock Manipulation

Various commands for messing around with Yarn v1 lockfiles.

## Commands

### merge

Combines lockfiles into one, this could be useful for converting to Yarn workspaces.

    yarn-lock-manipulation merge paths to yarn locks

### remove-transitive

Naive approach originally [posted in a yarn issue](https://github.com/yarnpkg/yarn/issues/4986) for "unlocking" indirect/transitive dependencies. Sometimes transitive dependencies need to be updated but Yarn v1 won't upgrade them with `yarn upgrade`.

    yarn-lock-manipulation remove-transitive path/to/yarn.lock paths to package jsons

### pick

Generates a new yarn.lock with only entries releveant to a particular package.json. Potentially useful in CI/Docker where you don't want to install unneeded packages.

    yarn-lock-manipulation pick path/to/yarn.lock path/to/package.json


## Other works

- [yarn-deduplicate](https://github.com/atlassian/yarn-deduplicate)
- [yarn-unlock-indirect-dependencies](https://github.com/webfactory/yarn-unlock-indirect-dependencies)
