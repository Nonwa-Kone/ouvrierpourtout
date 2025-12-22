import Logo from '../../../assets/images/logo.png';

export const Welcome = () => {
  return (
    <div className='spinner-welcome'>
      <img src={Logo} alt='logo' />
      <p className='spinner-welcome-text'>
        Bienvenue sur notre espace marchands{' '}
      </p>
    </div>
  );
};
