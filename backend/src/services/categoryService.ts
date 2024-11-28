import { getAllCategories as fetchAllCategories } from '../models/category'

export const getCategories = async () => {
  return await fetchAllCategories()
}
