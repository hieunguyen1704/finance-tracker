import { Transaction } from '@prisma/client'
import {
  createBudgetUsage,
  deleteBudgetUsage,
  updateBudgetUsage,
} from '../services/budgetUsage.serivce'

export interface UpdateBudgetUsageMessage {
  action: 'create' | 'update' | 'delete'
  transaction?: Transaction
  oldTransaction?: Transaction
  newTransaction?: Transaction
}

export const processBudgetUsageUpdates = async (
  message: UpdateBudgetUsageMessage,
) => {
  const { action, transaction, oldTransaction, newTransaction } = message
  if (action === 'create' && transaction) {
    await createBudgetUsage(transaction)
  } else if (action === 'update' && oldTransaction && newTransaction) {
    await updateBudgetUsage(oldTransaction, newTransaction)
  } else if (action === 'delete' && transaction) {
    await deleteBudgetUsage(transaction.id)
  }
}
