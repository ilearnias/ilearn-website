import { API_CONFIG, API_ENDPOINTS } from '../config/api';
import { apiRequest, ApiResponse } from '../config/apiRequest';

export interface ITeamMember {
  id: string;
  name: string;
  position: string;
  department: string;
  bio: string;
  email?: string;
  phone?: string;
  image?: string;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
  };
  status: 'active' | 'inactive';
  order?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ITeamMemberCreate extends Omit<ITeamMember, 'id' | 'createdAt' | 'updatedAt'> {}
export interface ITeamMemberUpdate extends Partial<ITeamMemberCreate> {}

class TeamService {
  async getAllTeamMembers(): Promise<ApiResponse<ITeamMember[]>> {
    try {
      return await apiRequest.get<ITeamMember[]>(API_ENDPOINTS.ADMIN.TEAM.LIST);
    } catch (error) {
      console.error('Error fetching team members:', error);
      throw error;
    }
  }

  async getTeamMemberById(id: string): Promise<ApiResponse<ITeamMember>> {
    try {
      return await apiRequest.get<ITeamMember>(API_ENDPOINTS.ADMIN.TEAM.DETAIL(id));
    } catch (error) {
      console.error('Error fetching team member:', error);
      throw error;
    }
  }

  async createTeamMember(data: ITeamMemberCreate): Promise<ApiResponse<ITeamMember>> {
    try {
      return await apiRequest.post<ITeamMember>(API_ENDPOINTS.ADMIN.TEAM.CREATE, data);
    } catch (error) {
      console.error('Error creating team member:', error);
      throw error;
    }
  }

  async updateTeamMember(id: string, data: ITeamMemberUpdate): Promise<ApiResponse<ITeamMember>> {
    try {
      return await apiRequest.put<ITeamMember>(API_ENDPOINTS.ADMIN.TEAM.UPDATE(id), data);
    } catch (error) {
      console.error('Error updating team member:', error);
      throw error;
    }
  }

  async deleteTeamMember(id: string): Promise<ApiResponse<null>> {
    try {
      return await apiRequest.delete<null>(API_ENDPOINTS.ADMIN.TEAM.DELETE(id));
    } catch (error) {
      console.error('Error deleting team member:', error);
      throw error;
    }
  }
}

export const teamService = new TeamService(); 