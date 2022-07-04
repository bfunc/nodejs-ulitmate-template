import { Container } from 'container.types'
import { InterfaceInstance } from 'interfaces/http/http.types'
import makeResponse from 'interfaces/http/makeResponse'
// zod-to-json-schema
export default (container: Container) => async (app: InterfaceInstance) => {
  const { OrdersModel } = container

  app.route({
    method: 'GET',
    url: `/orders`,
    schema: {
      description: 'gwet some data',
      tags: ['user'],
      summary: 'qwerty',
      response: {
        default: {
          description: 'Default response',
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              totalPrice: { type: 'integer' },
            },
          },
        },
      },
    },
    handler: () => makeResponse(OrdersModel.getList()),
  })
}
/* items: {
  type: 'object',
  properties: {
    id: { type: 'string' },
    customer: { type: 'string' },
    nickname: { type: 'string' },
    age: { type: 'integer' },
  },
}, */
