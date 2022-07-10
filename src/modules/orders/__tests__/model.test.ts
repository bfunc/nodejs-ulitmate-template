import { Container } from 'container.types'
import customersModelMock from 'modules/orders/__tests__/__mocks__/customers.model.mock'
import ordersRepositoryMock from 'modules/orders/__tests__/__mocks__/orders.repository.mock'
import productsModelMock from 'modules/orders/__tests__/__mocks__/products.model.mock'
import { expect, it } from 'vitest'
import model from '../model'

const container = {
  ProductsModel: productsModelMock(),
  OrdersRepository: ordersRepositoryMock(),
  CustomersModel: customersModelMock(),
} as Container

it('should resolve model', () => {
  const modelInstance = model(container)
  expect(modelInstance).toBeDefined()
})

it('should get list of orders', () => {
  const modelInstance = model(container)
  const orders = modelInstance.getList()
  expect(orders).toHaveLength(1)
})

it('should check customer', () => {
  const modelInstance = model(container)
  const [order] = modelInstance.getList()
  expect(order.customer).toBeDefined()
  expect(order.customer.name).toContain('John')
})

it('should get list of orders', () => {
  const modelInstance = model(container)
  const [order] = modelInstance.getList()

  const basePrice = order.products.reduce((acc, cur) => acc + cur.price, 0)
  const discountPrice = 11.25

  expect(basePrice).greaterThan(discountPrice)
})
