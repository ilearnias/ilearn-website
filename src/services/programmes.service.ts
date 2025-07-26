import { API_CONFIG, API_ENDPOINTS } from "../config/api";
import { apiRequest, ApiResponse } from "../config/apiRequest";

export interface IProgramme {
  id: string;
  title: string;
  description: string;
  duration: string;
  status: "Active" | "Inactive" | "active" | "inactive";
  price: number;
  enrollments: number;
  order?: number | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
  // Optional fields that might not be in all responses
  category?: string;
  startDate?: string;
  endDate?: string;
  instructor?: string;
  thumbnail?: string;
  route?: string | null;
}

export interface IProgrammeCreate {
  title: string;
  description: string;
  duration: string;
  status: "Active" | "Inactive" | "active" | "inactive";
  price: number;
  order?: number;
  isActive?: boolean;
  // Optional fields
  category?: string;
  startDate?: string;
  endDate?: string;
  instructor?: string;
  enrollments?: number;
  thumbnail?: string;
}

export interface IProgrammeUpdate extends Partial<IProgrammeCreate> {}

class ProgrammeService {
  async getAllProgrammes(
    page: number = 1,
    limit: number = 10,
    search: string = ""
  ): Promise<ApiResponse<IProgramme[]>> {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });
      if (search) {
        params.append("search", search);
      }
      return await apiRequest.get<IProgramme[]>(
        `${API_ENDPOINTS.PUBLIC.PROGRAMS}?${params}`
      );
    } catch (error) {
      console.error("Error fetching programmes:", error);
      throw error;
    }
  }

  async getPublicProgrammes(
    page: number = 1,
    limit: number = 10
  ): Promise<ApiResponse<IProgramme[]>> {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });
      return await apiRequest.get<IProgramme[]>(
        `${API_ENDPOINTS.PUBLIC.PROGRAMS}?${params}`
      );
    } catch (error) {
      console.error("Error fetching public programmes:", error);
      throw error;
    }
  }

  async getProgrammeById(id: string): Promise<ApiResponse<IProgramme>> {
    try {
      return await apiRequest.get<IProgramme>(
        API_ENDPOINTS.ADMIN.PROGRAMS.DETAIL(id)
      );
    } catch (error) {
      console.error("Error fetching programme:", error);
      throw error;
    }
  }

  async createProgramme(
    data: IProgrammeCreate
  ): Promise<ApiResponse<IProgramme>> {
    try {
      return await apiRequest.post<IProgramme>(
        API_ENDPOINTS.ADMIN.PROGRAMS.CREATE,
        data
      );
    } catch (error) {
      console.error("Error creating programme:", error);
      throw error;
    }
  }

  async updateProgramme(
    id: string,
    data: IProgrammeUpdate
  ): Promise<ApiResponse<IProgramme>> {
    try {
      return await apiRequest.patch<IProgramme>(
        API_ENDPOINTS.ADMIN.PROGRAMS.UPDATE(id),
        data
      );
    } catch (error) {
      console.error("Error updating programme:", error);
      throw error;
    }
  }

  async deleteProgramme(id: string): Promise<ApiResponse<null>> {
    try {
      return await apiRequest.delete<null>(
        API_ENDPOINTS.ADMIN.PROGRAMS.DELETE(id)
      );
    } catch (error) {
      console.error("Error deleting programme:", error);
      throw error;
    }
  }
}

export const programmeService = new ProgrammeService();
