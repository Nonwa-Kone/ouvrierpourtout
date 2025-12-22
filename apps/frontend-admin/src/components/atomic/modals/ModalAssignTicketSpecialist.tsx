import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import { assignTicketSpecialist } from '../../../api/demande.api';
import { getAllPartners } from '../../../api/partners.api';
import { useDemandeStore } from '../../../stores/demande.store';
import { useModalStore } from '../../../stores/modal.store';
import { tPartner } from '../../../types/partners.type';
// import Select from '../Select';
import { Select } from '../Select';
import { ModalLayout } from './ModalLayout';

export const ModalAssignTicketSpecialist = () => {
  const [formAssignTicketSpecialist, setFormAssignTicketSpecialist] =
    React.useState<{ ouvrierId: string; orderId: string }>({
      orderId: '',
      ouvrierId: '',
    });
  const queryClient = useQueryClient();
  const setModalAssignTicketSpecialistAction = useModalStore(
    (s) => s.setModalAssignTicketSpecialistAction
  );
  const demande = useDemandeStore((s) => s.demande);

  const { data, isLoading } = useQuery({
    queryKey: ['get-ouvrier-specialist'],
    queryFn: async () => {
      const response = await getAllPartners({});
      if (response.success) {
        return response;
      }
    },
  });

  const mutation = useMutation({
    mutationFn: async (payload: { orderId: string; ouvrierId: string }) => {
      const response = await assignTicketSpecialist(payload);
      console.log(response);
    },
    onSuccess: () => {
      setModalAssignTicketSpecialistAction(
        'assignTicketSpecialistModal',
        false
      );
      redirect('/demandes');

      toast.success('Ticket assigné avec succès');
      queryClient.invalidateQueries({ queryKey: ['demande'] });
    },
    onError: (error) => {
      console.log(error);
      toast.error('une erreur est survenue');
    },
  });

  const ouvrierSpecialiste: {
    name: string;
    value: string;
  }[] =
    data?.data?.map((ouvrier: tPartner) => {
      return {
        name:
          ouvrier?.personalInfos?.firstName +
          ' ' +
          ouvrier?.personalInfos?.lastName,
        value: ouvrier?._id as string,
      };
    }) || [];

  const handleSubmit = async (event: React.FormEvent) => {
    try {
      event.preventDefault();
      const payload = {
        orderId: demande?._id as string,
        ouvrierId: formAssignTicketSpecialist.ouvrierId as string,
      };
      mutation.mutate(payload);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ModalLayout
      width={400}
      title={'Assigner un ticket'}
      onCancel={() =>
        setModalAssignTicketSpecialistAction(
          'assignTicketSpecialistModal',
          false
        )
      }
      onClose={() =>
        setModalAssignTicketSpecialistAction(
          'assignTicketSpecialistModal',
          false
        )
      }
      onValidate={() => {
        handleSubmit;
        setModalAssignTicketSpecialistAction(
          'assignTicketSpecialistModal',
          false
        );
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
            Profession :{' '}
          </p>
          <p className='modalDetailOrder-container-body-item-value'>
            {demande?.profession}
          </p>
        </div>
        <div className='modalDetailOrder-container-body-item'>
          {isLoading ? (
            <p>Chargement en cours...</p>
          ) : (
            <Select
              label={'Ouvrier spécialiste'}
              // Icon={<BaggageClaim />}
              width='full'
              // placeholder={"Selectionnez un secteur d'activité"}
              options={ouvrierSpecialiste}
              value={formAssignTicketSpecialist.ouvrierId}
              onChange={(value) => {
                setFormAssignTicketSpecialist({
                  ...formAssignTicketSpecialist,
                  ouvrierId: value.target.value,
                });
              }}
            />
          )}
        </div>
      </div>
    </ModalLayout>
  );
};
