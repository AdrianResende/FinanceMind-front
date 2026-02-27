import axios from 'axios';
import type { HomeData } from './types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const homeService = {
  async getData(): Promise<HomeData> {
    const response = await axios.get(`${API_URL}/home`);
    return response.data;
  },

  async updateData(data: Partial<HomeData>): Promise<HomeData> {
    const response = await axios.put(`${API_URL}/home`, data);
    return response.data;
  },
};
