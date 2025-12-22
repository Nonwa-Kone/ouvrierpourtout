import { useQuery } from '@tanstack/react-query';
import {
  getByIdNotification,
  getNotifications,
} from '../../api/notificationAdmin.api';

export const useAdminNotification = () => {
  return useQuery({
    queryKey: ['notification', 'admin'],
    queryFn: () => getNotifications({ limit: 10 }),
    refetchInterval: 500,
  });
};

export const useGetAdminNotificationById = (id: string) => {
  return useQuery({
    queryKey: ['notification', 'admin', id],
    queryFn: () => getByIdNotification(id),
  });
};
