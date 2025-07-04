import { API_ENDPOINTS } from '../config/api';
import apiRequest from '../config/apiRequest';

export interface IBlogPost {
  id: string;
  categoryId: string;
  title: string;
  subTitle: string;
  description: string;
  image: string;
  tags: string;
  link: string;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IBlogCategory {
  id: string;
  title: string;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface IBlogPostCreate extends Omit<IBlogPost, 'id' | 'createdAt' | 'updatedAt'> {}
export interface IBlogCategoryCreate extends Omit<IBlogCategory, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'> {}

class BlogService {
  // Blog Posts
  async getAllPosts() {
    try {
      return await apiRequest.get(API_ENDPOINTS.ADMIN.BLOG.POSTS.LIST);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      throw error;
    }
  }

  async getPostById(id: string) {
    try {
      return await apiRequest.get(`${API_ENDPOINTS.ADMIN.BLOG.POSTS.DETAIL}/${id}`);
    } catch (error) {
      console.error('Error fetching blog post:', error);
      throw error;
    }
  }

  async createPost(data: IBlogPostCreate) {
    try {
      return await apiRequest.post(API_ENDPOINTS.ADMIN.BLOG.POSTS.CREATE, data);
    } catch (error) {
      console.error('Error creating blog post:', error);
      throw error;
    }
  }

  async updatePost(id: string, data: Partial<IBlogPostCreate>) {
    try {
      return await apiRequest.patch(`${API_ENDPOINTS.ADMIN.BLOG.POSTS.UPDATE}/${id}`, data);
    } catch (error) {
      console.error('Error updating blog post:', error);
      throw error;
    }
  }

  async deletePost(id: string) {
    try {
      return await apiRequest.delete(`${API_ENDPOINTS.ADMIN.BLOG.POSTS.DELETE}/${id}`);
    } catch (error) {
      console.error('Error deleting blog post:', error);
      throw error;
    }
  }

  // Blog Categories
  async getAllCategories() {
    try {
      return await apiRequest.get(API_ENDPOINTS.ADMIN.BLOG.CATEGORIES.LIST);
    } catch (error) {
      console.error('Error fetching blog categories:', error);
      throw error;
    }
  }

  async getCategoryById(id: string) {
    try {
      return await apiRequest.get(`${API_ENDPOINTS.ADMIN.BLOG.CATEGORIES.DETAIL}/${id}`);
    } catch (error) {
      console.error('Error fetching blog category:', error);
      throw error;
    }
  }

  async createCategory(data: IBlogCategoryCreate) {
    try {
      return await apiRequest.post(API_ENDPOINTS.ADMIN.BLOG.CATEGORIES.CREATE, data);
    } catch (error) {
      console.error('Error creating blog category:', error);
      throw error;
    }
  }

  async updateCategory(id: string, data: Partial<IBlogCategoryCreate>) {
    try {
      return await apiRequest.patch(`${API_ENDPOINTS.ADMIN.BLOG.CATEGORIES.UPDATE}/${id}`, data);
    } catch (error) {
      console.error('Error updating blog category:', error);
      throw error;
    }
  }

  async deleteCategory(id: string) {
    try {
      return await apiRequest.delete(`${API_ENDPOINTS.ADMIN.BLOG.CATEGORIES.DELETE}/${id}`);
    } catch (error) {
      console.error('Error deleting blog category:', error);
      throw error;
    }
  }
}

export const blogService = new BlogService(); 