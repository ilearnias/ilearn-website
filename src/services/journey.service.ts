import { apiClient } from "@/config/apiClient";

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
  async getAllJourney(page = 1, limit = 10) {
    const response = await apiClient.get<JourneyResponse>(`/journey?page=${page}&limit=${limit}`);
    return response.data;
  }

  async getJourneyById(id: string) {
    const response = await apiClient.get<{ status: boolean; message: string; data: IJourney }>(`/journey/${id}`);
    return response.data;
  }

  async createJourney(data: IJourneyCreate) {
    const response = await apiClient.post<{ status: boolean; message: string; data: IJourney }>('/journey', data);
    return response.data;
  }

  async updateJourney(id: string, data: IJourneyUpdate) {
    const response = await apiClient.put<{ status: boolean; message: string; data: IJourney }>(`/journey/${id}`, data);
    return response.data;
  }

  async deleteJourney(id: string) {
    const response = await apiClient.delete<{ status: boolean; message: string }>(`/journey/${id}`);
    return response.data;
  }

  async uploadSingleImage(file: File): Promise<string> {
    const formData = new FormData();
    formData.append('file', file);
    const response = await apiClient.post<{ status: boolean; message: string; data: string }>('/journey/upload', formData);
    return response.data.data;
  }

  validateImageFile(file: File): boolean {
    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    
    if (!allowedTypes.includes(file.type)) {
      throw new Error('File type not supported. Please upload a JPEG, PNG, or WebP image.');
    }
    
    if (file.size > maxSize) {
      throw new Error('File size too large. Maximum size is 5MB.');
    }
    
    return true;
  }
}

export const journeyService = new JourneyService();
