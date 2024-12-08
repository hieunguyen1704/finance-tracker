import { Router } from 'express'
import { authMiddleware } from '../middlewares/auth.middleware'
import validateRequestBody from '../middlewares/validationRequestBody.middleware'
import {
  createBudgetSchema,
  updateBudgetSchema,
} from '../validationSchemas/budget.schema'
import {
  createBudgetController,
  deleteBudgetController,
  getBudgetsController,
  updateBudgetController,
} from '../controllers/budget.controller'

const router = Router()

router.post(
  '/',
  authMiddleware,
  validateRequestBody(createBudgetSchema),
  createBudgetController,
)

router.get('/', authMiddleware, getBudgetsController)

router.put(
  '/:budgetId',
  authMiddleware,
  validateRequestBody(updateBudgetSchema),
  updateBudgetController,
)
router.delete('/:budgetId', authMiddleware, deleteBudgetController)

export default router
