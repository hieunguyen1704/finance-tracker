import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function migrateBudgetUsage() {
  console.log('Starting budget usage migration...')

  try {
    // Step 1: Fetch all expense transactions
    const expenseTransactions = await prisma.transaction.findMany({
      where: { category: { type: 'expense' } },
    })

    console.log(`Found ${expenseTransactions.length} expense transactions.`)

    let totalBudgetUsagesCreated = 0

    for (const transaction of expenseTransactions) {
      const {
        id: transactionId,
        userId,
        categoryId,
        amount,
        trackedTime,
      } = transaction

      // Step 2: Find matching budgets for the transaction
      const matchingBudgets = await prisma.budget.findMany({
        where: {
          userId,
          categoryId,
          startDate: { lte: trackedTime },
          endDate: { gte: trackedTime },
        },
      })

      if (matchingBudgets.length > 0) {
        const budgetUsages = matchingBudgets.map((budget) => ({
          budgetId: budget.id,
          transactionId,
          spent: amount,
        }))

        // Step 3: Create BudgetUsage records for matching budgets
        const result = await prisma.budgetUsage.createMany({
          data: budgetUsages,
          skipDuplicates: true, // To prevent duplicates if script is rerun
        })

        totalBudgetUsagesCreated += result.count
      }
    }

    console.log(
      `Migration completed. Total BudgetUsage records created: ${totalBudgetUsagesCreated}`,
    )
  } catch (error) {
    console.error('Error during migration:', error)
  } finally {
    await prisma.$disconnect()
  }
}

migrateBudgetUsage()
