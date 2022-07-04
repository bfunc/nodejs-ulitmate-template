import { z } from 'zod'
import zodToJsonSchema from 'zod-to-json-schema'
import { JsonSchema7Type } from 'zod-to-json-schema/src/parseDef'

export const productSchema = z.object({
  id: z.string(),
  name: z.string().min(3, { message: 'Must be at least 3 characters' }),
  price: z.number().min(0, { message: 'Must be a positive number' }),
})

export type Product = z.infer<typeof productSchema>

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
  getListSchema: () => JsonSchema7Type
  getByIdSchema: () => JsonSchema7Type
}

export default (): ProductsModel => {
  return {
    getList: () => Object.values(db),
    getById: (id: string) => db[id],
    getListSchema: () => zodToJsonSchema(z.array(productSchema)),
    getByIdSchema: () => zodToJsonSchema(productSchema),
  }
}
