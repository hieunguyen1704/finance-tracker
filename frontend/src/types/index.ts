export interface User {
  id: number;
  email: string;
  name: string;
  accessToken: string;
}

export interface Category {
  id: number;
  name: string;
  type: "income" | "expense";
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Transaction {
  id: number;
  userId: number;
  categoryId: number;
  amount: number;
  description?: string;
  createdAt: string;
  updatedAt: string;
  trackedTime: string;
  category: Category;
}

export interface Budget {
  id: number;
  userId: number;
  categoryId: number;
  amount: number;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
  category: Category;
  totalUsage: number;
}

export interface BudgetFormData {
  categoryId: number;
  amount: number;
  startDate: Date;
  endDate: Date;
  repeat?: boolean;
}

export interface TransactionFormData {
  categoryId: number;
  amount: number;
  description?: string;
  trackedTime: Date;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}