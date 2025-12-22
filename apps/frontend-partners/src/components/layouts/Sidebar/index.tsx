import React from 'react';

import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { SIDEBAR_ITEMS } from '../../../assets/constant/sidebar';
import Logo from '../../../assets/img/logo.png';
import { LogoutIcon } from '../../../assets/svg/LogoutIcon';
import { usePartnersStore } from '../../../stores/partners.store';
// import { useUserStore } from '../../../stores/user.store';

export const Sidebar: React.FC = () => {
  return (
    <div style={{ background: '#FFF' }} className='sidebar'>
      <div className='sidebar-logo'>
        <img src={Logo} alt='logo ouvrier pour tout' />
      </div>
      <nav
        className='sidebar-block'
        style={{
          // width: '100%',
          // height: '90%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <nav className='sidebar-nav'>
          <ul>
            {SIDEBAR_ITEMS.map((item, index) => {
              const Icon = item?.Icon as React.FC;
              return (
                <li key={index}>
                  <NavLink
                    to={item?.path as string}
                    className={'sidebar-nav-item'}
                  >
                    <span className='sidebar-nav-item-icon'>
                      {Icon ? <Icon /> : <></>}
                    </span>
                    <span
                      className='sidebar-nav-item-name'
                      style={{ color: '#616161' }}
                    >
                      {item?.name}
                    </span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className='sidebar-footer'>
          <CardProfile />
        </div>
      </nav>
    </div>
  );
};

const CardProfile: React.FC = () => {
  const partner = usePartnersStore((s) => s.partner);
  // const user = useUserStore((state) => state.user);
  const navigate = useNavigate();
  // console.log('🚀 ~ user:', user);
  // const setUserStore = useUserStore((state) => state.setUserStore);
  const handleLogoutAdmin = async () => {
    const loader = toast.loading('Déconnexion en cours...');
    try {
      // await logoutAdmin(user?._id as string);
      sessionStorage.clear();
      // setUserStore('user', null);
      navigate('/');
      toast.success('Déconnexion réussie.');
    } catch (error) {
      toast.error(error?.message);
    } finally {
      toast.dismiss(loader);
    }
  };
  return (
    <div className='cardProfile'>
      <div className='cardProfile-card-header'>
        <div className='cardProfile-card-header-title'>
          <h3 className='cardProfile-card-header-title-text'>Profil</h3>
        </div>
        <div className='cardProfile-card-body'>
          <div className='cardProfile-card-body-item'>
            <p className='cardProfile-card-body-item-text'>
              {partner?.personalInfos?.firstName}{' '}
              {partner?.personalInfos?.lastName}
            </p>
            <p className='cardProfile-card-body-item-text'>
              {partner?.personalInfos?.email}
            </p>
          </div>
          <div className='cardProfile-card-body-item'>
            <LogoutIcon onClick={handleLogoutAdmin} />
          </div>
        </div>
      </div>
    </div>
  );
};
