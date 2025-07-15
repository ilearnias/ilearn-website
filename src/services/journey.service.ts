import { apiClient } from "@/config/apiClient";

/**
 * Journey Image Specifications:
 * - Optimal Resolution: 1920x1080px (16:9 aspect ratio)
 * - Minimum Resolution: 960x540px
 * - Maximum File Size: 5MB
 * - Format: JPEG, PNG, or WebP
 * - Aspect Ratio: 16:9 recommended for consistent display
 * 
 * The images will be displayed in a responsive container with:
 * - Max width: 960px (60rem)
 * - Height: min(400px, 50vw)
 * - Object-fit: cover (images will be cropped to fill container)
 */

interface JourneyItem {
  id: string;
  year: string;
  description: string;
  media: string;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: null | string;
}

interface JourneyResponse {
  status: boolean;
  message: string;
  data: JourneyItem[];
}

export const getJourneyList = async (page = 1, limit = 10) => {
  const response = await apiClient.get<JourneyResponse>(`/journey?page=${page}&limit=${limit}&isActive=true`);
  return response.data;
};
