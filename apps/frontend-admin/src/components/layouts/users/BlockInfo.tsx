import {
  CloudUpload,
  Columns,
  GemIcon,
  Mail,
  PencilIcon,
  Phone,
  UploadCloud,
  User,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Avatar from '../../../assets/img/avatar.jpeg';
import {
  genderLabel,
  statusLayout,
} from '../../../assets/utils/displayVariation';
import { useDocumentStore } from '../../../stores/document.store';
import { useModalStore } from '../../../stores/modal.store';
import {
  tAvailability,
  tContract,
  tDiploma,
  tDocument,
  tPartner,
  tProfession,
  tRenumeration,
  tTypeOfContract,
} from '../../../types/partners.type';
import { tUser } from '../../../types/user.type';
import Button from '../../atomic/Button';
import { ReadPicture } from '../../atomic/upload/ReadPicture';
import { TableBadge } from '../tableLayout/TableLayout';

const BlockInfoItem = ({
  title,
  value,
  Icon,
}: {
  title?: string;
  value?: string;
  Icon?: React.ReactNode;
}) => {
  return (
    <div className='card--block-info-item'>
      {Icon}
      <div className='card--block-info-item-content'>
        <p className='card--block-info-item-content--title'>{title}</p>
        <p className='card--block-info-item-content--value'>{value}</p>
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

export const PartnerBlockInfo = ({ partner }: { partner: tPartner }) => {
  const navigate = useNavigate();
  return (
    <div
      className='usersPage-block--detail-user-info-item'
      style={{ width: '100%' }}
    >
      <div className='usersPage-block--detail-user-info-item avatar'>
        <div
          className='avatar-upload'
          style={{ width: '100%', height: '100%' }}
        >
          <ReadPicture picture={Avatar} width={100 as number} />
          <div className='avatar-upload--overlay'>
            <CloudUpload size={40} width={40} />
          </div>
        </div>
      </div>
      <BlockInfoItem
        title='Nom complet'
        Icon={<User />}
        value={
          partner?.personalInfos?.firstName +
          ' ' +
          partner?.personalInfos?.lastName
        }
      />
      <BlockInfoItem
        title='Numéro de téléphone'
        Icon={<Phone />}
        value={partner?.personalInfos?.phoneNumber as string}
      />
      <BlockInfoItem
        title='Email'
        Icon={<Mail />}
        value={partner?.personalInfos?.email as string}
      />
      <BlockInfoItem
        title='Genre'
        Icon={<GemIcon />}
        value={genderLabel(partner?.personalInfos?.gender as string)}
      />
      <BlockInfoItem
        title='Localité'
        Icon={<Columns />}
        value={
          (((((partner?.address?.country as string) +
            ', ' +
            partner?.address?.city) as string) +
            ', ' +
            partner?.address?.street) as string) +
          ', ' +
          partner?.address?.zipCode
        }
      />
      <BlockInfoItem
        title='Situation de famille'
        Icon={<GemIcon />}
        value={partner?.personalInfos?.familySituation as string}
      />
      <BlockInfoItem
        title='Nationalité'
        Icon={<GemIcon />}
        value={partner?.nationality as string}
      />
      <Button
        size='small'
        variant='primary'
        label='Modifier'
        name='Modifier'
        onClick={() => navigate(`/ouvriers/${partner?._id}/edit`)}
        Icon={<PencilIcon />}
        style={{ width: '100%' }}
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
      <BlockInfoItem
        title='Spécialité'
        value={(profession?.speciality as string) || 'N/A'}
      />
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
          Contrat
        </p>
      </div>
      <BlockInfoItem
        title='Référence'
        value={contract?.referenceContract as string}
      />
      <BlockInfoItem
        title='Type de contrat'
        value={contract?.typeOfContract as tTypeOfContract}
      />
      <BlockInfoItem
        title='Rémunération'
        value={contract?.remuneration as tRenumeration}
      />
      {/* <BlockInfoItem title='Date de signature' value={contract. as tRenumeration} /> */}
    </div>
  );
};

export const DocumentBlockInfo = ({
  documents,
}: {
  documents: tDocument[];
}) => {
  const setDocumentStore = useDocumentStore((s) => s.setDocumentStore);
  // const setModalUploadAction = useModalStore((s) => s.setModalUploadAction);
  const setModalUploadAction = useModalStore((s) => s.setModalUploadAction);

  return (
    <div
      className='usersPage-block--detail-user-info-item'
      style={{ width: '100%' }}
    >
      <div
        className='usersPage-block--detail-user-info-item-text'
        style={{
          width: '100%',
          marginBottom: '0.5rem',
          padding: '0.5rem 1rem',
        }}
      >
        <p style={{ fontSize: '1.em', fontFamily: 'Roboto Bold' }}>Documents</p>
      </div>
      {documents?.map((document) => (
        <div
          className='usersPage-block--detail-user-info-item-text'
          style={{
            padding: '0 1rem',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '0.5rem',
          }}
        >
          <span
            style={{
              fontSize: '0.775rem',
              fontFamily: 'Inter Medium',
              fontWeight: '700',
              flex: 1,
            }}
          >
            {document?.name}
          </span>
          <span style={{ flex: 1, display: 'flex', gap: '0.5rem' }}>
            <TableBadge
              label={statusLayout(document.status as string).label}
              color={statusLayout(document.status as string).color}
              bg={statusLayout(document.status as string).bg}
            />
          </span>
          <p
            className='usersPage-block--detail-user-info-item-text--value'
            // style={{ flex: 1 }}
          >
            <Button
              Icon={<UploadCloud />}
              size='small'
              onClick={() => {
                setDocumentStore('document', document);
                setModalUploadAction('modalUploaded', true);
              }}
            />
          </p>
        </div>
      ))}
    </div>
  );
};
