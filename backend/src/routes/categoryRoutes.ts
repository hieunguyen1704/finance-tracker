import express from 'express'
import { getAllCategories } from '../controllers/categoryController'
import { authMiddleware } from '../middlewares/authMiddleware'

const router = express.Router()

router.get('/', authMiddleware, getAllCategories)

export default router
