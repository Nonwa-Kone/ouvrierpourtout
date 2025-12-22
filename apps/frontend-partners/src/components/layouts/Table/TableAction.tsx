import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Check } from 'lucide-react';
import React from 'react';
import { redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import { usePartnersStore } from '../../../stores/partners.store';
import Button from '../../atomic/Button';

interface RowData {
  _id: string;
  // Ajoutez ici d'autres propriétés selon votre modèle de données.
}

const ActionsCell: React.FC<{ row: { original: RowData } }> = ({ row }) => {
  const queryClient = useQueryClient();
  const partnerId = usePartnersStore.getState().partner?._id;

  const mutation = useMutation({
    mutationFn: async (payload: { orderId: string; partnerId: string }) => {
      await validatedQueueByOuvrier(
        payload.orderId,
        payload.partnerId as string
      );
    },
    onSuccess: () => {
      redirect('/demandes');
      toast.success('Ticket assigné avec succès');
      queryClient.invalidateQueries({ queryKey: ['demande'] });
    },
    onError: (error) => {
      console.error(error);
      toast.error('Une erreur est survenue');
    },
  });

  const validateQueue = () => {
    const payload = {
      orderId: row.original._id,
      partnerId,
    };
    mutation.mutate(payload);
  };

  return (
    <div style={{ display: 'flex', gap: '0.5rem' }}>
      <Button
        disabled={mutation.isLoading}
        variant='primary'
        Icon={<Check size={16} />}
        size='small'
        onClick={validateQueue}
      />
    </div>
  );
};

export default ActionsCell;
