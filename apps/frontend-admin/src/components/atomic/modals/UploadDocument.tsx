// ** import React
import React from 'react';

// ** import lib react
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';

// ** import zustand
import { useChangeDocumentStatus } from '../../../assets/hook/document.client';
import { useDocumentStore } from '../../../stores/document.store';
import { useModalStore } from '../../../stores/modal.store';

// ** import components
import Button from '../Button';
import { Upload } from '../upload';
import { ReadPicture } from '../upload/ReadPicture';
import { ModalLayout } from './ModalLayout';

// ** import iconq
import { CheckIcon, TrashIcon } from 'lucide-react';

interface FileWithPreview extends File {
  preview?: string;
}

export const UploadDocument = () => {
  // state zustand
  const mutation = useChangeDocumentStatus();
  const { document } = useDocumentStore((s) => s);
  const setModalUploadAction = useModalStore((s) => s.setModalUploadAction);

  // state react
  const [file, setFile] = React.useState<FileWithPreview | null>(null);
  const [fileSelected, setFileSelected] = React.useState<string | null>(null);
  const [previewError, setPreviewError] = React.useState(false);

  const { getInputProps, getRootProps, isDragActive } = useDropzone({
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/gif': ['.gif'],
    },
    maxSize: 5242880, // 5MB
    onDrop: (acceptedFiles: File[], rejectedFiles) => {
      if (rejectedFiles.length > 0) {
        const errors = rejectedFiles[0].errors;
        if (errors[0]?.code === 'file-invalid-type') {
          toast.error('Seuls les fichiers image (JPG, PNG, GIF) sont acceptés');
        } else if (errors[0]?.code === 'file-too-large') {
          toast.error('Le fichier est trop volumineux (max 5MB)');
        }
        return;
      }

      const file = acceptedFiles[0] as FileWithPreview;
      if (file) {
        const preview = URL.createObjectURL(file);
        file.preview = preview;
        setFile(file);
        setFileSelected(preview);
        setPreviewError(false);
      }
    },
    multiple: false,
  });

  // ** Effect useEffect
  React.useEffect(() => {
    return () => {
      if (file?.preview) {
        URL.revokeObjectURL(file.preview);
      }
    };
  }, [file]);

  React.useEffect(() => {
    if (document?.fileUrl?.[0]?.url) {
      setFileSelected(document.fileUrl[0].url);
    }
  }, [document?.fileUrl]);

  // hANDLE Validate Document
  const handleValidateDocument = async () => {
    if (!document?._id) {
      return toast.error('ID du document manquant');
    }
    const payload: { id: string; status: string } = {
      id: document._id,
      status: 'accepted',
    };
    mutation.mutate(payload);
  };

  // Handle Reject Document
  const handleRejectDocument = async () => {
    if (!document?._id) {
      return toast.error('ID du document manquant');
    }
    const payload: { id: string; status: string } = {
      id: document._id,
      status: 'refused',
    };
    mutation.mutate(payload);
  };

  const closeModal = () => setModalUploadAction('modalUploaded', false);

  return (
    <ModalLayout
      hiddenBtn={true}
      onClose={closeModal}
      onCancel={closeModal}
      width={600}
      title={'Uploader un document'}
      disabled={Boolean(mutation.isPending)}
      isLoading={mutation.isPending as boolean}
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
          picture={fileSelected}
          status={document?.status as string}
          handleDelete={() => {
            if (file?.preview) {
              URL.revokeObjectURL(file.preview);
            }
            setFile(null);
            setFileSelected(null);
          }}
          // onError={() => setPreviewError(true)}
        />
      )}
      {previewError && (
        <div className='error-message'>
          Impossible de charger l'aperçu de l'image
        </div>
      )}
      {document?.status === 'pending' && (
        <div
          className='uploadDocument--btn'
          style={{ display: 'flex', gap: '0.5rem' }}
        >
          <Button
            variant='secondary'
            label='Rejeter'
            name='rejeter'
            Icon={<TrashIcon />}
            style={{ flex: 1, width: '100%' }}
            onClick={handleRejectDocument}
          />
          <Button
            variant='primary'
            label='Valider'
            name='valider'
            Icon={<CheckIcon />}
            style={{ flex: 1 }}
            onClick={handleValidateDocument}
          />
        </div>
      )}
    </ModalLayout>
  );
};
