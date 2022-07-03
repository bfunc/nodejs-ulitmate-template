import { Product, ProductsModel } from 'modules/products/model'
import type { OrderRecord } from '../../model'
import type { OrdersRepository } from '../../repository'

const mockDb: Record<string, Product> = {
  p1: {
    id: 'p1',
    name: 'Apple',
    price: 5,
  },
  p2: {
    id: 'p2',
    name: 'Banana',
    price: 10,
  },
}

export default (): ProductsModel => ({
  getById: (id: string) => mockDb[id],
  getList: () => [],
})
