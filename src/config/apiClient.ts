import axios from "axios";
import { API_CONFIG } from "./api";

export const apiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "*/*",
  },
});
