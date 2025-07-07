import apiRequest from "@/config/apiRequest";
import { API_ENDPOINTS } from "@/config/api";

export interface IGalleryItem {
  id: string;
  title: string;
  images: string[];
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IGalleryItemCreate extends Omit<IGalleryItem, 'id' | 'createdAt' | 'updatedAt'> {}

export const galleryService = {
  getAllItems: async () => {
    try {
      const response = await apiRequest.get(API_ENDPOINTS.ADMIN.GALLERY.ITEMS.LIST);
      if (!response.status) {
        throw new Error(response.message || 'Failed to fetch gallery items');
      }

      return {
        status: true,
        data: response.data,
        message: 'Gallery items fetched successfully'
      };
    } catch (error) {
      throw error;
    }
  },

  createItem: async (data: IGalleryItemCreate) => {
    try {
      const response = await apiRequest.post(API_ENDPOINTS.ADMIN.GALLERY.ITEMS.CREATE, data);
      
      if (!response.status) {
        throw new Error(response.message || 'Failed to create gallery item');
      }

      return {
        status: true,
        data: response.data,
        message: 'Gallery item created successfully'
      };
    } catch (error) {
      throw error;
    }
  },

  updateItem: async (id: string, data: Partial<IGalleryItemCreate>) => {
    try {
      const response = await apiRequest.patch(API_ENDPOINTS.ADMIN.GALLERY.ITEMS.UPDATE(id), data);
      
      if (!response.status) {
        throw new Error(response.message || 'Failed to update gallery item');
      }

      return {
        status: true,
        data: response.data,
        message: 'Gallery item updated successfully'
      };
    } catch (error) {
      throw error;
    }
  },

  deleteItem: async (id: string) => {
    try {
      const response = await apiRequest.delete(API_ENDPOINTS.ADMIN.GALLERY.ITEMS.DELETE(id));
      
      if (!response.status) {
        throw new Error(response.message || 'Failed to delete gallery item');
      }

      return {
        status: true,
        message: 'Gallery item deleted successfully'
      };
    } catch (error: any) {
      // Log the error for debugging
      console.error('Delete gallery item error:', error);
      
      // If it's a 404 error, return a specific response
      if (error.status === 404 || error.statusCode === 404) {
        return {
          status: true,
          message: 'Gallery item not found or already deleted'
        };
      }
      
      // For other errors, throw with a detailed message
      throw {
        status: false,
        message: error.message || 'Failed to delete gallery item. Please check your connection and try again.',
        statusCode: error.status || error.statusCode,
        error: error
      };
    }
  },

  uploadImages: async (files: File[], itemId?: string) => {
    try {
      // Validate file types
      const acceptedFormats = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      const invalidFiles = files.filter(file => !acceptedFormats.includes(file.type));
      if (invalidFiles.length > 0) {
        throw new Error(`Invalid file format: ${invalidFiles.map(f => f.name).join(', ')}`);
      }

      const formData = new FormData();
      
      // Append each file with the field name 'images'
      files.forEach((file, index) => {
        // Add index to handle multiple files
        formData.append('images', file);
      });

      if (itemId) {
        formData.append('itemId', itemId);
      }

      // Log request details for debugging
      console.log('Uploading files:', {
        numberOfFiles: files.length,
        fileNames: files.map(f => f.name),
        fileTypes: files.map(f => f.type),
        itemId: itemId
      });

      const response = await apiRequest.upload(API_ENDPOINTS.ADMIN.GALLERY.UPLOAD, formData);
      
      if (!response.status) {
        console.error('Upload failed:', response);
        throw new Error(response.message || 'Failed to upload images');
      }

      console.log('Upload successful:', response);

      return {
        status: true,
        data: response.data,
        message: 'Images uploaded successfully'
      };
    } catch (error) {
      console.error('Upload error:', error);
      throw error;
    }
  },

  // Upload a single image and return its URL
  uploadSingleImage: async (file: File) => {
    const formData = new FormData();
    formData.append('file', file); // field name must be 'file'
    const response = await apiRequest.upload('/v1/upload/image', formData);
    if (response.status && response.data) {
      // If backend returns { data: { url: '...' } }
      return response.data.url || response.data;
    }
    throw new Error(response.message || 'Failed to upload image');
  },

  // Upload multiple images and return an array of URLs
  uploadMultipleImages: async (files: File[]) => {
    const urls: string[] = [];
    for (const file of files) {
      const url = await galleryService.uploadSingleImage(file);
      urls.push(url);
    }
    return urls;
  }
}; 