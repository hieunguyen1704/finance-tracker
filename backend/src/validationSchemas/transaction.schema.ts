import { z } from 'zod'

export const trackTransactionSchema = z.object({
  categoryId: z.number().positive(),
  amount: z.number().positive(),
  description: z.string().optional(),
  trackedTime: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Invalid date format for trackedTime',
  }),
})

export const transactionsParamsSchema = z.object({
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
  categoryType: z.enum(['income', 'expense']).optional(),
})

export const transactionsMetricSchema = z.object({
  startDate: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: 'Invalid date format for trackedTime',
    })
    .optional(),
  endDate: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: 'Invalid date format for trackedTime',
    })
    .optional(),
})
