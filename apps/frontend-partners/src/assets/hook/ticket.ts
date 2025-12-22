import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { editStatuTicket, getTicketById } from '../../api/ticket.api';
import { useModalStore } from '../../stores/modal.store';
import { tFilterDemande } from '../../types/demande.type';

export const useTicketByPartnerId = (
  partnerId: string,
  filters: tFilterDemande
) => {
  return useQuery({
    queryKey: [
      'tickets',
      'list',
      partnerId,
      ...(typeof filters === 'object' ? Object.values(filters) : []),
    ],
    queryFn: async () => {
      const response = await getTicketById(partnerId as string, filters);
      return response;
    },
    enabled: !!partnerId,
  });
};

export const useEditStatuTicket = () => {
  const setModalEditOrderAction =
    useModalStore.getState().setModalEditOrderAction;
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      idTicket,
      status,
      amount,
    }: {
      idTicket?: string;
      status?: string;
      amount?: number;
    }) => editStatuTicket(idTicket, status, amount),
    onSuccess(data) {
      queryClient.invalidateQueries({
        queryKey: ['tickets'],
      });
      toast.success(data.message, { delay: 1500 });
      if (data.success) {
        setModalEditOrderAction('editOrderModal', false);
      }
    },
  });
};
