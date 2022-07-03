import { resolve } from 'path'
import { loadDependencies } from 'utils/dependenciesLoader'
import createAppContainer from 'container'
import infraDependencies from './infra'
import server from 'interfaces/http/server'
import config from './config'

// Top level await is not working with ts-node yet
async function start() {
  // Read dependencies from filesystem to reduce boilerplate
  const domainDependencies = await loadDependencies({
    root: resolve('src', 'modules'),

    // Module content
    filenames: ['model', 'repository', 'routes', 'service'],
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
