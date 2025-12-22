import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { deleteUser } from '../../../api/user.api'; // deleteUser ajouté pour suppression
import { initFilterUser } from '../../../assets/constant/user';
import { useMemberData } from '../../../assets/hook/member.client';
import { genderLabel } from '../../../assets/utils/displayVariation';
import CustomBasicPaginator, {
  Table,
  TableActions,
  TableHeader,
  TableProfils,
} from '../../../components/layouts/tableLayout/TableLayout';
import { withOnlineLayout } from '../../../hoc/withOnlineLayout';
import { useModalStore } from '../../../stores/modal.store';
import { useUserStore } from '../../../stores/user.store';
import { tFilterUser, tUser } from '../../../types/user.type';

const UsersComponent: React.FC = () => {
  // ...existing component code...

  const navigate = useNavigate();

  const setModalFilterUser = useModalStore((s) => s.setModalFilterUser);
  const { filterUser, setUserStore } = useUserStore((s) => s);
  const { isLoading, data, isRefetching, isPending } = useMemberData(
    filterUser as tFilterUser
  );

  const isActiveFilter = React.useMemo((): boolean => {
    return Boolean(
      filterUser?.gender || filterUser?.role || filterUser?.searchTerm
    );
  }, [filterUser?.gender, filterUser?.role, filterUser?.searchTerm]);

  // Fonction pour supprimer l'utilisateur
  const handleDelete = async (id: string) => {
    const loader = toast.loading('Suppression en cours...');
    try {
      if (id) {
        toast.error('Impossible de supprimer cet utilisateur');
        return;
      }
      const response = await deleteUser(id);
      if (!response.success) {
        toast.error(response.message);
        return;
      }
      toast.success('Utilisateur supprimé avec succès');
      // Refetch les données ou mets à jour l'état après suppression
    } catch (error) {
      console.error('Erreur lors de la suppression :', error);
    } finally {
      console.log('🚀 ~ deleteUser ~ finally:');
      toast.dismiss(loader);
    }
  };

  const datasTable = data?.data?.map((user: tUser) => {
    const item = {
      content: [
        <TableProfils
          email={user?.personalInfos?.email as string}
          name={
            user?.personalInfos?.firstName + ' ' + user?.personalInfos?.lastName
          }
        />,
        <span style={{ gap: '.3rem', color: '#64748B', fontSize: '0.775rem' }}>
          {user?.personalInfos?.phoneNumber as string}
        </span>,
        <span style={{ gap: '.3rem', color: '#64748B', fontSize: '0.775rem' }}>
          {genderLabel(user?.personalInfos?.gender as string)}
        </span>,
        <span style={{ gap: '.3rem', color: '#64748B', fontSize: '0.775rem' }}>
          {user?.role?.label as string}
        </span>,
        <TableActions
          onEdit={() => {}}
          onView={() => {
            navigate(`/users/${user._id}`);
          }}
          onDelete={() => handleDelete(user._id as string)}
          // onCheck={() => {}}
        />,
      ],
    };
    return item;
  });

  return (
    <div className='usersPage'>
      <div className='usersPage-block--users'>
        <div className='usersPage-block--users-title'>
          <h3>Membres</h3>
          {/* <Button label='Ajouter' onClick={} /> */}
        </div>
        <div className='usersPage-block--users-body'>
          <TableHeader
            showBtns={{
              filter: true,
              refresh: true,
              add: true,
              reset: isActiveFilter as boolean,
            }}
            addBtn={{ label: 'ajouter', onClick: () => navigate('/users/new') }}
            filterBtn={{
              label: 'filter',
              onClick() {
                setModalFilterUser('modalFilterUser', true);
              },
            }}
            resetBtn={{
              label: 'Réinitialiser',
              onClick() {
                setUserStore('filterUser', initFilterUser);
              },
            }}
            handleSearch={(e: React.ChangeEvent<HTMLInputElement>) => {
              e.target.value.length > 2
                ? setUserStore('filterUser', {
                    searchTerm: e.target.value as string,
                  })
                : setUserStore('filterUser', {
                    searchTerm: null,
                  });
            }}
            handleRefresh={() => {
              setUserStore('filterUser', initFilterUser);
            }}
          />
          <Table
            columns={[
              { flex: 1, label: 'Membre' },
              { flex: 0.5, label: 'Téléphone' },
              { flex: 0.5, label: 'Genre' },
              { flex: 0.5, label: 'Rôle' },
              { flex: 0.5, label: 'Actions' },
            ]}
            data={datasTable || []}
            loading={isLoading || isRefetching}
          />
          <CustomBasicPaginator
            // resetPage={resetPage}
            isLoading={isPending}
            totalRecords={data?.count as number}
            initialPage={data?.currentPage as number}
            // rowsPerPage={10}
            rowsPerPageOptions={[10, 20, 30, 40, 50]}
            onPageChange={(page, rowsPerPage) => {
              console.log('🚀 ~ Users ~ page, rowsPerPage:', page, rowsPerPage);
              // setResetPage(false);
              // setPartnerStore('filterPartner', {
              //   ...filterPartner,
              //   page,
              //   limit: rowsPerPage,
              // });
            }}
            onRowsPerPageChange={(rowsPerPage) => {
              console.log('🚀 ~ Users ~ rowsPerPage:', rowsPerPage);
              // setPartnerStore('filterPartner', {
              //   ...filterPartner,
              //   limit: rowsPerPage,
              // });
            }}
          />
        </div>
      </div>
    </div>
  );
};

export const Users = withOnlineLayout(UsersComponent);
