import { Request, Response, NextFunction } from 'express'
import { z } from 'zod'

const validateRequestBody = (schema: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      // Validate the request body using Zod
      schema.parse(req.body)
      next()
    } catch (error) {
      // If validation fails, return a 404 error with the validation error details
      if (error instanceof z.ZodError) {
        res.status(404).json({
          error: 'Invalid request body',
          details: error.errors, // Zod error details
        })
      } else {
        res.status(404).json({
          error: 'Invalid request body',
        })
      }
    }
  }
}

export default validateRequestBody
