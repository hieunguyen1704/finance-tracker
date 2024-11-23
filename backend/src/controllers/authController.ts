import { Request, Response } from 'express'
import * as authService from '../services/authService'

/**
 * Handles user registration.
 * @param req - Express request object.
 * @param res - Express response object.
 */
export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body

    if (!email || !password) {
      res.status(400).json({ error: 'Email and password are required' })
    }

    const result = await authService.registerUser(email, password, name)
    res.status(201).json(result)
  } catch (error) {
    console.error(error)
    if (error instanceof Error) {
      res.status(400).json({ error: error.message })
    } else {
      res.status(400).json({ error: 'An unknown error occurred' })
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
      res.status(400).json({ error: 'Invalid or missing token' })
    }

    const user = await authService.confirmEmailWithMagicLink(token as string)
    res.status(200).json({ message: 'Email confirmed successfully', user })
  } catch (error) {
    console.error(error)
    if (error instanceof Error) {
      res.status(400).json({ error: error.message })
    } else {
      res.status(400).json({ error: 'An unknown error occurred' })
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
      res.status(400).json({ error: 'Email and password are required' })
    }

    const result = await authService.loginWithEmail(email, password)
    res.status(200).json(result)
  } catch (error) {
    console.error(error)
    if (error instanceof Error) {
      res.status(400).json({ error: error.message })
    } else {
      res.status(400).json({ error: 'An unknown error occurred' })
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
      res.status(400).json({ error: 'Email is required' })
    }

    const result = await authService.resendConfirmationEmail(email)
    res.status(200).json(result)
  } catch (error) {
    console.error(error)
    if (error instanceof Error) {
      res.status(400).json({ error: error.message })
    } else {
      res.status(400).json({ error: 'An unknown error occurred' })
    }
  }
}
