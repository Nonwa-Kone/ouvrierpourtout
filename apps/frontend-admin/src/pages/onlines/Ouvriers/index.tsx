import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { colors } from '../../../assets/constant/colors copy';
import { initFilterPartner } from '../../../assets/constant/partners.ts';
import { columnTableOuvriers } from '../../../assets/constant/table';
import {
  useDeleteOuvrierData,
  useOuvriersData,
} from '../../../assets/hook/ouvrier.client.ts';
import { genderLabel } from '../../../assets/utils/displayVariation';
import CustomBasicPaginator, {
  Table,
  TableActions,
  TableHeader,
  TableProfils,
} from '../../../components/layouts/tableLayout/TableLayout';
import { withOnlineLayout } from '../../../hoc/withOnlineLayout';
import { useAvisStore, useModalStore } from '../../../stores/modal.store.ts';
import { usePartnersStore } from '../../../stores/partners.store.ts';
import { filterPartner, tPartner } from '../../../types/partners.type';

export const Ouvriers = withOnlineLayout(() => {
  const [resetPage, setResetPage] = React.useState<boolean>(false);
  // const [rowPerPage, setRowPerPage] = React.useState<number>(10);
  const navigate = useNavigate();

  const setPartnerStore = usePartnersStore((s) => s.setPartnerStore);
  const filterPartner = usePartnersStore((s) => s.filterPartner);
  const setModalAvisActions = useModalStore((s) => s.setModalAvisActions);
  const { avis, setAvisStore } = useAvisStore((s) => s);

  const { data, isPending, isRefetching } = useOuvriersData(
    filterPartner as filterPartner
  );
  const mutation = useDeleteOuvrierData();

  const datasTable = data?.data?.map((partner: tPartner) => {
    const item = {
      content: [
        <span style={{ color: colors.primary['500'], fontSize: '0.775rem' }}>
          {partner.reference}
        </span>,
        <TableProfils
          email={partner.personalInfos?.email as string}
          name={
            partner.personalInfos?.firstName +
            ' ' +
            partner.personalInfos?.lastName
          }
        />,
        <span style={{ gap: '.3rem', color: '#64748B', fontSize: '0.775rem' }}>
          {genderLabel(partner.personalInfos?.gender as string)}
        </span>,
        <span
          className='flex-col-start-start'
          style={{ gap: '.3rem', color: '#64748B', fontSize: '0.775rem' }}
        >
          {partner.profession?.speciality}
        </span>,
        <TableActions
          onView={() => navigate(`/ouvriers/${partner._id}`)}
          onEdit={() => navigate(`/ouvriers/${partner._id}/edit`)}
          onDelete={() => {
            handleDelete(partner._id as string);
          }}
        />,
      ],
    };
    return item;
  });

  const handleDelete = async (id?: string) => {
    // const loader = toast.loading('Suppression en cours...');
    if (!id) {
      toast.error('Impossible de supprimer cet utilisateur');
      return;
    }
    setModalAvisActions('avisModal', true);
    if (avis) {
      mutation.mutate(id);
    }
    // Refetch les données ou mets à jour l'état après suppression
    setAvisStore('avis', false);
  };

  return (
    <div className='partnersPage'>
      <div className='partnersPage-block--partners'>
        <div className='partnersPage-block--partners-title'>
          <h3>Partenaires</h3>
        </div>
      </div>
      {/* START TABLE */}
      <TableHeader
        showBtns={{ filter: true, refresh: true, add: true }}
        addBtn={{
          label: 'Ajouter',
          onClick: () => navigate('/ouvriers/new'),
        }}
        handleRefresh={() => {
          setResetPage(true);
          setPartnerStore('filterPartner', initFilterPartner);
        }}
        handleSearch={(e: React.ChangeEvent<HTMLInputElement>) => {
          e.target.value.length > 2
            ? setPartnerStore('filterPartner', {
                searchTerm: e.target.value as string,
              })
            : setPartnerStore('filterPartner', {
                searchTerm: null,
              });
        }}
      />
      <Table
        columns={columnTableOuvriers}
        data={datasTable}
        loading={isPending || isRefetching}
      />
      <CustomBasicPaginator
        resetPage={resetPage}
        isLoading={isPending}
        totalRecords={data?.count as number}
        initialPage={data?.currentPage as number}
        // rowsPerPage={rowPerPage as number}
        rowsPerPageOptions={[10, 20, 30, 40, 50]}
        onPageChange={(page, rowsPerPage) => {
          setResetPage(false);
          setPartnerStore('filterPartner', {
            ...filterPartner,
            page,
            limit: rowsPerPage,
          });
        }}
        onRowsPerPageChange={(rowsPerPage) => {
          setPartnerStore('filterPartner', {
            ...filterPartner,
            limit: rowsPerPage,
          });
        }}
      />
      {/* END TABLE */}
    </div>
  );
});
