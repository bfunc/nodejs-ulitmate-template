import type { OrderRecord } from '../../model'
import type { OrdersRepository } from '../../repository'

const mockDb: Record<string, OrderRecord> = {
  o1: {
    id: 'o1',
    customerId: 'c1',
    productIds: ['p1', 'p2'],
  },
}

export default (): OrdersRepository => ({
  getList: () => Object.values(mockDb),
})
