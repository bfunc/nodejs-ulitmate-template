import { FastifyInstance, FastifyRequest } from 'fastify'

export type RequestGetById = FastifyRequest<{
  Params: { id: string }
}>

export type InterfaceInstance = FastifyInstance
