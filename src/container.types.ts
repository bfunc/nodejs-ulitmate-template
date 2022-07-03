import type { Config } from 'config'
import type { Logger } from 'infra/logger'
import type { CustomersModel } from 'modules/customers/model'
import type { CustomersRepository } from 'modules/customers/repository'
import type { OrdersModel } from 'modules/orders/model'
import type { OrdersRepository } from 'modules/orders/repository'
import type { ProductsModel } from 'modules/products/model'

export type Container = {
  CustomersRepository: CustomersRepository
  CustomersModel: CustomersModel
  OrdersModel: OrdersModel
  ProductsModel: ProductsModel
  OrdersRepository: OrdersRepository
  config: Config
  logger: Logger
}
