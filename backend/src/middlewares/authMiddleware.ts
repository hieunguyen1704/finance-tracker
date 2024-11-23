// import { Request, Response, NextFunction } from 'express'
// import jwt from 'jsonwebtoken'
// import { JWT_SECRET } from '../config/dotenv'

// export const authenticate = (
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) => {
//   const token = req.headers.authorization?.split(' ')[1]
//   if (!token) {
//     return res.status(401).json({ error: 'Unauthorized' })
//   }

//   try {
//     const decoded = jwt.verify(token, JWT_SECRET)
//     req.user = decoded // Attach user data to the request object
//     next()
//   } catch (error) {
//     return res.status(403).json({ error: 'Invalid token' })
//   }
// }
