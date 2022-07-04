import type { Container } from 'container.types'
import { customerSchema } from 'modules/customers/model'
import { Product, productSchema } from 'modules/products/model'
import { z } from 'zod'
import zodToJsonSchema from 'zod-to-json-schema'
import { JsonSchema7Type } from 'zod-to-json-schema/src/parseDef'

// Schemas
export const orderRecordSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  productIds: z.string().array(),
})

export const orderSchema = z.object({
  id: orderRecordSchema.shape.id,
  customer: customerSchema,
  products: z.array(productSchema),
  totalPrice: z.number().positive(),
})

// Types
export type Order = z.infer<typeof orderSchema>
export type OrderRecord = z.infer<typeof orderRecordSchema>
export type OrdersModel = {
  getList: () => Order[]
  getListSchema: () => JsonSchema7Type
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
    getListSchema: () => zodToJsonSchema(z.array(orderSchema)),
    getList: () =>
      OrdersRepository.getList().map(({ id, productIds, customerId }) => {
        const products = productIds.map(productId =>
          ProductsModel.getById(productId)
        )

        return {
          id,
          products,
          customer: CustomersModel.getById(customerId),
          totalPrice: getDiscount(getTotalPrice(products)),
        }
      }),
  }
}
