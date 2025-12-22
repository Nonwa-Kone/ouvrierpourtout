import React from 'react';

import { NavLink } from 'react-router-dom';
import { SIDEBAR_ITEMS } from '../../../assets/constant/sidebar';
import Logo from '../../../assets/img/logo.png';

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
  return (
    <div className='cardProfile'>
      <div className='cardProfile-card-header'>
        <div className='cardProfile-card-header-title'>
          <h3 className='cardProfile-card-header-title-text'>
            Tréklé Admin espace
          </h3>
        </div>
        <div className='cardProfile-card-body'>
          <div className='cardProfile-card-body-item'>
            <p className='cardProfile-card-body-item-text'>
              Ceci est votre espace de gestion de votre activité. Sur ce cet
              espace vous verez tous ce qui est comme trafic sur votre
              application.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
