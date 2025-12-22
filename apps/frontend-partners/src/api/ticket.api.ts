import { AxiosConfig } from '../config/axios.config';
import { tDemandeResponse, tFilterDemande } from '../types/demande.type';

const BASE_URL = `http://localhost:3000/order`;

export const getTicketById = async (
  id: string,
  filters: tFilterDemande
): Promise<tDemandeResponse> => {
  try {
    const response = await AxiosConfig.get(
      `${BASE_URL}/find-order-by-assigned-to/${id}`,
      {
        params: filters,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const editStatuTicket = async (
  idTicket?: string,
  status?: string,
  amount?: number
): Promise<tDemandeResponse> => {
  try {
    const response = await AxiosConfig.put(
      `${BASE_URL}/edit-statu-ticket-by/${idTicket}`,
      {
        status,
        amount,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error as string);
  }
};
