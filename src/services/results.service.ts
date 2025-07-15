import { API_CONFIG, API_ENDPOINTS } from "../config/api";
import { apiRequest, ApiResponse } from "../config/apiRequest";

export interface IResult {
  id: string;
  year: string;
  description: string;
  media: string | null;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

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

export interface IResultSummary {
  id: string;
  year: string;
  totalSelection: number;
  topRanks: number;
  order: number;
  pcmClassroom: number;
  firstAttempt: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface IResultSummaryCreate {
  year: string;
  totalSelection: number;
  topRanks: number;
  order: number;
  pcmClassroom: number;
  firstAttempt: number;
}

export interface IResultSummaryUpdate extends Partial<IResultSummaryCreate> {}

export interface IResultCreate
  extends Omit<IResult, "id" | "createdAt" | "updatedAt"> {}
export interface IResultUpdate extends Partial<IResultCreate> {}

class ResultService {
  async getAllResults(
    page: number = 1,
    limit: number = 10
  ): Promise<ApiResponse<IPaginatedResponse<IResult>>> {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });
      return await apiRequest.get<IPaginatedResponse<IResult>>(
        `${API_ENDPOINTS.ADMIN.RESULTS.LIST}?${params}`
      );
    } catch (error) {
      console.error("Error fetching results:", error);
      throw error;
    }
  }

  async getResultById(id: string): Promise<ApiResponse<IResult>> {
    try {
      return await apiRequest.get<IResult>(
        API_ENDPOINTS.ADMIN.RESULTS.DETAIL(id)
      );
    } catch (error) {
      console.error("Error fetching result:", error);
      throw error;
    }
  }

  async createResult(data: IResultCreate): Promise<ApiResponse<IResult[]>> {
    try {
      return await apiRequest.post<IResult[]>(
        API_ENDPOINTS.ADMIN.RESULTS.CREATE,
        data
      );
    } catch (error) {
      console.error("Error creating result:", error);
      throw error;
    }
  }

  async updateResult(
    id: string,
    data: IResultUpdate
  ): Promise<ApiResponse<IResult>> {
    try {
      return await apiRequest.patch<IResult>(
        API_ENDPOINTS.ADMIN.RESULTS.UPDATE(id),
        data
      );
    } catch (error) {
      console.error("Error updating result:", error);
      throw error;
    }
  }

  async deleteResult(id: string): Promise<ApiResponse<null>> {
    try {
      return await apiRequest.delete<null>(
        API_ENDPOINTS.ADMIN.RESULTS.DELETE(id)
      );
    } catch (error) {
      console.error("Error deleting result:", error);
      throw error;
    }
  }

  async getResultsSummary(): Promise<ApiResponse<IResultSummary>> {
    try {
      return await apiRequest.get<IResultSummary>(
        API_ENDPOINTS.ADMIN.RESULTS.SUMMARY
      );
    } catch (error) {
      console.error("Error fetching results summary:", error);
      throw error;
    }
  }

  async exportResults(): Promise<ApiResponse<Blob>> {
    try {
      return await apiRequest.get<Blob>(API_ENDPOINTS.ADMIN.RESULTS.EXPORT, {
        responseType: "blob",
      });
    } catch (error) {
      console.error("Error exporting results:", error);
      throw error;
    }
  }

  // Result Summary methods
  async getAllResultSummaries(
    page: number = 1,
    limit: number = 10
  ): Promise<ApiResponse<IPaginatedResponse<IResultSummary>>> {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });
      const response = await apiRequest.get<IPaginatedResponse<IResultSummary>>(
        `/v1/result-summary?${params}`
      );
      console.log("API Response:", response); // Debug log
      return response;
    } catch (error) {
      console.error("Error fetching result summaries:", error);
      throw error;
    }
  }

  async getResultSummaryById(id: string): Promise<ApiResponse<IResultSummary>> {
    try {
      const response = await apiRequest.get<IResultSummary>(
        `/v1/result-summary/${id}`
      );
      console.log("Get by ID Response:", response); // Debug log
      return response;
    } catch (error) {
      console.error("Error fetching result summary:", error);
      throw error;
    }
  }

  async createResultSummary(
    data: IResultSummaryCreate
  ): Promise<ApiResponse<IResultSummary>> {
    try {
      const response = await apiRequest.post<IResultSummary>(
        "/v1/result-summary",
        data
      );
      console.log("Create Response:", response); // Debug log
      return response;
    } catch (error) {
      console.error("Error creating result summary:", error);
      throw error;
    }
  }

  async updateResultSummary(
    id: string,
    data: IResultSummaryUpdate
  ): Promise<ApiResponse<IResultSummary>> {
    try {
      const response = await apiRequest.patch<IResultSummary>(
        `/v1/result-summary/${id}`,
        data
      );
      console.log("Update Response:", response); // Debug log
      return response;
    } catch (error) {
      console.error("Error updating result summary:", error);
      throw error;
    }
  }

  async deleteResultSummary(id: string): Promise<ApiResponse<null>> {
    try {
      const response = await apiRequest.delete<null>(
        `/v1/result-summary/${id}`
      );
      console.log("Delete Response:", response); // Debug log
      return response;
    } catch (error) {
      console.error("Error deleting result summary:", error);
      throw error;
    }
  }
}

export const resultService = new ResultService();
