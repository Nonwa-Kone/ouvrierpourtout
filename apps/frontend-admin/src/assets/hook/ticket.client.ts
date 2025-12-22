import { useQuery } from '@tanstack/react-query';

import { getDemandeById, getDemandes } from '../../api/demande.api';
import { tFilterDemande } from '../../types/demande.type';

export const useTicketData = (filter: tFilterDemande) => {
  return useQuery({
    queryKey: [
      'demandes',
      'list',
      ...(typeof filter === 'object' ? Object.values(filter) : []),
    ],
    queryFn: async () => await getDemandes(filter),
  });
};

export const useGetTicketById = (id: string) => {
  return useQuery({
    queryKey: ['demandes', id],
    queryFn: () => getDemandeById(id),
  });
};
