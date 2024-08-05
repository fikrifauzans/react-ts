import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

const buildQuery = (query?: Record<string, any>): string => {
  if (!query) return '';
  const queryString = Object.keys(query)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`)
    .join('&');
  return `?${queryString}`;
};

export const getList = async (resource: string, query?: Record<string, any>) => {
  const response = await api.get(`/${resource}${buildQuery(query)}`);
  return response.data;
};

export const getDetail = async (resource: string, id: number) => {
  const response = await api.get(`/${resource}/${id}`);
  return response.data;
};

export const createItem = async (resource: string, item: any) => {
  const response = await api.post(`/${resource}`, item);
  return response.data;
};

export const updateItem = async (resource: string, id: number, item: any) => {
  const response = await api.put(`/${resource}/${id}`, item);
  return response.data;
};

export const deleteItem = async (resource: string, id: number) => {
  const response = await api.delete(`/${resource}/${id}`);
  return response.data;
};
