import { AxiosConfig } from '../config/axios.config';

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
    const response = await AxiosConfig.get(`/insight/admin`);
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
    const response = await AxiosConfig.get(`/insight/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error as string);
  }
};
