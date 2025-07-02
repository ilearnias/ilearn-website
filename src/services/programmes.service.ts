import { API_CONFIG, API_ENDPOINTS } from '../config/api';
import { apiRequest, ApiResponse } from '../config/apiRequest';

export interface IProgramme {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: string;
  status: 'Active' | 'Inactive';
  price: number;
  startDate?: string;
  endDate?: string;
  instructor?: string;
  maxEnrollments?: number;
  enrollments?: number;
  thumbnail?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IProgrammeCreate extends Omit<IProgramme, 'id' | 'createdAt' | 'updatedAt' | 'enrollments'> {}
export interface IProgrammeUpdate extends Partial<IProgrammeCreate> {}

class ProgrammeService {
  async getAllProgrammes(): Promise<ApiResponse<IProgramme[]>> {
    try {
      return await apiRequest.get<IProgramme[]>(API_ENDPOINTS.ADMIN.PROGRAMS.LIST);
    } catch (error) {
      console.error('Error fetching programmes:', error);
      throw error;
    }
  }

  async getProgrammeById(id: string): Promise<ApiResponse<IProgramme>> {
    try {
      return await apiRequest.get<IProgramme>(API_ENDPOINTS.ADMIN.PROGRAMS.DETAIL(id));
    } catch (error) {
      console.error('Error fetching programme:', error);
      throw error;
    }
  }

  async createProgramme(data: IProgrammeCreate): Promise<ApiResponse<IProgramme>> {
    try {
      return await apiRequest.post<IProgramme>(API_ENDPOINTS.ADMIN.PROGRAMS.CREATE, data);
    } catch (error) {
      console.error('Error creating programme:', error);
      throw error;
    }
  }

  async updateProgramme(id: string, data: IProgrammeUpdate): Promise<ApiResponse<IProgramme>> {
    try {
      return await apiRequest.put<IProgramme>(API_ENDPOINTS.ADMIN.PROGRAMS.UPDATE(id), data);
    } catch (error) {
      console.error('Error updating programme:', error);
      throw error;
    }
  }

  async deleteProgramme(id: string): Promise<ApiResponse<null>> {
    try {
      return await apiRequest.delete<null>(API_ENDPOINTS.ADMIN.PROGRAMS.DELETE(id));
    } catch (error) {
      console.error('Error deleting programme:', error);
      throw error;
    }
  }
}

export const programmeService = new ProgrammeService(); 