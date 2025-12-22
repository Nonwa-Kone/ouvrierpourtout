import React from 'react';
import { statusFaker } from '../../../assets/constant/dataFaker';
import { useDemandeStore } from '../../../stores/demande.store';
// import { useDemandeStore } from '../../../stores/demande.store';
import { toast } from 'react-toastify';
import { useEditStatuTicket } from '../../../assets/hook/ticket';
import { useModalStore } from '../../../stores/modal.store';
import Input from '../Input';
import Select from '../Select';
import { ModalLayout } from './ModalLayout';

export const ModalEditOrder = () => {
  const [status, setStatus] = React.useState<string>();
  const [amount, setAmount] = React.useState<number>();
  const mutatation = useEditStatuTicket();
  const { setModalEditOrderAction } = useModalStore((s) => s);
  const demande = useDemandeStore((s) => s.demande);
  const handleValidate = () => {
    if (!demande?._id) {
      return toast.warning(
        "Veuillez verifier à ce que l'id soit bien renseigné"
      );
    }
    if (!status) {
      return toast.warning('Veuillez selectionner un statu', { delay: 1500 });
    }
    const payload: { idTicket?: string; status?: string; amount?: number } = {
      idTicket: demande?._id,
      status,
      amount,
    };
    mutatation.mutate(payload);
  };
  return (
    <ModalLayout
      width={400}
      title={'Modifier le status de la commande'}
      onCancel={() => setModalEditOrderAction('editOrderModal', false)}
      onClose={() => setModalEditOrderAction('editOrderModal', false)}
      onValidate={handleValidate}
      isLoading={mutatation.isPending}
    >
      <Input
        type='number'
        name='amount'
        label='Montant'
        placeholder='Montant'
        width='full'
        onChange={(e) => setAmount(Number(e.target.value))}
      />
      <Select
        options={statusFaker}
        value={
          statusFaker.find((statu) => statu.value === demande?.status)?.name
        }
        name='status'
        label='Status'
        placeholder='status'
        width='full'
        onChange={(e) => {
          setStatus(e?.target?.value);
        }}
      />
    </ModalLayout>
  );
};
