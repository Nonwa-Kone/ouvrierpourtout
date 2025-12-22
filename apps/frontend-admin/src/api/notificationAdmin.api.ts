import { AxiosConfig } from '../config/axios.config';
import {
  tResponseNotification,
  tResponseNotificationSingle,
} from '../types/notification.type';

const BASE_URL = 'https://tiers-service.vercel.app/notifications/admin';
// const BASE_URL = 'http://localhost:3000/notifications/admin';
// Read
export const getNotifications = async (query: {
  limit: 10;
}): // query: tPartner
Promise<tResponseNotification> => {
  try {
    const response = await AxiosConfig.get(`${BASE_URL}/`, {
      params: query,
    });
    return response.data;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const getByIdNotification = async (
  id: string
): Promise<tResponseNotificationSingle> => {
  try {
    const response = await AxiosConfig.get(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error as string);
  }
};
