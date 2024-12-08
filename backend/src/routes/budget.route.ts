import { Router } from 'express'
import { authMiddleware } from '../middlewares/auth.middleware'
import validateRequestBody from '../middlewares/validationRequestBody.middleware'
import {
  budgetParamsSchema,
  createBudgetSchema,
  updateBudgetSchema,
} from '../validationSchemas/budget.schema'
import {
  createBudgetController,
  deleteBudgetController,
  getBudgetsController,
  updateBudgetController,
} from '../controllers/budget.controller'
import validateRequestQuery from '../middlewares/validationRequestQuery.middleware'

const router = Router()

router.post(
  '/',
  authMiddleware,
  validateRequestBody(createBudgetSchema),
  createBudgetController,
)

router.get(
  '/',
  authMiddleware,
  validateRequestQuery(budgetParamsSchema),
  getBudgetsController,
)

router.put(
  '/:budgetId',
  authMiddleware,
  validateRequestBody(updateBudgetSchema),
  updateBudgetController,
)
router.delete('/:budgetId', authMiddleware, deleteBudgetController)

export default router
