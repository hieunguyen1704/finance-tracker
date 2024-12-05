import { Router } from 'express'
import * as AuthController from '../controllers/authController'
import validateRequestBody from '../middlewares/validationRequestBody'
import { loginSchema, registerSchema } from '../validationSchemas/authSchema'

const router = Router()

router.post(
  '/register',
  validateRequestBody(registerSchema),
  AuthController.register,
)
router.post('/login', validateRequestBody(loginSchema), AuthController.login)
router.get('/confirm-email', AuthController.confirmEmail)

export default router
