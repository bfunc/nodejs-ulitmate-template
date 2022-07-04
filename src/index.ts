import { resolve } from 'path'
import { loadDependencies } from 'utils/dependenciesLoader'
import createAppContainer from 'container'
import infraDependencies from './infra'
import server from 'interfaces/http/server'
import config from './config'
import { capitalize } from 'utils/utils'

// Top level await is not working with ts-node yet
async function start() {
  // Read dependencies from filesystem to reduce boilerplate
  const domainDependencies = await loadDependencies({
    root: resolve('src', 'modules'),
    extension: 'ts',
    // Module content
    filenames: ['model', 'repository', 'routes', 'service'],
    getDependencyName: module =>
      capitalize(module.name) + capitalize(module.file),
  })

  const container = createAppContainer({
    ...domainDependencies,
    ...infraDependencies,
    config,
    server,
  })

  const app = container.resolve('server')
  app.start()
}

start()
