import { Request, Response, NextFunction } from 'express'
import { z } from 'zod'
import { errorResponse } from '../utils/errorResponse'

const validateRequestQuery = (schema: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      // Validate the request query using Zod
      schema.parse(req.query)
      next()
    } catch (error) {
      // If validation fails, return a 404 error with the validation error details
      if (error instanceof z.ZodError) {
        errorResponse(res, 404, 'Invalid request query', error.errors)
      } else {
        errorResponse(res, 404, 'Invalid request query')
      }
    }
  }
}

export default validateRequestQuery
