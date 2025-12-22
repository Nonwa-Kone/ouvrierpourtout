import { useAvisStore, useModalStore } from '../../../stores/modal.store';
import { ModalLayout } from './ModalLayout';

export const ModalAvis = () => {
  const setModalAvisActions = useModalStore((s) => s.setModalAvisActions);
  const setAvisStore = useAvisStore((s) => s.setAvisStore);
  return (
    <ModalLayout
      title={'Confirmer pour la suppression'}
      onCancel={() => setModalAvisActions('avisModal', false)}
      onClose={() => setModalAvisActions('avisModal', false)}
      onValidate={() => {
        setAvisStore('avis', true);
        setModalAvisActions('avisModal', false);
      }}
    >
      <div className='modalAvis'>
        <p style={{ textAlign: 'center' }} className=''>
          Etes-vous sûre de bien vouloir proceder à la suppression ?
        </p>
      </div>
    </ModalLayout>
  );
};
