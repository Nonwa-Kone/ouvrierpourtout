import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getUserById } from '../../../api/user.api'; // deleteUser ajouté pour suppression
import { PermissionCard } from '../../../components/layouts/Online/Users/PermissionCard';
import { BlockInfo } from '../../../components/layouts/users/BlockInfo';
import { withOnlineLayout } from '../../../hoc/withOnlineLayout';
import { tUser } from '../../../types/user.type';

export const DetailUser = withOnlineLayout(() => {
  const userId = useParams<{ id: string }>().id;
  const { isError, isLoading, data, error } = useQuery({
    queryKey: ['user', userId],
    queryFn: async () => {
      const response = await getUserById(userId as string);
      return response.data;
    },
  });

  if (isLoading) return <p>Chargement des données ...</p>;

  if (isError) return `${error}`;

  return (
    <div className='usersPage'>
      <div className='usersPage-block--detail-user'>
        <div className='usersPage-block--detail-user-info'>
          <BlockInfo user={data as tUser} />
          <PermissionCard />
        </div>
        <div className='usersPage-block--detail-user-more-info'></div>
      </div>
    </div>
  );
});
