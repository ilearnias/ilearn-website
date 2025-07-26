import { apiRequest } from "@/config/apiRequest";
import { API_ENDPOINTS } from "@/config/api";
import { AxiosRequestConfig } from "axios";
/**
 * Journey Image Specifications:
 * - Optimal Resolution: 1920x1080px (16:9 aspect ratio)
 * - Minimum Resolution: 960x540px
 * - Maximum File Size: 5MB
 * - Format: JPEG, PNG, or WebP
 * - Aspect Ratio: 16:9 recommended for consistent display
 *
 * The images will be displayed in a responsive container with:
 * - Max width: 960px (60rem)
 * - Height: min(400px, 50vw)
 * - Object-fit: cover (images will be cropped to fill container)
 */

export interface IJourney {
  id: string;
  year: string;
  description: string;
  media: string;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: null | string;
}

export interface IJourneyCreate {
  year: string;
  description: string;
  media: string;
  order: number;
  isActive: boolean;
}

export interface IJourneyUpdate extends IJourneyCreate {
  id: string;
}

interface JourneyResponse {
  status: boolean;
  message: string;
  data: IJourney[];
  total?: number;
}

class JourneyService {
  async getAllJourney({
    page = 1,
    limit = 10,
    isActive,
    search = "",
    year,
    isImage,
  }: {
    page?: number;
    limit?: number;
    search?: string;
    year?: string;
    isActive?: boolean;
    isImage?: boolean;
  }) {
    const params = new URLSearchParams();

    params.append("page", String(page));
    params.append("limit", String(limit));
    if (search) params.append("search", search);
    if (year) params.append("year", year);
    if (typeof isActive === "boolean")
      params.append("isActive", String(isActive));
    if (typeof isImage === "boolean") params.append("isImage", String(isImage));

    const url = `${API_ENDPOINTS.ADMIN.JOURNEY.LIST}?${params.toString()}`;

    const response = await apiRequest.get<JourneyResponse>(url);
    return response;
  }

  async getJourneyById(id: string) {
    const response = await apiRequest.get<{
      status: boolean;
      message: string;
      data: IJourney;
    }>(`/v1/journey/${id}`);
    return response;
  }

  async createJourney(data: IJourneyCreate, config: AxiosRequestConfig) {
    console.log(config);
    const response = await apiRequest.post<{
      status: boolean;
      message: string;
      data: IJourney;
    }>("/v1/journey", data, config);
    return response;
  }

  async updateJourney(id: string, data: IJourneyUpdate) {
    const response = await apiRequest.patch<{
      status: boolean;
      message: string;
      data: IJourney;
    }>(`/v1/journey/${id}`, data);
    return response;
  }

  async deleteJourney(id: string) {
    try {
      const response = await apiRequest.delete<{
        status: boolean;
        message: string;
      }>(`/v1/journey/${id}`);

      // Return a consistent response format
      return {
        status: true,
        message: "Journey item deleted successfully",
        data: response.data,
      };
    } catch (error: any) {
      console.error("Delete journey error:", error);

      // Handle 404 gracefully
      if (error.status === 404 || error.statusCode === 404) {
        return {
          status: true,
          message: "Journey item deleted successfully",
          data: null,
        };
      }

      // Return error response
      return {
        status: false,
        message: error.message || "Failed to delete journey item",
        data: null,
      };
    }
  }

  async uploadSingleImage(file: File): Promise<string> {
    const formData = new FormData();
    formData.append("file", file);
    // Use the correct upload endpoint and apiRequest.upload for proper headers
    const response: any = await apiRequest.upload<{
      status: boolean;
      message: string;
      data: string;
    }>("/v1/upload/image", formData);
    return response;
  }

  validateImageFile(file: File): boolean {
    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!allowedTypes.includes(file.type)) {
      throw new Error(
        "File type not supported. Please upload a JPEG, PNG, or WebP image."
      );
    }

    if (file.size > maxSize) {
      throw new Error("File size too large. Maximum size is 5MB.");
    }

    return true;
  }
}

export const journeyService = new JourneyService();
