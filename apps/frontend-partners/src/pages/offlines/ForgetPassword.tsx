import { Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../../components/atomic/Button';
import Input from '../../components/atomic/Input';
import WithOfflineLayout from '../../hoc/withOfflineLayout';

export const ForgetPassword = WithOfflineLayout(() => {
  return (
    <div className='page-offlines loginPage-container'>
      <div className='loginPage-container--content'>
        <div className='loginPage-container--content--form'>
          <div className='loginPage-container--content--form--logo'>
            {/* <img src='' alt='logo' /> */}
            <p>Réinitialiser votre mot de passe</p>
          </div>
          <Input Icon={<Mail />} placeholder='Email' type='text' />
          <Button label='Connexion' size='small' />
          <p className='loginPage-container--form--forgotPassword'>
            Mot de passe oublié ?{' '}
            <Link
              to='/'
              style={{
                color: '#007bff',
                textDecoration: 'none',
                fontWeight: 'bold',
              }}
            >
              retour à la page de connexion
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
});
