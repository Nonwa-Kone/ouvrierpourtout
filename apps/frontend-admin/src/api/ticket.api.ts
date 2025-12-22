import { AxiosConfig } from '../config/axios.config';
import { tDemande } from '../types/demande.type';

const BASE_URL = `https://tiers-service.vercel.app/order`;
// const BASE_URL = `http://localhost:3000/order`;

export const getTicketById = async (
  id: string
): Promise<{
  data: tDemande;
  success: boolean;
  message: string;
}> => {
  try {
    const response = await AxiosConfig.get(
      `${BASE_URL}/find-order-by-assigned-to/${id}`
    );
    return response.data;
  } catch (error) {
    throw new Error(error as string);
  }
};
