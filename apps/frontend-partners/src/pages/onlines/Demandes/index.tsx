import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Check } from 'lucide-react';
import { redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getQueue, validetedQueueByOuvrier } from '../../../api/queue.api';
import { formatDate } from '../../../assets/utils';
import { statusLayout } from '../../../assets/utils/displayVariation';
import Button from '../../../components/atomic/Button';
import {
  Table,
  TableBadge,
  TableHeader,
  TableProfils,
} from '../../../components/layouts/tableLayout/TableLayout';
import { withOnlineLayout } from '../../../hoc/withOnlineLayout';
import { usePartnersStore } from '../../../stores/partners.store';
import { tDemande, tStatus } from '../../../types/demande.type';

const columns = [
  { flex: 1, label: 'Clients' },
  { flex: 1, label: 'Date', hideOnMobile: true },
  { flex: 0.75, label: 'Statut' },
  { flex: 0.5, label: 'Actions' },
];

export const Demandes = withOnlineLayout(() => {
  const partner = usePartnersStore((state) => state.partner);
  const { data, isLoading, isError } = useQuery({
    queryKey: ['demandes'],
    queryFn: async () => {
      const profession = partner?.profession?.jobs as string;
      const response = await getQueue({ profession });
      return response;
    },
    enabled: !!partner?._id,
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (payload: { orderId: string; partnerId: string }) => {
      await validetedQueueByOuvrier(
        payload.orderId,
        payload.partnerId as string
      );
    },
    onSuccess: () => {
      redirect('/demandes');
      toast.success('Demande validée');
      queryClient.invalidateQueries({ queryKey: ['demande'] });
    },
    onError: (error) => {
      console.log(error);
      toast.error('une erreur est survenue');
    },
  });
  const handleValidateQueueOrder = (id: string) => {
    const payload: { orderId: string; partnerId: string } = {
      orderId: id,
      partnerId: partner?._id as string,
    };
    mutation.mutate(payload);
  };

  const datas: { onSelect?: () => void; content: React.ReactNode[] }[] =
    data?.data
      ? data?.data?.map((demande: tDemande) => {
          const { label, color, bg } = statusLayout(demande?.status as tStatus);

          const item = {
            content: [
              <TableProfils
                name={
                  demande?.order?.customer?.firstName +
                  ' ' +
                  demande?.order?.customer?.lastName
                }
                email={demande?.order?.customer?.phoneNumber}
              />,
              <span style={{ color: '#64748B', fontSize: '0.775rem' }}>
                {formatDate(demande?.createdAt, 'DD MMM YYYY à HH:mm')}
              </span>,
              <TableBadge label={label} color={color} bg={bg} />,
              <div className='flex-row-center-center' style={{ gap: '.3rem' }}>
                <Button
                  label=''
                  variant='secondary'
                  Icon={<Check />}
                  onClick={() => {
                    handleValidateQueueOrder(demande._id as string);
                  }}
                />
              </div>,
            ],
          };
          return item;
        })
      : [];

  return (
    <div className='demandesPage'>
      <div className='demandesPage-block--demandes-title'>
        <p>Liste des Tickets</p>
      </div>
      <TableHeader />
      <Table
        columns={columns}
        data={datas}
        loading={isLoading}
        isError={isError}
      />
    </div>
  );
});
