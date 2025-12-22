import { Mail, Phone, User } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createUser } from '../../../api/user.api';
import { initUser } from '../../../assets/constant/user';
import { PasswordIcon } from '../../../assets/svg/PasswordIcon';
import Button from '../../../components/atomic/Button';
import Input from '../../../components/atomic/Input';
// import Select from '../../../components/atomic/Select';
import { Select } from '../../../components/atomic/Select';
import { PermissionCard } from '../../../components/layouts/Online/Users/PermissionCard';
import { withOnlineLayout } from '../../../hoc/withOnlineLayout';
import { useUserStore } from '../../../stores/user.store';
import { tUser } from '../../../types/user.type';

export const FormAddUser = withOnlineLayout(() => {
  const [password, setPassword] = React.useState<string>('');
  const [confirmPassword, setConfirmPassword] = React.useState<string>('');
  const setUserStore = useUserStore((s) => s.setUserStore);
  const userForm = useUserStore((s) => s.formUser);
  const navigate = useNavigate();

  // TODO: handleSubmit
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const loader = toast.loading('Enregistrement en cours...');
    try {
      if (password !== confirmPassword) {
        console.log(
          '🚀 ~ handleSubmit ~ userForm?.password:',
          userForm?.password
        );
        console.log('🚀 ~ handleSubmit ~ confirmPassword:', userForm);
        return toast.warning('Les mots de passe ne correspondent pas');
      }

      const payload = {
        ...userForm,
        // email: userForm?.personalInfos?.email,
        password: password,
      };

      const response = await createUser(payload as tUser);

      if (response.success) {
        // setUserStore('user', response.data);
        navigate('/users');
        toast.success(response.message, { delay: 1000 });
      }
    } catch (error) {
      toast.error('Une erreur est survenue');
    } finally {
      toast.dismiss(loader);
    }
    console.log('🚀 ~ handleSubmit ~ userForm:', userForm);
  };

  React.useEffect(() => {
    setUserStore('formUser', initUser);
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
            width='half'
            onChange={(e) => {
              setUserStore('formUser', {
                ...userForm,
                personalInfos: {
                  ...userForm?.personalInfos,
                  firstName: e.target.value as string,
                },
              });
            }}
            value={userForm?.personalInfos?.firstName as string}
          />
          <Input
            size='small'
            placeholder='Prénom'
            value={userForm?.personalInfos?.lastName as string}
            type='text'
            label='Prénom'
            Icon={<User />}
            onChange={(e) => {
              setUserStore('formUser', {
                ...userForm,
                personalInfos: {
                  ...userForm?.personalInfos,
                  lastName: e.target.value,
                },
              });
            }}
          />
          <Input
            size='small'
            placeholder='Email'
            type='text'
            label='Email'
            Icon={<Mail />}
            onChange={(e) => {
              setUserStore('formUser', {
                ...userForm,
                personalInfos: {
                  ...userForm?.personalInfos,
                  email: e.target.value,
                },
              });
            }}
            value={userForm?.personalInfos?.email as string}
          />
          <Input
            size='small'
            placeholder='Numéro de téléphone'
            type='text'
            label='Numéro de téléphone'
            Icon={<Phone />}
            onChange={(e) => {
              setUserStore('formUser', {
                ...userForm,
                personalInfos: {
                  ...userForm?.personalInfos,
                  phoneNumber: e.target.value,
                },
              });
            }}
            value={userForm?.personalInfos?.phoneNumber as string}
          />
          <Select
            label='Genre'
            options={[
              { name: 'homme', value: 'homme' },
              { name: 'femme', value: 'femme' },
              { name: 'autre', value: 'autre' },
            ]}
            value={userForm?.personalInfos?.gender as string}
            onChange={(e) => {
              setUserStore('formUser', {
                ...userForm,
                personalInfos: {
                  ...userForm?.personalInfos,
                  gender: e.target.value,
                },
              });
            }}
          />
          <Select
            label='Rôle'
            options={[
              { name: 'Administrateur', value: 'admin' },
              { name: 'Employé', value: 'employe' },
            ]}
            onChange={(e) => {
              setUserStore('formUser', {
                ...userForm,
                role: {
                  ...userForm?.role,
                  label: e.target.value,
                },
              });
            }}
            value={userForm?.role?.label as string}
          />

          <Input
            name='description'
            label='Poste'
            value={userForm?.role?.description as string}
            onChange={(e) => {
              setUserStore('formUser', {
                ...userForm,
                role: {
                  ...userForm?.role,
                  description: e.target.value,
                },
              });
            }}
          />

          <Button
            label='Enregistrer'
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
            className='usersPage-block--users--permissions-password'
            style={{
              // width: '100%',
              backgroundColor: 'white',
              padding: '1rem',
              marginBottom: '1rem',
            }}
          >
            <Input
              size='small'
              width='full'
              placeholder='Mot de passe'
              type='password'
              label='Mot de passe'
              Icon={<PasswordIcon />}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <Input
              size='small'
              width='full'
              placeholder='Confirmer le mot de passe'
              type='password'
              label='Confirmer le mot de passe'
              Icon={<PasswordIcon />}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
            {/* <Button label='Enregistrer' size='small' variant='primary' /> */}
          </div>
          <PermissionCard />
        </div>
      </div>
    </div>
  );
});
