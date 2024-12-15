import { createApiInstance } from "@/lib/axios";
import { Category } from "@/types";

export const fetchCategories = async (accessToken?: string): Promise<Category[]> => {
  const api = createApiInstance(accessToken);
  const response = await api.get("/api/category");
  return response.data;
};