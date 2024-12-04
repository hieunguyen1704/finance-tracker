import { getCategoryById } from '../models/category'
import {
  createTransaction,
  CreateTransactionInput,
  getTransactions,
} from '../models/transaction'

interface TransactionQueryParams {
  userId: number
  startTrackedTime?: string
  endTrackedTime?: string
  categoryId?: number
  sortBy?: 'amount' | 'trackedTime'
  sortOrder?: 'asc' | 'desc'
}

export const trackTransactionService = async (data: CreateTransactionInput) => {
  const category = await getCategoryById(data.categoryId)
  if (!category) {
    throw new Error('Category not found')
  }
  return createTransaction(data)
}

export const listTransactions = async (params: TransactionQueryParams) => {
  const {
    userId,
    startTrackedTime,
    endTrackedTime,
    categoryId,
    sortBy,
    sortOrder,
  } = params

  let startTrackedTimeDate: Date | undefined
  let endTrackedTimeDate: Date | undefined

  if (startTrackedTime) {
    startTrackedTimeDate = new Date(startTrackedTime)
    if (isNaN(startTrackedTimeDate.getTime())) {
      throw new Error('Invalid startTrackedTime format')
    }
  }

  if (endTrackedTime) {
    endTrackedTimeDate = new Date(endTrackedTime)
    if (isNaN(endTrackedTimeDate.getTime())) {
      throw new Error('Invalid endTrackedTime format')
    }
  }

  return getTransactions({
    userId,
    categoryId,
    sortBy,
    sortOrder,
    startTrackedTime: startTrackedTimeDate,
    endTrackedTime: endTrackedTimeDate,
  })
}
