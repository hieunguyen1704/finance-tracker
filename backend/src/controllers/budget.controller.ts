import { Request, Response } from 'express'
import { errorResponse } from '../utils/errorResponse'
import {
  createBudgetService,
  deleteBudgetService,
  getBudgetsService,
  updateBudgetService,
} from '../services/budget.service'

export const createBudgetController = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id
    if (!userId) {
      errorResponse(res, 401, 'Unauthorized: User not found')
      return
    }

    const budget = await createBudgetService({
      userId: Number(userId),
      ...req.body,
    })

    res.status(201).json(budget)
  } catch (error) {
    console.log('Error creating budget:', error)
    if (error instanceof Error) {
      errorResponse(res, 500, error.message)
    } else {
      errorResponse(res, 500, 'An unknown error occurred')
    }
  }
}

export const getBudgetsController = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id
    if (!userId) {
      errorResponse(res, 401, 'Unauthorized: User not found')
      return
    }

    const budgets = await getBudgetsService(Number(userId))
    res.status(200).json(budgets)
  } catch (error) {
    console.log('Error fetching budgets:', error)
    if (error instanceof Error) {
      errorResponse(res, 500, error.message)
    } else {
      errorResponse(res, 500, 'An unknown error occurred')
    }
  }
}

export const deleteBudgetController = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id
    if (!userId) {
      errorResponse(res, 401, 'Unauthorized: User not found')
      return
    }

    const { budgetId } = req.params

    await deleteBudgetService(Number(budgetId), Number(userId))

    res.status(200).json({ message: 'Budget deleted successfully' })
  } catch (error) {
    console.log('Error deleting budget:', error)
    if (error instanceof Error) {
      errorResponse(res, 500, error.message)
    } else {
      errorResponse(res, 500, 'An unknown error occurred')
    }
  }
}

export const updateBudgetController = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id
    if (!userId) {
      errorResponse(res, 401, 'Unauthorized: User not found')
      return
    }

    const { budgetId } = req.params

    const updatedBudget = await updateBudgetService(
      Number(budgetId),
      Number(userId),
      { ...req.body },
    )

    res.status(200).json(updatedBudget)
  } catch (error) {
    console.log('Error updating budget:', error)
    if (error instanceof Error) {
      errorResponse(res, 500, error.message)
    } else {
      errorResponse(res, 500, 'An unknown error occurred')
    }
  }
}
