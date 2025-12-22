import { AxiosConfig } from '../config/axios.config';

const BASE_URL = 'https://tiers-service.vercel.app';
// const BASE_URL = 'http://localhost:3000';

type tInsight = {
  orders: number;
  customers: number;
  ouvriers: number;
};

export const getInsight = async (): Promise<{
  data: tInsight;
  message: string;
  status: number;
}> => {
  try {
    const response = await AxiosConfig.get(`${BASE_URL}/insight/admin`);
    return response.data;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const getInsightById = async (
  id: string
): Promise<{
  data: tInsight;
  message: string;
  status: number;
}> => {
  try {
    const response = await AxiosConfig.get(`${BASE_URL}/insight/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error as string);
  }
};
