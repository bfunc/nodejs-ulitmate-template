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
    handler: () => ProductsModel.getList(),
  })

  app.route({
    method: 'GET',
    url: `/products/:id`,
    handler: (req: RequestGetById) =>
      makeResponse(ProductsModel.getById(req.params.id)),
  })
}
