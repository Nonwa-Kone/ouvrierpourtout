import axios from 'axios';
import { AxiosConfig } from '../config/axios.config';
import { tDocument } from '../types/partners.type';

const BASE_URL = 'http://localhost:3000/document';

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
  document: FormData
): Promise<{
  data: tDocument;
  message: string;
  success: boolean;
}> => {
  try {
    const response = await axios.put(`${BASE_URL}/${id}`, document, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
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
