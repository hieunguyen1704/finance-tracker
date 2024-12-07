import prisma from '../config/database'
import {
  CreateTransactionInput,
  GetTransactionsInput,
  MetricsInput,
  UpdateTransactionInput,
} from '../dtos/transaction.dto'

/**
 * Function to create a new transaction
 * @param data - Input data to create a transaction
 * @returns The created transaction object
 */
export const createTransaction = async (data: CreateTransactionInput) => {
  const { userId, categoryId, amount, description, trackedTime } = data

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
}

export const getTransactions = async (params: GetTransactionsInput) => {
  const {
    userId,
    startTrackedTime,
    endTrackedTime,
    categoryId,
    sortBy = 'trackedTime',
    sortOrder = 'desc',
    categoryType,
  } = params

  const filters: any = {
    userId,
  }

  if (categoryId) {
    filters.categoryId = categoryId
  }

  if (categoryType) {
    filters.category = {
      type: categoryType,
    }
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

export const updateTransaction = async (params: UpdateTransactionInput) => {
  const { transactionId, userId, ...updateData } = params

  return prisma.transaction.update({
    where: {
      id: transactionId,
      userId, // Ensure the transaction belongs to the user
    },
    data: updateData,
  })
}

export const deleteTransaction = async (
  transactionId: number,
  userId: number,
) => {
  return prisma.transaction.delete({
    where: {
      id: transactionId,
      userId, // Ensure the transaction belongs to the user
    },
  })
}

export const getTransactionById = async (id: number) => {
  return prisma.transaction.findUnique({
    include: {
      category: true,
    },
    where: {
      id,
    },
  })
}

export const calculateMetrics = async ({
  userId,
  startDate,
  endDate,
}: MetricsInput) => {
  // Fetch all transactions for balance (ignore time filter)
  const allTransactions = await prisma.transaction.findMany({
    where: { userId },
    include: { category: true },
  })

  // Fetch transactions with time filters for spending/earning calculations
  const timeFilter =
    startDate || endDate
      ? {
          trackedTime: {
            ...(startDate ? { gte: startDate } : {}),
            ...(endDate ? { lte: endDate } : {}),
          },
        }
      : {}

  const filteredTransactions = await prisma.transaction.findMany({
    where: {
      userId,
      ...timeFilter,
    },
    include: { category: true },
  })

  let totalEarning = 0
  let totalSpending = 0
  let totalBalance = 0

  // Calculate Total Balance from all transactions
  allTransactions.forEach((transaction) => {
    const { amount, category } = transaction

    if (category.type === 'income') {
      totalBalance += amount
    } else if (category.type === 'expense') {
      totalBalance -= amount
    }
  })

  // Calculate Spending/Earning and Monthly Metrics from filtered transactions
  const monthlyData: Record<string, { income: number; expense: number }> = {}

  filteredTransactions.forEach((transaction) => {
    const { amount, trackedTime, category } = transaction

    // Determine transaction type for filtered data
    if (category.type === 'income') {
      totalEarning += amount
    } else if (category.type === 'expense') {
      totalSpending += amount
    }

    // Group by month for monthly calculations
    const monthKey = `${trackedTime.getFullYear()}-${trackedTime.getMonth()}`
    if (!monthlyData[monthKey]) {
      monthlyData[monthKey] = { income: 0, expense: 0 }
    }

    if (category.type === 'income') {
      monthlyData[monthKey].income += amount
    } else if (category.type === 'expense') {
      monthlyData[monthKey].expense += amount
    }
  })

  // Calculate Monthly Spending and Savings
  const monthlyTotals = Object.values(monthlyData)
  const totalMonths = monthlyTotals.length || 1

  const averageMonthlySpending =
    monthlyTotals.reduce((sum, month) => sum + month.expense, 0) / totalMonths
  const averageMonthlySavings =
    monthlyTotals.reduce(
      (sum, month) => sum + (month.income - month.expense),
      0,
    ) / totalMonths

  return {
    totalBalance,
    monthlySpending: averageMonthlySpending,
    monthlySavings: averageMonthlySavings,
    totalSpending,
    totalEarning,
  }
}
