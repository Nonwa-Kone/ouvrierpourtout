import { API_ROOT } from '../config/app.config';
import { AxiosConfig } from '../config/axios.config';
import { filterPartner, tPartner } from '../types/partners.type';

// Read
export const getAllPartners = async (
  query: filterPartner
): // query: tPartner
Promise<{
  data: tPartner[];
  count: number;
  success: boolean;
  currentPage: number;
  totalPage: number;
  nextPage: number;
  prevPage: number;
}> => {
  try {
    const response = await AxiosConfig.get(`/${API_ROOT.ouvriers}`, {
      params: query,
    });
    return response.data;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const getPartnerById = async (
  id: string
): Promise<{
  data: tPartner;
  message: string;
  success: boolean;
}> => {
  try {
    const response = await AxiosConfig.get(`/${API_ROOT.ouvriers}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error as string);
  }
};

// Create
export const createPartner = async (
  partner: tPartner
): Promise<{
  data: tPartner;
  message: string;
  success: boolean;
}> => {
  try {
    const response = await AxiosConfig.post(`/${API_ROOT.ouvriers}`, partner);
    return response.data;
  } catch (error) {
    throw new Error(error as string);
  }
};

// Update
export const updatePartner = async (
  id: string,
  partner: tPartner
): Promise<{
  data: tPartner;
  message: string;
  success: boolean;
}> => {
  try {
    const response = await AxiosConfig.put(
      `/${API_ROOT.ouvriers}/${id}`,
      partner
    );
    return response.data;
  } catch (error) {
    throw new Error(error as string);
  }
};

// Delete
export const deletePartner = async (
  id: string
): Promise<{
  data: tPartner;
  message: string;
  success: boolean;
}> => {
  try {
    const response = await AxiosConfig.delete(`/${API_ROOT.ouvriers}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error as string);
  }
};

// Toggle Active
export const toggleActiveAccoutPartner = async (
  id: string,
  active: boolean
): Promise<{
  data: tPartner;
  message: string;
  success: boolean;
}> => {
  try {
    const response = await AxiosConfig.put(
      `/${API_ROOT.ouvriers}/${id}/active`,
      {
        active,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error as string);
  }
};
