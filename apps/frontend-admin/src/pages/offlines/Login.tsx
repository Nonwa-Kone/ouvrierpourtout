import { LockKeyhole, Mail } from 'lucide-react';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { authAdmin } from '../../api/user.api';
import Button from '../../components/atomic/Button';
import Input from '../../components/atomic/Input';
import WithOfflineLayout from '../../hoc/withOfflineLayout';
import { useUserStore } from '../../stores/user.store';

const Login = WithOfflineLayout(() => {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const setUserStore = useUserStore((state) => state.setUserStore);
  const [loginData, setLoginData] = React.useState<{
    email: string;
    password: string;
  }>({
    email: '',
    password: '',
  });

  const handleSubmit = async () => {
    setLoading(true);
    const loader = toast.loading('Connexion en cours...');
    try {
      const regexEmail = new RegExp(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
      if (!loginData.email && !loginData.password) {
        return toast.warning('Veuillez remplir tous les champs');
      }
      //regex email
      if (!loginData.email.match(regexEmail)) {
        return toast.warning('Veuillez entrer une adresse email valide');
      }
      const payload = {
        email: loginData.email,
        password: loginData.password,
      };

      const response = await authAdmin(payload);

      if (!response.success) {
        return toast.error(response.message);
      }
      setUserStore('user', response.data);
      sessionStorage.setItem('token', response.token);
      navigate('/dashboard');
      toast.success('Connexion réussie');
    } catch (error) {
      setLoading(false);
      toast.error(error as string);
    } finally {
      setLoading(false);
      toast.dismiss(loader);
    }
  };
  return (
    <div className='page-offlines loginPage-container'>
      <div className='loginPage-container--content'>
        <div className='loginPage-container--content--form'>
          <div className='loginPage-container--content--form--logo'>
            {/* <img src='' alt='logo' /> */}
            <p>Connexion</p>
          </div>
          <Input
            Icon={<Mail />}
            placeholder='Email'
            type='text'
            onChange={(e) =>
              setLoginData({ ...loginData, email: e.target.value })
            }
          />
          <Input
            Icon={<LockKeyhole />}
            placeholder='Mot de passe'
            type='password'
            onChange={(e) =>
              setLoginData({ ...loginData, password: e.target.value })
            }
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSubmit();
              }
            }}
          />
          <Button
            label='Connexion'
            size='small'
            disabled={loading}
            variant='primary'
            onClick={() => handleSubmit()}
          />
          <p className='loginPage-container--form--forgotPassword'>
            Mot de passe oublié ?{' '}
            <Link
              to='/password-forget'
              style={{
                color: '#007bff',
                textDecoration: 'none',
                fontWeight: 'bold',
              }}
            >
              Réinitialiser votre mot de passe
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
});

export default Login;
