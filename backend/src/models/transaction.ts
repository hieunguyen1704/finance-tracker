import prisma from '../config/database'

export interface CreateTransactionInput {
  userId: number
  categoryId: number
  amount: number
  description?: string
  trackedTime: Date
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
