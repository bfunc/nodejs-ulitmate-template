import { z } from 'zod'

const productsSchema = z.object({
  id: z.string(),
  name: z.string().min(3, { message: 'Must be at least 3 characters' }),
  price: z.number().min(0, { message: 'Must be a positive number' }),
})

export type Product = z.infer<typeof productsSchema>

const db: Record<string, Product> = {
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
  p3: {
    id: 'p3',
    name: 'Kiwi',
    price: 15,
  },
  p4: {
    id: 'p4',
    name: 'Avocado',
    price: 20,
  },
}

export type ProductsModel = {
  getList: () => Product[]
  getById: (id: string) => Product
}

export default (): ProductsModel => {
  return {
    getList: () => Object.values(db),
    getById: (id: string) => db[id],
  }
}
