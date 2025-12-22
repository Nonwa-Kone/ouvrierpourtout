import { AxiosConfig } from '../config/axios.config';
import {
  tCustomer,
  tCustomerFilter,
  tCustomerResponse,
} from '../types/customer.type';

const API_URL = 'https://tiers-service.vercel.app';
// const API_URL = 'http://localhost:3000';

export const getCustomers = async (
  filter: tCustomerFilter
): Promise<tCustomerResponse> => {
  try {
    const response = await AxiosConfig.get(`${API_URL}/customer`, {
      params: filter,
    });
    return response.data;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const addCustomer = async (
  data: tCustomer
): Promise<tCustomerResponse> => {
  try {
    const response = await AxiosConfig.post(`${API_URL}/customer`, data);
    return response.data;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const updateCustomer = async (
  id: string,
  data: tCustomer
): Promise<tCustomerResponse> => {
  try {
    const response = await AxiosConfig.put(`${API_URL}/customer/${id}`, data);
    return response.data;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const deleteCustomer = async (
  id: string
): Promise<tCustomerResponse> => {
  try {
    const response = await AxiosConfig.delete(`${API_URL}/customer/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error as string);
  }
};
