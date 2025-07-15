import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'https://ilearn-server.bairuhatech.com/v1',
  headers: {
    'Content-Type': 'application/json',
    'Accept': '*/*'
  }
});
