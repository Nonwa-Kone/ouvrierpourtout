import {
  CloudUpload,
  Columns,
  GemIcon,
  Mail,
  PencilIcon,
  Phone,
  User,
} from 'lucide-react';
import { genderLabel } from '../../../assets/utils/displayVariation';
import {
  tAvailability,
  tContract,
  tDiploma,
  tPartner,
  tProfession,
  tRenumeration,
  tTypeOfContract,
} from '../../../types/partners.type';
import { tUser } from '../../../types/user.type';
import Button from '../../atomic/Button';
import { ReadPicture } from '../../atomic/upload/ReadPicture';

import { UploadButton } from '@bytescale/upload-widget-react';
import Skeleton from 'react-loading-skeleton';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { uplaodProfFile } from '../../../api/partners.api';
import { ImagetoBase64 } from '../../../assets/utils/FileReader';
import { usePartnersStore } from '../../../stores/partners.store';

const BlockInfoItem = ({
  title,
  value,
  Icon,
  isLoading,
}: {
  title?: string;
  value?: string;
  Icon?: React.ReactNode;
  isLoading?: boolean;
}) => {
  return (
    <div className='card--block-info-item'>
      {isLoading ? <Skeleton count={1} width={100} height={10} /> : <>{Icon}</>}
      <div className='card--block-info-item-content'>
        {isLoading ? (
          <Skeleton count={1} width={100} height={10} />
        ) : (
          <p className='card--block-info-item-content--title'>{title}</p>
        )}
        {isLoading ? (
          <Skeleton count={1} width={100} height={10} />
        ) : (
          <p className='card--block-info-item-content--value'>{value}</p>
        )}
        {/* <p className='card--block-info-item-content--title'>{title}</p>
        <p className='card--block-info-item-content--value'>{value}</p> */}
      </div>
    </div>
  );
};

export const BlockInfo = ({ user }: { user: tUser }) => {
  return (
    <div className='usersPage-block--detail-user-info-item'>
      <div className='usersPage-block--detail-user-info-item avatar'>
        {/* <Upload
          getRootProps={getRootProps}
          getInputProps={getInputProps}
          isDragActive={false}
        /> */}
      </div>
      <BlockInfoItem
        title='Nom complet'
        Icon={<User />}
        value={
          user?.personalInfos?.firstName + ' ' + user?.personalInfos?.lastName
        }
      />
      <BlockInfoItem
        title='Numéro de téléphone'
        Icon={<Phone />}
        value={user?.personalInfos?.phoneNumber as string}
      />
      <BlockInfoItem
        title='Email'
        Icon={<Mail />}
        value={user?.personalInfos?.email as string}
      />
      <BlockInfoItem
        title='Genre'
        Icon={<GemIcon />}
        value={user?.personalInfos?.gender as string}
      />
      <BlockInfoItem
        title='Localité'
        Icon={<Columns />}
        value={
          (((((user?.address?.country as string) +
            ', ' +
            user?.address?.city) as string) +
            ', ' +
            user?.address?.street) as string) +
          ', ' +
          user?.address?.zipCode
        }
      />
      <Button
        size='small'
        variant='primary'
        label='Modifier'
        name='Modifier'
        Icon={<PencilIcon />}
        style={{ width: '100%' }}
      />
      {/* <div className='usersPage-block--detail-user-info-item permission'>
        <PermissionCard />
      </div> */}
    </div>
  );
};

const PartnerAvatar = ({
  partner,
  onUpload,
  isLoading,
}: {
  partner: tPartner;
  onUpload: (file: File) => void;
  isLoading: boolean;
}) => {
  const options = {
    apiKey: 'free',
    maxFileCount: 1,
  };

  return (
    <div className='avatar-upload' style={{ width: '100%', height: '100%' }}>
      {isLoading ? (
        <Skeleton count={1} width={100} height={100} />
      ) : (
        <ReadPicture
          picture={partner?.profFile?.fileUrl as string}
          isLoading={isLoading}
        />
      )}
      <div className='avatar-upload--overlay'>
        <UploadButton
          options={options}
          onComplete={(files) => onUpload(files[0])}
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
    </div>
  );
};

