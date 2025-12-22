import React from 'react';

// ** import lib react
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';

// ** import zustand
import { useDocumentStore } from '../../../stores/document.store';
import { useModalStore } from '../../../stores/modal.store';

// ** import components
import { useUploadDocument } from '../../../assets/hook/document';
import { Upload } from '../upload';
import { ReadPicture } from '../upload/ReadPicture';
import { ModalLayout } from './ModalLayout';

export const UploadDocument = () => {
  // ** state zustand
  const { document } = useDocumentStore((s) => s);
  const setModalUploadAction = useModalStore((s) => s.setModalUploadAction);
  const mutation = useUploadDocument();

  // ** state react
  const [file, setFile] = React.useState<File | null>(null);
  const [fileSelected, setFileSelected] = React.useState<File | string | null>(
    null
  );

  const { getInputProps, getRootProps, isDragActive } = useDropzone({
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/gif': ['.gif'],
    },
    maxSize: 5242880, // 5MB,
    onDrop: (files: File[]) => {
      if (files[0]) {
        const validExtensions = ['.jpeg', '.jpg', '.png', '.gif']; // Extensions acceptées
        const fileName = files[0].name.toLowerCase();
        const hasValidExtension = validExtensions.some((ext) =>
          fileName.endsWith(ext)
        );

        if (!files[0].type.startsWith('image/') || !hasValidExtension) {
          return toast.error(
            'Seuls les fichiers image avec une extension valide sont acceptés'
          );
        }
        setFile(files[0]);
        setFileSelected(URL.createObjectURL(files[0]));
      }
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      return toast.error('Aucun fichier sélectionné');
    }
    if (!document?._id) {
      return toast.error('ID du document manquant');
    }
    const formData = new FormData();
    formData.append('image', file);
    formData.append('status', 'pending');
    mutation.mutate({ id: document._id, document: formData });
    setFile(null);
    setFileSelected(null);
  };

  React.useEffect(() => {
    return () => {
      if (fileSelected && typeof fileSelected === 'string') {
        URL.revokeObjectURL(fileSelected);
      }
    };
  }, [fileSelected]);

  React.useEffect(() => {
    if (document?.fileUrl?.[0]?.url) {
      setFileSelected(document.fileUrl[0].url);
    }
  }, [document?.fileUrl]);

  const closeModal = () => setModalUploadAction('modalUploaded', false);

  return (
    <ModalLayout
      onClose={closeModal}
      onCancel={closeModal}
      width={600}
      onValidate={handleSubmit}
      title={'Uploader un document'}
      disabled={mutation.isPending}
      isLoading={mutation.isPending}
      hiddenBtn={document?.status === 'accepted'}
    >
      {!fileSelected ? (
        <Upload
          is_one
          getInputProps={getInputProps}
          getRootProps={getRootProps}
          isDragActive={isDragActive}
        />
      ) : (
        <ReadPicture
          index={0}
          status={document?.status as string}
          picture={fileSelected as string | ImageData}
          handleDelete={() => {
            if (typeof fileSelected === 'string') {
              URL.revokeObjectURL(fileSelected);
            }
            setFileSelected(null);
          }}
        />
      )}
    </ModalLayout>
  );
};
