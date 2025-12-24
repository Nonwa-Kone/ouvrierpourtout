import { API_ROOT } from '../config/app.config';
import { AxiosConfig } from '../config/axios.config';
import {
  tCustomer,
  tCustomerFilter,
  tCustomerResponse,
} from '../types/customer.type';

export const getCustomers = async (
  filter: tCustomerFilter
): Promise<tCustomerResponse> => {
  try {
    const response = await AxiosConfig.get(`/${API_ROOT.customer}`, {
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
    const response = await AxiosConfig.post(`/${API_ROOT.customer}`, data);
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
    const response = await AxiosConfig.put(`/${API_ROOT.customer}/${id}`, data);
    return response.data;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const deleteCustomer = async (
  id: string
): Promise<tCustomerResponse> => {
  try {
    const response = await AxiosConfig.delete(`/${API_ROOT.customer}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error as string);
  }
};
