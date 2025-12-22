import React from 'react';
// ** import library
import { fr } from 'date-fns/locale';
import { DateRange, Range, RangeKeyDict } from 'react-date-range';
// ** import state manager zustand
import { useCustomerStore } from '../../../stores/customer.store';
import { useModalStore } from '../../../stores/modal.store';
// ** import components react
import { Select } from '../Select';
import { ModalLayout } from './ModalLayout';

interface Period extends Range {
  startDate: Date | undefined;
  endDate: Date | undefined;
  key: string;
}

export const ModalFilterCustomer = () => {
  // State Manager zustand
  const { setCustomerStore, filterCustomer } = useCustomerStore();
  const setModalFilterCustomerActions = useModalStore(
    (s) => s.setModalFilterCustomerActions
  );

  // State Local
  const [period, setPeriod] = React.useState<Period[]>([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);

  const [filter, setFilter] = React.useState<{
    role: string;
    gender: string;
  }>({
    gender: '',
    role: '',
  });

  // Handle Events
  // Handle the selected date range
  const handleSelectedDate = (item: RangeKeyDict): void => {
    const selection = item.selection as Period;
    setPeriod([
      {
        startDate: selection.startDate,
        endDate: selection.endDate,
        key: 'selection',
      },
    ]);
  };

  // Handle the validation of the form
  const handleValidate = () => {
    setCustomerStore?.('filterCustomer', {
      ...filterCustomer,
      gender: filter.gender,
      period: {
        from: period[0].startDate?.toISOString(),
        to: period[0].endDate?.toISOString(),
      },
    });
    setModalFilterCustomerActions('modalFilterCustomer', false);
  };

  return (
    <ModalLayout
      title={'Recherche par filtrage des clients'}
      onCancel={() =>
        setModalFilterCustomerActions('modalFilterCustomer', false)
      }
      onClose={() =>
        setModalFilterCustomerActions('modalFilterCustomer', false)
      }
      onValidate={handleValidate}
    >
      <div
        className='flex-row-start-start'
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem',
        }}
      >
        <Select
          name='Genre'
          variant={'half'}
          options={[
            { name: 'Tous', value: '' },
            { name: 'Homme', value: 'man' },
            { name: 'Femme', value: 'woman' },
            { name: 'Autre', value: 'other' },
          ]}
          label='Selectionner un genre'
          value={filter.gender as string}
          onChange={(e) =>
            setFilter({
              ...filter,
              gender: e.target.value as string,
            })
          }
        />
        <Select
          name='role'
          variant={'half'}
          options={[
            { name: 'Tous', value: '' },
            { name: 'Administrateur', value: 'Administrateur' },
            { name: 'employée', value: 'employe' },
          ]}
          label='Selectionner un role'
          value={filter.role as string}
          onChange={(e) =>
            setFilter({
              ...filter,
              role: e.target.value as string,
            })
          }
        />
      </div>
      <div style={{ width: '100%' }}>
        <DateRange
          dateDisplayFormat='dd/MM/yyyy'
          maxDate={new Date()}
          className='custom-date-range'
          ranges={period}
          startDatePlaceholder='Debut'
          endDatePlaceholder='Fin'
          onChange={handleSelectedDate}
          editableDateInputs={true}
          moveRangeOnFirstSelection={false}
          locale={fr}
        />
      </div>
    </ModalLayout>
  );
};
