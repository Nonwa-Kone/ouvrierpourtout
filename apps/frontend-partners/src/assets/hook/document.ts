import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { getDocumentByOwnerId, updateDocument } from '../../api/document.api';
import { useModalStore } from '../../stores/modal.store';
import { tPartner } from '../../types/partners.type';
// import { tDocument } from '../../types/document.type';

export const useGetDocumentByOwnerId = (partner: tPartner) =>
  useQuery({
    queryKey: ['document', 'partner', partner?._id],
    queryFn: async () => {
      const response = await getDocumentByOwnerId(partner?._id as string);
      if (response.success) {
        return response.data;
      }
    },
    enabled: !!partner?._id,
  });

export const useUploadDocument = () => {
  const setModalUploadAction = useModalStore.getState().setModalUploadAction;
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['upload-document'],
    mutationFn: ({ id, document }: { id: string; document: FormData }) =>
      updateDocument(id, document),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['document', 'partner'],
      });
      toast.success(data.message, { delay: 1500 });
      if (data.success) {
        setModalUploadAction('modalUploaded', false);
      } else {
        toast.error(data.message, { delay: 1500 });
        setModalUploadAction('modalUploaded', true);
      }
    },
    onError: (error) => {
      toast.error(`Erreur: ${error.message}`);
      setModalUploadAction('modalUploaded', true);
    },
  });
};
