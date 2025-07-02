import apiRequest from "@/config/apiRequest";
import { API_ENDPOINTS } from "@/config/api";

export interface IGalleryImage {
  id: string;
  title: string;
  description: string;
  url: string;
  category: string;
  displayOrder: number;
  isActive: boolean;
  altText?: string;
  createdAt: string;
  updatedAt: string;
}

export interface IGalleryTitle {
  id: string;
  text: string;
  description: string;
  category: string;
  displayOrder: number;
  isActive: boolean;
  style?: string;
  createdAt: string;
  updatedAt: string;
}

export const galleryService = {
  // Image methods
  getAllImages: async () => {
    try {
      const response = await apiRequest.get(API_ENDPOINTS.ADMIN.GALLERY.IMAGES.LIST);
      return response;
    } catch (error) {
      console.error('Error fetching gallery images:', error);
      throw error;
    }
  },

  getImageById: async (id: string) => {
    try {
      const response = await apiRequest.get(`${API_ENDPOINTS.ADMIN.GALLERY.IMAGES.DETAIL}/${id}`);
      return response;
    } catch (error) {
      console.error('Error fetching gallery image:', error);
      throw error;
    }
  },

  createImage: async (data: Partial<IGalleryImage>) => {
    try {
      const response = await apiRequest.post(API_ENDPOINTS.ADMIN.GALLERY.IMAGES.CREATE, data);
      return response;
    } catch (error) {
      console.error('Error creating gallery image:', error);
      throw error;
    }
  },

  updateImage: async (id: string, data: Partial<IGalleryImage>) => {
    try {
      const response = await apiRequest.put(`${API_ENDPOINTS.ADMIN.GALLERY.IMAGES.UPDATE}/${id}`, data);
      return response;
    } catch (error) {
      console.error('Error updating gallery image:', error);
      throw error;
    }
  },

  deleteImage: async (id: string) => {
    try {
      const response = await apiRequest.delete(`${API_ENDPOINTS.ADMIN.GALLERY.IMAGES.DELETE}/${id}`);
      return response;
    } catch (error) {
      console.error('Error deleting gallery image:', error);
      throw error;
    }
  },

  // Title methods
  getAllTitles: async () => {
    try {
      const response = await apiRequest.get(API_ENDPOINTS.ADMIN.GALLERY.TITLES.LIST);
      return response;
    } catch (error) {
      console.error('Error fetching gallery titles:', error);
      throw error;
    }
  },

  getTitleById: async (id: string) => {
    try {
      const response = await apiRequest.get(`${API_ENDPOINTS.ADMIN.GALLERY.TITLES.DETAIL}/${id}`);
      return response;
    } catch (error) {
      console.error('Error fetching gallery title:', error);
      throw error;
    }
  },

  createTitle: async (data: Partial<IGalleryTitle>) => {
    try {
      const response = await apiRequest.post(API_ENDPOINTS.ADMIN.GALLERY.TITLES.CREATE, data);
      return response;
    } catch (error) {
      console.error('Error creating gallery title:', error);
      throw error;
    }
  },

  updateTitle: async (id: string, data: Partial<IGalleryTitle>) => {
    try {
      const response = await apiRequest.put(`${API_ENDPOINTS.ADMIN.GALLERY.TITLES.UPDATE}/${id}`, data);
      return response;
    } catch (error) {
      console.error('Error updating gallery title:', error);
      throw error;
    }
  },

  deleteTitle: async (id: string) => {
    try {
      const response = await apiRequest.delete(`${API_ENDPOINTS.ADMIN.GALLERY.TITLES.DELETE}/${id}`);
      return response;
    } catch (error) {
      console.error('Error deleting gallery title:', error);
      throw error;
    }
  },
}; 