const PartnerInfo = ({
  partner,
  isLoading,
}: {
  partner: tPartner;
  isLoading: boolean;
}) => (
  <>
    <BlockInfoItem
      title='Nom complet'
      Icon={<User />}
      isLoading={isLoading}
      value={`${partner?.personalInfos?.firstName || ''} ${
        partner?.personalInfos?.lastName || ''
      }`.trim()}
    />
    <BlockInfoItem
      title='Numéro de téléphone'
      Icon={<Phone />}
      isLoading={isLoading}
      value={partner?.personalInfos?.phoneNumber || 'Non disponible'}
    />
    <BlockInfoItem
      title='Email'
      Icon={<Mail />}
      isLoading={isLoading}
      value={partner?.personalInfos?.email || 'Non disponible'}
    />
    <BlockInfoItem
      title='Genre'
      Icon={<GemIcon />}
      isLoading={isLoading}
      value={genderLabel(partner?.personalInfos?.gender || '')}
    />
    <BlockInfoItem
      title='Localité'
      Icon={<Columns />}
      isLoading={isLoading}
      value={`${partner?.address?.country || ''}, ${
        partner?.address?.city || ''
      }, ${partner?.address?.street || ''}, ${
        partner?.address?.zipCode || ''
      }`.trim()}
    />
    <BlockInfoItem
      title='Situation de famille'
      Icon={<GemIcon />}
      isLoading={isLoading}
      value={partner?.personalInfos?.familySituation || 'Non spécifiée'}
    />
    <BlockInfoItem
      title='Nationalité'
      Icon={<GemIcon />}
      isLoading={isLoading}
      value={partner?.nationality || 'Non spécifiée'}
    />
  </>
);

export const PartnerBlockInfo = ({
  partner,
  isLoading,
}: {
  partner: tPartner;
  isLoading: boolean;
}) => {
  const navigate = useNavigate();
  const partnerId = usePartnersStore((s) => s.partner?._id);
  const uploadFile = async (file: File) => {
    try {
      if (!file) {
        return toast.error('Aucun fichier sélectionné');
      }

      const uploadFile = file?.originalFile?.file;

      const base64 = await ImagetoBase64(uploadFile);
      console.log('base64', base64);

      const payload = {
        profFile: {
          fileUrl: base64,
          name: file?.originalFile?.name,
        },
      };

      // const formData = new FormData();
      // formData.append('image', uploadFile); // Utilisation directe de File

      const response = await uplaodProfFile(partner?._id as string, payload);
      if (response.success) {
        toast.success('Fichier uploadé avec succès');
      } else {
        toast.error("Échec de l'upload");
      }
    } catch (error) {
      console.error("Erreur pendant l'upload :", error);
      toast.error('Une erreur est survenue');
    }
  };

  return (
    <div
      className='usersPage-block--detail-user-info-item'
      style={{ width: '100%' }}
    >
      <div className='usersPage-block--detail-user-info-item avatar'>
        <PartnerAvatar
          partner={partner}
          onUpload={uploadFile}
          isLoading={isLoading}
        />
      </div>
      <PartnerInfo partner={partner} isLoading={isLoading} />
      <Button
        size='small'
        variant='primary'
        label='Modifier'
        name='Modifier'
        Icon={<PencilIcon />}
        style={{ width: '100%' }}
        onClick={() => {
          navigate(`/profil/${partnerId}/edit`);
        }}
      />
    </div>
  );
};

export const ProfessionBlockInfo = ({
  profession,
}: {
  profession: tProfession;
}) => {
  return (
    <div
      className='usersPage-block--detail-user-info-item'
      style={{ width: '100%' }}
    >
      <div className='usersPage-block--detail-user-info-item-text'>
        <p
          style={{
            fontSize: '1.1rem',
            fontFamily: 'Roboto Bold',
            marginBottom: '0.5rem',
            padding: '0.5rem 1rem',
          }}
        >
          Profession
        </p>
      </div>
      <BlockInfoItem title='Métier' value={profession?.jobs as string} />
      <BlockInfoItem title='Diplôme' value={profession?.diploma as tDiploma} />
      <BlockInfoItem
        title='Expérience'
        value={profession?.experience as string}
      />
      <BlockInfoItem
        title='Disponibilité'
        value={profession?.availability as tAvailability}
      />
    </div>
  );
};

export const ContractBlockInfo = ({ contract }: { contract: tContract }) => {
  return (
    <div className='contract-block' style={{ width: '100%' }}>
      <div className='contract-block-text'>
        <p
          style={{
            fontSize: '1.1rem',
            fontFamily: 'Roboto Bold',
            marginBottom: '0.5rem',
            padding: '0.5rem 1rem',
          }}
        >
          Contrat
        </p>
      </div>
      <div className='contract-block-body'>
        <div className='contract-block-body-item'>
          <p className='contract-block-body-item-title'>Référence</p>
          <p className='contract-block-body-item-value'>
            {contract?.referenceContract as string}
          </p>
        </div>
        <div className='contract-block-body-item'>
          <p className='contract-block-body-item-title'>Type de contrat</p>
          <p className='contract-block-body-item-value'>
            {contract?.typeOfContract as tTypeOfContract}
          </p>
        </div>
        <div className='contract-block-body-item'>
          <p className='contract-block-body-item-title'>Rémunération</p>
          <p className='contract-block-body-item-value'>
            {contract?.remuneration as tRenumeration}
          </p>
        </div>
      </div>
    </div>
  );
};
