import { config } from "@/config/env";
import axios from "axios";

const API_URL = config.apiUrl;

export const createApiInstance = (accessToken?: string) => {
  return axios.create({
    baseURL: API_URL,
    headers: {
      "Content-Type": "application/json",
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    },
  });
};

export const api = createApiInstance();