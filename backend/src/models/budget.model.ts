import prisma from '../config/database'
import { CreateBudgetInput, UpdateBudgetInput } from '../dtos/budget.dto'

export const createBudget = async (data: CreateBudgetInput) => {
  return prisma.budget.create({
    data,
  })
}

export const findAllBudgets = async (userId: number) => {
  const today = new Date()
  return prisma.budget.findMany({
    where: {
      userId,
      endDate: { gt: today }, // gt means greater than
    },
    include: {
      category: true, // Include category details for clarity
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
