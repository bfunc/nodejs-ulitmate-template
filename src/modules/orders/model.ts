import type { Container } from 'container.types'
import type { Customer } from 'modules/customers/model'
import type { Product } from 'modules/products/model'
import { z } from 'zod'

export const orderSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  productIds: z.string().array(),
})

export type OrderRecord = z.infer<typeof orderSchema>
export type Order = Pick<OrderRecord, 'id'> & {
  customer: Customer
  products: Product[]
  totalPrice: number
}

export type OrdersModel = {
  getList: () => Order[]
}

export default ({
  OrdersRepository,
  CustomersModel,
  ProductsModel,
}: Container): OrdersModel => {
  const getDiscount = (basePrice: number) => basePrice * 0.75
  const getTotalPrice = (products: Product[]) =>
    products.reduce((acc, cur) => acc + cur.price, 0)

  return {
    getList: () =>
      OrdersRepository.getList().map(order => {
        const products = order.productIds.map(productId =>
          ProductsModel.getById(productId)
        )

        return {
          id: order.id,
          products,
          customer: CustomersModel.getById(order.customerId),
          totalPrice: getDiscount(getTotalPrice(products)),
        }
      }),
  }
}
