import { ChevronRight } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

interface iOnlineHeader {
  pageName?: string;
  path?: { name: string; path: string }[];
}

export const OnlineHeader: React.FC<iOnlineHeader> = (props) => {
  return (
    <header className='onlineHeader'>
      <h1 className='onlineHeader-title'>{props.pageName}</h1>
      <nav className='onlineHeader-nav'>
        {props.path?.map((item, index) => (
          <Link key={index} to={item?.path} className='onlineHeader-nav-item'>
            <span>{props?.path?.[index]?.name}</span> <ChevronRight />
          </Link>
        ))}
      </nav>
    </header>
  );
};
