import { getCategoryById } from '../models/category'
import {
  createTransaction,
  CreateTransactionInput,
} from '../models/transaction'

export const trackTransactionService = async (data: CreateTransactionInput) => {
  const category = await getCategoryById(data.categoryId)
  if (!category) {
    throw new Error('Category not found')
  }
  return createTransaction(data)
}
