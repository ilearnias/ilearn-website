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
}

export const successStoryService = new SuccessStoryService(); 