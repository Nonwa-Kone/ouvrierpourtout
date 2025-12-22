import { Link, useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';
import { SIDEBAR_ITEMS } from '../../../assets/constant/sidebar';
import Logo from '../../../assets/img/logo.png';
import { LogoutIcon } from '../../../assets/svg/LogoutIcon';
import Button from '../../atomic/Button';

export const HeaderMobile = (props) => {
  const navigate = useNavigate();
  const handleLogoutAdmin = async () => {
    const loader = toast.loading('Déconnexion en cours...');
    try {
      sessionStorage.clear();
      navigate('/');
      toast.success('Déconnexion réussie.');
    } catch (error) {
      toast.error(error?.message);
    } finally {
      toast.dismiss(loader);
    }
  };

  return (
    <header className='onlineHeader-mobile'>
      <img src={Logo} alt='logo' className='onlineHeader-mobile-logo' />
      <nav className='onlineHeader-mobile-nav'>
        {SIDEBAR_ITEMS.map((item, index) => (
          <Link
            key={index}
            to={item?.path as string}
            className='onlineHeader-mobile-nav-item'
          >
            {item?.Icon ? <item.Icon /> : <></>}
          </Link>
        ))}
        <Button
          variant='danger'
          Icon={<LogoutIcon color='#fff' />}
          onClick={handleLogoutAdmin}
        ></Button>
      </nav>
    </header>
  );
};
