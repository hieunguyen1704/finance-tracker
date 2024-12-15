import { api } from "../axios";
import { LoginData, RegisterData, User } from "@/types";

export const registerUser = async (data: RegisterData): Promise<User> => {
  const response = await api.post("/api/auth/register", data);
  return response.data;
};

export const loginUser = async (data: LoginData): Promise<User> => {
  const response = await api.post("/api/auth/login", data);
  return response.data;
};

export const confirmEmail = async (token: string): Promise<void> => {
  const response = await api.get(`/api/auth/confirm-email?token=${token}`);
  return response.data;
};