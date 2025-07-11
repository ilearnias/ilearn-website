import { API_CONFIG, API_ENDPOINTS } from '../config/api';
import { apiRequest, ApiResponse } from '../config/apiRequest';

export interface ISuccessStory {
  id: string;
  name: string | null;
  description: string | null;
  details: string | null;
  image: string | null;
  order: number | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface ISuccessStoryCreate extends Omit<ISuccessStory, 'id' | 'createdAt' | 'updatedAt'> {}
export interface ISuccessStoryUpdate extends Partial<ISuccessStoryCreate> {}

class SuccessStoryService {
  // Public method to fetch success stories for the frontend
  async getPublicSuccessStories(page = 1, limit = 10): Promise<ApiResponse<ISuccessStory[]>> {
    try {
      return await apiRequest.get<ISuccessStory[]>(`${API_ENDPOINTS.PUBLIC.SUCCESS_STORIES}?page=${page}&limit=${limit}`);
    } catch (error) {
      console.error('Error fetching success stories:', error);
      throw error;
    }
  }

  // Admin method to fetch all success stories
  async getAllSuccessStories(): Promise<ApiResponse<ISuccessStory[]>> {
    try {
      // Make a direct axios call without authentication for public access
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_ENDPOINTS.ADMIN.SUCCESS_STORIES.LIST}?page=1&limit=10`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching success stories:', error);
      throw error;
    }
  }

  async getSuccessStoryById(id: string): Promise<ApiResponse<ISuccessStory>> {
    try {
      return await apiRequest.get<ISuccessStory>(API_ENDPOINTS.ADMIN.SUCCESS_STORIES.DETAIL(id));
    } catch (error) {
      console.error('Error fetching success story:', error);
      throw error;
    }
  }

  async createSuccessStory(data: ISuccessStoryCreate): Promise<ApiResponse<ISuccessStory>> {
    try {
      return await apiRequest.post<ISuccessStory>(API_ENDPOINTS.ADMIN.SUCCESS_STORIES.CREATE, data);
    } catch (error) {
      console.error('Error creating success story:', error);
      throw error;
    }
  }

  async updateSuccessStory(id: string, data: ISuccessStoryUpdate): Promise<ApiResponse<ISuccessStory>> {
    try {
      return await apiRequest.patch<ISuccessStory>(API_ENDPOINTS.ADMIN.SUCCESS_STORIES.UPDATE(id), data);
    } catch (error) {
      console.error('Error updating success story:', error);
      throw error;
    }
  }

  async deleteSuccessStory(id: string): Promise<ApiResponse<null>> {
    try {
      return await apiRequest.delete<null>(API_ENDPOINTS.ADMIN.SUCCESS_STORIES.DELETE(id));
    } catch (error) {
      console.error('Error deleting success story:', error);
      throw error;
    }
  }

  // Upload a single image and return its URL
  async uploadSingleImage(file: File): Promise<string> {
    try {
      const formData = new FormData();
      formData.append('file', file); // field name must be 'file'
      const response = await apiRequest.upload(API_ENDPOINTS.ADMIN.SUCCESS_STORIES.UPLOAD, formData);
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

export const successStoryService = new SuccessStoryService(); 