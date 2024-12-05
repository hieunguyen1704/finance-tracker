import prisma from '../config/database'
import {
  CreateTransactionInput,
  GetTransactionsInput,
  UpdateTransactionInput,
} from '../dtos/transaction.dto'

/**
 * Function to create a new transaction
 * @param data - Input data to create a transaction
 * @returns The created transaction object
 */
export const createTransaction = async (data: CreateTransactionInput) => {
  const { userId, categoryId, amount, description, trackedTime } = data

  const transaction = await prisma.transaction.create({
    data: {
      userId,
      categoryId,
      amount,
      description,
      trackedTime,
    },
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
  } = params

  const filters: any = {
    userId,
  }

  if (categoryId) {
    filters.categoryId = categoryId
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
