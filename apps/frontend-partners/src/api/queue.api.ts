import { AxiosConfig } from '../config/axios.config';

const BASE_URL = `http://localhost:3000/queue`;

export const getQueue = async ({
  profession,
}: {
  profession: string;
}): Promise<{
  data: any;
  success: boolean;
  message: string;
}> => {
  try {
    const response = await AxiosConfig.get(`${BASE_URL}`, {
      params: {
        profession,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const validetedQueueByOuvrier = async (
  queueId: string,
  ouvrierId: string
): Promise<{
  data: any;
  success: boolean;
  message: string;
}> => {
  try {
    const response = await AxiosConfig.post(
      `${BASE_URL}/valideted-queue-by-customer/${queueId}/${ouvrierId}`
    );
    return response.data;
  } catch (error) {
    throw new Error(error as string);
  }
};
