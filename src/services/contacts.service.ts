import apiRequest from "@/config/apiRequest";
import { API_ENDPOINTS } from "@/config/api";

export interface IContact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: 'pending' | 'resolved' | 'important';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export const contactService = {
  getAllContacts: async () => {
    try {
      const response = await apiRequest.get(API_ENDPOINTS.ADMIN.CONTACTS.LIST);
      return response;
    } catch (error) {
      console.error('Error fetching contacts:', error);
      throw error;
    }
  },

  getContactById: async (id: string) => {
    try {
      const response = await apiRequest.get(`${API_ENDPOINTS.ADMIN.CONTACTS.DETAIL}/${id}`);
      return response;
    } catch (error) {
      console.error('Error fetching contact:', error);
      throw error;
    }
  },

  createContact: async (data: Partial<IContact>) => {
    try {
      const response = await apiRequest.post(API_ENDPOINTS.ADMIN.CONTACTS.CREATE, data);
      return response;
    } catch (error) {
      console.error('Error creating contact:', error);
      throw error;
    }
  },

  updateContact: async (id: string, data: Partial<IContact>) => {
    try {
      const response = await apiRequest.patch(`${API_ENDPOINTS.ADMIN.CONTACTS.UPDATE}/${id}`, data);
      return response;
    } catch (error) {
      console.error('Error updating contact:', error);
      throw error;
    }
  },

  deleteContact: async (id: string) => {
    try {
      const response = await apiRequest.delete(API_ENDPOINTS.ADMIN.CONTACTS.DELETE(id));
      return response;
    } catch (error) {
      console.error('Error deleting contact:', error);
      throw error;
    }
  },
}; 