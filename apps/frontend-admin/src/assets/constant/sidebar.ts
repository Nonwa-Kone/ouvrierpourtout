import { Home } from 'lucide-react';
import React from 'react';
import { UserIcon } from '../svg/UserIcon';
import { Worker } from '../svg/Worker';

export const SIDEBAR_ITEMS: Array<{
  name?: string;
  path?: string;
  Icon?: React.FC;
}> = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    Icon: Home,
  },
  {
    name: 'Tickets',
    path: '/tickets',
    Icon: UserIcon,
  },
  {
    name: 'Clients',
    path: '/customers',
    Icon: UserIcon,
  },
  {
    name: 'Ouvriers',
    path: '/ouvriers',
    Icon: Worker,
  },
  // {
  //   name: 'Partenaires',
  //   path: '/partners',
  //   Icon: UserIcon,
  // },
  {
    name: 'Utilisateurs',
    path: '/users',
    Icon: UserIcon,
  },
];
