import { API_CONFIG, API_ENDPOINTS } from '../config/api';
import { apiRequest, ApiResponse } from '../config/apiRequest';

export interface IAchiever {
  id: string;
  name: string;
  achievement: string;
  description: string;
  year?: number;
  category?: string;
  image?: string;
  institution?: string;
  score?: number;
  rank?: number;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
  details?: string | null;
  order?: number | null;
  deletedAt?: string | null;
}

export interface IAchieverCreate extends Omit<IAchiever, 'id' | 'createdAt' | 'updatedAt'> {}
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

  // Upload a single image and return its URL
  async uploadSingleImage(file: File): Promise<string> {
    try {
      const formData = new FormData();
      formData.append('file', file); // field name must be 'file'
      const response = await apiRequest.upload(API_ENDPOINTS.ADMIN.ACHIEVERS.UPLOAD, formData);
      if (response.status && response.data) {
        // If backend returns { data: { url: '...' } }
        return response.data.url || response.data;
      }
      throw new Error(response.message || 'Failed to upload image');
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  }

  // Upload multiple images and return an array of URLs
  async uploadMultipleImages(files: File[]): Promise<string[]> {
    try {
      const urls: string[] = [];
      for (const file of files) {
        const url = await this.uploadSingleImage(file);
        urls.push(url);
      }
      return urls;
    } catch (error) {
      console.error('Error uploading multiple images:', error);
      throw error;
    }
  }

  // Validate image file
  validateImageFile(file: File): boolean {
    const acceptedFormats = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!acceptedFormats.includes(file.type)) {
      throw new Error(`${file.name} is not a valid image format. Accepted formats: JPEG, PNG, GIF, WebP`);
    }

    if (file.size > maxSize) {
      throw new Error(`${file.name} is larger than 5MB`);
    }

    return true;
  }
}

export const achieverService = new AchieverService(); 