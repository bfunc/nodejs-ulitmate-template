import type { OrderRecord } from './model'

const db: Record<string, OrderRecord> = {
  o1: {
    id: 'o1',
    customerId: 'c1',
    productIds: ['p1', 'p2'],
  },
  o2: {
    id: 'o2',
    customerId: 'c2',
    productIds: ['p2', 'p3', 'p4'],
  },
}

export type OrdersRepository = {
  getList: () => OrderRecord[]
}

export default (): OrdersRepository => ({
  getList: () => Object.values(db),
})
