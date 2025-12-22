// ** Imports Libraries
import { UploadButton } from '@bytescale/upload-widget-react';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
// ** Imports Components
import Button from '../../../components/atomic/Button';
import Spinner from '../../../components/atomic/Loader';
import { TableBadge } from '../../../components/layouts/tableLayout/TableLayout';
import {
  ContractBlockInfo,
  PartnerBlockInfo,
  ProfessionBlockInfo,
} from '../../../components/layouts/users/BlockInfo';
import { withOnlineLayout } from '../../../hoc/withOnlineLayout';
// ** Imports Icons
import { CloudUpload, UploadCloud } from 'lucide-react';
// ** Imports Hooks
import { useGetDocumentByOwnerId } from '../../../assets/hook/document';
// ** Imports Utilitaires
import { formatDate } from '../../../assets/utils';
import { statusLayout } from '../../../assets/utils/displayVariation';
import { ImagetoBase64 } from '../../../assets/utils/FileReader';
// ** Ipports API
import {
  getPartnerById,
  uplaodRealizationImg,
} from '../../../api/partners.api';
// ** Imports Stores
import { useDocumentStore } from '../../../stores/document.store';
import { useModalStore } from '../../../stores/modal.store';
import { usePartnersStore } from '../../../stores/partners.store';
// ** Imports Types
import { EyeIcon } from '../../../assets/svg/UserOnlineIcons';
import {
  tContract,
  tDocument,
  tPartner,
  tProfession,
} from '../../../types/partners.type';

export const DetailOuvriers = withOnlineLayout(() => {
  // ** state zustand
  const partner = usePartnersStore((s) => s.partner);
  const setDocumentStore = useDocumentStore((s) => s.setDocumentStore);
  const setModalUploadAction = useModalStore((s) => s.setModalUploadAction);

  // ** state react
  const { data: documentData } = useGetDocumentByOwnerId(partner as tPartner);

  console.log('🚀 ~ DetailOuvriers ~ partner:', partner);
  const { isLoading, isError, error, data, refetch, isFetched } = useQuery({
    queryKey: ['detail-partner', partner?._id],
    queryFn: async () => {
      const response = await getPartnerById(partner?._id as string);
      if (response.success) {
        return response.data;
      }
    },
    enabled: !!partner?._id,
  });

  const options = {
    apiKey: 'free', // Get API key: https://www.bytescale.com/get-started
    maxFileCount: 1,
  };

  const uploadFile = async (file: File) => {
    try {
      if (!file) {
        return;
      }

      const uploadFile = file?.originalFile?.file;

      const base64 = await ImagetoBase64(uploadFile);
      console.log('base64', base64);

      const payload: { realization: { fileUrl: unknown; name: string } } = {
        realization: {
          fileUrl: base64,
          name: 'file?.originalFile?.name',
        },
      };

      console.log('payload', payload);

      const response = await uplaodRealizationImg(
        partner?._id as string,
        payload
      );
      if (response.success) {
        refetch();
        toast.success('Fichier uploadé avec succès');
      } else {
        toast.error("Échec de l'upload");
      }
    } catch (error) {
      console.error("Erreur pendant l'upload :", error);
      toast.error('Une erreur est survenue');
    }
  };

  console.log(documentData);
  if (isLoading && !isFetched) {
    return <Spinner />;
  }
  if (isError) {
    return `${error}`;
  }
  return (
    <div className='partnersPage'>
      <div className='partnersPage-block--detail-partners'>
        <div className='partnersPage-block--detail-partners-info'>
          {partner && (
            <>
              <PartnerBlockInfo
                partner={data as tPartner}
                isLoading={isLoading}
              />
              <ProfessionBlockInfo
                profession={data?.profession as tProfession}
              />
            </>
          )}
        </div>
        <div className='partnersPage-block--detail-partners-more-info'>
          <ContractBlockInfo contract={data?.contract as tContract} />
          {/* DOCUMENT BLOCK */}
          {documentData && (
            <div className='partnersPage-block--detail-partners-more-info-document'>
              <div className='partnersPage-block--detail-partners-more-info-document-title'>
                <p style={{ fontSize: '1em', fontFamily: 'Roboto Bold' }}>
                  Documents
                </p>
              </div>
              {documentData?.map((document: tDocument) => (
                <div
                  key={document._id || `${document.name}-${document.createdAt}`}
                  className='partnersPage-block--detail-partners-more-info-document-item'
                >
                  <div className='partnersPage-block--detail-partners-more-info-document-item--value'>
                    {document?.name}
                  </div>
                  <div className='partnersPage-block--detail-partners-more-info-document-item--value'>
                    <p>Crée le :</p>
                    <p>
                      {formatDate(document?.createdAt as string, 'DD/MM/YYYY')}
                    </p>
                  </div>
                  <div className='partnersPage-block--detail-partners-more-info-document-item--value'>
                    <p>Modifié le :</p>
                    <p>
                      {formatDate(document?.updatedAt as string, 'DD/MM/YYYY')}
                    </p>
                  </div>
                  <div className='partnersPage-block--detail-partners-more-info-document-item--value'>
                    <p style={{ display: 'flex', gap: '0.5rem' }}>
                      <TableBadge
                        label={statusLayout(document?.status as string).label}
                        color={statusLayout(document?.status as string).color}
                        bg={statusLayout(document?.status as string).bg}
                      />
                    </p>
                  </div>
                  <div className='partnersPage-block--detail-partners-more-info-document-item--value'>
                    <Button
                      Icon={
                        !document?.fileUrl?.[0]?.url ? (
                          <UploadCloud />
                        ) : (
                          <EyeIcon />
                        )
                      }
                      size='small'
                      onClick={() => {
                        setDocumentStore('document', document);
                        setModalUploadAction('modalUploaded', true);
                      }}
                      // onClick={() => setModalUploadAction('modalUploaded', true)}
                    />
                  </div>
                </div>
              ))}

              {/* </div> */}
            </div>
          )}
          <div className='partnersPage-block--detail-partners-more-info-project'>
            {/* En-tête */}
            <div className='partnersPage-block--detail-partners-more-info-project-title'>
              <p>Quelques Images de vos réalisations</p>
              <UploadButton
                options={options}
                onComplete={(files) => uploadFile(files[0])}
              >
                {({ onClick }) => (
                  <button
                    onClick={onClick}
                    style={{ backgroundColor: 'transparent', border: 'none' }}
                  >
                    <CloudUpload size={40} width={40} />
                  </button>
                )}
              </UploadButton>
            </div>
            <div className='partnersPage-block--detail-partners-more-info-project-list'>
              {partner?.realization?.map((realization, index) => (
                <div
                  key={index}
                  className='partnersPage-block--detail-partners-more-info-project-list-item'
                >
                  <img
                    src={realization?.fileUrl as string}
                    alt={realization?.fileName as string}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
