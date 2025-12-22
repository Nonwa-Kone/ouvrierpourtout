import { AxiosConfig } from '../config/axios.config';
import { tFilterUser, tUser } from '../types/user.type';

// const BASE_URL = `${'https://tiers-service.vercel.app'}`;
const BASE_URL = `${'http://localhost:4000'}`;

// Read
export const getAllUsers = async (
  query: tFilterUser
): Promise<{
  data: tUser[];
  message: string;
  success: boolean;
  count?: number;
  currentPage?: number;
  prevPage?: number;
  nextPage?: number;
  totalPages?: number;
}> => {
  try {
    const response = await AxiosConfig.get(`${BASE_URL}/admin`, {
      params: query,
    });
    return response.data;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const getUserById = async (
  id: string
): Promise<{
  data: tUser;
  message: string;
  success: boolean;
}> => {
  try {
    const response = await AxiosConfig.get(`${BASE_URL}/admin/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error as string);
  }
};

// Create
export const createUser = async (
  user: tUser
): Promise<{
  data: tUser;
  message: string;
  success: boolean;
}> => {
  try {
    const response = await AxiosConfig.post(`${BASE_URL}/admin`, user);
    return response.data;
  } catch (error) {
    throw new Error(error as string);
  }
};

// Update
export const updateUser = async (
  id: string,
  user: tUser
): Promise<{
  data: tUser;
  message: string;
  success: boolean;
}> => {
  try {
    const response = await AxiosConfig.put(`${BASE_URL}/admin/${id}`, user);
    return response.data;
  } catch (error) {
    throw new Error(error as string);
  }
};

// Delete
export const deleteUser = async (
  id: string
): Promise<{
  data: tUser;
  message: string;
  success: boolean;
}> => {
  try {
    const response = await AxiosConfig.delete(`${BASE_URL}/admin/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error as string);
  }
};

// Toggle Active
export const toggleActiveAccoutUser = async (
  id: string,
  active: boolean
): Promise<{
  data: tUser;
  message: string;
  success: boolean;
}> => {
  try {
    const response = await AxiosConfig.put(`${BASE_URL}/admin/${id}/active`, {
      active,
    });
    return response.data;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const authAdmin = async (body: {
  email: string;
  password: string;
}): Promise<{
  success: boolean;
  message: string;
  data: tUser;
  token: string;
}> => {
  try {
    const response = await AxiosConfig.post(`${BASE_URL}/admin/login`, body);
    return response.data;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const checkAuthByToken = async (): Promise<{
  success: boolean;
  message: string;
  data: tUser;
}> => {
  try {
    const response = await AxiosConfig.post(`${BASE_URL}/admin/findByToken`);
    return response.data;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const logoutAdmin = async (
  userId: string
): Promise<{
  success: boolean;
  message: string;
}> => {
  try {
    const response = await AxiosConfig.post(
      `${BASE_URL}/admin/logout/${userId}`
    );
    return response.data;
  } catch (error) {
    throw new Error(error as string);
  }
};
