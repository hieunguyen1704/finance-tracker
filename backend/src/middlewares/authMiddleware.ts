import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config/dotenv'
import { errorResponse } from '../utils/errorResponse'

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401)
    errorResponse(res, 401, 'Unauthorized: No token provided')
    return
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    if (typeof decoded === 'object' && 'id' in decoded && 'email' in decoded) {
      req.user = decoded as { id: number; email: string }
      next()
    } else {
      errorResponse(res, 401, 'Unauthorized: Invalid token payload')
    }
  } catch (error) {
    errorResponse(res, 401, 'Unauthorized: Invalid token')
  }
}
