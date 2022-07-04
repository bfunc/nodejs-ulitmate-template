import makeResponse from 'interfaces/http/makeResponse'
import type { Container } from 'container.types'
import type {
  RequestGetById,
  InterfaceInstance,
} from 'interfaces/http/http.types'

export default (container: Container) => async (app: InterfaceInstance) => {
  const { ProductsModel } = container

  app.route({
    method: 'GET',
    url: `/products`,
    schema: {
      tags: ['Get All Products'],
      response: {
        default: ProductsModel.getListSchema(),
      },
    },
    handler: () => ProductsModel.getList(),
  })

  app.route({
    method: 'GET',
    url: `/products/:id`,
    schema: {
      description: 'Get product from the specified table by Id.',
      summary: 'Get product from the specified table.',
      tags: ['Get Product by ID'],
      params: {
        type: 'object',
        properties: {
          id: { type: 'string', description: 'product id' },
        },
      },
      response: {
        200: ProductsModel.getByIdSchema(),
      },
    },
    handler: (req: RequestGetById) =>
      makeResponse(ProductsModel.getById(req.params.id)),
  })
}
