import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
  AxiosProgressEvent,
} from "axios";
import { API_CONFIG } from "./api";
import { login, logout } from "@/redux/slices/authSlice";

// Types for API response
export interface ApiResponse<T = any> {
  meta: any;
  status: boolean;
  data: T;
  message?: string;
  error?: string;
  total?: number;
  page?: number;
  limit?: number;
}

// Error interface
export interface ApiError {
  message: string;
  code?: string;
  status?: number;
  errors?: Record<string, string[]>;
}

// API Error Response interface
interface ApiErrorResponse {
  data?: {
    message?: string;
    code?: string;
    errors?: Record<string, string[]>;
  };
  status?: number;
}

// Store reference for accessing Redux state
let store: any = null;

// Function to set the Redux store reference
export const setStore = (storeInstance: any) => {
  store = storeInstance;
};

// Function to get token from Redux store
const getTokenFromStore = (): string | null => {
  if (!store) {
    console.log("getTokenFromStore: No store available");
    return null;
  }

  const state = store.getState();
  const token = state.auth?.token || state.auth?.user?.token || null;

  console.log("getTokenFromStore: Token check", {
    hasStore: !!store,
    authState: !!state.auth,
    tokenFromAuth: !!state.auth?.token,
    tokenFromUser: !!state.auth?.user?.token,
    finalToken: !!token,
  });

  return token;
};

// Create axios instance with default config
const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: 30000, // 30 seconds
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Get token from Redux store
    const token = getTokenFromStore();

    console.log("API Request - Token check:", {
      hasToken: !!token,
      tokenLength: token?.length,
      url: config.url,
      method: config.method,
      headers: config.headers,
    });

    // Add authorization header if token exists
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    // Handle 401 Unauthorized error
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Get refresh token from localStorage
      const refreshToken =
        typeof window !== "undefined"
          ? localStorage.getItem("refreshToken")
          : null;

      // If no refresh token, redirect to login immediately
      if (!refreshToken) {
        if (store) {
          store.dispatch(logout());
        }
        localStorage.removeItem("adminToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/adminlogin";
        return Promise.reject(new Error("No refresh token available"));
      }

      try {
        // Try to refresh token
        const response = await axiosInstance.post("/v1/auth/refresh-token", {
          refreshToken,
        });

        if (response.data.accessToken) {
          // Update Redux store with new tokens
          if (store) {
            store.dispatch(
              login({
                user: store.getState().auth.user, // Keep existing user
                token: response.data.accessToken,
              })
            );
          }

          // Also save to localStorage as fallback
          localStorage.setItem("adminToken", response.data.accessToken);
          if (response.data.refreshToken) {
            localStorage.setItem("refreshToken", response.data.refreshToken);
          }

          // Update authorization header
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
          }

          // Retry original request
          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        // Handle refresh token failure
        if (store) {
          store.dispatch(logout());
        }
        localStorage.removeItem("adminToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/adminlogin";
        return Promise.reject(refreshError);
      }
    }

    // Log the error details for debugging
    console.log("API Error Response:", {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      url: error.config?.url,
      method: error.config?.method,
    });

    // Format error response
    const errorResponse: ApiError = {
      message:
        (error.response as ApiErrorResponse)?.data?.message ||
        "An unexpected error occurred",
      code: (error.response as ApiErrorResponse)?.data?.code,
      status: error.response?.status,
      errors: (error.response as ApiErrorResponse)?.data?.errors,
    };

    return Promise.reject(errorResponse);
  }
);

// Generic request function with type support
async function request<T = any>(
  config: AxiosRequestConfig
): Promise<ApiResponse<T>> {
  try {
    const response: AxiosResponse<ApiResponse<T>> = await axiosInstance(config);
    return response.data;
  } catch (error) {
    throw error;
  }
}

// API request methods
export const apiRequest = {
  get: <T = any>(url: string, config?: AxiosRequestConfig) =>
    request<T>({ ...config, method: "GET", url }),

  post: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) =>
    request<T>({ ...config, method: "POST", url, data }),

  put: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) =>
    request<T>({ ...config, method: "PUT", url, data }),

  patch: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) =>
    request<T>({ ...config, method: "PATCH", url, data }),

  delete: <T = any>(url: string, config?: AxiosRequestConfig) =>
    request<T>({ ...config, method: "DELETE", url }),

  // File upload with progress tracking
  upload: async <T = any>(
    url: string,
    data: FormData,
    onProgress?: (progress: number) => void
  ) => {
    try {
      // Get token from Redux store
      const token = getTokenFromStore();

      const headers: Record<string, string | undefined> = {
        "Content-Type": undefined, // Let browser set the correct boundary
        Accept: "application/json",
      };

      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const response = await axiosInstance.post<ApiResponse<T>>(url, data, {
        headers,
        onUploadProgress: (progressEvent: AxiosProgressEvent) => {
          if (onProgress && progressEvent.total && progressEvent.loaded) {
            const progress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            onProgress(progress);
          }
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default apiRequest;
