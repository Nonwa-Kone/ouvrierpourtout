import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { changeStatusDocument } from '../../api/document.api';
import { useModalStore } from '../../stores/modal.store';

interface UpdateDocumentParams {
  id: string;
  status: string;
}

export const useChangeDocumentStatus = () => {
  const setModalUploadAction = useModalStore.getState().setModalUploadAction;
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['change-document-status'],
    mutationFn: async ({ id, status }: UpdateDocumentParams) => {
      try {
        const response = await changeStatusDocument(id, status);
        if (response.success) {
          setModalUploadAction('modalUploaded', false);
          return response;
        }
      } catch (error) {
        throw new Error('Failed to update document status');
      }
    },
    onSuccess: (data) => {
      toast.success(data?.message, { delay: 1500 });
      if (data?.success) {
        setModalUploadAction('modalUploaded', false);
      }
      queryClient.invalidateQueries({ queryKey: ['document-partner'] });
    },

    onError: (error) => {
      toast.error(`Erreur: ${error.message}`);
      setModalUploadAction('modalUploaded', true);
    },
  });
};
