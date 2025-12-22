import { AxiosConfig } from '../config/axios.config';
import { tPartner } from '../types/partners.type';

const BASE_URL = `http://localhost:3000`;

// Read
export const getAllPartners = async (): // query: tPartner
Promise<{
  data: tPartner[];
  count: number;
  success: boolean;
}> => {
  try {
    const response = await AxiosConfig.get(`${BASE_URL}/ouvriers`);
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
    const response = await AxiosConfig.get(`${BASE_URL}/ouvriers/${id}`);
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
    const response = await AxiosConfig.post(`${BASE_URL}/ouvriers`, partner);
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
      `${BASE_URL}/ouvriers/${id}`,
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
    const response = await AxiosConfig.delete(`${BASE_URL}/ouvriers/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const login = async (payload: {
  email: string;
  password: string;
}): Promise<{
  data: tPartner;
  token?: string;
  message: string;
  success: boolean;
}> => {
  try {
    const response = await AxiosConfig.post(
      `${BASE_URL}/ouvriers/login-partner`,
      payload
    );
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
      `${BASE_URL}/ouvriers/${id}/active`,
      {
        active,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const checkAuthByToken = async (): Promise<{
  success: boolean;
  message: string;
  data: tPartner;
}> => {
  try {
    const response = await AxiosConfig.post(`${BASE_URL}/ouvriers/findByToken`);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const uplaodProfFile = async (
  id: string,
  file: FormData
): Promise<{
  data: tPartner;
  message: string;
  success: boolean;
}> => {
  try {
    // const formData = new FormData();
    // formData.append('image', file);
    const response = await AxiosConfig.put(
      `${BASE_URL}/ouvriers/${id}/profFile`,
      file,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const uplaodRealizationImg = async (
  id: string,
  body: { realization: { fileUrl: unknown; name: string } }
): Promise<{
  data: tPartner;
  message: string;
  success: boolean;
}> => {
  try {
    const response = await AxiosConfig.put(
      `${BASE_URL}/ouvriers/${id}/img-realisation`,
      body,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error as string);
  }
};
