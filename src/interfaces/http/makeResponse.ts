import createError, { UnknownError } from 'http-errors'

export default async <T>(result: T) => {
  try {
    const response = await result
    if (response) {
      return response
    }
    throw createError(404)
  } catch (error) {
    throw createError(error as UnknownError)
  }
}
