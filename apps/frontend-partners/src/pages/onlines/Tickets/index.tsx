// import { colors } from '../../../assets/constant/colors copy';
import React from 'react';
import { colors } from '../../../assets/constant/colors copy';
import initFilterDemande from '../../../assets/constant/demande';
import { useTicketByPartnerId } from '../../../assets/hook/ticket';
import { formatDate } from '../../../assets/utils';
import { statusLayout } from '../../../assets/utils/displayVariation';
import CustomBasicPaginator, {
  Table,
  TableActions,
  TableBadge,
  TableHeader,
  TableProfils,
} from '../../../components/layouts/tableLayout/TableLayout';
import { withOnlineLayout } from '../../../hoc/withOnlineLayout';
import { useDemandeStore } from '../../../stores/demande.store';
import { useModalStore } from '../../../stores/modal.store';
import { usePartnersStore } from '../../../stores/partners.store';
import { tDemande, tFilterDemande, tStatus } from '../../../types/demande.type';

const columnTable = [
  {
    flex: 0.5,
    label: 'Référence',
    hideOnMobile: true,
  },
  {
    flex: 1,
    label: 'Nom client',
  },
  {
    flex: 1,
    label: 'Date de création',
    hideOnMobile: true,
  },
  {
    flex: 0.5,
    label: 'Statut',
  },
  {
    flex: 0.75,
    label: 'Actions',
  },
];

export const Tickets = withOnlineLayout(() => {
  const [isResetDataTable, setIsResetDataTable] =
    React.useState<boolean>(false);
  const partnerId = usePartnersStore((state) => state.partner?._id);
  const setDemandeStore = useDemandeStore((s) => s.setDemandeStore);
  const filterDemande = useDemandeStore((s) => s.filterDemande);
  const { data, isPending, isRefetching } = useTicketByPartnerId(
    partnerId as string,
    filterDemande as tFilterDemande
  );
  const {
    setModalDetailOrderAction,
    setModalFilterOrderAction,
    setModalEditOrderAction,
  } = useModalStore((state) => state);

  const isFilterActive = React.useMemo(() => {
    return filterDemande?.status || filterDemande?.searchTerm;
  }, [filterDemande?.status, filterDemande?.searchTerm]);

  const donneesTable = data?.data?.map((demande: tDemande) => {
    const { label, color, bg } = statusLayout(demande?.status as tStatus);

    const item = {
      content: [
        <span style={{ color: colors.primary['500'], fontSize: '0.775rem' }}>
          {demande.reference}
        </span>,
        <TableProfils
          email={demande.customer?.email}
          name={demande.customer?.firstName + ' ' + demande.customer?.lastName}
        />,
        <span style={{ color: '#64748B', fontSize: '0.775rem' }}>
          {formatDate(demande?.createdAt, 'DD MMM YYYY à HH:mm')}
        </span>,
        <TableBadge label={label} color={color} bg={bg} />,
        <TableActions
          onView={() => {
            setDemandeStore?.('demande', demande as tDemande);
            setModalDetailOrderAction('detailOrderModal', true);
          }}
          onEdit={() => {
            setDemandeStore?.('demande', demande as tDemande);
            setModalEditOrderAction('editOrderModal', true);
          }}
        />,
      ],
    };
    return item;
  });

  return (
    <div className='ticketsPage'>
      <div className='ticketsPage--tickets-title'>
        <p>Liste des demandes</p>
      </div>
      <TableHeader
        showBtns={{ filter: true, refresh: true, reset: isFilterActive }}
        filterBtn={{
          label: 'Filtre',
          onClick: () => {
            setModalFilterOrderAction('filterOrderModal', true);
          },
        }}
        handleSearch={(e: React.ChangeEventHandler<HTMLInputElement>) => {
          setDemandeStore?.('filterDemande', {
            ...filterDemande,
            searchTerm: e,
          });
        }}
        resetBtn={{
          label: 'Réinitialiser',
          onClick: () => {
            setDemandeStore?.('filterDemande', initFilterDemande);
          },
        }}
        handleRefresh={() => {
          setIsResetDataTable(true);
          setDemandeStore?.('filterDemande', initFilterDemande);
        }}
      />
      <Table
        data={donneesTable}
        columns={columnTable}
        loading={isPending || isRefetching}
      />
      <CustomBasicPaginator
        resetPage={isResetDataTable}
        isLoading={isPending || isRefetching}
        totalRecords={data?.count as number}
        initialPage={data?.currentPage as number}
        rowsPerPage={10}
        rowsPerPageOptions={[10, 20, 30, 40, 50]}
        onPageChange={(page, rowsPerPage) => {
          setIsResetDataTable(false);
          console.log(page, rowsPerPage);
          setDemandeStore?.('filterDemande', {
            ...initFilterDemande,
            page,
            limit: rowsPerPage,
          });
        }}
        onRowsPerPageChange={(rowsPerPage) => {
          setDemandeStore?.('filterDemande', {
            ...initFilterDemande,
            limit: rowsPerPage,
          });
        }}
      />
    </div>
  );
});
