import React from 'react';
// ** import state manager
import { useDemandeStore } from '../../../stores/demande.store';
import { useModalStore } from '../../../stores/modal.store';

// ** import components react
import CustomBasicPaginator, {
  Table,
  TableActions,
  TableBadge,
  TableHeader,
  TableProfils,
} from '../../../components/layouts/tableLayout/TableLayout';
import { withOnlineLayout } from '../../../hoc/withOnlineLayout';

// ** import utility
import { colors } from '../../../assets/constant/colors copy';
import { columnTableTableTicke } from '../../../assets/constant/table';
import { useTicketData } from '../../../assets/hook/ticket.client';
import { formatDate } from '../../../assets/utils';
import { statusLayout } from '../../../assets/utils/displayVariation';

// ** import type
import { initFilterTicket } from '../../../assets/constant/user';
// import socket from '../../../assets/utils/socketConfig';
import { tDemande, tFilterDemande } from '../../../types/demande.type';

// const socket = io('ws://localhost:3000', {
//   transports: ['websocket'],
// });

export const RequestCustomer = withOnlineLayout(() => {
  // const { isConnected } = useSocket();
  // state manager zustand
  const { setModalDetailOrderAction, setModalFilterTicketActions } =
    useModalStore((s) => s);
  const { setDemandeStore, filterDemande } = useDemandeStore((s) => s);
  const { isPending, data, isRefetching } = useTicketData(
    filterDemande as tFilterDemande
  );

  // React.useEffect(() => {
  //   if (!isConnected) {
  //     console.log('Socket not connected, cannot listen for orders');
  //     return;
  //   }

  //   const handleNewOrder = (order: {
  //     message: string;
  //     data: tDemande;
  //     success: true;
  //   }) => {
  //     console.log('Received order event:', order);
  //     if (order.success) {
  //       toast.success(order.message, {
  //         position: 'bottom-left',
  //         autoClose: 10000,
  //       });
  //     } else {
  //       toast.error(order.message, {
  //         position: 'bottom-left',
  //         autoClose: 10000,
  //       });
  //     }
  //   };

  //   socket.on('order:create', handleNewOrder);
  //   socket.on('order:create:response', handleNewOrder);

  //   document.title = 'Vous avez une nouvelle commande !';

  //   console.log('Listening for order events...');

  //   return () => {
  //     socket.off('order:create', handleNewOrder);
  //     socket.off('order:create:response', handleNewOrder);
  //     document.title = 'Tréklé';
  //   };
  // }, [isConnected]);

  const isFilterActive = React.useMemo((): boolean => {
    return Boolean(
      filterDemande?.status ||
        filterDemande?.period?.from ||
        filterDemande?.period?.to
    );
  }, [filterDemande?.status, filterDemande?.period]);

  // ** datas table
  const datasTable = data?.data?.map((demande: tDemande) => {
    const { bg, color, label } = statusLayout(demande.status);
    const item = {
      content: [
        <span style={{ color: colors.primary['500'], fontSize: '0.775rem' }}>
          {demande.reference}
        </span>,
        <TableProfils
          email={demande?.customer?.phoneNumber as string}
          name={demande.customer?.firstName + ' ' + demande.customer?.lastName}
        />,
        <span style={{ gap: '.3rem', color: '#64748B', fontSize: '0.775rem' }}>
          {demande.profession as string}
        </span>,
        <span
          className='flex-col-start-start'
          style={{ gap: '.3rem', color: '#64748B', fontSize: '0.775rem' }}
        >
          {formatDate(demande.createdAt, 'DD MMM YYYY à HH:mm')}
        </span>,
        <TableBadge bg={bg} color={color} label={label} />,
        <TableActions
          onView={() => {
            setDemandeStore?.('demande', demande);
            setModalDetailOrderAction('detailOrderModal', true);
          }}
          // onEdit={() => navigate(`/ouvriers/${partner._id}/edit`)}
          onDelete={() => {}}
        />,
      ],
    };
    return item;
  });

  return (
    <div className='requestCustomerPage'>
      <div className='requestCustomerPage-block--requestCustomer'>
        <div className='requestCustomerPage-block--requestCustomer-title'>
          <h3>Tickets</h3>
        </div>
      </div>
      <TableHeader
        showBtns={{
          filter: true,
          refresh: true,
          reset: isFilterActive,
          add: true,
          export: true,
        }}
        filterBtn={{
          label: 'filter',
          onClick() {
            setModalFilterTicketActions('modalFilterTicket', true);
          },
        }}
        handleRefresh={() => {
          setDemandeStore?.('filterDemande', initFilterTicket);
        }}
        resetBtn={{
          label: 'Réinitialiser',
          onClick() {
            setDemandeStore?.('filterDemande', initFilterTicket);
          },
        }}
        handleSearch={(e: React.ChangeEvent<HTMLInputElement>) => {
          e.target.value.length > 2
            ? setDemandeStore?.('filterDemande', {
                ...filterDemande,
                searchTerm: e.target.value as string,
              })
            : setDemandeStore?.('filterDemande', {
                ...filterDemande,
                searchTerm: null,
              });
        }}
      />
      <Table
        columns={columnTableTableTicke}
        data={datasTable || []}
        loading={isPending || isRefetching}
      />
      <CustomBasicPaginator
        isLoading={isPending}
        totalRecords={data?.count as number}
        initialPage={data?.currentPage}
        // rowsPerPage={10}
        rowsPerPageOptions={[10, 20, 30, 40, 50]}
        onPageChange={(page, rowsPerPage) => {
          setDemandeStore?.('filterDemande', {
            ...filterDemande,
            page,
            limit: rowsPerPage,
          });
        }}
        onRowsPerPageChange={(rowsPerPage) => {
          setDemandeStore?.('filterDemande', {
            ...filterDemande,
            limit: rowsPerPage,
          });
        }}
      />
    </div>
  );
});
