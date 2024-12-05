import express from 'express'
import authRoutes from './routes/auth.routes'
import categoryRoutes from './routes/category.routes'
import transactionRoutes from './routes/transaction.routes'

const app = express()

app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/transaction', transactionRoutes)

app.get('/', async (req, res) => {
  res.json({
    data: 'Hello world',
  })
})

app.listen(3000, () => console.log('Server running on http://localhost:3000'))
