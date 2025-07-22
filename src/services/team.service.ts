import { API_CONFIG, API_ENDPOINTS } from "../config/api";
import { apiRequest, ApiResponse } from "../config/apiRequest";

export interface IPaginationMeta {
  limit: number;
  itemCount: number;
  page: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface IPaginatedResponse<T> {
  status: boolean;
  message: string;
  data: T[];
  meta: IPaginationMeta;
}

export interface ITeamMember {
  id: string;
  name: string;
  designation?: string;
  description?: string;
  email?: string;
  phone?: string;
  image?: string;
  linkedin?: string;
  twitter?: string;
  facebook?: string;
  instagram?: string;
  order?: number;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
}

export interface ITeamMemberCreate
  extends Omit<ITeamMember, "id" | "createdAt" | "updatedAt"> {}
export interface ITeamMemberUpdate extends Partial<ITeamMemberCreate> {}

class TeamService {
  async getAllTeamMembers(
    page: number = 1,
    limit: number = 10
  ): Promise<ApiResponse<IPaginatedResponse<ITeamMember>>> {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });
      return await apiRequest.get<IPaginatedResponse<ITeamMember>>(
        `${API_ENDPOINTS.ADMIN.TEAM.LIST}?${params}`
      );
    } catch (error) {
      console.error("Error fetching team members:", error);
      throw error;
    }
  }

  async getTeamMemberById(id: string): Promise<ApiResponse<ITeamMember>> {
    try {
      return await apiRequest.get<ITeamMember>(
        API_ENDPOINTS.ADMIN.TEAM.DETAIL(id)
      );
    } catch (error) {
      console.error("Error fetching team member:", error);
      throw error;
    }
  }

  async createTeamMember(
    data: ITeamMemberCreate
  ): Promise<ApiResponse<ITeamMember>> {
    try {
      return await apiRequest.post<ITeamMember>(
        API_ENDPOINTS.ADMIN.TEAM.CREATE,
        data
      );
    } catch (error) {
      console.error("Error creating team member:", error);
      throw error;
    }
  }

  async updateTeamMember(
    id: string,
    data: ITeamMemberUpdate
  ): Promise<ApiResponse<ITeamMember>> {
    try {
      return await apiRequest.patch<ITeamMember>(
        API_ENDPOINTS.ADMIN.TEAM.UPDATE(id),
        data
      );
    } catch (error) {
      console.error("Error updating team member:", error);
      throw error;
    }
  }

  async deleteTeamMember(id: string): Promise<ApiResponse<null>> {
    try {
      return await apiRequest.delete<null>(API_ENDPOINTS.ADMIN.TEAM.DELETE(id));
    } catch (error) {
      console.error("Error deleting team member:", error);
      throw error;
    }
  }

  // Upload a single image and return its URL
  async uploadSingleImage(file: File): Promise<string> {
    const formData = new FormData();
    formData.append("file", file);
    const response = await apiRequest.upload(
      API_ENDPOINTS.ADMIN.TEAM.UPLOAD,
      formData
    );
    if (response.status && response.data) {
      return response.data.url || response.data;
    }
    throw new Error(response.message || "Failed to upload image");
  }

  // Validate image file
  validateImageFile(file: File): boolean {
    const acceptedFormats = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/webp",
    ];
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (!acceptedFormats.includes(file.type)) {
      throw new Error(
        `${file.name} is not a valid image format. Accepted formats: JPEG, PNG, GIF, WebP`
      );
    }
    if (file.size > maxSize) {
      throw new Error(`${file.name} is larger than 5MB`);
    }
    return true;
  }
}

export const teamService = new TeamService();
