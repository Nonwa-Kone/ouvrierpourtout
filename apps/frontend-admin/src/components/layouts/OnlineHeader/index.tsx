import { ChevronRight } from 'lucide-react';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLogout } from '../../../assets/hook/useLogout';
import { useUserStore } from '../../../stores/user.store';
import { Dropdown } from '../../atomic/dropdown/Dropdown';
import NotificationBox from '../Notification';

interface iOnlineHeader {
  pageName?: string;
  path?: { name: string; path: string }[];
}

export const OnlineHeader: React.FC<iOnlineHeader> = (props) => {
  const { user } = useUserStore((s) => s);
  const navigate = useNavigate();
  const mutation = useLogout();
  return (
    <header className='onlineHeader'>
      <div>
        <h1 className='onlineHeader-title'>{props.pageName}</h1>
        <nav className='onlineHeader-nav'>
          {props.path?.map((item, index) => (
            <Link key={index} to={item?.path} className='onlineHeader-nav-item'>
              <span>{props?.path?.[index]?.name}</span> <ChevronRight />
            </Link>
          ))}
        </nav>
      </div>
      <div
        className=''
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        <NotificationBox />
        <Dropdown>
          <Dropdown.Toggle />
          <Dropdown.List>
            <Dropdown.Item onClick={() => navigate(`/users/${user?._id}`)}>
              Profil
            </Dropdown.Item>
            <Dropdown.Item onClick={() => mutation.mutate(user?._id as string)}>
              Déconnexion
            </Dropdown.Item>
          </Dropdown.List>
        </Dropdown>
      </div>
    </header>
  );
};
