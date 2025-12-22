import { AxiosConfig } from '../config/axios.config';
import { tDocument } from '../types/partners.type';

const BASE_URL = 'https://tiers-service.vercel.app/document';
// const BASE_URL = 'http://localhost:3000/document';

export const getDocumentByOwnerId = async (
  ownerId: string
): Promise<{
  data: tDocument[];
  message: string;
  success: boolean;
}> => {
  try {
    const response = await AxiosConfig.get(
      `${BASE_URL}/get-by-owner-id/${ownerId}`
    );
    return response.data;
  } catch (error) {
    throw new Error(error as string);
  }
};

// Update
export const updateDocument = async (
  id: string,
  document: tDocument
): Promise<{
  data: tDocument;
  message: string;
  success: boolean;
}> => {
  try {
    const response = await AxiosConfig.put(`${BASE_URL}/${id}`, document);
    return response.data;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const changeStatusDocument = async (
  id: string,
  status: string
): Promise<{
  data: tDocument;
  message: string;
  success: boolean;
}> => {
  try {
    const response = await AxiosConfig.put(`${BASE_URL}/${id}/status`, {
      status,
    });
    return response.data;
  } catch (error) {
    throw new Error(error as string);
  }
};

// Delete
export const deleteDocument = async (
  id: string
): Promise<{
  data: tDocument;
  message: string;
  success: boolean;
}> => {
  try {
    const response = await AxiosConfig.delete(`/api/documents/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error as string);
  }
};
