import prisma from '../config/database'
import { CreateBudgetUsageInput } from '../dtos/budgetUsage.dto'

export const createManyBudgetUsage = async (data: CreateBudgetUsageInput[]) => {
  await prisma.budgetUsage.createMany({
    data,
  })
}

export const deleteManyBudgetUsageByTransactionId = async (
  transactionId: number,
) => {
  await prisma.budgetUsage.deleteMany({
    where: { transactionId },
  })
}
