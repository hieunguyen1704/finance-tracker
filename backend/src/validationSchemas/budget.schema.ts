import { z } from 'zod'

export const createBudgetSchema = z.object({
  categoryId: z.number().positive(),
  amount: z.number().positive(),
  startDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Invalid date format for startDate',
  }),
  endDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Invalid date format for endDate',
  }),
})

export const updateBudgetSchema = z.object({
  categoryId: z.number().positive().optional(),
  amount: z.number().positive().optional(),
  startDate: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: 'Invalid date format for startDate',
    })
    .optional(),
  endDate: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: 'Invalid date format for endDate',
    })
    .optional(),
})
