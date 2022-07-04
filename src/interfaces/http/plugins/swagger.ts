import swagger, { SwaggerOptions } from '@fastify/swagger'
import { FastifyPlugin } from 'fastify'

/* Check docs for more info
https://github.com/fastify/fastify-swagger */
export default [
  swagger,
  {
    routePrefix: '/docs',
    swagger: {
      info: {
        title: 'API Docs',
      },
    },
    exposeRoute: true,
  },
] as [FastifyPlugin, SwaggerOptions]
