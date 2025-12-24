import { API_ROOT } from '../config/app.config';
import { AxiosConfig } from '../config/axios.config';
import {
  tDemande,
  tDemandeResponse,
  tFilterDemande,
} from './../types/demande.type';

//write
export const createDemande = async (
  data: tDemande
): Promise<tDemandeResponse> => {
  try {
    const response = await AxiosConfig.post(`/${API_ROOT.order}`, data);
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
      `/${API_ROOT.order}/assign-ticket-specialist`,
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
      `/${API_ROOT.order}/assign-trade-body`,
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
    const response = await AxiosConfig.get(`/${API_ROOT.order}`, {
      params: filter,
    });
    return response.data;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const getDemandeById = async (id: string): Promise<tDemandeResponse> => {
  try {
    const response = await AxiosConfig.get(`/${API_ROOT.order}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const getDemandeByCustomerId = async (
  id: string
): Promise<tDemandeResponse> => {
  try {
    const response = await AxiosConfig.get(`/${API_ROOT.order}/customer/${id}`);
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
    const response = await AxiosConfig.put(`/${API_ROOT.order}/${id}`, data);
    return response.data;
  } catch (error) {
    throw new Error(error as string);
  }
};

// delete
export const deleteDemande = async (id: string): Promise<tDemandeResponse> => {
  try {
    const response = await AxiosConfig.delete(`/${API_ROOT.order}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error as string);
  }
};
