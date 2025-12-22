import { useMutation, useQueryClient } from '@tanstack/react-query';
import { redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import { assignTradeBody } from '../../../api/demande.api';
import { useDemandeStore } from '../../../stores/demande.store';
import { useModalStore } from '../../../stores/modal.store';
import { ModalLayout } from './ModalLayout';

export const ModalAssignTradeBody = () => {
  const setModalAssignTradeBodyAction = useModalStore(
    (s) => s.setModalAssignTradeBodyAction
  );
  const queryClient = useQueryClient();
  const demande = useDemandeStore((s) => s.demande);
  console.log('🚀 ~ ModalAssignTradeBody ~ demande:', demande);

  const mutation = useMutation({
    mutationFn: async (payload: { orderId: string; profession: string }) => {
      const response = await assignTradeBody(payload);
      console.log(response);
    },
    onSuccess: () => {
      setModalAssignTradeBodyAction('assignTradeBodyModal', false);
      redirect('/demandes');
      toast.success('Ticket assigné avec succès');
      queryClient.invalidateQueries({ queryKey: ['demande'] });
    },
    onError: (error) => {
      console.log(error);
      toast.error('une erreur est survenue');
    },
  });

  const handleAssignTradeBody = async () => {
    const loader = toast.loading('Assignation en cours...');
    try {
      const payload = {
        orderId: demande?._id,
        profession: demande?.profession,
      };
      mutation.mutate(payload as { orderId: string; profession: string });
    } catch (error) {
      console.log(error);
    }
    toast.dismiss(loader);
  };
  return (
    <ModalLayout
      width={400}
      title={'Assigner un ticket'}
      onCancel={() =>
        setModalAssignTradeBodyAction('assignTradeBodyModal', false)
      }
      onClose={() =>
        setModalAssignTradeBodyAction('assignTradeBodyModal', false)
      }
      onValidate={() => {
        handleAssignTradeBody();
        setModalAssignTradeBodyAction('assignTradeBodyModal', false);
      }}
    >
      <div className='modalDetailOrder-container-body'>
        <div className='modalDetailOrder-container-body-item'>
          <p className='modalDetailOrder-container-body-item-title'>
            Référence :{' '}
          </p>
          <p className='modalDetailOrder-container-body-item-value'>
            {demande?.reference}
          </p>
        </div>
        <div className='modalDetailOrder-container-body-item'>
          <p className='modalDetailOrder-container-body-item-title'>
            Corps de métier concerné :{' '}
          </p>
          <p className='modalDetailOrder-container-body-item-value'>
            {demande?.profession}
          </p>
        </div>
      </div>
    </ModalLayout>
  );
};
