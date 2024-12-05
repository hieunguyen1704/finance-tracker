import { getAllCategories as fetchAllCategories } from '../models/category.model'

export const getCategories = async () => {
  return await fetchAllCategories()
}
