import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const startDate = new Date("2024-11-01T00:00:00.000Z")
  const endDate = new Date("2024-12-06T00:00:00.000Z")
  const userId = 1
  const categoryIdRange = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15]

  for (
    let date = startDate;
    date <= endDate;
    date.setDate(date.getDate() + 1)
  ) {
    const numTransactions = Math.floor(Math.random() * 3) + 1
    for (let i = 0; i < numTransactions; i++) {
      const transaction = await prisma.transaction.create({
        data: {
          userId,
          trackedTime: date.toISOString(),
          categoryId:
            categoryIdRange[Math.floor(Math.random() * categoryIdRange.length)],
          amount: Math.floor(Math.random() * (100000 - 20000 + 1)) + 20000,
        },
      })
      console.log(`Created transaction: ${transaction.id}`)
    }
  }
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
