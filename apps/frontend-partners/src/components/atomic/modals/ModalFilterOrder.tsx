// import { useDemandeStore } from '../../../stores/demande.store';
import React from 'react';
import { toast } from 'react-toastify';
import { useDemandeStore } from '../../../stores/demande.store';
import { useModalStore } from '../../../stores/modal.store';
import { tFilterDemande } from '../../../types/demande.type';
import Select from '../Select';
import { ModalLayout } from './ModalLayout';

const status = [
  {
    name: 'En attente de validation',
    value: 'pending',
  },
  {
    name: 'En cours',
    value: 'in_progress',
  },
  {
    name: 'Validée',
    value: 'accepted',
  },
  {
    name: 'Annulée',
    value: 'refused',
  },
  {
    name: 'Terminée',
    value: 'finished',
  },
];

export const ModalFilterOrder = () => {
  const [filter, setFilter] = React.useState<tFilterDemande>({
    profession: '',
    status: '',
    limit: 10,
    page: 1,
    searchTerm: '',
  });
  const { setModalFilterOrderAction } = useModalStore((s) => s);
  const setDemandeStore = useDemandeStore((s) => s.setDemandeStore);

  const handleSubmit = () => {
    if (!filter.status) {
      return toast.error('Veuillez sélectionner un status');
    }
    console.log('filter', filter);
    setDemandeStore?.('filterDemande', filter);
    setModalFilterOrderAction('filterOrderModal', false);
  };

  return (
    <ModalLayout
      width={400}
      title={'Recherche par filtrage des tickets'}
      isLoading={false}
      onCancel={() => setModalFilterOrderAction('filterOrderModal', false)}
      onClose={() => setModalFilterOrderAction('filterOrderModal', false)}
      onValidate={handleSubmit}
    >
      <Select
        label='Status'
        name='status'
        width='full'
        placeholder='Sélectionnez une profession'
        onChange={(e) => {
          const value = e.target.value as string; // Typage explicite
          setFilter((prev) => ({
            ...prev,
            status: value, // Mise à jour de "status"
          }));
        }}
        value={filter.status as string}
        options={status as { name: string; value: string }[]}
      />
    </ModalLayout>
  );
};
