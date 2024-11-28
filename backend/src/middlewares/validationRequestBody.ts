import { Request, Response, NextFunction } from 'express'
import { z } from 'zod'
import { errorResponse } from '../utils/errorResponse'

const validateRequestBody = (schema: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      // Validate the request body using Zod
      schema.parse(req.body)
      next()
    } catch (error) {
      // If validation fails, return a 404 error with the validation error details
      if (error instanceof z.ZodError) {
        errorResponse(res, 404, 'Invalid request body', error.errors)
      } else {
        errorResponse(res, 404, 'Invalid request body')
      }
    }
  }
}

export default validateRequestBody
