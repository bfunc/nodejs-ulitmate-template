import { Container } from 'container.types'
import fastify from 'fastify'
import swagger from './plugins/swagger'

const getControllers = (container: Container) => {
  return (
    Object.keys(container)
      .filter(moduleName => moduleName.endsWith('Routes'))
      // @ts-ignore
      .map(routes => container[routes])
  )
}

export default (container: Container) => ({
  start: async () => {
    const { logger, config } = container

    try {
      const server = fastify({ logger: true })

      // Register plugins
      const pluginsList = [swagger]

      await Promise.all(
        pluginsList.map(plugin => {
          server.register(...plugin)
        })
      )

      // Register all found routes
      getControllers(container).forEach(server.register)

      // Global error handler
      server.setErrorHandler((error, request, reply) => {
        const message = `Error in route: ${reply.statusCode} ${request.routerPath} (${request.routerMethod})`
        logger.error({ message, error })
        reply.send(error)
      })

      // Wait until all plugins have been loaded
      await server.ready()

      await server.listen({ port: config.port, host: '0.0.0.0' })

      /* eslint-disable */
      config.isDev && console.log(server.printRoutes())
    } catch (error) {
      logger.error(error)
      process.exitCode = 1
      process.exit()
    }
  },
})
