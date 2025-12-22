import React, { ComponentType } from 'react';
import { useAuthentificate } from '../assets/hook/useAuthenficate';
import { ModalRender } from '../components/atomic/modals';
import { OnlineHeader } from '../components/layouts/OnlineHeader';
import { HeaderMobile } from '../components/layouts/OnlineHeader/HeaderMobile';
import { Sidebar } from '../components/layouts/Sidebar';

interface iWithOnlineLayout {
  pageName?: string;
  path?: { name: string; path: string }[];
}

export const withOnlineLayout: (
  WrappedComponent: ComponentType
) => ComponentType<iWithOnlineLayout> = (
  WrappedComponent: ComponentType<iWithOnlineLayout>
) => {
  const WithOnlineLayoutComponent: React.FC<iWithOnlineLayout> = (props) => {
    useAuthentificate();
    return (
      <div className='onlinePage'>
        <Sidebar />
        <div className='onlinePage-content'>
          <OnlineHeader pageName={props.pageName} path={props.path} />
          <HeaderMobile />
          {WrappedComponent ? <WrappedComponent /> : <></>}
        </div>
        <ModalRender />
      </div>
    );
  };
  return WithOnlineLayoutComponent;
};
