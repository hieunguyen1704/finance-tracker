import {
  BudgetsParams,
  CreateBudgetPayload,
  UpdateBudgetPayload,
} from '../dtos/budget.dto'
import {
  createBudget,
  deleteBudget,
  findAllBudgets,
  updateBudget,
} from '../models/budget.model'

export const createBudgetService = async (data: CreateBudgetPayload) => {
  return await createBudget({
    ...data,
    startDate: new Date(data.startDate),
    endDate: new Date(data.endDate),
  })
}

export const getBudgetsService = async (
  userId: number,
  filters: BudgetsParams,
) => {
  const budgets = await findAllBudgets(userId, {
    startDate: filters?.startDate ? new Date(filters.startDate) : undefined,
    endDate: filters?.endDate ? new Date(filters.endDate) : undefined,
  })

  // Calculate total usage for each budget
  return budgets.map((budget) => {
    const totalUsage = budget.budgetUsages.reduce(
      (sum, usage) => sum + usage.spent,
      0,
    )

    const { budgetUsages: _, ...rest } = budget
    return {
      ...rest,
      totalUsage,
    }
  })
}

export const deleteBudgetService = async (budgetId: number, userId: number) => {
  return await deleteBudget(userId, budgetId)
}

export const updateBudgetService = async (
  budgetId: number,
  userId: number,
  data: UpdateBudgetPayload,
) => {
  return await updateBudget(userId, budgetId, {
    ...data,
    startDate: data.startDate ? new Date(data.startDate) : undefined,
    endDate: data.endDate ? new Date(data.endDate) : undefined,
  })
}
