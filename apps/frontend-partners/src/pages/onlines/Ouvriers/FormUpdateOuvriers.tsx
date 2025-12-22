import {
  Calendar,
  Flag,
  Hash,
  Key,
  Mail,
  MapPinned,
  Phone,
  Shield,
  User,
} from 'lucide-react';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getPartnerById, updatePartner } from '../../../api/partners.api';
import {
  dataFaker,
  diploma,
  experience,
} from '../../../assets/constant/dataFaker';
// import { Accordion } from '../../../components/atomic/accordion';
import Button from '../../../components/atomic/Button';
import Input from '../../../components/atomic/Input';
import Select from '../../../components/atomic/Select';
import { withOnlineLayout } from '../../../hoc/withOnlineLayout';
import { usePartnersStore } from '../../../stores/partners.store';
import {
  tAvailability,
  tDiploma,
  tExperience,
  tPartner,
  tSituation,
} from '../../../types/partners.type';

import { useMutation, useQuery } from '@tanstack/react-query';

export const FormUpdateOuvriers = withOnlineLayout(() => {
  const [filteredProfession, setFilteredProfession] = React.useState<
    { name: string; value: string }[]
  >([]);
  const partnerId = useParams<{ id: string }>().id;
  // const setModalUploadAction = useModalStore((s) => s.setModalUploadAction);
  const setPartnerStore = usePartnersStore((s) => s.setPartnerStore);
  const formPartner = usePartnersStore((s) => s.formPartner);
  const navigate = useNavigate();

  const { data, isLoading, refetch, error, isError } = useQuery({
    queryKey: ['get-ouvriers', partnerId],
    queryFn: async () => await getPartnerById(partnerId as string),
    enabled: !!partnerId,
  });

  const mutation = useMutation({
    mutationFn: async (partner: tPartner) => {
      const response = await updatePartner(partnerId as string, partner);
      if (response.success) {
        toast.success(response.message);
        return response.data;
      }
    },
    onSuccess: (data) => {
      toast.success(
        'Mise à jour avec succès ' + data?.personalInfos?.firstName
      );
      navigate(`/profil`);
    },
    onError: (error) => {
      toast.error('Une erreur est survenue');
    },
  });

  // TODO: handleSubmit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
    if (!data?.data) return;
    setPartnerStore('formPartner', data?.data);
    return () => {};
  }, [data?.data]);

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
            Icon={<Shield />}
            label='Genre'
            placeholder='Genre'
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
            Icon={<Key />}
            label='Situation de famille'
            placeholder='Situation de famille'
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
            // d={formPartner.nationality as string}
          />
          <Input
            size='small'
            width='half'
            placeholder=''
            type='number'
            label='Nombre d enfants'
            Icon={<Hash />}
            // value={formPartner.personalInfos.}
          />
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
            Icon={<Phone />}
            label='Expérience'
            placeholder='Expérience'
            width='half'
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

          <Button
            disabled={mutation.isLoading}
            label={
              mutation.isLoading ? 'en cours de traitement' : 'Enregistrer'
            }
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
            style={{
              width: '100%',
              background: '#FFF',
              padding: '1rem',
              marginBottom: '1.5rem',
            }}
            className=''
          >
            <Input
              size='small'
              placeholder=''
              type='text'
              width='full'
              label='N° de registre de commerce'
              Icon={<Hash />}
              value={formPartner?.businessInfos?.rccm as string}
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
              value={formPartner?.businessInfos?.rcs as string}
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
          </div>
        </div>
      </div>
    </div>
  );
});
