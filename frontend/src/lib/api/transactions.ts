import { createApiInstance } from "@/lib/axios";
import { Category, Transaction } from "@/types";

export interface TransactionMetrics {
  totalBalance: number;
  monthlySpending: number;
  monthlySavings: number;
  totalSpending: number;
  totalEarning: number;
}

export interface SpendingTrend {
  month: string;
  totalSpending: number;
}

export interface CreateTransactionData {
  categoryId: number;
  amount: number;
  description?: string;
  trackedTime: string;
}

export interface UpdateTransactionData {
  amount?: number;
  trackedTime?: string;
  categoryId?: number;
  description?: string;
}

export const fetchTransactions = async (
  params: {
    startTrackedTime: string;
    endTrackedTime: string;
    categoryType?: "expense" | "income";
  },
  accessToken?: string
): Promise<Transaction[]> => {
  const api = createApiInstance(accessToken);
  const response = await api.get("/api/transaction", {
    params: {
      ...params,
      sortBy: "trackedTime",
      sortOrder: "desc",
    },
  });
  return response.data;
};

export const createTransaction = async (
  data: CreateTransactionData,
  accessToken?: string
) => {
  const api = createApiInstance(accessToken);
  const response = await api.post("/api/transaction", data);
  return response.data;
};

export const updateTransaction = async (
  id: number,
  data: UpdateTransactionData,
  accessToken?: string
) => {
  const api = createApiInstance(accessToken);
  const response = await api.put(`/api/transaction/${id}`, data);
  return response.data;
};

export const deleteTransaction = async (id: number, accessToken?: string) => {
  const api = createApiInstance(accessToken);
  const response = await api.delete(`/api/transaction/${id}`);
  return response.data;
};

export const fetchTransactionMetrics = async (
  startDate: string,
  endDate: string,
  accessToken?: string
): Promise<TransactionMetrics> => {
  const api = createApiInstance(accessToken);
  const response = await api.get(`/api/transaction/metrics`, {
    params: { startDate, endDate },
  });
  return response.data;
};

export const fetchSpendingTrends = async (
  startDate: string,
  endDate: string,
  accessToken?: string
): Promise<SpendingTrend[]> => {
  const api = createApiInstance(accessToken);
  const response = await api.get(`/api/transaction/spending-trend`, {
    params: { startDate, endDate },
  });
  return response.data;
};