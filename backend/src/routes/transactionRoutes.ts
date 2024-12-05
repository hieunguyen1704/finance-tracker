import { Router } from 'express'
import { authMiddleware } from '../middlewares/authMiddleware'
import {
  deleteTransactionController,
  getTransactionsController,
  trackTransactionController,
  updateTransactionController,
} from '../controllers/transactionController'
import validateRequestBody from '../middlewares/validationRequestBody'
import {
  trackTransactionSchema,
  transactionsParamsSchema,
} from '../validationSchemas/transactionSchema'
import validateRequestQuery from '../middlewares/validationRequestQuery'

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

router.put(
  '/:transactionId',
  authMiddleware,
  validateRequestBody(trackTransactionSchema),
  updateTransactionController,
)
router.delete('/:transactionId', authMiddleware, deleteTransactionController)

export default router
