import {
  CreateTransactionPayload,
  TransactionQueryParams,
  UpdateTransactionPayload,
} from '../dtos/transaction.dto'
import {
  createTransaction,
  deleteTransaction,
  getTransactions,
  updateTransaction,
} from '../models/transaction.model'

export const trackTransactionService = async (
  data: CreateTransactionPayload,
) => {
  const result = await createTransaction({
    ...data,
    trackedTime: new Date(data.trackedTime),
  })
  return result
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

export const updateTransactionService = async (
  params: UpdateTransactionPayload,
) => {
  const result = await updateTransaction({
    ...params,
    trackedTime: params.trackedTime ? new Date(params.trackedTime) : undefined,
  })
  return result
}

export const deleteTransactionService = async (
  transactionId: number,
  userId: number,
) => {
  const result = await deleteTransaction(transactionId, userId)
  return result
}
