import { Container } from 'container.types'
import { capitalize } from 'utils/utils'
import { z } from 'zod'

// Schemas
export const customerRecordSchema = z.object({
  id: z.string(),
  name: z.string().min(2, { message: 'Must be 2 or more characters long' }),
  birthYear: z.number().min(1900).max(2100),
})

export const customerSchema = z.object({
  id: customerRecordSchema.shape.id,
  name: customerRecordSchema.shape.name,
  age: z.number().positive(),
})

// Types
export type Customer = z.infer<typeof customerSchema>
export type CustomerRecord = z.infer<typeof customerRecordSchema>
export type CustomersModel = {
  getById: (id: string) => Customer
}

export default ({ CustomersRepository }: Container): CustomersModel => {
  const getAge = (birthYear: number) =>
    new Date(
      new Date().setFullYear(new Date().getFullYear() - birthYear)
    ).getFullYear()

  return {
    getById: id => {
      const result = CustomersRepository.getById(id)

      return {
        id: result.id,
        name: capitalize(result.name),
        age: getAge(result.birthYear),
      }
    },
  }
}
