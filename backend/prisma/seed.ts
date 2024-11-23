import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const defaultCategories = [
    { name: 'Salary', type: 'income', description: 'Income from employment' },
    {
      name: 'Freelance',
      type: 'income',
      description: 'Income from freelance work',
    },
    {
      name: 'Interest',
      type: 'income',
      description: 'Interest earned on investments',
    },
    { name: 'Gifts', type: 'income', description: 'Money received as gifts' },
    {
      name: 'Other Income',
      type: 'income',
      description: 'Other sources of income',
    },
    { name: 'Rent', type: 'expense', description: 'Rent payments for housing' },
    {
      name: 'Utilities',
      type: 'expense',
      description: 'Utility bills (electricity, water, gas)',
    },
    {
      name: 'Groceries',
      type: 'expense',
      description: 'Food and grocery purchases',
    },
    {
      name: 'Transportation',
      type: 'expense',
      description: 'Transportation costs (fuel, public transport)',
    },
    {
      name: 'Dining Out',
      type: 'expense',
      description: 'Money spent on dining out',
    },
    {
      name: 'Shopping',
      type: 'expense',
      description: 'Money spent on shopping',
    },
    {
      name: 'Entertainment',
      type: 'expense',
      description: 'Money spent on entertainment (movies, games, etc.)',
    },
    {
      name: 'Health',
      type: 'expense',
      description: 'Healthcare costs (medical bills, insurance)',
    },
    {
      name: 'Education',
      type: 'expense',
      description: 'Education expenses (tuition, books)',
    },
    {
      name: 'Other Expenses',
      type: 'expense',
      description: 'Other miscellaneous expenses',
    },
  ]

  await prisma.category.createMany({
    data: defaultCategories,
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
