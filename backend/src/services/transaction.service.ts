import {
  CreateTransactionPayload,
  MetricsRequest,
  TransactionQueryParams,
  UpdateTransactionPayload,
} from '../dtos/transaction.dto'
import {
  createTransaction,
  deleteTransaction,
  findAllTransactions,
  findAllTransactionsByDate,
  findSpendingByDate,
  getTransactions,
  updateTransaction,
} from '../models/transaction.model'

export const trackTransactionService = async (
  data: CreateTransactionPayload,
) => {
  const result = await createTransaction({
    ...data,
    trackedTime: new Date(data.trackedTime),
  })
  return result
}

export const listTransactions = async (params: TransactionQueryParams) => {
  const {
    userId,
    startTrackedTime,
    endTrackedTime,
    categoryId,
    sortBy,
    sortOrder,
    categoryType,
  } = params

  let startTrackedTimeDate: Date | undefined
  let endTrackedTimeDate: Date | undefined

  if (startTrackedTime) {
    startTrackedTimeDate = new Date(startTrackedTime)
    if (isNaN(startTrackedTimeDate.getTime())) {
      throw new Error('Invalid startTrackedTime format')
    }
  }

  if (endTrackedTime) {
    endTrackedTimeDate = new Date(endTrackedTime)
    if (isNaN(endTrackedTimeDate.getTime())) {
      throw new Error('Invalid endTrackedTime format')
    }
  }

  return getTransactions({
    userId,
    categoryId,
    sortBy,
    sortOrder,
    startTrackedTime: startTrackedTimeDate,
    endTrackedTime: endTrackedTimeDate,
    categoryType,
  })
}

export const updateTransactionService = async (
  payload: UpdateTransactionPayload,
) => {
  const result = await updateTransaction({
    ...payload,
    trackedTime: payload.trackedTime
      ? new Date(payload.trackedTime)
      : undefined,
  })
  return result
}

export const deleteTransactionService = async (
  transactionId: number,
  userId: number,
) => {
  const result = await deleteTransaction(transactionId, userId)
  return result
}

export const getMetrics = async ({
  userId,
  startDate,
  endDate,
}: MetricsRequest) => {
  const parsedStartDate = startDate ? new Date(startDate) : undefined
  const parsedEndDate = endDate ? new Date(endDate) : undefined
  const allTransactions = await findAllTransactions(userId)
  const filteredTransactions = await findAllTransactionsByDate({
    userId,
    startDate: parsedStartDate,
    endDate: parsedEndDate,
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

export const getMonthlySpendingService = async ({
  userId,
  startDate,
  endDate,
}: MetricsRequest) => {
  const parsedStartDate = startDate ? new Date(startDate) : undefined
  const parsedEndDate = endDate ? new Date(endDate) : undefined

  const spendingByDate = await findSpendingByDate(
    userId,
    parsedStartDate,
    parsedEndDate,
  )
  // Post-process to group by month
  const groupedByMonth = spendingByDate.reduce(
    (acc: { [key: string]: number }, { trackedTime, _sum }) => {
      const month = trackedTime.toISOString().slice(0, 7) // Extract "YYYY-MM" from the date
      if (!acc[month]) acc[month] = 0
      acc[month] += _sum.amount || 0
      return acc
    },
    {},
  )

  // Convert to an array format suitable for the frontend
  return Object.entries(groupedByMonth)
    .map(([month, totalSpending]) => ({ month, totalSpending }))
    .sort((a, b) => a.month.localeCompare(b.month))
}
