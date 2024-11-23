import express from 'express'
import { PrismaClient } from '@prisma/client'
import authRoutes from './routes/authRoutes'

const app = express()
const prisma = new PrismaClient()

app.use(express.json())

app.use('/api/auth', authRoutes)

app.get('/', async (req, res) => {
  const transactions = await prisma.transaction.findMany()
  res.json({
    test: 'Hello world',
    data: transactions,
  })
})

app.listen(3000, () => console.log('Server running on http://localhost:3000'))
