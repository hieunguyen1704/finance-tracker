export interface CreateBudgetInput {
  userId: number
  categoryId: number
  amount: number
  startDate: Date
  endDate: Date
}

export interface CreateBudgetPayload
  extends Omit<CreateBudgetInput, 'startDate' | 'endDate'> {
  startDate: string
  endDate: string
}

export interface UpdateBudgetInput extends Partial<CreateBudgetInput> {}

export interface UpdateBudgetPayload extends Partial<CreateBudgetPayload> {}

export interface BudgetsFilter {
  startDate?: Date
  endDate?: Date
}

export interface BudgetsParams {
  startDate?: string
  endDate?: string
}
