import { Transaction } from '@prisma/client'
import { findBudgetsForTransaction } from '../models/budget.model'
import { CreateBudgetUsageInput } from '../dtos/budgetUsage.dto'
import {
  createManyBudgetUsage,
  deleteManyBudgetUsageByTransactionId,
} from '../models/budgetUsage.model'

export const createBudgetUsage = async (transaction: Transaction) => {
  const budgets = await findBudgetsForTransaction(transaction)

  if (budgets.length > 0) {
    const budgetUsageData: CreateBudgetUsageInput[] = budgets.map((budget) => ({
      budgetId: budget.id,
      transactionId: transaction.id,
      spent: transaction.amount,
    }))

    await createManyBudgetUsage(budgetUsageData)

    console.log(
      `Created ${budgetUsageData.length} BudgetUsage records for transactionId: ${transaction.id}`,
    )
  }
}

export const deleteBudgetUsage = async (transactionId: number) => {
  await deleteManyBudgetUsageByTransactionId(transactionId)
  console.log(`Deleted BudgetUsage for transactionId: ${transactionId}`)
}

export const updateBudgetUsage = async (
  oldTransaction: Transaction,
  newTransaction: Transaction,
) => {
  await deleteBudgetUsage(oldTransaction.id)

  await createBudgetUsage(newTransaction)

  console.log(`Updated BudgetUsage for transactionId: ${newTransaction.id}`)
}
