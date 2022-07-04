import { Container } from 'container.types'
import { InterfaceInstance } from 'interfaces/http/http.types'
import makeResponse from 'interfaces/http/makeResponse'

export default (container: Container) => async (app: InterfaceInstance) => {
  const { OrdersModel } = container

  app.route({
    method: 'GET',
    url: `/orders`,
    schema: {
      tags: ['Get All Orders'],
      response: {
        default: OrdersModel.getListSchema(),
      },
    },
    handler: () => makeResponse(OrdersModel.getList()),
  })
}
