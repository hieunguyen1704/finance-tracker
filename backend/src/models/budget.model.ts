import prisma from '../config/database'
import {
  BudgetsFilter,
  CreateBudgetInput,
  UpdateBudgetInput,
} from '../dtos/budget.dto'
import { Transaction } from '@prisma/client'

export const createBudget = async (data: CreateBudgetInput) => {
  return prisma.budget.create({
    data,
  })
}

export const findAllBudgets = async (
  userId: number,
  filters: BudgetsFilter,
) => {
  const today = new Date()

  const { startDate, endDate } = filters

  let dateFilters = {}

  if (!startDate && !endDate) {
    dateFilters = {
      endDate: { gte: today },
    }
  } else {
    dateFilters = {
      startDate: startDate ? { gte: startDate } : {},
      endDate: endDate ? { lte: endDate } : {},
    }
  }

  return await prisma.budget.findMany({
    where: {
      userId,
      ...dateFilters,
    },
    include: {
      category: true,
      budgetUsages: {
        select: {
          spent: true,
        },
      },
    },
    orderBy: {
      endDate: 'asc',
    },
  })
}

export const updateBudget = async (
  userId: number,
  budgetId: number,
  data: Partial<UpdateBudgetInput>,
) => {
  return prisma.budget.update({
    where: { id: budgetId, userId },
    data,
  })
}

export const deleteBudget = async (userId: number, budgetId: number) => {
  return prisma.budget.deleteMany({
    where: { id: budgetId, userId },
  })
}

export const findBudgetsForTransaction = async (transaction: Transaction) => {
  return await prisma.budget.findMany({
    where: {
      userId: transaction.userId,
      categoryId: transaction.categoryId,
      startDate: { lte: transaction.trackedTime },
      endDate: { gte: transaction.trackedTime },
    },
  })
}
