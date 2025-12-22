import React from 'react';

// ** import library
import fr from 'date-fns/locale/fr';
import { DateRange, Range, RangeKeyDict } from 'react-date-range';

// ** import state manager
import { useModalStore } from '../../../stores/modal.store';

// ** import components react
import { useDemandeStore } from '../../../stores/demande.store';
import { Select } from '../Select';
import { ModalLayout } from './ModalLayout';

interface Period extends Range {
  startDate: Date | undefined;
  endDate: Date | undefined;
  key: string;
}

export const ModalFilterTicket = () => {
  // state manager zustand
  // const { setUserStore, filterUser } = useUserStore((s) => s);
  const { setDemandeStore, filterDemande } = useDemandeStore((s) => s);
  const setModalFilterTicketActions = useModalStore(
    (s) => s.setModalFilterTicketActions
  );

  // local state
  const [filter, setFilter] = React.useState<{ role: string; status: string }>({
    status: '',
    role: '',
  });
  const [period, setPeriod] = React.useState<Period[]>([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);

  // Event handler
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

  const handleValidate = () => {
    setDemandeStore?.('filterDemande', {
      ...filterDemande,
      status: filter.status,
      jobs: filter.role,
      period: {
        from: period[0].startDate?.toISOString(),
        to: period[0].endDate?.toISOString(),
      },
    });
    setModalFilterTicketActions('modalFilterTicket', false);
  };

  return (
    <ModalLayout
      title={'Recherche par filtrage des membre'}
      onCancel={() => setModalFilterTicketActions('modalFilterTicket', false)}
      onClose={() => setModalFilterTicketActions('modalFilterTicket', false)}
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
          name='status'
          variant={'half'}
          options={[
            { name: 'Tous', value: '' },
            { name: 'En cours de traitement', value: 'pending' },
            { name: 'Terminée', value: 'accepted' },
            { name: 'Annulée', value: 'refused' },
            { name: 'Cloturée', value: 'clotured' },
          ]}
          label='Status'
          value={filter.status as string}
          onChange={(e) =>
            setFilter({
              ...filter,
              status: e.target.value as string,
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
