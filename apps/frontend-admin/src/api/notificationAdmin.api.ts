import { AxiosConfig } from '../config/axios.config';
import {
  tResponseNotification,
  tResponseNotificationSingle,
} from '../types/notification.type';

// Read
export const getNotifications = async (query: {
  limit: 10;
}): // query: tPartner
Promise<tResponseNotification> => {
  try {
    const response = await AxiosConfig.get(`/`, {
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
    const response = await AxiosConfig.get(`/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error as string);
  }
};
