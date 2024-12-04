import prisma from '../config/database'

export interface CreateTransactionInput {
  userId: number
  categoryId: number
  amount: number
  description?: string
  trackedTime: Date
}

interface GetTransactionsInput {
  userId: number
  startTrackedTime?: Date
  endTrackedTime?: Date
  categoryId?: number
  sortBy?: 'amount' | 'trackedTime'
  sortOrder?: 'asc' | 'desc'
}

/**
 * Function to create a new transaction
 * @param data - Input data to create a transaction
 * @returns The created transaction object
 */
export const createTransaction = async (data: CreateTransactionInput) => {
  const { userId, categoryId, amount, description, trackedTime } = data

  try {
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
  } catch (error) {
    console.error('Error creating transaction:', error)
    throw new Error('Failed to create transaction')
  }
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
