import { Response } from 'express'

export const errorResponse = (
  res: Response,
  statusCode: number,
  message: string,
  details?: object,
) => {
  res.status(statusCode).json({ error: message, details })
}
