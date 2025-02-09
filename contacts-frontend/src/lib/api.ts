import axios from 'axios';
import { Contact } from '../types/contact';
import { Category } from '../types/category';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
});

export const getContacts = async () => {
  const response = await api.get('/contacts/');
  return response.data;
};

export const createContact = async (contact: Partial<Contact>) => {
  const response = await api.post('/contacts/', contact);
  return response.data;
};

export const updateContact = async (id: number, contact: Partial<Contact>) => {
  const response = await api.put(`/contacts/${id}/`, contact);
  return response.data;
};

export const deleteContact = async (id: number) => {
  await api.delete(`/contacts/${id}/`);
};

export const getCategories = async () => {
  const response = await api.get('/categories/');
  return response.data;
};

export const createCategory = async (data: Partial<Category>) => {
  const response = await api.post('/categories/', data);
  return response.data;
};
export const deleteCategory = async (id: number) => {
  await api.delete(`/categories/${id}/`);
};

export const updateCategory = async (id: number, data: { name: string }) => {
  const response = await api.put(`/categories/${id}/`, data);
  return response.data;
};