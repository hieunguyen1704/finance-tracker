export interface TransactionQueryParams {
  userId: number
  startTrackedTime?: string
  endTrackedTime?: string
  categoryId?: number
  sortBy?: 'amount' | 'trackedTime'
  sortOrder?: 'asc' | 'desc'
  categoryType?: 'income' | 'expense'
}

export interface CreateTransactionInput {
  userId: number
  categoryId: number
  amount: number
  description?: string
  trackedTime: Date
}

export interface CreateTransactionPayload {
  userId: number
  categoryId: number
  amount: number
  description?: string
  trackedTime: string
}

export interface GetTransactionsInput {
  userId: number
  startTrackedTime?: Date
  endTrackedTime?: Date
  categoryId?: number
  sortBy?: 'amount' | 'trackedTime'
  sortOrder?: 'asc' | 'desc'
  categoryType?: 'income' | 'expense'
}

export interface UpdateTransactionInput {
  transactionId: number
  userId: number
  amount?: number
  trackedTime?: Date
  categoryId?: number
  description?: string
}

export interface UpdateTransactionPayload {
  transactionId: number
  userId: number
  amount?: number
  trackedTime?: string
  categoryId?: number
  description?: string
}

export interface MetricsRequest {
  userId: number
  startDate?: string
  endDate?: string
}

export interface MetricsInput {
  userId: number
  startDate?: Date
  endDate?: Date
}
