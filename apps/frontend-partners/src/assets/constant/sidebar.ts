import React from 'react';
import { ClipBoardIcon } from '../svg/ClipBoardIcon';
import { FileIcon } from '../svg/FileIcon';
import { UserIcon } from '../svg/UserIcon';

export const SIDEBAR_ITEMS: Array<{
  name?: string;
  path?: string;
  Icon?: React.FC;
}> = [
  // {
  //   name: 'Dashboard',
  //   path: '/dashboard',
  //   Icon: Home,
  // },
  {
    name: 'File des demandes',
    path: '/demandes',
    Icon: FileIcon,
  },
  {
    name: 'Tickets',
    path: '/tickets',
    Icon: ClipBoardIcon,
  },
  {
    name: 'Profile',
    path: '/profil',
    Icon: UserIcon,
  },
];
