import {
  Calendar,
  Flag,
  Hash,
  Mail,
  MapPinned,
  Phone,
  User,
} from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createPartner } from '../../../api/partners.api';
import {
  dataFaker,
  diploma,
  experience,
} from '../../../assets/constant/dataFaker';
import { Accordion } from '../../../components/atomic/accordion';
import Button from '../../../components/atomic/Button';
import Input from '../../../components/atomic/Input';
// import Select from '../../../components/atomic/Select';
import { withOnlineLayout } from '../../../hoc/withOnlineLayout';
import { usePartnersStore } from '../../../stores/partners.store';
import {
  tAvailability,
  tContract,
  tDiploma,
  tExperience,
  tPartner,
  tRenumeration,
  tSituation,
  tTypeOfContract,
} from '../../../types/partners.type';

import { useMutation } from '@tanstack/react-query';
import 'react-phone-number-input/style.css';
import { Select } from '../../../components/atomic/Select';

export const FormAddOuvriers = withOnlineLayout(() => {
  const [filteredProfession, setFilteredProfession] = React.useState<
    { name: string; value: string }[]
  >([]);
  // const setModalUploadAction = useModalStore((s) => s.setModalUploadAction);
  const setPartnerStore = usePartnersStore((s) => s.setPartnerStore);
  const formPartner = usePartnersStore((s) => s.formPartner);
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async (data: tPartner) => {
      const response = await createPartner(data);
      return response;
    },
    onSuccess: (data) => {
      navigate('/ouvriers');
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  // TODO: handleSubmit
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const loader = toast.loading('Enregistrement en cours...');
    try {
      const payload = {
        ...formPartner,
      };
      mutation.mutate(payload);
    } catch (error) {
      toast.error('Une erreur est survenue');
    } finally {
      toast.dismiss(loader);
    }
  };

  const categorieMap = dataFaker.map((data) => {
    return { name: data.categorie, value: data.categorie };
  });

  const diplomaMap = diploma.map((data) => {
    return {
      name: data,
      value: data,
    };
  });

  const experienceMap = experience.map((data) => {
    return {
      name: data,
      value: data,
    };
  });

  // Fonction permettant le filtre des corps de métier
  const filteredMapProfession = (categorie: string) => {
    const filteredProfession = dataFaker
      ?.find((data) => data.categorie === categorie)
      ?.specialite?.map((data) => {
        return { name: data, value: data };
      });
    setFilteredProfession(
      filteredProfession as { name: string; value: string }[]
    );
  };

  React.useEffect(() => {
    setPartnerStore('formPartner', {});
    // setPartnerStore('formPartner', initPartner);
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
          <Accordion label='Informations personnelles'>
            <Input
              size='small'
              placeholder=''
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
              placeholder=''
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
              placeholder=''
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
            {/* <PhoneInput
              country='CI'
              placeholder='Enter phone number'
              value={'+33' + formPartner?.personalInfos?.phoneNumber}
              onChange={(e) => {
                setPartnerStore('formPartner', {
                  ...formPartner,
                  personalInfos: {
                    ...formPartner?.personalInfos,
                    phoneNumber: e,
                  },
                });
              }}
            /> */}
            <Input
              size='small'
              placeholder=''
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
              Icon={<Calendar />}
              size='small'
              placeholder=''
              type='date'
              width='third'
              label='Date de naissance'
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
              placeholder=''
              type='text'
              label='Lieu de naissance'
              width='third'
              Icon={<MapPinned />}
              onChange={(e) => {
                setPartnerStore('formPartner', {
                  ...formPartner,
                  personalInfos: {
                    ...formPartner?.personalInfos,
                    locateDay: e.target.value,
                  },
                });
              }}
              value={formPartner?.personalInfos?.locateDay as string}
            />

            <Select
              label='Genre'
              width='half'
              options={[
                { name: 'homme', value: 'man' },
                { name: 'femme', value: 'woman' },
                { name: 'autre', value: 'other' },
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
              label='Situation de famille'
              width='half'
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
                    familySituation: e.target.value as tSituation,
                  },
                });
              }}
              value={formPartner?.personalInfos?.familySituation as string}
            />
            <Input
              size='small'
              width='half'
              placeholder=''
              type='text'
              label='Nationalité'
              Icon={<Flag />}
              value={formPartner?.nationality as string}
              onChange={(e) => {
                setPartnerStore('formPartner', {
                  ...formPartner,
                  nationality: e.target.value,
                });
              }}
            />
            <Input
              size='small'
              width='half'
              placeholder=''
              type='number'
              label='Nombre d enfants'
              Icon={<Hash />}
              value={formPartner?.personalInfos?.numberOfChildren as string}
              onChange={(e) => {
                setPartnerStore('formPartner', {
                  ...formPartner,
                  personalInfos: {
                    ...formPartner?.personalInfos,
                    numberOfChildren: e.target.value as string,
                  },
                });
              }}
            />
          </Accordion>

          <Accordion label='Adresse de localisation'>
            <Input
              name='Pays'
              width='third'
              label='Pays'
              placeholder=''
              Icon={<MapPinned />}
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
              Icon={<MapPinned />}
              label='Ville'
              placeholder=''
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
              Icon={<MapPinned />}
              name='Rue'
              width='third'
              label='Rue'
              placeholder=''
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
              Icon={<MapPinned />}
              name='Code Postal'
              width='third'
              label='Code Postal'
              placeholder=''
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
              Icon={<MapPinned />}
              name='municipality'
              width='third'
              label='Commune'
              placeholder=''
              value={formPartner?.address?.municipality as string}
              onChange={(e) => {
                setPartnerStore('formPartner', {
                  ...formPartner,
                  address: {
                    ...formPartner?.address,
                    municipality: e.target.value,
                  },
                });
              }}
            />
            <Input
              Icon={<MapPinned />}
              name='villanumber'
              width='third'
              label='N° Villa'
              placeholder=''
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
          </Accordion>

          <Accordion label='Profession'>
            <Select
              label='Catégorie métier'
              options={categorieMap}
              value={formPartner?.profession?.jobs as string}
              onChange={(e) => {
                filteredMapProfession(e.target.value);
                setPartnerStore('formPartner', {
                  ...formPartner,
                  profession: {
                    ...formPartner?.profession,
                    jobs: e.target.value,
                  },
                });
              }}
            />
            <Select
              label='Spécialité'
              options={filteredProfession}
              value={formPartner?.profession?.speciality as string}
              width='half'
              onChange={(e) => {
                setPartnerStore('formPartner', {
                  ...formPartner,
                  profession: {
                    ...formPartner?.profession,
                    speciality: e.target.value,
                  },
                });
              }}
            />
            <Select
              label='Diplôme'
              options={diplomaMap}
              width='third'
              value={formPartner?.profession?.diploma as string}
              onChange={(e) => {
                setPartnerStore('formPartner', {
                  ...formPartner,
                  profession: {
                    ...formPartner?.profession,
                    diploma: e.target.value as tDiploma,
                  },
                });
              }}
            />
            <Select
              label='Expérience'
              width='third'
              options={experienceMap}
              value={formPartner?.profession?.experience as string}
              onChange={(e) => {
                setPartnerStore('formPartner', {
                  ...formPartner,
                  profession: {
                    ...formPartner?.profession,
                    experience: e.target.value as tExperience,
                  },
                });
              }}
            />
            <Input
              size='small'
              placeholder='Lundi, Mardi, etc...'
              type='text'
              label='Disponibilité'
              width='third'
              Icon={<Phone />}
              value={formPartner?.profession?.availability as string}
              onChange={(e) => {
                setPartnerStore('formPartner', {
                  ...formPartner,
                  profession: {
                    ...formPartner?.profession,
                    availability: e.target.value as tAvailability,
                  },
                });
              }}
            />
          </Accordion>

          <Accordion label='Documents'>
            <Input
              size='small'
              placeholder=''
              type='text'
              width='third'
              label='N° de CNI / Passeport'
              Icon={<Hash />}
              onChange={(e) => {
                setPartnerStore('formPartner', {
                  ...formPartner,
                  documentInfos: {
                    ...formPartner?.documentInfos,
                    cni: e.target.value,
                  },
                });
              }}
              value={formPartner?.documentInfos?.cni as string}
            />
            <Input
              size='small'
              placeholder=''
              type='text'
              label='N° de CMU'
              width='third'
              Icon={<Hash />}
              onChange={(e) => {
                setPartnerStore('formPartner', {
                  ...formPartner,
                  documentInfos: {
                    ...formPartner?.documentInfos,
                    cmu: e.target.value,
                  },
                });
              }}
              value={formPartner?.documentInfos?.cmu as string}
            />
            <Input
              size='small'
              placeholder=''
              type='text'
              label='N° de Carte de séjour'
              width='third'
              Icon={<Hash />}
              onChange={(e) => {
                setPartnerStore('formPartner', {
                  ...formPartner,
                  documentInfos: {
                    ...formPartner?.documentInfos,
                    sejour: e.target.value,
                  },
                });
              }}
              value={formPartner?.documentInfos?.sejour as string}
            />
          </Accordion>

          <Accordion label='Contrat'>
            <Select
              label='Type de contrat'
              width='half'
              options={[
                {
                  name: 'Collaborateur freelance ',
                  value: 'Collaborateur freelance ',
                },
                { name: 'Partenariat', value: 'Partenariat' },
                {
                  name: 'Contrat de professionnalisation',
                  value: 'Contrat de professionnalisation',
                },
                { name: 'CDD', value: 'CDD' },
                { name: 'CDI', value: 'CDI' },
                { name: 'Autre', value: 'Autre' },
              ]}
              value={formPartner?.contract?.typeOfContract as string}
              onChange={(e) => {
                setPartnerStore('formPartner', {
                  ...formPartner,
                  contract: {
                    ...formPartner?.contract,
                    typeOfContract: e.target.value as tTypeOfContract,
                  } as tContract,
                });
              }}
            />
            <Select
              label='Rémunération'
              width='half'
              options={[
                { name: 'Par semaine', value: 'Par semaine' },
                { name: 'Par quinzaine', value: 'Par quinzaine' },
                { name: 'Par mois', value: 'Par mois' },
                { name: 'Par opération', value: 'Par opération' },
              ]}
              value={formPartner?.contract?.remuneration as string}
              onChange={(e) => {
                setPartnerStore('formPartner', {
                  ...formPartner,
                  contract: {
                    ...formPartner?.contract,
                    remuneration: e.target.value as tRenumeration,
                  } as tContract,
                });
              }}
            />
          </Accordion>

          <Button
            disabled={Boolean(mutation.isPending)}
            label={
              mutation.isPending ? 'Enregistrement en cours...' : 'Enregistrer'
            }
            size='small'
            variant='primary'
            onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
              handleSubmit(e)
            }
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
            style={{
              width: '100%',
              background: '#FFF',
              padding: '1rem',
              marginBottom: '1.5rem',
            }}
            className=''
          >
            <Accordion label='Pour les entreprises'>
              <Input
                size='small'
                placeholder=''
                type='text'
                width='full'
                label='N° de registre de commerce'
                Icon={<Hash />}
                onChange={(e) => {
                  setPartnerStore('formPartner', {
                    ...formPartner,
                    businessInfos: {
                      ...formPartner?.businessInfos,
                      rccm: e.target.value,
                    },
                  });
                }}
              />
              <Input
                size='small'
                placeholder=''
                type='text'
                width='full'
                label='Raison sociale'
                Icon={<Hash />}
                onChange={(e) => {
                  setPartnerStore('formPartner', {
                    ...formPartner,
                    businessInfos: {
                      ...formPartner?.businessInfos,
                      rcs: e.target.value,
                    },
                  });
                }}
              />
            </Accordion>
          </div>
          {/* <div
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
                  <Button
                    Icon={<CloudUpload />}
                    onClick={() => setModalUploadAction('modalUploaded', true)}
                  />
                </div>
              );
            })}
          </div> */}
        </div>
      </div>
    </div>
  );
});
