import apiRequest from "@/config/apiRequest";

export interface IGalleryImage {
  id: string;
  titleId: string;
  tags: string;
  media: string;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IGalleryTitle {
  id: string;
  title: string;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IGalleryImageCreate extends Omit<IGalleryImage, 'id' | 'createdAt' | 'updatedAt'> {}
export interface IGalleryTitleCreate extends Omit<IGalleryTitle, 'id' | 'createdAt' | 'updatedAt'> {}

export const galleryService = {
  // Image methods
  getAllImages: async () => {
    try {
      const response = await apiRequest.get('/v1/admin/gallery/images');
      return response;
    } catch (error) {
      throw error;
    }
  },

  getImageById: async (id: string) => {
    try {
      const response = await apiRequest.get(`/v1/admin/gallery/images/${id}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  createImage: async (data: IGalleryImageCreate) => {
    try {
      const response = await apiRequest.post('/v1/admin/gallery/images', data);
      return response;
    } catch (error) {
      throw error;
    }
  },

  updateImage: async (id: string, data: Partial<IGalleryImageCreate>) => {
    try {
      const response = await apiRequest.patch(`/v1/admin/gallery/images/${id}`, data);
      return response;
    } catch (error) {
      throw error;
    }
  },

  deleteImage: async (id: string) => {
    try {
      const response = await apiRequest.delete(`/v1/admin/gallery/images/${id}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Title methods
  getAllTitles: async () => {
    try {
      const response = await apiRequest.get('/v1/admin/gallery/titles');
      return response;
    } catch (error) {
      throw error;
    }
  },

  getTitleById: async (id: string) => {
    try {
      const response = await apiRequest.get(`/v1/admin/gallery/titles/${id}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  createTitle: async (data: IGalleryTitleCreate) => {
    try {
      const response = await apiRequest.post('/v1/admin/gallery/titles', data);
      return response;
    } catch (error) {
      throw error;
    }
  },

  updateTitle: async (id: string, data: Partial<IGalleryTitleCreate>) => {
    try {
      const response = await apiRequest.patch(`/v1/admin/gallery/titles/${id}`, data);
      return response;
    } catch (error) {
      throw error;
    }
  },

  deleteTitle: async (id: string) => {
    try {
      const response = await apiRequest.delete(`/v1/admin/gallery/titles/${id}`);
      return response;
    } catch (error) {
      throw error;
    }
  },
}; 