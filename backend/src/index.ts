import express from 'express'
import authRoutes from './routes/authRoutes'
import categoryRoutes from './routes/categoryRoutes'

const app = express()

app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/categories', categoryRoutes)

app.get('/', async (req, res) => {
  res.json({
    data: 'Hello world',
  })
})

app.listen(3000, () => console.log('Server running on http://localhost:3000'))
