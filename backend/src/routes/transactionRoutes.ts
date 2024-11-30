import { Router } from 'express'
import { authMiddleware } from '../middlewares/authMiddleware'
import { trackTransactionController } from '../controllers/transactionController'
import validateRequestBody from '../middlewares/validationRequestBody'
import { trackTransactionDto } from '../dtos/transactionDtos'

const router = Router()

router.post(
  '/track',
  authMiddleware,
  validateRequestBody(trackTransactionDto),
  trackTransactionController,
)

export default router
