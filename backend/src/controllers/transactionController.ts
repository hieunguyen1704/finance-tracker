import { Request, Response } from 'express'
import { trackTransactionService } from '../services/transactionService'
import { errorResponse } from '../utils/errorResponse'

export const trackTransactionController = async (
  req: Request,
  res: Response,
) => {
  try {
    const userId = req.user?.id // Extract user ID from the authenticated user
    const { categoryId, amount, description, trackedTime } = req.body

    if (!userId) {
      errorResponse(res, 401, 'Unauthorized: User not found')
      return
    }

    // Call the service to track the transaction
    const transaction = await trackTransactionService({
      userId,
      categoryId,
      amount,
      description,
      trackedTime,
    })

    res.status(201).json(transaction)
  } catch (error) {
    console.error(error)
    if (error instanceof Error) {
      errorResponse(res, 500, error.message)
    } else {
      errorResponse(res, 500, 'An unknown error occurred')
    }
  }
}
