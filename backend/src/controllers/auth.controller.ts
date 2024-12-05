import { Request, Response } from 'express'
import * as authService from '../services/auth.service'
import { errorResponse } from '../utils/errorResponse'

/**
 * Handles user registration.
 * @param req - Express request object.
 * @param res - Express response object.
 */
export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body

    if (!email || !password) {
      errorResponse(res, 400, 'Email and password are required')
    }

    const result = await authService.registerUser(email, password, name)
    res.status(201).json(result)
  } catch (error) {
    console.error(error)
    if (error instanceof Error) {
      errorResponse(res, 500, error.message)
    } else {
      errorResponse(res, 500, 'An unknown error occurred')
    }
  }
}

/**
 * Handles email confirmation via magic link.
 * @param req - Express request object.
 * @param res - Express response object.
 */
export const confirmEmail = async (req: Request, res: Response) => {
  try {
    const { token } = req.query

    if (!token || typeof token !== 'string') {
      errorResponse(res, 400, 'Invalid or missing token')
    }

    const user = await authService.confirmEmailWithMagicLink(token as string)
    res.status(200).json({ ...user })
  } catch (error) {
    console.error(error)
    if (error instanceof Error) {
      errorResponse(res, 500, error.message)
    } else {
      errorResponse(res, 500, 'An unknown error occurred')
    }
  }
}

/**
 * Handles user login.
 * @param req - Express request object.
 * @param res - Express response object.
 */
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      errorResponse(res, 400, 'Email and password are required')
    }

    const result = await authService.loginWithEmail(email, password)
    res.status(200).json(result)
  } catch (error) {
    console.error(error)
    if (error instanceof Error) {
      errorResponse(res, 500, error.message)
    } else {
      errorResponse(res, 500, 'An unknown error occurred')
    }
  }
}

/**
 * Sends a new confirmation email.
 * @param req - Express request object.
 * @param res - Express response object.
 */
export const resendConfirmationEmail = async (req: Request, res: Response) => {
  try {
    const { email } = req.body

    if (!email) {
      errorResponse(res, 400, 'Email is required')
    }

    const result = await authService.resendConfirmationEmail(email)
    res.status(200).json(result)
  } catch (error) {
    console.error(error)
    if (error instanceof Error) {
      errorResponse(res, 500, error.message)
    } else {
      errorResponse(res, 500, 'An unknown error occurred')
    }
  }
}
