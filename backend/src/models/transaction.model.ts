import prisma from '../config/database'
import {
  CreateTransactionInput,
  GetTransactionsInput,
  MetricsInput,
  UpdateTransactionInput,
} from '../dtos/transaction.dto'

/**
 * Function to create a new transaction
 * @param data - Input data to create a transaction
 * @returns The created transaction object
 */
export const createTransaction = async (data: CreateTransactionInput) => {
  const transaction = await prisma.transaction.create({
    data,
  })

  return transaction
}

export const getTransactions = async (params: GetTransactionsInput) => {
  const {
    userId,
    startTrackedTime,
    endTrackedTime,
    categoryId,
    sortBy = 'trackedTime',
    sortOrder = 'desc',
    categoryType,
  } = params

  const filters: any = {
    userId,
  }

  if (categoryId) {
    filters.categoryId = categoryId
  }

  if (categoryType) {
    filters.category = {
      type: categoryType,
    }
  }

  if (startTrackedTime || endTrackedTime) {
    filters.trackedTime = {
      ...(startTrackedTime ? { gte: startTrackedTime } : {}),
      ...(endTrackedTime ? { lte: endTrackedTime } : {}),
    }
  }

  return prisma.transaction.findMany({
    include: {
      category: true,
    },
    where: filters,
    orderBy: {
      [sortBy]: sortOrder,
    },
  })
}

export const updateTransaction = async (params: UpdateTransactionInput) => {
  const { transactionId, userId, ...updateData } = params

  return prisma.transaction.update({
    where: {
      id: transactionId,
      userId, // Ensure the transaction belongs to the user
    },
    data: updateData,
  })
}

export const deleteTransaction = async (
  transactionId: number,
  userId: number,
) => {
  return prisma.transaction.delete({
    where: {
      id: transactionId,
      userId, // Ensure the transaction belongs to the user
    },
  })
}

export const getTransactionById = async (id: number) => {
  return prisma.transaction.findUnique({
    include: {
      category: true,
    },
    where: {
      id,
    },
  })
}

export const findAllTransactions = async (userId: number) => {
  return await prisma.transaction.findMany({
    where: { userId },
    include: { category: true },
  })
}

export const findAllTransactionsByDate = async ({
  userId,
  startDate,
  endDate,
}: MetricsInput) => {
  const timeFilter =
    startDate || endDate
      ? {
          trackedTime: {
            ...(startDate ? { gte: startDate } : {}),
            ...(endDate ? { lte: endDate } : {}),
          },
        }
      : {}
  return await prisma.transaction.findMany({
    where: {
      userId,
      ...timeFilter,
    },
    include: { category: true },
  })
}

export const findSpendingByDate = async (
  userId: number,
  startDate?: Date,
  endDate?: Date,
) => {
  const timeFilter =
    startDate || endDate
      ? {
          trackedTime: {
            ...(startDate ? { gte: startDate } : {}),
            ...(endDate ? { lte: endDate } : {}),
          },
        }
      : {}

  const transactions = await prisma.transaction.groupBy({
    by: ['trackedTime'], // Group by individual dates
    where: {
      category: {
        type: 'expense',
      },
      userId,
      ...timeFilter,
    },
    _sum: {
      amount: true,
    },
  })

  return transactions
}
