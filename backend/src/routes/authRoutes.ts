import { Router } from 'express'
import * as AuthController from '../controllers/authController'
import validateRequestBody from '../middlewares/validationRequestBody'
import { loginDto, registerDto } from '../dtos/authDtos'

const router = Router()

router.post(
  '/register',
  validateRequestBody(registerDto),
  AuthController.register,
)
router.post('/login', validateRequestBody(loginDto), AuthController.login)
router.get('/confirm-email', AuthController.confirmEmail)

export default router
