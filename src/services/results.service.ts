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
  totalStudents: number;
  passRate: number;
  averageScore: number;
  highestScore: number;
  lowestScore: number;
  gradeDistribution: {
    [key: string]: number;
  };
}

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
}

export const resultService = new ResultService();
