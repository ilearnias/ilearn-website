import apiRequest from "@/config/apiRequest";
import { API_ENDPOINTS } from "@/config/api";

export interface IJourney {
  id: string;
  year: string;
  description: string;
  media: string;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IJourneyCreate {
  year: string;
  description: string;
  media: string;
  order: number;
  isActive: boolean;
}

export interface IJourneyUpdate extends Partial<IJourneyCreate> {}

export interface IJourneyListResponse {
  data: IJourney[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export const journeyService = {
  // Get all journey items with pagination
  getAllJourney: async (page = 1, limit = 10) => {
    try {
      const response = await apiRequest.get(
        `/v1/journey?page=${page}&limit=${limit}`
      );
      if (!response.status) {
        throw new Error(response.message || "Failed to fetch journey items");
      }

      return {
        status: true,
        data: response.data,
        message: "Journey items fetched successfully",
      };
    } catch (error) {
      throw error;
    }
  },

  // Get journey by ID
  getJourneyById: async (id: string) => {
    try {
      const response = await apiRequest.get(`/v1/journey/${id}`);
      if (!response.status) {
        throw new Error(response.message || "Failed to fetch journey item");
      }

      return {
        status: true,
        data: response.data,
        message: "Journey item fetched successfully",
      };
    } catch (error) {
      throw error;
    }
  },

  // Create new journey
  createJourney: async (data: IJourneyCreate) => {
    try {
      const response = await apiRequest.post("/v1/journey", data);

      if (!response.status) {
        throw new Error(response.message || "Failed to create journey item");
      }

      return {
        status: true,
        data: response.data,
        message: "Journey item created successfully",
      };
    } catch (error) {
      throw error;
    }
  },

  // Update journey
  updateJourney: async (id: string, data: IJourneyUpdate) => {
    try {
      const response = await apiRequest.patch(`/v1/journey/${id}`, data);

      if (!response.status) {
        throw new Error(response.message || "Failed to update journey item");
      }

      return {
        status: true,
        data: response.data,
        message: "Journey item updated successfully",
      };
    } catch (error) {
      throw error;
    }
  },

  // Delete journey
  deleteJourney: async (id: string) => {
    try {
      const response = await apiRequest.delete(`/v1/journey/${id}`);

      if (!response.status) {
        throw new Error(response.message || "Failed to delete journey item");
      }

      return {
        status: true,
        message: "Journey item deleted successfully",
      };
    } catch (error: any) {
      console.error("Delete journey error:", error);

      if (error.status === 404 || error.statusCode === 404) {
        return {
          status: true,
          message: "Journey item not found or already deleted",
        };
      }

      throw {
        status: false,
        message:
          error.message ||
          "Failed to delete journey item. Please check your connection and try again.",
        statusCode: error.status || error.statusCode,
        error: error,
      };
    }
  },

  // Get active journey items for public display
  getPublicJourney: async (page = 1, limit = 50) => {
    try {
      const response = await apiRequest.get(
        `/v1/journey/public?page=${page}&limit=${limit}`
      );
      if (!response.status) {
        throw new Error(
          response.message || "Failed to fetch public journey items"
        );
      }

      return {
        status: true,
        data: response.data,
        message: "Public journey items fetched successfully",
      };
    } catch (error) {
      throw error;
    }
  },

  // Upload a single image and return its URL
  uploadSingleImage: async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await apiRequest.upload("/v1/upload/image", formData);
    if (response.status && response.data) {
      return response.data.url || response.data;
    }
    throw new Error(response.message || "Failed to upload image");
  },

  // Validate image file
  validateImageFile: (file: File) => {
    const maxSize = 5 * 1024 * 1024; // 5MB
    const acceptedFormats = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/webp",
    ];

    if (file.size > maxSize) {
      throw new Error("File size must be less than 5MB");
    }

    if (!acceptedFormats.includes(file.type)) {
      throw new Error("Only JPEG, PNG, GIF, and WebP formats are supported");
    }
  },
};
