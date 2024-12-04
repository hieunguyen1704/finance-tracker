import { Router } from 'express'
import { authMiddleware } from '../middlewares/authMiddleware'
import {
  getTransactionsController,
  trackTransactionController,
} from '../controllers/transactionController'
import validateRequestBody from '../middlewares/validationRequestBody'
import {
  trackTransactionDto,
  transactionsParamsDto,
} from '../dtos/transactionDtos'
import validateRequestQuery from '../middlewares/validationRequestQuery'

const router = Router()

router.post(
  '/',
  authMiddleware,
  validateRequestBody(trackTransactionDto),
  trackTransactionController,
)

router.get(
  '/',
  authMiddleware,
  validateRequestQuery(transactionsParamsDto),
  getTransactionsController,
)

export default router
