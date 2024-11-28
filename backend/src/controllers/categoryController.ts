import { Request, Response } from 'express'
import { getCategories } from '../services/categoryService'
import { errorResponse } from '../utils/errorResponse'

export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await getCategories()
    res.status(200).json(categories)
  } catch (error) {
    console.error('Error fetching categories:', error)
    errorResponse(res, 500, 'Internal server error')
  }
}
