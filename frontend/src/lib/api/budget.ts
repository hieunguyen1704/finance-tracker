import { createApiInstance } from "@/lib/axios";
import { Budget, BudgetFormData } from "@/types";

export const fetchBudgets = async (accessToken?: string): Promise<Budget[]> => {
  const api = createApiInstance(accessToken);
  const response = await api.get("/api/budget");
  return response.data;
};

export const addBudget = async (
  budget: {
    categoryId: number;
    amount: number;
    startDate: string;
    endDate: string;
  },
  accessToken?: string
): Promise<Budget> => {
  const api = createApiInstance(accessToken);
  const response = await api.post("/api/budget", budget);
  return response.data;
};

export const updateBudget = async (
  id: number,
  budget: Partial<{
    categoryId: number;
    amount: number;
    startDate: string;
    endDate: string;
  }>,
  accessToken?: string
): Promise<Budget> => {
  const api = createApiInstance(accessToken);
  const response = await api.put(`/api/budget/${id}`, budget);
  return response.data;
};

export const deleteBudget = async (
  id: number,
  accessToken?: string
): Promise<void> => {
  const api = createApiInstance(accessToken);
  await api.delete(`/api/budget/${id}`);
};