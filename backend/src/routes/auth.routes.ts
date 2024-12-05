import { Router } from 'express'
import * as AuthController from '../controllers/auth.controller'
import validateRequestBody from '../middlewares/validationRequestBody.middleware'
import { loginSchema, registerSchema } from '../validationSchemas/auth.schema'

const router = Router()

router.post(
  '/register',
  validateRequestBody(registerSchema),
  AuthController.register,
)
router.post('/login', validateRequestBody(loginSchema), AuthController.login)
router.get('/confirm-email', AuthController.confirmEmail)

export default router
