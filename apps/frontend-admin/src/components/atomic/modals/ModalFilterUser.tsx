import React from 'react';
import { useModalStore } from '../../../stores/modal.store';
import { Select } from '../Select';
// import { Input } from '../fields/Input';
// import { Select } from '../fields/Select';
import { useUserStore } from '../../../stores/user.store';
import { ModalLayout } from './ModalLayout';

export const ModalFilterUser = () => {
  const [filter, setFilter] = React.useState<{ role: string; gender: string }>({
    gender: '',
    role: '',
  });
  const { setUserStore, filterUser } = useUserStore((s) => s);
  const setModalFilterUser = useModalStore((s) => s.setModalFilterUser);

  const handleValidate = () => {
    setUserStore('filterUser', {
      ...filterUser,
      gender: filter.gender,
      role: filter.role,
    });
    setModalFilterUser('modalFilterUser', false);
  };
  return (
    <ModalLayout
      title={'Recherche par filtrage des membre'}
      onCancel={() => setModalFilterUser('modalFilterUser', false)}
      onClose={() => setModalFilterUser('modalFilterUser', false)}
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
          value={filter.gender}
          label='Selectionner un genre'
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
    </ModalLayout>
  );
};
