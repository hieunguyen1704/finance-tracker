import { Router } from 'express'
import { authMiddleware } from '../middlewares/auth.middleware'
import {
  deleteTransactionController,
  getMetricsController,
  getMonthlySpendingController,
  getTransactionsController,
  trackTransactionController,
  updateTransactionController,
} from '../controllers/transaction.controller'
import validateRequestBody from '../middlewares/validationRequestBody.middleware'
import {
  trackTransactionSchema,
  transactionsMetricSchema,
  transactionsParamsSchema,
  updateTransactionSchema,
} from '../validationSchemas/transaction.schema'
import validateRequestQuery from '../middlewares/validationRequestQuery.middleware'

const router = Router()

router.post(
  '/',
  authMiddleware,
  validateRequestBody(trackTransactionSchema),
  trackTransactionController,
)

router.get(
  '/',
  authMiddleware,
  validateRequestQuery(transactionsParamsSchema),
  getTransactionsController,
)

router.get(
  '/metrics',
  authMiddleware,
  validateRequestQuery(transactionsMetricSchema),
  getMetricsController,
)

router.get(
  '/spending-trend',
  authMiddleware,
  validateRequestQuery(transactionsMetricSchema),
  getMonthlySpendingController,
)

router.put(
  '/:transactionId',
  authMiddleware,
  validateRequestBody(updateTransactionSchema),
  updateTransactionController,
)
router.delete('/:transactionId', authMiddleware, deleteTransactionController)

export default router
