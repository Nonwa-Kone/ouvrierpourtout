import React, { ComponentType } from 'react';

export interface iWithOfflineLayout {
  pageName?: string;
  path?: { name: string; path: string }[];
}

export const WithOfflineLayout: (
  WrappedComponent: ComponentType
) => ComponentType<iWithOfflineLayout> = (
  WrappedComponent: ComponentType<iWithOfflineLayout>
) => {
  const WithOfflineLayoutComponent: React.FC<iWithOfflineLayout> = () => {
    return <>{WrappedComponent ? <WrappedComponent /> : <></>}</>;
  };
  return WithOfflineLayoutComponent;
};

export default WithOfflineLayout;
