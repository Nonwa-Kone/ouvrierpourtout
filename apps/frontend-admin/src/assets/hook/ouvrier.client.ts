import {
  deletePartner,
  getAllPartners,
  getPartnerById,
} from '../../api/partners.api';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { filterPartner } from '../../types/partners.type';

// const queryClient = new QueryClient();

// F
export const useOuvriersData = (query: filterPartner) => {
  return useQuery({
    queryKey: [
      'ouvriers',
      'list',
      ...(typeof query === 'object' ? Object.values(query) : []),
    ],
    queryFn: async () => {
      const response = await getAllPartners(query);
      if (response.success) {
        return response;
      }
    },
  });
};

export const useOuvrierDataById = (id: string) => {
  return useQuery({
    queryKey: ['ouvrier', 'detail', id],
    queryFn: async () => {
      const response = await getPartnerById(id as string);
      if (response.success) {
        return response.data;
      }
    },
    // enabled: !!id,
  });
};

export const useDeleteOuvrierData = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deletePartner(id as string),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['ouvriers'],
      });
      toast.success('Utilisateur supprimé avec succès');
    },
  });
};
