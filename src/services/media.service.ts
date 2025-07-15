import apiRequest from "@/config/apiRequest";
import { API_ENDPOINTS } from "@/config/api";

export interface IMedia {
  id: string;
  description: string;
  video: string;
  order: number;
  isActive: boolean;
  isTestimonial: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IMediaCreate {
  description: string;
  video: string;
  order: number;
  isActive: boolean;
  isTestimonial: boolean;
}

export interface IMediaUpdate extends Partial<IMediaCreate> {}

export interface IMediaListResponse {
  data: IMedia[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export const mediaService = {
  // Get all media with pagination
  getAllMedia: async (page = 1, limit = 10, isTestimonial = false) => {
    try {
      const response = await apiRequest.get(
        `/v1/media?page=${page}&limit=${limit}&isTestimonial=${isTestimonial}`
      );
      if (!response.status) {
        throw new Error(response.message || "Failed to fetch media");
      }

      return {
        status: true,
        data: response.data,
        message: "Media fetched successfully",
      };
    } catch (error) {
      throw error;
    }
  },

  // Get media by ID
  getMediaById: async (id: string) => {
    try {
      const response = await apiRequest.get(`/v1/media/${id}`);
      if (!response.status) {
        throw new Error(response.message || "Failed to fetch media");
      }

      return {
        status: true,
        data: response.data,
        message: "Media fetched successfully",
      };
    } catch (error) {
      throw error;
    }
  },

  // Create new media
  createMedia: async (data: IMediaCreate) => {
    try {
      const response = await apiRequest.post("/v1/media", data);

      if (!response.status) {
        throw new Error(response.message || "Failed to create media");
      }

      return {
        status: true,
        data: response.data,
        message: "Media created successfully",
      };
    } catch (error) {
      throw error;
    }
  },

  // Update media
  updateMedia: async (id: string, data: IMediaUpdate) => {
    try {
      const response = await apiRequest.patch(`/v1/media/${id}`, data);

      if (!response.status) {
        throw new Error(response.message || "Failed to update media");
      }

      return {
        status: true,
        data: response.data,
        message: "Media updated successfully",
      };
    } catch (error) {
      throw error;
    }
  },

  // Delete media
  deleteMedia: async (id: string) => {
    try {
      const response = await apiRequest.delete(`/v1/media/${id}`);

      if (!response.status) {
        throw new Error(response.message || "Failed to delete media");
      }

      return {
        status: true,
        message: "Media deleted successfully",
      };
    } catch (error: any) {
      console.error("Delete media error:", error);

      if (error.status === 404 || error.statusCode === 404) {
        return {
          status: true,
          message: "Media not found or already deleted",
        };
      }

      throw {
        status: false,
        message:
          error.message ||
          "Failed to delete media. Please check your connection and try again.",
        statusCode: error.status || error.statusCode,
        error: error,
      };
    }
  },

  // Get active media for public display
  getPublicMedia: async (page = 1, limit = 50) => {
    try {
      const response = await apiRequest.get(
        `/v1/media/public?page=${page}&limit=${limit}`
      );
      if (!response.status) {
        throw new Error(response.message || "Failed to fetch public media");
      }

      return {
        status: true,
        data: response.data,
        message: "Public media fetched successfully",
      };
    } catch (error) {
      throw error;
    }
  },

  // Get public media without authentication (for website frontend)
  getPublicMediaForWebsite: async (
    page = 1,
    limit = 10,
    isTestimonial = false
  ) => {
    try {
      const response = await apiRequest.get(
        `${API_ENDPOINTS.PUBLIC.MEDIA}?page=${page}&limit=${limit}&isTestimonial=${isTestimonial}`
      );
      if (!response.status) {
        throw new Error(response.message || "Failed to fetch public media");
      }

      // The API returns data directly as an array in response.data
      return {
        status: true,
        data: response.data, // This is the array of media items
        message: "Public media fetched successfully",
      };
    } catch (error) {
      throw error;
    }
  },
};

export const getTestimonials = async () => {
  try {
    const response = await fetch(
      'https://ilearn-server.bairuhatech.com/v1/media?page=1&limit=10&isTestimonial=true',
      {
        headers: {
          accept: '*/*',
        },
      }
    );
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return [];
  }
};
