import express from 'express'
import authRoutes from './routes/auth.routes'
import categoryRoutes from './routes/category.routes'
import transactionRoutes from './routes/transaction.routes'
import budgetRoutes from './routes/budget.route'

const app = express()

app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/transaction', transactionRoutes)
app.use('/api/budget', budgetRoutes)

app.get('/', async (req, res) => {
  res.json({
    data: 'Hello, this is the finance tracker API',
  })
})

app.listen(3000, () => console.log('Server running on http://localhost:3000'))
