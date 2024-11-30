import { z } from 'zod'

export const trackTransactionDto = z.object({
  categoryId: z.number().positive(),
  amount: z.number().positive(),
  description: z.string().optional(),
  trackedTime: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Invalid date format for trackedTime',
  }),
})
