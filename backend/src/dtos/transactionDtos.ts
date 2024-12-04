import { z } from 'zod'

export const trackTransactionDto = z.object({
  categoryId: z.number().positive(),
  amount: z.number().positive(),
  description: z.string().optional(),
  trackedTime: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Invalid date format for trackedTime',
  }),
})

export const transactionsParamsDto = z.object({
  startTrackedTime: z.string().optional(),
  endTrackedTime: z.string().optional(),
  categoryId: z
    .string()
    .regex(/^\d+$/, {
      message: 'categoryId must be a string of numbers',
    })
    .optional(),
  sortBy: z.enum(['amount', 'trackedTime']).optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
})
