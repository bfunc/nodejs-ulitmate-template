import { Customer, CustomersModel } from 'modules/customers/model'

const mockDb: Record<string, Customer> = {
  c1: {
    id: 'c1',
    name: 'Abstract John',
    age: 5,
  },
}

export default (): CustomersModel => ({
  getById: (id: string) => mockDb[id],
})
