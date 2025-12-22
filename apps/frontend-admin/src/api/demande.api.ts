import { AxiosConfig } from '../config/axios.config';
import {
  tDemande,
  tDemandeResponse,
  tFilterDemande,
} from './../types/demande.type';

const API_URL = 'https://tiers-service.vercel.app';
// const API_URL = 'http://localhost:3000';

//write
export const createDemande = async (
  data: tDemande
): Promise<tDemandeResponse> => {
  try {
    const response = await AxiosConfig.post(`${API_URL}/order`, data);
    return response.data;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const assignTicketSpecialist = async (data: {
  ouvrierId: string;
  orderId: string;
}): Promise<tDemandeResponse> => {
  try {
    const response = await AxiosConfig.post(
      `${API_URL}/order/assign-ticket-specialist`,
      data
    );
    return response.data;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const assignTradeBody = async (data: {
  orderId: string;
  profession: string;
}): Promise<tDemandeResponse> => {
  try {
    const response = await AxiosConfig.post(
      `${API_URL}/order/assign-trade-body`,
      data
    );
    return response.data;
  } catch (error) {
    throw new Error(error as string);
  }
};

// read
export const getDemandes = async (
  filter: tFilterDemande
): Promise<tDemandeResponse> => {
  try {
    const response = await AxiosConfig.get(`${API_URL}/order`, {
      params: filter,
    });
    return response.data;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const getDemandeById = async (id: string): Promise<tDemandeResponse> => {
  try {
    const response = await AxiosConfig.get(`${API_URL}/order/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const getDemandeByCustomerId = async (
  id: string
): Promise<tDemandeResponse> => {
  try {
    const response = await AxiosConfig.get(`${API_URL}/order/customer/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error as string);
  }
};

//update
export const updateDemande = async (
  id: string,
  data: tDemande
): Promise<tDemandeResponse> => {
  try {
    const response = await AxiosConfig.put(`${API_URL}/order/${id}`, data);
    return response.data;
  } catch (error) {
    throw new Error(error as string);
  }
};

// delete
export const deleteDemande = async (id: string): Promise<tDemandeResponse> => {
  try {
    const response = await AxiosConfig.delete(`${API_URL}/order/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error as string);
  }
};
