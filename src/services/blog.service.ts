import { API_CONFIG, API_ENDPOINTS } from '../config/api';
import { apiRequest, ApiResponse } from '../config/apiRequest';

export interface IBlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  categoryId: string;
  category?: IBlogCategory;
  author: string;
  status: 'draft' | 'published';
  publishDate?: string;
  featuredImage?: string;
  tags: string[];
  views: number;
  createdAt: string;
  updatedAt: string;
  // Added properties to match usage in admin/blog/posts/page.tsx
  description: string;
  subTitle: string;
  order: number;
  isActive: boolean;
  image: string;
  link: string;
}

export interface IBlogCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  metaTitle?: string;
  metaDescription?: string;
  postCount: number;
  views: number;
  createdAt: string;
  updatedAt: string;  
}

export interface IBlogPostCreate extends Omit<IBlogPost, 'id' | 'createdAt' | 'updatedAt' | 'views'> {}
export interface IBlogPostUpdate extends Partial<IBlogPostCreate> {}
export interface IBlogCategoryCreate extends Omit<IBlogCategory, 'id' | 'createdAt' | 'updatedAt'> {}
export interface IBlogCategoryUpdate extends Partial<IBlogCategoryCreate> {}

class BlogService {
  // Blog Posts
  async getAllPosts(): Promise<ApiResponse<IBlogPost[]>> {
    try {
      return await apiRequest.get<IBlogPost[]>(API_ENDPOINTS.ADMIN.BLOG.POSTS.LIST);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      throw error;
    }
  }

  async getPostById(id: string): Promise<ApiResponse<IBlogPost>> {
    try {
      return await apiRequest.get<IBlogPost>(API_ENDPOINTS.ADMIN.BLOG.POSTS.DETAIL(id));
    } catch (error) {
      console.error('Error fetching blog post:', error);
      throw error;
    }
  }

  async createPost(data: IBlogPostCreate): Promise<ApiResponse<IBlogPost>> {
    try {
      return await apiRequest.post<IBlogPost>(API_ENDPOINTS.ADMIN.BLOG.POSTS.CREATE, data);
    } catch (error) {
      console.error('Error creating blog post:', error);
      throw error;
    }
  }

  async updatePost(id: string, data: IBlogPostUpdate): Promise<ApiResponse<IBlogPost>> {
    try {
      return await apiRequest.patch<IBlogPost>(API_ENDPOINTS.ADMIN.BLOG.POSTS.UPDATE(id), data);
    } catch (error) {
      console.error('Error updating blog post:', error);
      throw error;
    }
  }

  async deletePost(id: string): Promise<ApiResponse<null>> {
    try {
      return await apiRequest.delete<null>(API_ENDPOINTS.ADMIN.BLOG.POSTS.DELETE(id));
    } catch (error) {
      console.error('Error deleting blog post:', error);
      throw error;
    }
  }

  // Blog Categories
  async getAllCategories(): Promise<ApiResponse<IBlogCategory[]>> {
    try {
      return await apiRequest.get<IBlogCategory[]>(API_ENDPOINTS.ADMIN.BLOG.CATEGORIES.LIST);
    } catch (error) {
      console.error('Error fetching blog categories:', error);
      throw error;
    }
  }

  async getCategoryById(id: string): Promise<ApiResponse<IBlogCategory>> {
    try {
      return await apiRequest.get<IBlogCategory>(API_ENDPOINTS.ADMIN.BLOG.CATEGORIES.DETAIL(id));
    } catch (error) {
      console.error('Error fetching blog category:', error);
      throw error;
    }
  }

  async createCategory(data: IBlogCategoryCreate): Promise<ApiResponse<IBlogCategory>> {
    try {
      return await apiRequest.post<IBlogCategory>(API_ENDPOINTS.ADMIN.BLOG.CATEGORIES.CREATE, data);
    } catch (error) {
      console.error('Error creating blog category:', error);
      throw error;
    }
  }

  async updateCategory(id: string, data: IBlogCategoryUpdate): Promise<ApiResponse<IBlogCategory>> {
    try {
      return await apiRequest.patch<IBlogCategory>(API_ENDPOINTS.ADMIN.BLOG.CATEGORIES.UPDATE(id), data);
    } catch (error) {
      console.error('Error updating blog category:', error);
      throw error;
    }
  }

  async deleteCategory(id: string): Promise<ApiResponse<null>> {
    try {
      return await apiRequest.delete<null>(API_ENDPOINTS.ADMIN.BLOG.CATEGORIES.DELETE(id));
    } catch (error) {
      console.error('Error deleting blog category:', error);
      throw error;
    }
  }

  // Upload a single image and return its URL
  async uploadSingleImage(file: File): Promise<string> {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = await apiRequest.upload('/v1/upload/image', formData);
      if (response.status && response.data) {
        return response.data.url || response.data;
      }
      throw new Error(response.message || 'Failed to upload image');
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  }

  // Upload multiple images and return an array of URLs
  async uploadMultipleImages(files: File[]): Promise<string[]> {
    try {
      const urls: string[] = [];
      for (const file of files) {
        const url = await this.uploadSingleImage(file);
        urls.push(url);
      }
      return urls;
    } catch (error) {
      console.error('Error uploading multiple images:', error);
      throw error;
    }
  }

  // Validate image file
  validateImageFile(file: File): boolean {
    const acceptedFormats = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!acceptedFormats.includes(file.type)) {
      throw new Error(`${file.name} is not a valid image format. Accepted formats: JPEG, PNG, GIF, WebP`);
    }

    if (file.size > maxSize) {
      throw new Error(`${file.name} is larger than 5MB`);
    }

    return true;
  }
}

export const blogService = new BlogService();