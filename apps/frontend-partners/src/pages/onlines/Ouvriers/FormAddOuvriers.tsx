import { CloudUpload, Key, Mail, Phone, User } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createPartner } from '../../../api/partners.api';
import { documentOuvriers } from '../../../assets/constant/document';
import { initPartner } from '../../../assets/constant/partners';
import Button from '../../../components/atomic/Button';
import Input from '../../../components/atomic/Input';
import Select from '../../../components/atomic/Select';
import { withOnlineLayout } from '../../../hoc/withOnlineLayout';
import { usePartnersStore } from '../../../stores/partners.store';

export const FormAddOuvriers = withOnlineLayout(() => {
  const setPartnerStore = usePartnersStore((s) => s.setPartnerStore);
  const formPartner = usePartnersStore((s) => s.formPartner);
  const navigate = useNavigate();

  // TODO: handleSubmit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const loader = toast.loading('Enregistrement en cours...');
    try {
      console.log('🚀 ~ handleSubmit ~ formPartner:', formPartner);
      const payload = {
        ...formPartner,
      };

      const response = await createPartner(payload);

      if (response.success) {
        // setUserStore('user', response.data);
        navigate('/ouvriers');
        toast.success(response.message, { delay: 1000 });
      }
    } catch (error) {
      toast.error('Une erreur est survenue');
    } finally {
      toast.dismiss(loader);
    }
    console.log('🚀 ~ handleSubmit ~ userForm:', formPartner);
  };

  React.useEffect(() => {
    setPartnerStore('formPartner', initPartner);
    return () => {};
  }, []);

  // TODO: handleChange
  return (
    <div className='usersPage'>
      <div className='usersPage-block--users form-add-user'>
        <div
          className='usersPage-block--users--form'
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <Input
            size='small'
            placeholder='Nom'
            type='text'
            label='Nom'
            Icon={<User />}
            width='third'
            onChange={(e) => {
              setPartnerStore('formPartner', {
                ...formPartner,
                personalInfos: {
                  ...formPartner?.personalInfos,
                  firstName: e.target.value,
                },
              });
            }}
            value={formPartner?.personalInfos?.firstName as string}
          />
          <Input
            size='small'
            placeholder='Prénom'
            width='third'
            value={formPartner?.personalInfos?.lastName as string}
            type='text'
            label='Prénom'
            Icon={<User />}
            onChange={(e) => {
              setPartnerStore('formPartner', {
                ...formPartner,
                personalInfos: {
                  ...formPartner?.personalInfos,
                  lastName: e.target.value,
                },
              });
            }}
          />
          <Input
            size='small'
            placeholder='Email'
            type='text'
            width='third'
            label='Email'
            Icon={<Mail />}
            onChange={(e) => {
              setPartnerStore('formPartner', {
                ...formPartner,
                personalInfos: {
                  ...formPartner?.personalInfos,
                  email: e.target.value,
                },
              });
            }}
            value={formPartner?.personalInfos?.email as string}
          />
          <Input
            size='small'
            placeholder='Numéro de téléphone'
            type='text'
            label='Numéro de téléphone'
            Icon={<Phone />}
            width='third'
            onChange={(e) => {
              setPartnerStore('formPartner', {
                ...formPartner,
                personalInfos: {
                  ...formPartner?.personalInfos,
                  phoneNumber: e.target.value,
                },
              });
            }}
            value={formPartner?.personalInfos?.phoneNumber as string}
          />
          <Input
            size='small'
            placeholder='Date de naissance'
            type='date'
            width='third'
            label='Date de naissance'
            Icon={<Phone />}
            onChange={(e) => {
              setPartnerStore('formPartner', {
                ...formPartner,
                personalInfos: {
                  ...formPartner?.personalInfos,
                  birthDay: e.target.value,
                },
              });
            }}
            value={formPartner?.personalInfos?.birthDay as string}
          />
          <Input
            size='small'
            placeholder='Lieu de naissance'
            type='text'
            label='Lieu de naissance'
            width='third'
            Icon={<Phone />}
            onChange={(e) => {
              setPartnerStore('formPartner', {
                ...formPartner,
                personalInfos: {
                  ...formPartner?.personalInfos,
                  locateDate: e.target.value,
                },
              });
            }}
            value={formPartner?.personalInfos?.locateDate as string}
          />
          <Select
            label='Genre'
            placeholder='Genre'
            width='third'
            options={[
              { name: 'homme', value: 'homme' },
              { name: 'femme', value: 'femme' },
              { name: 'autre', value: 'autre' },
            ]}
            value={formPartner?.personalInfos?.gender as string}
            onChange={(e) => {
              setPartnerStore('formPartner', {
                ...formPartner,
                personalInfos: {
                  ...formPartner?.personalInfos,
                  gender: e.target.value,
                },
              });
            }}
          />
          <Select
            Icon={<Key />}
            label='Situation de famille'
            placeholder='Situation de famille'
            width='third'
            options={[
              { name: 'Marié', value: 'Marié' },
              { name: 'Célibataire', value: 'Célibataire' },
              { name: 'Vie maritale', value: 'Vie maritale' },
            ]}
            onChange={(e) => {
              setPartnerStore('formPartner', {
                ...formPartner,
                personalInfos: {
                  ...formPartner?.personalInfos,
                  situation: e.target.value,
                },
              });
            }}
            value={formPartner?.personalInfos?.stituation as string}
          />

          <Input
            name='description'
            width='third'
            label='Poste'
            placeholder='Poste'
            value={formPartner?.profession as string}
            onChange={(e) => {
              setPartnerStore('formPartner', {
                ...formPartner,
                profession: e.target.value,
              });
            }}
          />

          <div
            className='form-line--divider'
            style={{ width: '100%', height: '1px', background: 'lightgray' }}
          ></div>

          <Input
            name='Pays'
            width='third'
            label='Pays'
            placeholder='Pays'
            value={formPartner?.address?.country as string}
            onChange={(e) => {
              setPartnerStore('formPartner', {
                ...formPartner,
                address: {
                  ...formPartner?.address,
                  country: e.target.value,
                },
              });
            }}
          />
          <Input
            name='Ville'
            width='third'
            label='Ville'
            placeholder='Ville'
            value={formPartner?.address?.city as string}
            onChange={(e) => {
              setPartnerStore('formPartner', {
                ...formPartner,
                address: {
                  ...formPartner?.address,
                  city: e.target.value,
                },
              });
            }}
          />
          <Input
            name='Rue'
            width='third'
            label='Rue'
            placeholder='Rue'
            value={formPartner?.address?.street as string}
            onChange={(e) => {
              setPartnerStore('formPartner', {
                ...formPartner,
                address: {
                  ...formPartner?.address,
                  street: e.target.value,
                },
              });
            }}
          />
          <Input
            name='Code Postal'
            width='third'
            label='Code Postal'
            placeholder='Code Postal'
            value={formPartner?.address?.zipCode as string}
            onChange={(e) => {
              setPartnerStore('formPartner', {
                ...formPartner,
                address: {
                  ...formPartner?.address,
                  zipCode: e.target.value,
                },
              });
            }}
          />
          <Input
            name='commune'
            width='third'
            label='Commune'
            placeholder='Commune'
            value={formPartner?.address?.commune as string}
            onChange={(e) => {
              setPartnerStore('formPartner', {
                ...formPartner,
                address: {
                  ...formPartner?.address,
                  commune: e.target.value,
                },
              });
            }}
          />
          <Input
            name='villanumber'
            width='third'
            label='N° Villa'
            placeholder='N° Villa'
            value={formPartner?.address?.villa as string}
            onChange={(e) => {
              setPartnerStore('formPartner', {
                ...formPartner,
                address: {
                  ...formPartner?.address,
                  villa: e.target.value,
                },
              });
            }}
          />

          <div
            className='form-line--divider'
            style={{ width: '100%', height: '1px', background: 'lightgray' }}
          ></div>

          <Button
            label='Enregistrer'
            size='small'
            variant='primary'
            onClick={(e) => handleSubmit(e)}
          />
          <Button
            label='Annuler'
            size='small'
            variant='secondary'
            onClick={() => navigate('/users')}
          />
        </div>

        <div className='usersPage-block--users--permissions'>
          <div
            className='usersPage-block--users--permissions-password'
            style={{
              // width: '100%',
              backgroundColor: 'white',
              padding: '1rem',
              marginBottom: '1rem',
            }}
          >
            {documentOuvriers.map((document, key) => {
              return (
                <div
                  className=''
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '1rem',
                    marginBottom: '0.5rem',
                  }}
                >
                  <p className='' style={{ fontSize: '.775rem' }}>
                    {document.name}
                  </p>
                  <Button Icon={<CloudUpload />} />
                </div>
              );
            })}
            {/* <div className='title'>
              <p>Type de contrat</p>
            </div>
            <div className='body'>
              <input type='radio' name='' id='' />
              Collaborateur freelance
              <input type='radio' name='' id='' />
              Partenariat
              <input type='radio' name='' id='' />
              Contrat d'apprentissage
              <input type='radio' name='' id='' />
              Plein temps
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
});
