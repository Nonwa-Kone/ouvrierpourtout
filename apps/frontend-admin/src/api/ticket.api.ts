import { AxiosConfig } from '../config/axios.config';
import { tDemande } from '../types/demande.type';

export const getTicketById = async (
  id: string
): Promise<{
  data: tDemande;
  success: boolean;
  message: string;
}> => {
  try {
    const response = await AxiosConfig.get(`/find-order-by-assigned-to/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error as string);
  }
};
