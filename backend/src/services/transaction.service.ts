import {
  CreateTransactionPayload,
  MetricsRequest,
  TransactionQueryParams,
  UpdateTransactionPayload,
} from '../dtos/transaction.dto'
import {
  calculateMetrics,
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
    categoryType,
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
    categoryType,
  })
}

export const updateTransactionService = async (
  payload: UpdateTransactionPayload,
) => {
  const result = await updateTransaction({
    ...payload,
    trackedTime: payload.trackedTime
      ? new Date(payload.trackedTime)
      : undefined,
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

export const getMetrics = async ({
  userId,
  startDate,
  endDate,
}: MetricsRequest) => {
  const parsedStartDate = startDate ? new Date(startDate) : undefined
  const parsedEndDate = endDate ? new Date(endDate) : undefined

  return await calculateMetrics({
    userId,
    startDate: parsedStartDate,
    endDate: parsedEndDate,
  })
}
