import type { CustomerRecord } from './model'

const db: Record<string, CustomerRecord> = {
  c1: { id: 'c1', name: 'Peter', birthYear: 1999 },
}

export type CustomersRepository = {
  getById: (_: string) => CustomerRecord
  getList: () => CustomerRecord[]
}

export default (): CustomersRepository => ({
  getById: (id: string) => db[id],
  getList: () => {
    throw new Error('Unknown Error')
  },
})
