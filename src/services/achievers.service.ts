import { API_CONFIG, API_ENDPOINTS } from '../config/api';
import { apiRequest, ApiResponse } from '../config/apiRequest';

export interface IAchiever {
  id: string;
  name: string;
  details: string;
  description: string;
  image: string;
  order: number;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
}

export interface IAchieverCreate {
  name: string;
  details: string;
  description: string;
  image: string;
  order: number;
  isActive: boolean;
}

export interface IAchieverUpdate extends Partial<IAchieverCreate> {}

class AchieverService {
  async getAllAchievers(): Promise<ApiResponse<IAchiever[]>> {
    try {
      return await apiRequest.get<IAchiever[]>(API_ENDPOINTS.ADMIN.ACHIEVERS.LIST);
    } catch (error) {
      console.error('Error fetching achievers:', error);
      throw error;
    }
  }

  async getAchieverById(id: string): Promise<ApiResponse<IAchiever>> {
    try {
      return await apiRequest.get<IAchiever>(API_ENDPOINTS.ADMIN.ACHIEVERS.DETAIL(id));
    } catch (error) {
      console.error('Error fetching achiever:', error);
      throw error;
    }
  }

  async createAchiever(data: IAchieverCreate): Promise<ApiResponse<IAchiever>> {
    try {
      return await apiRequest.post<IAchiever>(API_ENDPOINTS.ADMIN.ACHIEVERS.CREATE, data);
    } catch (error) {
      console.error('Error creating achiever:', error);
      throw error;
    }
  }

  async updateAchiever(id: string, data: IAchieverUpdate): Promise<ApiResponse<IAchiever>> {
    try {
      return await apiRequest.patch<IAchiever>(API_ENDPOINTS.ADMIN.ACHIEVERS.UPDATE(id), data);
    } catch (error) {
      console.error('Error updating achiever:', error);
      throw error;
    }
  }

  async deleteAchiever(id: string): Promise<ApiResponse<null>> {
    try {
      return await apiRequest.delete<null>(API_ENDPOINTS.ADMIN.ACHIEVERS.DELETE(id));
    } catch (error) {
      console.error('Error deleting achiever:', error);
      throw error;
    }
  }
}

export const achieverService = new AchieverService(); 