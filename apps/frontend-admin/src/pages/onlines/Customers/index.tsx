import React from 'react';
import { colors } from '../../../assets/constant/colors copy';
import { initFilterCustomer } from '../../../assets/constant/user';
import { useCustomerData } from '../../../assets/hook/customer.client';
import { genderLabel } from '../../../assets/utils/displayVariation';
import CustomBasicPaginator, {
  Table,
  TableActions,
  TableHeader,
  TableProfils,
} from '../../../components/layouts/tableLayout/TableLayout';
import { withOnlineLayout } from '../../../hoc/withOnlineLayout';
import { useCustomerStore } from '../../../stores/customer.store';
import { useModalStore } from '../../../stores/modal.store';
import { tCustomer, tCustomerFilter } from '../../../types/customer.type';

export const Customers = withOnlineLayout(() => {
  const { setModalDetailCustomerAction, setModalFilterCustomerActions } =
    useModalStore();
  const { setCustomerStore, filterCustomer } = useCustomerStore();

  const { data, isLoading, isRefetching, isPending } = useCustomerData(
    filterCustomer as tCustomerFilter
  );

  const isActiveFilterCustomer = React.useMemo(() => {
    return filterCustomer?.gender || filterCustomer?.searchTerm
      ? true
      : false || filterCustomer?.period?.from || filterCustomer?.period?.to;
  }, [
    filterCustomer?.gender,
    filterCustomer?.searchTerm,
    filterCustomer?.period?.from,
    filterCustomer?.period?.to,
  ]);

  const datasTable = data?.data?.map((customer: tCustomer) => {
    const item = {
      content: [
        <span style={{ color: colors.primary['500'], fontSize: '0.775rem' }}>
          {customer?.reference}
        </span>,
        <TableProfils
          email={customer?.phoneNumber as string}
          name={customer?.firstName + ' ' + customer?.lastName}
        />,
        <span style={{ gap: '.3rem', color: '#64748B', fontSize: '0.775rem' }}>
          {genderLabel(customer?.gender as string)}
        </span>,
        <span style={{ gap: '.3rem', color: '#64748B', fontSize: '0.775rem' }}>
          {customer?.address?.city as string}
        </span>,
        <span style={{ gap: '.3rem', color: '#64748B', fontSize: '0.775rem' }}>
          {customer?.address?.municipality as string}
        </span>,
        <span style={{ gap: '.3rem', color: '#64748B', fontSize: '0.775rem' }}>
          {customer?.address?.street as string}
        </span>,
        <TableActions
          onView={() => {
            setCustomerStore?.('customer', customer);
            setModalDetailCustomerAction('detailCustomerModal', true);
          }}
          onDelete={() => {}}
        />,
      ],
    };
    return item;
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomerStore?.('filterCustomer', {
      ...filterCustomer,
      searchTerm: e.target.value,
    });
  };

  const handleRefresh = () => {
    setCustomerStore?.('filterCustomer', initFilterCustomer);
  };

  const handleReset = () => {
    setCustomerStore?.('filterCustomer', initFilterCustomer);
  };

  return (
    <div className='customersPage'>
      <div className='customersPage-block--customers'>
        <div className='customersPage-block--customers-title'>
          <h3>Clients</h3>
        </div>
      </div>
      <TableHeader
        showBtns={{
          filter: true,
          refresh: true,
          reset: isActiveFilterCustomer as boolean,
        }}
        filterBtn={{
          label: 'Filtrer',
          onClick: () =>
            setModalFilterCustomerActions('modalFilterCustomer', true),
        }}
        handleSearch={handleSearch}
        handleRefresh={handleRefresh}
        resetBtn={{ label: 'Réinitialiser', onClick: handleReset }}
      />
      <Table
        columns={[
          { flex: 0.5, label: 'Référence' },
          { flex: 1, label: 'Client' },
          { flex: 0.5, label: 'Genre' },
          { flex: 0.5, label: 'Ville' },
          { flex: 0.5, label: 'Commune' },
          { flex: 0.5, label: 'Rue' },
          { flex: 0.5, label: 'Actions' },
        ]}
        data={datasTable || []}
        loading={isLoading || isRefetching}
      />
      <CustomBasicPaginator
        isLoading={isPending}
        totalRecords={data?.count as number}
        initialPage={data?.currentPage}
        initialRowsPerPage={filterCustomer?.limit || 10}
        rowsPerPageOptions={[10, 20, 30, 40, 50]}
        onPageChange={(page, rowsPerPage) => {
          setCustomerStore?.('filterCustomer', {
            ...filterCustomer,
            page,
            limit: rowsPerPage,
          });
        }}
        onRowsPerPageChange={(rowsPerPage) => {
          setCustomerStore?.('filterCustomer', {
            ...filterCustomer,
            limit: rowsPerPage,
          });
        }}
      />
    </div>
  );
});
