import type { CustomerRecord } from './model'

const db: Record<string, CustomerRecord> = {
  c1: { id: 'c1', name: 'John', birthYear: 1999 },
  c2: { id: 'c2', name: 'Peter', birthYear: 2001 },
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
