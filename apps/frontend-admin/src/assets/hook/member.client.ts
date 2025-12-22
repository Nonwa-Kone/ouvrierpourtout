import { useQuery } from '@tanstack/react-query';
import { getAllUsers } from '../../api/user.api';
import { tFilterUser } from '../../types/user.type';

export const useMemberData = (filter: tFilterUser) => {
  return useQuery({
    queryKey: [
      'users',
      'list',
      ...(typeof filter === 'object' ? Object.values(filter) : []),
    ],
    queryFn: async () => {
      const response = await getAllUsers(filter);
      return response;
    },
  });
};
