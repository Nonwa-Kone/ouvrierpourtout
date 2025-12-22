import React from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';
import { updateDocument } from '../../../api/document.api';
import { useDocumentStore } from '../../../stores/document.store';
import { useModalStore } from '../../../stores/modal.store';
import { Upload } from '../upload';
import { ReadPicture } from '../upload/ReadPicture';
import { ModalLayout } from './ModalLayout';

export const UploadDocument = () => {
  // STATE REACT
  const [file, setFile] = React.useState<File | null>(null);
  const [fileSelected, setFileSelected] = React.useState<File | string | null>(
    null
  );

  console.log('🚀 ~ UploadDocument ~ fileSelected:', fileSelected);
  const { document, setDocumentStore } = useDocumentStore((s) => s);

  // GLOBAL STATE
  const setModalUploadAction = useModalStore((s) => s.setModalUploadAction);
  const { getInputProps, getRootProps, isDragActive } = useDropzone({
    accept: 'image/*', // Accepter uniquement les images
    onDrop: (files: File[]) => {
      if (files[0]) {
        if (!files[0].type.startsWith('image/')) {
          return toast.error('Seuls les fichiers image sont acceptés');
        }
        setFile(files[0]);
        setFileSelected(URL.createObjectURL(files[0]));
      }
    },
  });

  // au soumission du formulaire
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const loader = toast.loading('Upload en cours...');
    try {
      if (!file) {
        return toast.error('Aucun fichier sélectionné');
      }
      console.log('🚀 ~ handleSubmit ~ file:', file);
      const formData = new FormData();
      formData.append('image', file);

      console.log('🚀 ~ handleSubmit ~ fileSelected:', fileSelected);
      const response = await updateDocument(document?._id as string, formData);
      if (response.success) {
        toast.success('Fichier uploadé avec succès');
        setFileSelected(null);
        setModalUploadAction('modalUploaded', false);
      }
    } catch (error) {
      console.log('🚀 ~ handleSubmit ~ error:', error);
    } finally {
      setFile(null);
      setFileSelected(null);
      setModalUploadAction('modalUploaded', false);
      toast.dismiss(loader);
    }
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

  return (
    <ModalLayout
      onClose={() => setModalUploadAction('modalUploaded', false)}
      onCancel={() => setModalUploadAction('modalUploaded', false)}
      onValidate={(e) => {
        handleSubmit(e);
        setModalUploadAction('modalUploaded', false);
      }}
      title={'Uploader un document'}
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
          picture={fileSelected as string | ImageData}
          handleDelete={() => {
            URL.revokeObjectURL(fileSelected! as string); // Clean up the URL object
            setFileSelected(null);
          }}
        />
      )}
    </ModalLayout>
  );
};
