import express from 'express'
import { getAllCategories } from '../controllers/category.controller'
import { authMiddleware } from '../middlewares/auth.middleware'

const router = express.Router()

router.get('/', authMiddleware, getAllCategories)

export default router
